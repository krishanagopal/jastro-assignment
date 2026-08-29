import { create } from 'zustand';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { APEX_AI_WORKFLOWS_STARTER, FLOWITH_AUTOMATION_STARTER, StarterTemplate } from '../data/starterTemplates';
import { applyScopePatchToElement } from '../engine/resolution';

import {
  EditCommand,
  Proposal,
  RevisionHistoryEntry,
  TemplateElement,
  TemplateModel,
  TemplatePage,
  ViewportScope,
} from '../types/template';

import { validateEditCommand } from '../engine/validation';
import {
  loadActiveTemplateId,
  loadPersistedTemplate,
  removePersistedTemplate,
  saveActiveTemplateId,
  savePersistedTemplate,
} from '../utils/templatePersistence';

const LOCAL_STORAGE_KEY = 'scoped_ai_template_model_v1';
const HISTORY_STORAGE_KEY = 'scoped_ai_template_history_v1';

const INITIAL_PAGES: Record<string, TemplatePage> = {
  home: {
    id: 'home',
    name: 'Home Page',
    slug: '/',
    elements: INITIAL_TEMPLATE.elements,
  },
};

export function getSeedTemplateById(id: string): StarterTemplate {
  if (id === 'flowith-automation' || id === 'flowith') {
    return FLOWITH_AUTOMATION_STARTER;
  }
  return APEX_AI_WORKFLOWS_STARTER;
}

function computeIsDirty(template: TemplateModel, snapshot: TemplateModel | null): boolean {
  if (!snapshot) return false;
  return JSON.stringify(template.elements) !== JSON.stringify(snapshot.elements);
}

interface TemplateState {
  // Canonical State & UI State
  canonicalTemplate: TemplateModel;
  pages: Record<string, TemplatePage>;
  activePageId: string;
  selectedElementIds: string[];
  activeViewport: 'desktop' | 'tablet' | 'mobile';
  activeEditScope: ViewportScope;
  pendingProposals: Proposal[];
  historyLog: RevisionHistoryEntry[];
  lastValidationError: string | null;

  // New Persistence & Onboarding State
  activeTemplateId: string | null;
  savedTemplateSnapshot: TemplateModel | null;
  isDirty: boolean;
  pendingSwitchTemplateId: string | null;

  // Actions
  selectElement: (id: string, multiSelect?: boolean) => void;
  setSelectedElements: (ids: string[]) => void;
  clearSelection: () => void;
  setActiveViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  setActiveEditScope: (scope: ViewportScope) => void;
  setActivePage: (pageId: string) => void;
  addPage: (name: string, slug: string) => void;
  executeCommand: (command: Omit<EditCommand, 'id' | 'timestamp' | 'baseRevision'>) => boolean;
  setPendingProposals: (proposals: Proposal[]) => void;
  acceptProposal: (proposalId: string) => boolean;
  rejectProposal: (proposalId: string) => void;
  restoreRevision: (historyEntry: RevisionHistoryEntry) => boolean;
  loadStarterTemplate: (starter: { templateModel: TemplateModel; pages: Record<string, TemplatePage> }) => void;
  resetToInitialState: () => void;
  clearValidationError: () => void;
  addElement: (element: TemplateElement) => void;

  // New Persistence Actions
  selectActiveTemplate: (templateId: string, force?: boolean) => boolean;
  saveCurrentTemplateChanges: () => void;
  discardUnsavedChanges: () => void;
  clearPendingSwitchTemplate: () => void;
  resetCurrentTemplateToSeed: (templateId: string) => void;
}

function loadInitialState(): {
  activeTemplateId: string | null;
  template: TemplateModel;
  snapshot: TemplateModel | null;
  pages: Record<string, TemplatePage>;
  history: RevisionHistoryEntry[];
} {
  try {
    const activeId = loadActiveTemplateId();
    if (activeId) {
      const saved = loadPersistedTemplate(activeId);
      const seed = getSeedTemplateById(activeId);
      const template = saved
        ? JSON.parse(JSON.stringify(saved))
        : JSON.parse(JSON.stringify(seed.templateModel));
      const snapshot = JSON.parse(JSON.stringify(template));
      return {
        activeTemplateId: activeId,
        template,
        snapshot,
        pages: seed.pages,
        history: [],
      };
    }
  } catch (err) {
    console.error('Failed to load saved state from localStorage:', err);
  }
  return {
    activeTemplateId: null,
    template: INITIAL_TEMPLATE,
    snapshot: null,
    pages: INITIAL_PAGES,
    history: [],
  };
}

export const useTemplateStore = create<TemplateState>((set, get) => {
  const initial = loadInitialState();

  return {
    canonicalTemplate: initial.template,
    pages: initial.pages,
    activePageId: 'home',
    selectedElementIds: [],
    activeViewport: 'desktop',
    activeEditScope: 'all',
    pendingProposals: [],
    historyLog: initial.history,
    lastValidationError: null,

    activeTemplateId: initial.activeTemplateId,
    savedTemplateSnapshot: initial.snapshot,
    isDirty: false,
    pendingSwitchTemplateId: null,

    selectElement: (id: string, multiSelect = false) => {
      set((state) => {
        if (!state.canonicalTemplate.elements[id]) return state;
        if (multiSelect) {
          const alreadySelected = state.selectedElementIds.includes(id);
          const nextSelection = alreadySelected
            ? state.selectedElementIds.filter((item) => item !== id)
            : [...state.selectedElementIds, id];
          return { selectedElementIds: nextSelection };
        }
        return { selectedElementIds: [id] };
      });
    },

    setSelectedElements: (ids: string[]) => {
      const { canonicalTemplate } = get();
      const validIds = ids.filter((id) => Boolean(canonicalTemplate.elements[id]));
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

    setActivePage: (pageId) => {
      set({ activePageId: pageId });
    },

    addPage: (name, slug) => {
      const pageId = `page_${Date.now()}`;
      set((state) => ({
        pages: {
          ...state.pages,
          [pageId]: {
            id: pageId,
            name,
            slug,
            elements: { ...state.canonicalTemplate.elements },
          },
        },
        activePageId: pageId,
      }));
    },

    clearValidationError: () => {
      set({ lastValidationError: null });
    },

    addElement: (element) => {
      set((state) => {
        const updatedElements = {
          ...state.canonicalTemplate.elements,
          [element.id]: element,
        };

        const updatedTemplate: TemplateModel = {
          ...state.canonicalTemplate,
          version: state.canonicalTemplate.version + 1,
          elements: updatedElements,
        };

        const nextIsDirty = computeIsDirty(updatedTemplate, state.savedTemplateSnapshot);

        return {
          canonicalTemplate: updatedTemplate,
          selectedElementIds: [element.id],
          isDirty: nextIsDirty,
        };
      });
    },

    executeCommand: (cmdData) => {
      const { canonicalTemplate, historyLog, pages, activePageId, savedTemplateSnapshot } = get();

      const fullCommand: EditCommand = {
        ...cmdData,
        id: `cmd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        baseRevision: canonicalTemplate.version,
      };

      const structValidation = validateEditCommand(fullCommand, canonicalTemplate);
      if (!structValidation.valid) {
        set({ lastValidationError: structValidation.errors.join(', ') });
        return false;
      }

      const newElements: Record<string, TemplateElement> = { ...canonicalTemplate.elements };
      const newHistoryEntries: RevisionHistoryEntry[] = [];

      for (const targetId of fullCommand.targetIds) {
        const targetElement = newElements[targetId];
        const patch = fullCommand.changes[targetId];
        if (!targetElement || !patch) continue;

        const previousState =
          fullCommand.viewportScope === 'all'
            ? { ...targetElement.baseProperties }
            : { ...(targetElement.viewportOverrides[fullCommand.viewportScope] || {}) };

        const updatedElement = applyScopePatchToElement(
          targetElement,
          fullCommand.viewportScope,
          patch,
          fullCommand.source === 'restore'
        );

        newElements[targetId] = updatedElement;

        const isRestoreAction = fullCommand.source === 'restore';
        const actionType =
          fullCommand.source === 'ai'
            ? 'ai_accepted'
            : fullCommand.source === 'restore'
            ? 'restore'
            : 'manual';
        const desc = isRestoreAction
          ? `Restored properties for element "${targetElement.label}" (${fullCommand.viewportScope})`
          : `Updated properties for element "${targetElement.label}" (${fullCommand.viewportScope})`;

        newHistoryEntries.push({
          id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          timestamp: Date.now(),
          elementId: targetId,
          viewportScope: fullCommand.viewportScope,
          revision: canonicalTemplate.version + 1,
          previousState,
          nextState: patch,
          actionType,
          description: desc,
        });
      }

      const updatedTemplate: TemplateModel = {
        ...canonicalTemplate,
        version: canonicalTemplate.version + 1,
        elements: newElements,
      };

      const updatedPages = { ...pages };
      if (activePageId === 'preview-all') {
        for (const pageId in updatedPages) {
          const page = updatedPages[pageId];
          let pageUpdated = false;
          const nextElements = { ...page.elements };
          for (const targetId of fullCommand.targetIds) {
            if (newElements[targetId]) {
              nextElements[targetId] = newElements[targetId];
              pageUpdated = true;
            }
          }
          if (pageUpdated) {
            updatedPages[pageId] = { ...page, elements: nextElements };
          }
        }
      } else if (pages[activePageId]) {
        updatedPages[activePageId] = {
          ...pages[activePageId],
          elements: newElements,
        };
      }

      const updatedHistory = [...newHistoryEntries, ...historyLog];
      const nextIsDirty = computeIsDirty(updatedTemplate, savedTemplateSnapshot);

      set({
        canonicalTemplate: updatedTemplate,
        pages: updatedPages,
        historyLog: updatedHistory,
        lastValidationError: null,
        isDirty: nextIsDirty,
      });

      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTemplate));
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
        }
      } catch (err) {
        console.error('Failed to persist template to localStorage:', err);
      }

      return true;
    },

    setPendingProposals: (proposals) => {
      set({ pendingProposals: proposals });
    },

    acceptProposal: (proposalId) => {
      const { pendingProposals, executeCommand } = get();
      const proposal = pendingProposals.find((p) => p.id === proposalId);
      if (!proposal) return false;

      const success = executeCommand({
        source: 'ai',
        targetIds: [proposal.elementId],
        viewportScope: proposal.viewportScope,
        changes: {
          [proposal.elementId]: proposal.proposedPatch,
        },
      });

      if (success) {
        set((state) => ({
          pendingProposals: state.pendingProposals.map((p) =>
            p.id === proposalId ? { ...p, status: 'accepted' } : p
          ),
        }));
      }
      return success;
    },

    rejectProposal: (proposalId) => {
      set((state) => ({
        pendingProposals: state.pendingProposals.map((p) =>
          p.id === proposalId ? { ...p, status: 'rejected' } : p
        ),
      }));
    },

    restoreRevision: (historyEntry) => {
      const { executeCommand } = get();
      const success = executeCommand({
        source: 'restore',
        targetIds: [historyEntry.elementId],
        viewportScope: historyEntry.viewportScope,
        changes: {
          [historyEntry.elementId]: historyEntry.previousState,
        },
      });
      return success;
    },

    loadStarterTemplate: (starter) => {
      set({
        canonicalTemplate: starter.templateModel,
        pages: starter.pages,
        activePageId: 'home',
        selectedElementIds: [],
        historyLog: [],
        pendingProposals: [],
        lastValidationError: null,
      });
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(starter.templateModel));
        }
      } catch (e) {
        console.error('Failed to save template to localStorage:', e);
      }
    },

    resetToInitialState: () => {
      set({
        canonicalTemplate: INITIAL_TEMPLATE,
        pages: INITIAL_PAGES,
        activePageId: 'home',
        selectedElementIds: [],
        historyLog: [],
        pendingProposals: [],
        lastValidationError: null,
        activeTemplateId: null,
        savedTemplateSnapshot: null,
        isDirty: false,
        pendingSwitchTemplateId: null,
      });
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          localStorage.removeItem(HISTORY_STORAGE_KEY);
        }
        saveActiveTemplateId(null);
      } catch (e) {
        console.error('Failed to clear localStorage:', e);
      }
    },

    // New Persistence & Onboarding Actions
    selectActiveTemplate: (templateId: string, force = false) => {
      const { isDirty } = get();
      if (isDirty && !force) {
        set({ pendingSwitchTemplateId: templateId });
        return false;
      }

      const saved = loadPersistedTemplate(templateId);
      const seed = getSeedTemplateById(templateId);
      const loadedModel = saved
        ? JSON.parse(JSON.stringify(saved))
        : JSON.parse(JSON.stringify(seed.templateModel));
      const snapshot = JSON.parse(JSON.stringify(loadedModel));

      set({
        activeTemplateId: seed.id,
        canonicalTemplate: loadedModel,
        savedTemplateSnapshot: snapshot,
        pages: seed.pages,
        activePageId: 'home',
        selectedElementIds: [],
        historyLog: [],
        pendingProposals: [],
        isDirty: false,
        pendingSwitchTemplateId: null,
      });

      saveActiveTemplateId(seed.id);
      return true;
    },

    saveCurrentTemplateChanges: () => {
      const { activeTemplateId, canonicalTemplate } = get();
      if (!activeTemplateId) return;

      savePersistedTemplate(activeTemplateId, canonicalTemplate);
      const snapshot = JSON.parse(JSON.stringify(canonicalTemplate));
      set({
        savedTemplateSnapshot: snapshot,
        isDirty: false,
      });
    },

    discardUnsavedChanges: () => {
      const { savedTemplateSnapshot, pendingSwitchTemplateId, selectActiveTemplate } = get();
      if (savedTemplateSnapshot) {
        set({
          canonicalTemplate: JSON.parse(JSON.stringify(savedTemplateSnapshot)),
          isDirty: false,
          pendingSwitchTemplateId: null,
        });
      }
      if (pendingSwitchTemplateId) {
        selectActiveTemplate(pendingSwitchTemplateId, true);
      }
    },

    clearPendingSwitchTemplate: () => {
      set({ pendingSwitchTemplateId: null });
    },

    resetCurrentTemplateToSeed: (templateId: string) => {
      removePersistedTemplate(templateId);
      const seed = getSeedTemplateById(templateId);
      const cleanSeedModel = JSON.parse(JSON.stringify(seed.templateModel));
      const { activeTemplateId } = get();

      if (activeTemplateId === seed.id || activeTemplateId === templateId) {
        set({
          canonicalTemplate: cleanSeedModel,
          savedTemplateSnapshot: JSON.parse(JSON.stringify(cleanSeedModel)),
          pages: seed.pages,
          isDirty: false,
          selectedElementIds: [],
          historyLog: [],
        });
      }
    },
  };
});
