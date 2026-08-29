import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FLOWITH_TEMPLATE } from '../data/flowithTemplate';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { APEX_AI_WORKFLOWS_STARTER, FLOWITH_AUTOMATION_STARTER } from '../data/starterTemplates';
import { useTemplateStore } from '../state/templateStore';
import { loadPersistedTemplate, removePersistedTemplate, saveActiveTemplateId } from '../utils/templatePersistence';

describe('Back to Landing Page & Unsaved Changes Protection', () => {
  beforeEach(() => {
    useTemplateStore.getState().resetToInitialState();
    removePersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    removePersistedTemplate(FLOWITH_AUTOMATION_STARTER.id);
    saveActiveTemplateId(null);
  });

  it('allows immediate navigation when isDirty is false', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);

    expect(useTemplateStore.getState().isDirty).toBe(false);

    const onGoToLanding = vi.fn();
    if (!useTemplateStore.getState().isDirty) {
      onGoToLanding();
    }

    expect(onGoToLanding).toHaveBeenCalledTimes(1);
  });

  it('triggers dirty state on edits and allows Save & Leave workflow', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    const heroTitleId = 'hero-title';

    // Make edit
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          content: { text: 'Headline For Save & Leave' },
        },
      },
    });

    expect(useTemplateStore.getState().isDirty).toBe(true);

    const onGoToLanding = vi.fn();

    // Simulate Save & Leave
    useTemplateStore.getState().saveCurrentTemplateChanges();
    expect(useTemplateStore.getState().isDirty).toBe(false);
    onGoToLanding();

    expect(onGoToLanding).toHaveBeenCalledTimes(1);
    const saved = loadPersistedTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    expect(saved?.elements[heroTitleId].baseProperties.content?.text).toBe('Headline For Save & Leave');
  });

  it('allows Discard & Leave workflow restoring saved snapshot', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    const initialText = store.canonicalTemplate.elements['hero-title'].baseProperties.content?.text;

    // Make unsaved edit
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Unsaved Heading To Discard' },
        },
      },
    });

    expect(useTemplateStore.getState().isDirty).toBe(true);

    const onGoToLanding = vi.fn();

    // Simulate Discard & Leave
    useTemplateStore.getState().discardUnsavedChanges();
    expect(useTemplateStore.getState().isDirty).toBe(false);
    expect(useTemplateStore.getState().canonicalTemplate.elements['hero-title'].baseProperties.content?.text).toBe(
      initialText
    );
    onGoToLanding();

    expect(onGoToLanding).toHaveBeenCalledTimes(1);
  });

  it('preserves unsaved state upon Cancel action', () => {
    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);

    // Make edit
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Kept Unsaved Title' },
        },
      },
    });

    expect(useTemplateStore.getState().isDirty).toBe(true);

    const onGoToLanding = vi.fn();

    // Simulate Cancel: do not call onGoToLanding, keep dirty state
    expect(useTemplateStore.getState().isDirty).toBe(true);
    expect(onGoToLanding).not.toHaveBeenCalled();
    expect(useTemplateStore.getState().canonicalTemplate.elements['hero-title'].baseProperties.content?.text).toBe(
      'Kept Unsaved Title'
    );
  });

  it('preserves starter template seed immutability throughout navigation', () => {
    const initialApex = INITIAL_TEMPLATE.elements['hero-title'].baseProperties.content?.text;
    const initialFlowith = FLOWITH_TEMPLATE.elements['flowith-hero-title'].baseProperties.content?.text;

    const store = useTemplateStore.getState();
    store.selectActiveTemplate(APEX_AI_WORKFLOWS_STARTER.id);
    store.executeCommand({
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      changes: {
        ['hero-title']: {
          content: { text: 'Edits before leaving' },
        },
      },
    });

    store.saveCurrentTemplateChanges();

    expect(INITIAL_TEMPLATE.elements['hero-title'].baseProperties.content?.text).toBe(initialApex);
    expect(FLOWITH_TEMPLATE.elements['flowith-hero-title'].baseProperties.content?.text).toBe(initialFlowith);
  });
});
