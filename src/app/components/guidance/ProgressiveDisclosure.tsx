import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Chip, Progress } from '@heroui/react';
import {
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Play,
  Eye,
  EyeOff,
} from 'lucide-react';

export interface DisclosureStep {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'tip' | 'warning' | 'required';
  content: React.ReactNode;
  isCompleted?: boolean;
  isOptional?: boolean;
  estimatedTime?: string;
  prerequisites?: string[];
}

interface ProgressiveDisclosureProps {
  steps: DisclosureStep[];
  currentStepId?: string;
  onStepComplete?: (stepId: string) => void;
  onStepChange?: (stepId: string) => void;
  autoExpandNext?: boolean;
  showProgress?: boolean;
  className?: string;
}

const ProgressiveDisclosure: React.FC<ProgressiveDisclosureProps> = ({
  steps,
  currentStepId,
  onStepComplete,
  onStepChange,
  autoExpandNext = true,
  showProgress = true,
  className = '',
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Auto-expand the first incomplete step
    if (autoExpandNext) {
      const firstIncompleteStep = steps.find(step => !completedSteps.has(step.id));
      if (firstIncompleteStep) {
        setExpandedSteps(prev => new Set([...prev, firstIncompleteStep.id]));
      }
    }
  }, [steps, completedSteps, autoExpandNext]);

  useEffect(() => {
    // Expand current step if provided
    if (currentStepId) {
      setExpandedSteps(prev => new Set([...prev, currentStepId]));
    }
  }, [currentStepId]);

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });

    if (onStepChange) {
      onStepChange(stepId);
    }
  };

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));

    if (autoExpandNext) {
      // Collapse current step and expand next
      setExpandedSteps(prev => {
        const newSet = new Set(prev);
        newSet.delete(stepId);

        // Find next incomplete step
        const currentIndex = steps.findIndex(step => step.id === stepId);
        const nextStep = steps.slice(currentIndex + 1).find(step => !completedSteps.has(step.id));
        if (nextStep) {
          newSet.add(nextStep.id);
        }

        return newSet;
      });
    }

    if (onStepComplete) {
      onStepComplete(stepId);
    }
  };

  const getStepIcon = (step: DisclosureStep) => {
    if (completedSteps.has(step.id) || step.isCompleted) {
      return <CheckCircle className="w-5 h-5 text-success-600" />;
    }

    switch (step.type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-warning-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      case 'required':
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      default:
        return <Info className="w-5 h-5 text-primary-600" />;
    }
  };

  const getStepColor = (step: DisclosureStep) => {
    if (completedSteps.has(step.id) || step.isCompleted) {
      return 'success';
    }

    switch (step.type) {
      case 'warning':
      case 'required':
        return 'danger';
      case 'tip':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getProgressPercentage = () => {
    const totalSteps = steps.length;
    const completed = steps.filter(step => completedSteps.has(step.id) || step.isCompleted).length;
    return Math.round((completed / totalSteps) * 100);
  };

  const canCompleteStep = (step: DisclosureStep) => {
    if (!step.prerequisites) return true;

    return step.prerequisites.every(
      prereqId => completedSteps.has(prereqId) || steps.find(s => s.id === prereqId)?.isCompleted
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {showProgress && (
        <Card className="border border-neutral-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-neutral-900">Progress Overview</h3>
              <span className="text-sm text-neutral-600">
                {steps.filter(step => completedSteps.has(step.id) || step.isCompleted).length} of{' '}
                {steps.length} completed
              </span>
            </div>
            <Progress value={getProgressPercentage()} color="primary" size="sm" showValueLabel />
          </CardBody>
        </Card>
      )}

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.has(step.id);
          const isCompleted = completedSteps.has(step.id) || step.isCompleted;
          const canComplete = canCompleteStep(step);
          const isCurrent = currentStepId === step.id;

          return (
            <Card
              key={step.id}
              className={`border transition-all ${
                isCurrent
                  ? 'border-primary-500 shadow-md'
                  : isCompleted
                    ? 'border-success-200 bg-success-50/30'
                    : 'border-neutral-200'
              }`}
            >
              <CardBody className="p-0">
                {/* Step Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-neutral-900">{step.title}</h4>

                        <div className="flex items-center gap-2">
                          {getStepIcon(step)}

                          {step.isOptional && (
                            <Chip size="sm" variant="flat" color="default">
                              Optional
                            </Chip>
                          )}

                          {step.estimatedTime && (
                            <Chip size="sm" variant="flat" color="primary">
                              {step.estimatedTime}
                            </Chip>
                          )}

                          {!canComplete && (
                            <Chip size="sm" variant="flat" color="warning">
                              Prerequisites required
                            </Chip>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-neutral-600">{step.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <Chip color="success" variant="flat" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Chip>
                      )}

                      <Button isIconOnly variant="light" size="sm">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-neutral-200">
                    <div className="pt-4 space-y-4">
                      {/* Prerequisites Warning */}
                      {!canComplete && step.prerequisites && (
                        <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-warning-900 text-sm">
                                Prerequisites Required
                              </div>
                              <div className="text-sm text-warning-800">
                                Complete the following steps first: {step.prerequisites.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step Content */}
                      <div className={canComplete ? '' : 'opacity-50 pointer-events-none'}>
                        {step.content}
                      </div>

                      {/* Action Buttons */}
                      {canComplete && !isCompleted && (
                        <div className="flex justify-end pt-3 border-t border-neutral-100">
                          <Button
                            color="primary"
                            size="sm"
                            onPress={() => markStepComplete(step.id)}
                            startContent={<CheckCircle className="w-4 h-4" />}
                          >
                            Mark as Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      {getProgressPercentage() === 100 && (
        <Card className="border border-success-200 bg-success-50">
          <CardBody className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-success-600 mx-auto mb-2" />
            <h3 className="font-semibold text-success-900 mb-1">All Steps Completed!</h3>
            <p className="text-sm text-success-800">
              Great job! You've successfully completed all the required steps.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ProgressiveDisclosure;
