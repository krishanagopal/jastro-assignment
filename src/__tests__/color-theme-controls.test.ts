import { beforeEach, describe, expect, it } from 'vitest';
import { resolveElementProperties } from '../engine/resolution';
import { validateEditCommand, isValidCssColorString } from '../engine/validation';
import { useTemplateStore } from '../state/templateStore';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';

describe('Professional Color & Theme Customization System', () => {
  beforeEach(() => {
    useTemplateStore.getState().resetToInitialState();
  });

  it('validates supported CSS color formats correctly and rejects invalid values', () => {
    expect(isValidCssColorString('#fff')).toBe(true);
    expect(isValidCssColorString('#0f172a')).toBe(true);
    expect(isValidCssColorString('#0f172aff')).toBe(true);
    expect(isValidCssColorString('rgb(255, 0, 0)')).toBe(true);
    expect(isValidCssColorString('rgba(0, 0, 0, 0.5)')).toBe(true);
    expect(isValidCssColorString('transparent')).toBe(true);
    expect(isValidCssColorString('inherit')).toBe(true);
    expect(isValidCssColorString('currentColor')).toBe(true);

    expect(isValidCssColorString('invalid-color')).toBe(false);
    expect(isValidCssColorString('#12345')).toBe(false);
    expect(isValidCssColorString('javascript:alert(1)')).toBe(false);
  });

  it('rejects invalid color inputs in validateEditCommand without corrupting state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';
    const version = store.canonicalTemplate.version;

    const invalidCommand = {
      id: 'cmd_invalid_color',
      timestamp: Date.now(),
      source: 'canvas' as const,
      targetIds: [heroTitleId],
      viewportScope: 'all' as const,
      baseRevision: version,
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: 'not-a-color-string',
          },
        },
      },
    };

    const validation = validateEditCommand(invalidCommand, store.canonicalTemplate, [heroTitleId]);
    expect(validation.valid).toBe(false);
    expect(validation.errors[0]).toContain('Invalid color format');

    // Executing invalid command should fail
    const success = store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: 'not-a-color-string',
          },
        },
      },
    });

    expect(success).toBe(false);
    expect(useTemplateStore.getState().lastValidationError).toContain('Invalid color format');
  });

  it('updates background, text, and border colors through the command pipeline', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    const success = store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#0c0d12',
            color: '#6366f1',
            borderColor: '#303030',
          },
        },
      },
    });

    expect(success).toBe(true);

    const updatedElement = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];
    expect(updatedElement.baseProperties.style?.backgroundColor).toBe('#0c0d12');
    expect(updatedElement.baseProperties.style?.color).toBe('#6366f1');
    expect(updatedElement.baseProperties.style?.borderColor).toBe('#303030');

    // Canvas resolution check
    const resolved = resolveElementProperties(updatedElement, 'desktop');
    expect(resolved.style?.backgroundColor).toBe('#0c0d12');
    expect(resolved.style?.color).toBe('#6366f1');
    expect(resolved.style?.borderColor).toBe('#303030');
  });

  it('supports rgb, rgba, and transparent color formats in canonical state and rendering', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            color: 'rgb(248, 250, 252)',
            borderColor: 'transparent',
          },
        },
      },
    });

    const updatedElement = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];
    expect(updatedElement.baseProperties.style?.backgroundColor).toBe('rgba(15, 23, 42, 0.8)');
    expect(updatedElement.baseProperties.style?.color).toBe('rgb(248, 250, 252)');
    expect(updatedElement.baseProperties.style?.borderColor).toBe('transparent');
  });

  it('applies Quick Theme Presets through the command pipeline to selected element', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    // Apply "Slate Dark" preset (#0f172a bg, #f8fafc text)
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#0f172a',
            color: '#f8fafc',
          },
        },
      },
    });

    const element = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];
    expect(element.baseProperties.style?.backgroundColor).toBe('#0f172a');
    expect(element.baseProperties.style?.color).toBe('#f8fafc');
  });

  it('performs individual color resets without modifying unrelated color properties', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    // Set initial colors
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#111111',
            color: '#ffffff',
            borderColor: '#333333',
          },
        },
      },
    });

    // Reset only Background Color
    store.executeCommand({
      source: 'restore',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: undefined,
          },
        },
      },
    });

    const elementAfterReset = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];
    expect(elementAfterReset.baseProperties.style?.backgroundColor).toBeUndefined();
    expect(elementAfterReset.baseProperties.style?.color).toBe('#ffffff');
    expect(elementAfterReset.baseProperties.style?.borderColor).toBe('#333333');
  });

  it('performs Reset Theme Colors for active scope while preserving typography, spacing, and layout', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    // Set typography, spacing, layout, and theme colors
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            fontSize: '48px',
            fontWeight: '700',
            padding: '32px',
            backgroundColor: '#181924',
            color: '#ffffff',
            borderColor: '#444444',
          },
        },
      },
    });

    // Execute Reset Theme Colors
    store.executeCommand({
      source: 'restore',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: undefined,
            color: undefined,
            borderColor: undefined,
          },
        },
      },
    });

    const elementAfterReset = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];

    // Theme colors cleared
    expect(elementAfterReset.baseProperties.style?.backgroundColor).toBeUndefined();
    expect(elementAfterReset.baseProperties.style?.color).toBeUndefined();
    expect(elementAfterReset.baseProperties.style?.borderColor).toBeUndefined();

    // Typography & spacing 100% preserved
    expect(elementAfterReset.baseProperties.style?.fontSize).toBe('48px');
    expect(elementAfterReset.baseProperties.style?.fontWeight).toBe('700');
    expect(elementAfterReset.baseProperties.style?.padding).toBe('32px');
  });

  it('isolates responsive viewport color overrides and inherits Base color cleanly when reset', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    // Set Base background color
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#000000',
          },
        },
      },
    });

    // Set Mobile override background color
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'mobile',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#ffffff',
          },
        },
      },
    });

    const element = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];

    // Desktop/Base resolution gets #000000
    expect(resolveElementProperties(element, 'desktop').style?.backgroundColor).toBe('#000000');

    // Mobile resolution gets #ffffff
    expect(resolveElementProperties(element, 'mobile').style?.backgroundColor).toBe('#ffffff');

    // Reset Mobile background color override
    store.executeCommand({
      source: 'restore',
      targetIds: [heroTitleId],
      viewportScope: 'mobile',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: undefined,
          },
        },
      },
    });

    const elementAfterReset = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];

    // Mobile override property is cleared
    expect(elementAfterReset.viewportOverrides['mobile']?.style?.backgroundColor).toBeUndefined();

    // Mobile resolution cleanly inherits Base background color (#000000)
    expect(resolveElementProperties(elementAfterReset, 'mobile').style?.backgroundColor).toBe('#000000');
  });

  it('records revision history entries for color changes and supports recovery', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#6366f1',
          },
        },
      },
    });

    const history = useTemplateStore.getState().historyLog;
    expect(history.length).toBeGreaterThan(0);
    const latest = history[0];
    expect(latest.elementId).toBe(heroTitleId);
    expect(latest.nextState.style?.backgroundColor).toBe('#6366f1');

    // Restore previous revision
    store.restoreRevision(latest);
    const restoredElement = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];
    expect(restoredElement.baseProperties.style?.backgroundColor).not.toBe('#6366f1');
  });

  it('preserves starter template seed data immutability', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            backgroundColor: '#ff0000',
          },
        },
      },
    });

    // Seed object INITIAL_TEMPLATE must remain untouched
    expect(INITIAL_TEMPLATE.elements[heroTitleId].baseProperties.style?.backgroundColor).not.toBe('#ff0000');
  });
});
