import { describe, expect, it } from 'vitest';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { commitEditCommand } from '../engine/commit';
import { resolveElementProperties } from '../engine/resolution';

describe('Responsive Resolution & Override Isolation', () => {
  it('correctly resolves base properties when no viewport override exists', () => {
    const element = INITIAL_TEMPLATE.elements['hero-title'];
    const resolvedDesktop = resolveElementProperties(element, 'desktop');

    expect(resolvedDesktop.content?.text).toBe('Scale Your Business With Intelligent Solutions');
    expect(resolvedDesktop.style?.fontSize).toBe('36px');
  });

  it('applies viewport override when viewing specified viewport', () => {
    const element = INITIAL_TEMPLATE.elements['hero-title'];
    const resolvedMobile = resolveElementProperties(element, 'mobile');

    // Mobile has fontSize override: '26px'
    expect(resolvedMobile.style?.fontSize).toBe('26px');
    // Content is inherited from base
    expect(resolvedMobile.content?.text).toBe('Scale Your Business With Intelligent Solutions');
  });

  it('ensures a mobile-specific override edit does NOT modify desktop or base properties', () => {
    const state = JSON.parse(JSON.stringify(INITIAL_TEMPLATE));

    const mobileEditResult = commitEditCommand(state, {
      id: 'cmd_mobile_1',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'mobile',
      baseRevision: state.version,
      changes: {
        'hero-title': {
          style: { color: '#ff0000' },
        },
      },
    });

    const updatedElement = mobileEditResult.updatedModel.elements['hero-title'];

    // Mobile override updated
    expect(updatedElement.viewportOverrides.mobile?.style?.color).toBe('#ff0000');

    // Base color remains untouched
    expect(updatedElement.baseProperties.style?.color).toBe('#0f172a');

    // Desktop view resolution remains untouched
    const resolvedDesktop = resolveElementProperties(updatedElement, 'desktop');
    expect(resolvedDesktop.style?.color).toBe('#0f172a');

    // Mobile view resolution reflects override
    const resolvedMobile = resolveElementProperties(updatedElement, 'mobile');
    expect(resolvedMobile.style?.color).toBe('#ff0000');
  });
});
