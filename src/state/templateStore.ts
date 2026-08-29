import { create } from 'zustand';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
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
}

function loadInitialState(): { template: TemplateModel; pages: Record<string, TemplatePage>; history: RevisionHistoryEntry[] } {
  try {
    const savedTemplate = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedTemplate) {
      const parsedTemplate = JSON.parse(savedTemplate);
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      return { template: parsedTemplate, pages: INITIAL_PAGES, history: parsedHistory };
    }
  } catch (err) {
    console.error('Failed to load saved state from localStorage:', err);
  }
  return { template: INITIAL_TEMPLATE, pages: INITIAL_PAGES, history: [] };
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
      set({ selectedElementIds: ids });
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

    setActivePage: (pageId: string) => {
      const { pages, canonicalTemplate } = get();
      if (pageId === 'preview-all') {
        set({
          activePageId: 'preview-all',
          selectedElementIds: [],
        });
        return;
      }
      const targetPage = pages[pageId];
      if (!targetPage) return;

      const updatedTemplate: TemplateModel = {
        ...canonicalTemplate,
        elements: targetPage.elements,
      };

      set({
        activePageId: pageId,
        canonicalTemplate: updatedTemplate,
        selectedElementIds: [],
      });
    },

    addPage: (name: string, slug: string) => {
      const id = `page_${Date.now()}`;
      const newPage: TemplatePage = {
        id,
        name,
        slug: slug.startsWith('/') ? slug : `/${slug}`,
        elements: {
          [`${id}_hero`]: {
            id: `${id}_hero`,
            type: 'heading',
            label: `${name} Title`,
            baseProperties: {
              content: { text: `Welcome to ${name}` },
              style: { fontSize: '32px', color: '#ffffff', textAlign: 'center' },
              size: { width: '100%' },
              layout: { order: 1 },
            },
            viewportOverrides: {},
          },
        },
      };

      set((state) => {
        const nextPages = { ...state.pages, [id]: newPage };
        return {
          pages: nextPages,
          activePageId: id,
          canonicalTemplate: {
            ...state.canonicalTemplate,
            elements: newPage.elements,
          },
          selectedElementIds: [],
        };
      });
    },

    clearValidationError: () => {
      set({ lastValidationError: null });
    },

    addElement: (element: TemplateElement) => {
      const { canonicalTemplate, pages, activePageId } = get();
      const updatedElements = { ...canonicalTemplate.elements, [element.id]: element };
      const updatedTemplate = { ...canonicalTemplate, elements: updatedElements };

      const activePage = pages[activePageId];
      const updatedPages = activePage
        ? {
            ...pages,
            [activePageId]: {
              ...activePage,
              elements: updatedElements,
            },
          }
        : pages;

      set({
        canonicalTemplate: updatedTemplate,
        pages: updatedPages,
        selectedElementIds: [element.id],
      });

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTemplate));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    },

    executeCommand: (cmdData) => {
      const { canonicalTemplate, historyLog, pages, activePageId } = get();

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

        const updatedElement = applyScopePatchToElement(targetElement, fullCommand.viewportScope, patch);
        newElements[targetId] = updatedElement;

        const nextState =
          fullCommand.viewportScope === 'all'
            ? { ...updatedElement.baseProperties }
            : { ...(updatedElement.viewportOverrides[fullCommand.viewportScope] || {}) };

        const historyEntry: RevisionHistoryEntry = {
          id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          timestamp: Date.now(),
          elementId: targetId,
          viewportScope: fullCommand.viewportScope,
          revision: canonicalTemplate.version + 1,
          previousState,
          nextState,
          actionType: fullCommand.source === 'ai' ? 'ai_accepted' : 'manual',
          description: `Edit ${targetElement.label} (${fullCommand.viewportScope.toUpperCase()})`,
        };
        newHistoryEntries.push(historyEntry);
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

      set({
        canonicalTemplate: updatedTemplate,
        pages: updatedPages,
        historyLog: updatedHistory,
        lastValidationError: null,
      });

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTemplate));
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(starter.templateModel));
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
      });
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(HISTORY_STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear localStorage:', e);
      }
    },
  };
});
