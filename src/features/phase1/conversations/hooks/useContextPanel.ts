// 🎯 Context Panel State Management
// Location: src/features/phase1/conversations/hooks/useContextPanel.ts
// Purpose: Zustand store for managing three-panel messaging interface state

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Conversation } from '../types';
import {
  Breakpoint,
  ContextDetectionResult,
  ContextPanelState,
  ContextPanelType,
  PanelLayoutConfig,
} from '../types/context-panel.types';

// =============================================================================
// CONTEXT PANEL STORE INTERFACE
// =============================================================================

interface ContextPanelStore extends ContextPanelState {
  // Actions
  setVisibility: (_visible: boolean) => void;
  toggleVisibility: () => void;
  setCollapsed: (_collapsed: boolean) => void;
  toggleCollapsed: () => void;
  setActiveContext: (_context: ContextPanelType) => void;
  setLoading: (_loading: boolean) => void;
  setError: (_error: string | null) => void;
  updateUserPreferences: (_preferences: Partial<ContextPanelState['userPreferences']>) => void;

  // Context detection
  detectContext: (_conversation: Conversation) => ContextDetectionResult;
  autoSwitchContext: (_conversation: Conversation) => void;

  // Responsive design
  currentBreakpoint: Breakpoint;
  setBreakpoint: (_breakpoint: Breakpoint) => void;
  getLayoutConfig: () => PanelLayoutConfig;

  // Reset
  reset: () => void;
}

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: ContextPanelState = {
  isVisible: false, // Hidden by default
  isCollapsed: false,
  activeContext: 'business_info', // Default to business info
  isLoading: false,
  error: null,
  userPreferences: {
    defaultVisibility: false, // Hidden by default
    preferredContext: 'business_info', // Default to business info
    rememberCollapseState: false, // Don't persist collapse state to avoid issues
  },
};

// =============================================================================
// CONTEXT DETECTION LOGIC
// =============================================================================

const detectContextType = (conversation: Conversation): ContextDetectionResult => {
  // Priority order for context detection
  const rules = [
    {
      condition: (conv: Conversation) => conv.context?.currentStage === 'due_diligence',
      contextType: 'due_diligence' as ContextPanelType,
      priority: 1,
      reason: 'Due diligence stage active',
    },
    {
      condition: (conv: Conversation) =>
        conv.context?.currentStage === 'offer' || conv.context?.currentStage === 'transaction',
      contextType: 'transaction' as ContextPanelType,
      priority: 2,
      reason: 'Transaction/offer stage active',
    },
    {
      condition: (conv: Conversation) => conv.context?.transactionState?.hasDueDiligence,
      contextType: 'documents' as ContextPanelType,
      priority: 3,
      reason: 'Documents shared or due diligence active',
    },
    {
      condition: (conv: Conversation) => conv.businessContext || conv.context?.businessContext,
      contextType: 'business_info' as ContextPanelType,
      priority: 4,
      reason: 'Business context available',
    },
  ];

  // Find the highest priority rule that matches
  const matchingRule = rules
    .filter(rule => rule.condition(conversation))
    .sort((a, b) => a.priority - b.priority)[0];

  if (matchingRule) {
    return {
      contextType: matchingRule.contextType,
      shouldShow: true,
      confidence: 0.9,
      reason: matchingRule.reason,
    };
  }

  // Default to communication context
  return {
    contextType: 'communication',
    shouldShow: true,
    confidence: 0.5,
    reason: 'Default communication context',
  };
};

// =============================================================================
// RESPONSIVE LAYOUT CONFIGURATIONS
// =============================================================================

const getLayoutConfigs = (): Record<Breakpoint, PanelLayoutConfig> => ({
  desktop: {
    breakpoint: 'desktop',
    leftPanel: {
      width: 400,
      visible: true,
      position: 'relative',
    },
    middlePanel: {
      width: 'flex',
      visible: true,
    },
    rightPanel: {
      width: 420,
      visible: true,
      position: 'relative',
      overlay: false,
    },
  },
  tablet: {
    breakpoint: 'tablet',
    leftPanel: {
      width: 360,
      visible: true,
      position: 'relative',
    },
    middlePanel: {
      width: 'flex',
      visible: true,
    },
    rightPanel: {
      width: 380,
      visible: true,
      position: 'relative',
      overlay: false,
    },
  },
  mobile: {
    breakpoint: 'mobile',
    leftPanel: {
      width: 100,
      visible: false,
      position: 'fixed',
    },
    middlePanel: {
      width: 'flex',
      visible: true,
    },
    rightPanel: {
      width: 100,
      visible: false,
      position: 'fixed',
      overlay: true,
    },
  },
});

// =============================================================================
// ZUSTAND STORE
// =============================================================================

export const useContextPanel = create<ContextPanelStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        currentBreakpoint: 'desktop',

        // Actions
        setVisibility: (visible: boolean) =>
          set(
            state => ({
              isVisible: visible,
              userPreferences: {
                ...state.userPreferences,
                defaultVisibility: visible,
              },
            }),
            false,
            'setVisibility'
          ),

        toggleVisibility: () =>
          set(
            state => ({
              isVisible: !state.isVisible,
            }),
            false,
            'toggleVisibility'
          ),

        setCollapsed: (collapsed: boolean) =>
          set(
            state => ({
              isCollapsed: collapsed,
            }),
            false,
            'setCollapsed'
          ),

        toggleCollapsed: () =>
          set(
            state => ({
              isCollapsed: !state.isCollapsed,
            }),
            false,
            'toggleCollapsed'
          ),

        setActiveContext: (context: ContextPanelType) =>
          set(
            state => ({
              activeContext: context,
              userPreferences: {
                ...state.userPreferences,
                preferredContext: context,
              },
            }),
            false,
            'setActiveContext'
          ),

        setLoading: (loading: boolean) => set({ isLoading: loading }, false, 'setLoading'),

        setError: (error: string | null) => set({ error }, false, 'setError'),

        updateUserPreferences: preferences =>
          set(
            state => ({
              userPreferences: {
                ...state.userPreferences,
                ...preferences,
              },
            }),
            false,
            'updateUserPreferences'
          ),

        // Context detection
        detectContext: (conversation: Conversation) => {
          return detectContextType(conversation);
        },

        autoSwitchContext: (conversation: Conversation) => {
          const detection = detectContextType(conversation);
          const state = get();

          // Only auto-switch if confidence is high and context is different
          if (detection.confidence > 0.7 && detection.contextType !== state.activeContext) {
            set(
              {
                activeContext: detection.contextType,
                isVisible: detection.shouldShow,
              },
              false,
              'autoSwitchContext'
            );
          }
        },

        // Responsive design
        setBreakpoint: (breakpoint: Breakpoint) =>
          set({ currentBreakpoint: breakpoint }, false, 'setBreakpoint'),

        getLayoutConfig: () => {
          const state = get();
          const configs = getLayoutConfigs();
          return configs[state.currentBreakpoint];
        },

        // Reset
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'context-panel-store',
        partialize: state => ({
          userPreferences: state.userPreferences,
          isVisible: state.userPreferences.defaultVisibility,
          // Don't persist isCollapsed to avoid state conflicts
        }),
      }
    ),
    {
      name: 'context-panel-store',
    }
  )
);

// =============================================================================
// HOOK FOR BREAKPOINT DETECTION
// =============================================================================

export const useBreakpointDetection = () => {
  const setBreakpoint = useContextPanel(state => state.setBreakpoint);

  const detectBreakpoint = (width: number): Breakpoint => {
    if (width < 768) return 'mobile';
    if (width < 1200) return 'tablet';
    return 'desktop';
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const breakpoint = detectBreakpoint(width);
    setBreakpoint(breakpoint);
  };

  return {
    detectBreakpoint,
    handleResize,
  };
};

// =============================================================================
// HOOK FOR CONTEXT DETECTION
// =============================================================================

export const useContextDetection = (conversation: Conversation | null) => {
  const detectContext = useContextPanel(state => state.detectContext);
  const autoSwitchContext = useContextPanel(state => state.autoSwitchContext);

  const detection = conversation ? detectContext(conversation) : null;

  const triggerAutoSwitch = () => {
    if (conversation) {
      autoSwitchContext(conversation);
    }
  };

  return {
    detection,
    triggerAutoSwitch,
  };
};

// =============================================================================
// HOOK FOR PANEL LAYOUT
// =============================================================================

export const usePanelLayout = () => {
  const currentBreakpoint = useContextPanel(state => state.currentBreakpoint);
  const getLayoutConfig = useContextPanel(state => state.getLayoutConfig);
  const isVisible = useContextPanel(state => state.isVisible);
  const isCollapsed = useContextPanel(state => state.isCollapsed);

  const layoutConfig = getLayoutConfig();

  // Adjust layout based on panel state
  const adjustedConfig: PanelLayoutConfig = {
    ...layoutConfig,
    rightPanel: {
      ...layoutConfig.rightPanel,
      visible: isVisible && !isCollapsed,
    },
  };

  return {
    breakpoint: currentBreakpoint,
    layoutConfig: adjustedConfig,
    isVisible,
    isCollapsed,
  };
};
