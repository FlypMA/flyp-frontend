import { useState, useEffect, useCallback, useRef } from 'react';

interface PersistedStateOptions<T> {
  key: string;
  defaultValue: T;
  expirationHours?: number;
  validateData?: (data: any) => boolean;
  onRestore?: (data: T) => void;
  onSave?: (data: T) => void;
  autoSave?: boolean;
  saveDelay?: number;
}

interface StoredData<T> {
  data: T;
  timestamp: number;
  version: string;
}

export function usePersistedState<T>({
  key,
  defaultValue,
  expirationHours = 24,
  validateData,
  onRestore,
  onSave,
  autoSave = true,
  saveDelay = 1000,
}: PersistedStateOptions<T>) {
  const [state, setState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [isRestored, setIsRestored] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const version = '1.0'; // Version for data migration

  // Load persisted data on mount
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) {
          setIsLoading(false);
          return;
        }

        const parsed: StoredData<T> = JSON.parse(stored);

        // Check expiration
        const expirationTime = parsed.timestamp + expirationHours * 60 * 60 * 1000;
        if (Date.now() > expirationTime) {
          localStorage.removeItem(key);
          setIsLoading(false);
          return;
        }

        // Validate data if validator provided
        if (validateData && !validateData(parsed.data)) {
          console.warn(`Invalid persisted data for key: ${key}`);
          localStorage.removeItem(key);
          setIsLoading(false);
          return;
        }

        setState(parsed.data);
        setIsRestored(true);

        if (onRestore) {
          onRestore(parsed.data);
        }
      } catch (error) {
        console.error(`Error loading persisted data for key: ${key}`, error);
        localStorage.removeItem(key);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedData();
  }, [key, expirationHours, validateData, onRestore]);

  // Save data to localStorage
  const saveToStorage = useCallback(
    (data: T) => {
      try {
        const toStore: StoredData<T> = {
          data,
          timestamp: Date.now(),
          version,
        };

        localStorage.setItem(key, JSON.stringify(toStore));

        if (onSave) {
          onSave(data);
        }
      } catch (error) {
        console.error(`Error saving data for key: ${key}`, error);
      }
    },
    [key, onSave, version]
  );

  // Update state with optional auto-save
  const updateState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      setState(prevState => {
        const nextState =
          typeof newState === 'function' ? (newState as (prev: T) => T)(prevState) : newState;

        // Auto-save with debouncing
        if (autoSave) {
          if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
          }

          saveTimeoutRef.current = setTimeout(() => {
            saveToStorage(nextState);
          }, saveDelay);
        }

        return nextState;
      });
    },
    [autoSave, saveDelay, saveToStorage]
  );

  // Manual save function
  const save = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveToStorage(state);
  }, [state, saveToStorage]);

  // Clear persisted data
  const clear = useCallback(() => {
    localStorage.removeItem(key);
    setState(defaultValue);
    setIsRestored(false);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  }, [key, defaultValue]);

  // Reset to default value
  const reset = useCallback(() => {
    setState(defaultValue);
    if (autoSave) {
      saveToStorage(defaultValue);
    }
  }, [defaultValue, autoSave, saveToStorage]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    state,
    setState: updateState,
    save,
    clear,
    reset,
    isLoading,
    isRestored,
    hasPersistedData: isRestored,
  };
}

// Multi-step form specific hook
interface MultiStepFormOptions<T> {
  formKey: string;
  initialData: T;
  steps: string[];
  expirationHours?: number;
  onStepComplete?: (step: string, data: T) => void;
  onFormComplete?: (data: T) => void;
}

export function useMultiStepForm<T>({
  formKey,
  initialData,
  steps,
  expirationHours = 24,
  onStepComplete,
  onFormComplete,
}: MultiStepFormOptions<T>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const {
    state: formData,
    setState: setFormData,
    save,
    clear,
    reset,
    isLoading,
    isRestored,
    hasPersistedData,
  } = usePersistedState({
    key: `${formKey}_data`,
    defaultValue: initialData,
    expirationHours,
    autoSave: true,
    saveDelay: 500,
  });

  const { state: formState, setState: setFormState } = usePersistedState({
    key: `${formKey}_state`,
    defaultValue: {
      currentStepIndex: 0,
      completedSteps: [] as string[],
    },
    expirationHours,
    autoSave: true,
    onRestore: restored => {
      setCurrentStepIndex(restored.currentStepIndex || 0);
      setCompletedSteps(new Set(restored.completedSteps || []));
    },
  });

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStepIndex(stepIndex);
        setFormState(prev => ({
          ...prev,
          currentStepIndex: stepIndex,
        }));
      }
    },
    [steps.length, setFormState]
  );

  const goToNextStep = useCallback(() => {
    if (!isLastStep) {
      const nextIndex = currentStepIndex + 1;
      goToStep(nextIndex);
    }
  }, [currentStepIndex, isLastStep, goToStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      const prevIndex = currentStepIndex - 1;
      goToStep(prevIndex);
    }
  }, [currentStepIndex, isFirstStep, goToStep]);

  const markStepCompleted = useCallback(
    (step?: string) => {
      const stepToComplete = step || currentStep;
      if (stepToComplete) {
        setCompletedSteps(prev => {
          const newSet = new Set([...prev, stepToComplete]);
          setFormState(prevState => ({
            ...prevState,
            completedSteps: Array.from(newSet),
          }));
          return newSet;
        });

        if (onStepComplete) {
          onStepComplete(stepToComplete, formData);
        }
      }
    },
    [currentStep, formData, onStepComplete, setFormState]
  );

  const updateFormData = useCallback(
    (updates: Partial<T> | ((prev: T) => T)) => {
      if (typeof updates === 'function') {
        setFormData(updates);
      } else {
        setFormData(prev => ({ ...prev, ...updates }));
      }
    },
    [setFormData]
  );

  const completeForm = useCallback(() => {
    markStepCompleted();

    if (onFormComplete) {
      onFormComplete(formData);
    }

    // Optionally clear the form data after completion
    // clear();
  }, [formData, markStepCompleted, onFormComplete]);

  const clearForm = useCallback(() => {
    clear();
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setFormState({
      currentStepIndex: 0,
      completedSteps: [],
    });
  }, [clear, setFormState]);

  const isStepCompleted = useCallback(
    (step: string) => {
      return completedSteps.has(step);
    },
    [completedSteps]
  );

  const canGoToStep = useCallback(
    (stepIndex: number) => {
      // Can go to any completed step or the next incomplete step
      if (stepIndex < 0 || stepIndex >= steps.length) return false;
      if (stepIndex <= currentStepIndex) return true;

      // Check if all previous steps are completed
      for (let i = 0; i < stepIndex; i++) {
        if (!completedSteps.has(steps[i])) return false;
      }

      return true;
    },
    [currentStepIndex, completedSteps, steps]
  );

  return {
    // Form data
    formData,
    updateFormData,

    // Step navigation
    currentStep,
    currentStepIndex,
    steps,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    canGoToStep,

    // Step completion
    completedSteps,
    isStepCompleted,
    markStepCompleted,

    // Form lifecycle
    completeForm,
    clearForm,
    save,

    // Status
    isFirstStep,
    isLastStep,
    progress,
    isLoading,
    isRestored,
    hasPersistedData,
  };
}

export default usePersistedState;
