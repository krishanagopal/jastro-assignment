import { create } from 'zustand';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { commitEditCommand } from '../engine/commit';
import { validateEditCommand } from '../engine/validation';
import {
  EditCommand,
  Proposal,
  RevisionHistoryEntry,
  TemplateModel,
  ViewportScope,
} from '../types/template';

const LOCAL_STORAGE_KEY = 'scoped_ai_template_state_v1';
const HISTORY_STORAGE_KEY = 'scoped_ai_template_history_v1';

interface TemplateState {
  // Canonical State & UI State
  canonicalTemplate: TemplateModel;
  selectedElementIds: string[];
  activeViewport: 'desktop' | 'tablet' | 'mobile';
  activeEditScope: ViewportScope;
  pendingProposals: Proposal[];
  historyLog: RevisionHistoryEntry[];
  lastValidationError: string | null;

  // Actions
  selectElement: (id: string, multiSelect?: boolean) => void;
  setSelectedElements: (ids: string[]) => void;
  clearSelection: () => void;
  setActiveViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  setActiveEditScope: (scope: ViewportScope) => void;
  executeCommand: (command: Omit<EditCommand, 'id' | 'timestamp' | 'baseRevision'>) => boolean;
  setPendingProposals: (proposals: Proposal[]) => void;
  acceptProposal: (proposalId: string) => boolean;
  rejectProposal: (proposalId: string) => void;
  restoreRevision: (historyEntry: RevisionHistoryEntry) => boolean;
  resetToInitialState: () => void;
  clearValidationError: () => void;
}

function loadInitialState(): { template: TemplateModel; history: RevisionHistoryEntry[] } {
  try {
    const savedTemplate = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedTemplate) {
      const parsedTemplate = JSON.parse(savedTemplate);
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      return { template: parsedTemplate, history: parsedHistory };
    }
  } catch (err) {
    console.error('Failed to load saved state from localStorage:', err);
  }
  return { template: INITIAL_TEMPLATE, history: [] };
}

export const useTemplateStore = create<TemplateState>((set, get) => {
  const initial = loadInitialState();

  return {
    canonicalTemplate: initial.template,
    selectedElementIds: [],
    activeViewport: 'desktop',
    activeEditScope: 'all',
    pendingProposals: [],
    historyLog: initial.history,
    lastValidationError: null,

    selectElement: (id: string, multiSelect = false) => {
      const current = get().selectedElementIds;
      if (!get().canonicalTemplate.elements[id]) return;

      if (multiSelect) {
        if (current.includes(id)) {
          set({ selectedElementIds: current.filter((item) => item !== id) });
        } else {
          set({ selectedElementIds: [...current, id] });
        }
      } else {
        set({ selectedElementIds: [id] });
      }
    },

    setSelectedElements: (ids: string[]) => {
      const validIds = ids.filter((id) => !!get().canonicalTemplate.elements[id]);
      set({ selectedElementIds: validIds });
    },

    clearSelection: () => {
      set({ selectedElementIds: [] });
    },

    setActiveViewport: (viewport) => {
      set({ activeViewport: viewport });
    },

    setActiveEditScope: (scope) => {
      set({ activeEditScope: scope });
    },

    executeCommand: (partialCommand) => {
      const state = get().canonicalTemplate;
      const fullCommand: EditCommand = {
        ...partialCommand,
        id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: Date.now(),
        baseRevision: state.version,
      };

      const validation = validateEditCommand(
        fullCommand,
        state,
        get().selectedElementIds
      );

      if (!validation.valid) {
        set({ lastValidationError: validation.errors.join(' | ') });
        return false;
      }

      const { updatedModel, newHistoryEntries } = commitEditCommand(state, fullCommand);
      const updatedHistory = [...get().historyLog, ...newHistoryEntries];

      // Save to localStorage
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedModel));
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }

      set({
        canonicalTemplate: updatedModel,
        historyLog: updatedHistory,
        lastValidationError: null,
      });

      return true;
    },

    setPendingProposals: (proposals) => {
      set({ pendingProposals: proposals });
    },

    acceptProposal: (proposalId) => {
      const proposal = get().pendingProposals.find((p) => p.id === proposalId);
      if (!proposal || proposal.status !== 'pending') return false;

      const success = get().executeCommand({
        source: 'ai',
        targetIds: [proposal.elementId],
        viewportScope: proposal.viewportScope,
        changes: {
          [proposal.elementId]: proposal.proposedPatch,
        },
      });

      if (success) {
        set((prev) => ({
          pendingProposals: prev.pendingProposals.map((p) =>
            p.id === proposalId ? { ...p, status: 'accepted' } : p
          ),
        }));
      }

      return success;
    },

    rejectProposal: (proposalId) => {
      set((prev) => ({
        pendingProposals: prev.pendingProposals.map((p) =>
          p.id === proposalId ? { ...p, status: 'rejected' } : p
        ),
      }));
    },

    restoreRevision: (historyEntry) => {
      const success = get().executeCommand({
        source: 'restore',
        targetIds: [historyEntry.elementId],
        viewportScope: historyEntry.viewportScope,
        changes: {
          [historyEntry.elementId]: historyEntry.previousState,
        },
      });

      return success;
    },

    resetToInitialState: () => {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(HISTORY_STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear localStorage:', e);
      }

      set({
        canonicalTemplate: INITIAL_TEMPLATE,
        selectedElementIds: [],
        pendingProposals: [],
        historyLog: [],
        lastValidationError: null,
      });
    },

    clearValidationError: () => {
      set({ lastValidationError: null });
    },
  };
});
