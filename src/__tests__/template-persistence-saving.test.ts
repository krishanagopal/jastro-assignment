import { beforeEach, describe, expect, it } from 'vitest';
import { FLOWITH_TEMPLATE } from '../data/flowithTemplate';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { APEX_AI_WORKFLOWS_STARTER, FLOWITH_AUTOMATION_STARTER } from '../data/starterTemplates';
import { useTemplateStore } from '../state/templateStore';
import {
  loadActiveTemplateId,
  loadPersistedTemplate,
  removePersistedTemplate,
  saveActiveTemplateId,
} from '../utils/templatePersistence';

describe('Template Saving, Persistence & Initial Selection System', () => {
  beforeEach(() => {
    useTemplateStore.getState().resetToInitialState();
    removePersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    removePersistedTemplate(FLOWITH_AUTOMATION_STARTER.id);
    saveActiveTemplateId(null);
  });

  it('starts without an active template when activeTemplateId is null', () => {
    const store = useTemplateStore.getState();
    expect(store.activeTemplateId).toBeNull();
    expect(store.isDirty).toBe(false);
    expect(store.savedTemplateSnapshot).toBeNull();
  });

  it('initializes clean active template and saved snapshot upon selecting a template', () => {
    const success = useTemplateStore.getState().selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    expect(success).toBe(true);

    const store = useTemplateStore.getState();
    expect(store.activeTemplateId).toBe(APEX_AI_WORKFLOWS_STARTER.id);
    expect(store.isDirty).toBe(false);
    expect(store.savedTemplateSnapshot).not.toBeNull();
    expect(store.canonicalTemplate.elements['hero-title']).toBeDefined();
    expect(loadActiveTemplateId()).toBe(APEX_AI_WORKFLOWS_STARTER.id);
  });

  it('marks isDirty true deterministically on edit command and false on save', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    const heroTitleId = 'hero-title';

    expect(useTemplateStore.getState().isDirty).toBe(false);

    // Make an edit command
    const edited = store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          content: { text: 'Customized Apex Title' },
        },
      },
    });

    expect(edited).toBe(true);
    expect(useTemplateStore.getState().isDirty).toBe(true);

    // Save changes
    useTemplateStore.getState().saveCurrentTemplateChanges();

    expect(useTemplateStore.getState().isDirty).toBe(false);
    const saved = loadPersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    expect(saved).not.toBeNull();
    expect(saved?.elements[heroTitleId].baseProperties.content?.text).toBe('Customized Apex Title');
  });

  it('does NOT trigger isDirty on element selection, viewport switching, or UI state changes', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);

    expect(useTemplateStore.getState().isDirty).toBe(false);

    // Selection change
    store.selectElement('hero-title');
    expect(useTemplateStore.getState().isDirty).toBe(false);

    // Viewport change
    store.setActiveViewport('mobile');
    expect(useTemplateStore.getState().isDirty).toBe(false);

    // Scope change
    store.setActiveEditScope('desktop');
    expect(useTemplateStore.getState().isDirty).toBe(false);
  });

  it('blocks accidental template switching when isDirty is true', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);

    // Edit to trigger dirty state
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Unsaved Apex Edit' },
        },
      },
    });

    expect(useTemplateStore.getState().isDirty).toBe(true);

    // Attempt to switch without forcing
    const switchSuccess = useTemplateStore.getState().selectActiveTemplate(FLOWITH_AUTOMATION_STARTER.id);
    expect(switchSuccess).toBe(false);
    expect(useTemplateStore.getState().pendingSwitchTemplateId).toBe(FLOWITH_AUTOMATION_STARTER.id);
    expect(useTemplateStore.getState().activeTemplateId).toBe(APEX_AI_WORKFLOWS_STARTER.id);

    // Discard unsaved changes and complete switch
    useTemplateStore.getState().discardUnsavedChanges();
    expect(useTemplateStore.getState().activeTemplateId).toBe(FLOWITH_AUTOMATION_STARTER.id);
    expect(useTemplateStore.getState().isDirty).toBe(false);
  });

  it('resets template to original immutable seed upon reset action', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);

    // Make and save edits
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Edited Apex Title' },
        },
      },
    });
    store.saveCurrentTemplateChanges();

    expect(loadPersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id)).not.toBeNull();

    // Reset template
    store.resetCurrentTemplateToSeed(APEX_AI_WORKFLOWS_STARTER.id);

    expect(loadPersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id)).toBeNull();
    const currentModel = useTemplateStore.getState().canonicalTemplate;
    expect(currentModel.elements['hero-title'].baseProperties.content?.text).toBe(
      INITIAL_TEMPLATE.elements['hero-title'].baseProperties.content?.text
    );
    expect(useTemplateStore.getState().isDirty).toBe(false);
  });

  it('maintains 100% isolation between ApexAI and Flowith saved customizations', () => {
    const store = useTemplateStore.getState();

    // Edit & Save ApexAI
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Apex Unique Headline' },
        },
      },
    });
    store.saveCurrentTemplateChanges();

    // Edit & Save Flowith
    store.selectActiveTemplate(FLOWITH_AUTOMATION_STARTER.id, true);
    store.executeCommand({
      source: 'canvas',
      targetIds: ['flowith-hero-title'],
      viewportScope: 'all',
      changes: {
        ['flowith-hero-title']: {
          content: { text: 'Flowith Unique Headline' },
        },
      },
    });
    store.saveCurrentTemplateChanges();

    // Verify localStorage isolation
    const apexSaved = loadPersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    const flowithSaved = loadPersistedTemplate(FLOWITH_AUTOMATION_STARTER.id);

    expect(apexSaved?.elements['hero-title'].baseProperties.content?.text).toBe('Apex Unique Headline');
    expect(flowithSaved?.elements['flowith-hero-title'].baseProperties.content?.text).toBe('Flowith Unique Headline');
  });

  it('preserves immutable starter seed data definitions', () => {
    const initialApexTitle = INITIAL_TEMPLATE.elements['hero-title'].baseProperties.content?.text;
    const initialFlowithTitle = FLOWITH_TEMPLATE.elements['flowith-hero-title'].baseProperties.content?.text;

    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Mutated Canvas Title' },
        },
      },
    });
    store.saveCurrentTemplateChanges();

    expect(INITIAL_TEMPLATE.elements['hero-title'].baseProperties.content?.text).toBe(initialApexTitle);
    expect(FLOWITH_TEMPLATE.elements['flowith-hero-title'].baseProperties.content?.text).toBe(initialFlowithTitle);
  });
});
