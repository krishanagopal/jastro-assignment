import { beforeEach, describe, expect, it } from 'vitest';
import { useTemplateStore } from '../state/templateStore';
import { resolveElementProperties } from '../engine/resolution';

describe('Advanced Typography Controls & Pipeline Integration', () => {
  beforeEach(() => {
    useTemplateStore.getState().resetToInitialState();
  });

  it('updates font weight in canonical state via executeCommand', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { fontWeight: '700' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.fontWeight).toBe('700');
  });

  it('updates font style (italic) in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { fontStyle: 'italic' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.fontStyle).toBe('italic');
  });

  it('updates text decoration (underline / line-through) in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { textDecoration: 'underline' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.textDecoration).toBe('underline');
  });

  it('updates font size in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { fontSize: '64px' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.fontSize).toBe('64px');
  });

  it('updates line height in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { lineHeight: '1.2' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.lineHeight).toBe('1.2');
  });

  it('updates letter spacing in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { letterSpacing: '-0.5px' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.letterSpacing).toBe('-0.5px');
  });

  it('updates text alignment in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { textAlign: 'center' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.textAlign).toBe('center');
  });

  it('updates text transform in canonical state', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { textTransform: 'uppercase' },
        },
      },
    });

    const updatedState = useTemplateStore.getState().canonicalTemplate;
    expect(updatedState.elements[heroTitleId].baseProperties.style?.textTransform).toBe('uppercase');
  });

  it('resolves element properties for canvas rendering with typography styles', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            fontSize: '56px',
            fontWeight: '800',
            fontStyle: 'italic',
            textDecoration: 'underline',
            letterSpacing: '1px',
            textAlign: 'center',
            textTransform: 'uppercase',
          },
        },
      },
    });

    const element = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];
    const resolvedProps = resolveElementProperties(element, 'desktop');

    expect(resolvedProps.style?.fontSize).toBe('56px');
    expect(resolvedProps.style?.fontWeight).toBe('800');
    expect(resolvedProps.style?.fontStyle).toBe('italic');
    expect(resolvedProps.style?.textDecoration).toBe('underline');
    expect(resolvedProps.style?.letterSpacing).toBe('1px');
    expect(resolvedProps.style?.textAlign).toBe('center');
    expect(resolvedProps.style?.textTransform).toBe('uppercase');
  });

  it('isolates responsive typography overrides cleanly between scopes', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    // Set base font size to 64px
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { fontSize: '64px' },
        },
      },
    });

    // Set mobile font size override to 36px
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'mobile',
      changes: {
        [heroTitleId]: {
          style: { fontSize: '36px' },
        },
      },
    });

    const element = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];

    // Base properties must retain 64px
    expect(element.baseProperties.style?.fontSize).toBe('64px');

    // Desktop viewport resolution yields base 64px
    expect(resolveElementProperties(element, 'desktop').style?.fontSize).toBe('64px');

    // Mobile viewport resolution yields override 36px
    expect(resolveElementProperties(element, 'mobile').style?.fontSize).toBe('36px');
  });

  it('performs scope-aware reset of typography properties without damaging layout or spacing', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    // Set base typography and spacing
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: {
            fontSize: '60px',
            fontWeight: '900',
            fontStyle: 'italic',
            padding: '24px',
            backgroundColor: '#05070e',
          },
        },
      },
    });

    // Set mobile typography override
    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'mobile',
      changes: {
        [heroTitleId]: {
          style: {
            fontSize: '32px',
            fontWeight: '400',
          },
        },
      },
    });

    // Reset mobile scope typography using undefined patch
    store.executeCommand({
      source: 'restore',
      targetIds: [heroTitleId],
      viewportScope: 'mobile',
      changes: {
        [heroTitleId]: {
          style: {
            fontSize: undefined,
            fontWeight: undefined,
          },
        },
      },
    });

    const elementAfterReset = useTemplateStore.getState().canonicalTemplate.elements[heroTitleId];

    // Mobile override typography is cleared
    expect(elementAfterReset.viewportOverrides['mobile']?.style?.fontSize).toBeUndefined();

    // Mobile resolution cleanly inherits base font size (60px)
    expect(resolveElementProperties(elementAfterReset, 'mobile').style?.fontSize).toBe('60px');

    // Base padding (spacing) and background remain completely intact
    expect(elementAfterReset.baseProperties.style?.padding).toBe('24px');
    expect(elementAfterReset.baseProperties.style?.backgroundColor).toBe('#05070e');
  });

  it('records history entries for typography edits and restores via single-element recovery', () => {
    const store = useTemplateStore.getState();
    const heroTitleId = 'hero-title';

    store.executeCommand({
      source: 'canvas',
      targetIds: [heroTitleId],
      viewportScope: 'all',
      changes: {
        [heroTitleId]: {
          style: { fontWeight: '900' },
        },
      },
    });

    const historyEntries = useTemplateStore.getState().historyLog;
    const latestHistory = historyEntries[0];

    expect(latestHistory).toBeDefined();
    expect(latestHistory.elementId).toBe(heroTitleId);
    expect(latestHistory.nextState.style?.fontWeight).toBe('900');

    // Restore previous state using single element recovery
    store.restoreRevision(latestHistory);

    const restoredState = useTemplateStore.getState().canonicalTemplate;
    expect(restoredState.elements[heroTitleId].baseProperties.style?.fontWeight).not.toBe('900');
  });
});
