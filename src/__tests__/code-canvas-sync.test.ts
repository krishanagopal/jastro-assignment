import { describe, expect, it } from 'vitest';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { commitEditCommand } from '../engine/commit';
import { resolveElementProperties } from '../engine/resolution';
import { validateEditCommand } from '../engine/validation';
import { EditCommand } from '../types/template';

describe('Code & Canvas Synchronization across Hierarchy', () => {
  it('synchronizes edits to navbar, hero headline, CTA, and trust indicators', () => {
    // 1. Edit nav link features via code
    const navLinkEdit: EditCommand = {
      id: 'cmd_nav_1',
      timestamp: Date.now(),
      source: 'code',
      targetIds: ['nav-link-features'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'nav-link-features': {
          content: { text: 'Capabilities' },
        },
      },
    };

    const navValidation = validateEditCommand(navLinkEdit, INITIAL_TEMPLATE, ['nav-link-features']);
    expect(navValidation.valid).toBe(true);

    const { updatedModel: model1 } = commitEditCommand(INITIAL_TEMPLATE, navLinkEdit);
    expect(model1.elements['nav-link-features'].baseProperties.content?.text).toBe('Capabilities');

    // 2. Edit primary CTA button via canvas
    const ctaEdit: EditCommand = {
      id: 'cmd_cta_1',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-cta-button'],
      viewportScope: 'all',
      baseRevision: model1.version,
      changes: {
        'hero-cta-button': {
          content: { text: '🚀 Claim Free Access' },
          style: { backgroundColor: '#4f46e5' },
        },
      },
    };

    const { updatedModel: model2 } = commitEditCommand(model1, ctaEdit);
    expect(model2.elements['hero-cta-button'].baseProperties.content?.text).toBe('🚀 Claim Free Access');
    expect(model2.elements['hero-cta-button'].baseProperties.style?.backgroundColor).toBe('#4f46e5');

    // 3. Edit trust indicator via code
    const trustEdit: EditCommand = {
      id: 'cmd_trust_1',
      timestamp: Date.now(),
      source: 'code',
      targetIds: ['trust-soc2'],
      viewportScope: 'all',
      baseRevision: model2.version,
      changes: {
        'trust-soc2': {
          content: { text: '✔ ISO 27001 Certified' },
        },
      },
    };

    const { updatedModel: model3 } = commitEditCommand(model2, trustEdit);
    expect(model3.elements['trust-soc2'].baseProperties.content?.text).toBe('✔ ISO 27001 Certified');

    // 4. Edit feature card and footer via code/canvas
    const featureEdit: EditCommand = {
      id: 'cmd_feat_1',
      timestamp: Date.now(),
      source: 'code',
      targetIds: ['feature-1', 'cta-heading'],
      viewportScope: 'all',
      baseRevision: model3.version,
      changes: {
        'feature-1': { content: { badgeText: 'INTELLIGENT AGENTS' } },
        'cta-heading': { content: { text: 'Start Automating Today' } },
      },
    };

    const { updatedModel: model4 } = commitEditCommand(model3, featureEdit);
    expect(model4.elements['feature-1'].baseProperties.content?.badgeText).toBe('INTELLIGENT AGENTS');
    expect(model4.elements['cta-heading'].baseProperties.content?.text).toBe('Start Automating Today');
  });

  it('synchronizes mobile responsive overrides without altering base properties', () => {
    const mobileEdit: EditCommand = {
      id: 'cmd_mobile_sync',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'mobile',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          style: { fontSize: '24px' },
        },
      },
    };

    const { updatedModel } = commitEditCommand(INITIAL_TEMPLATE, mobileEdit);

    // Mobile override updated
    expect(updatedModel.elements['hero-title'].viewportOverrides.mobile?.style?.fontSize).toBe('24px');

    // Base properties unchanged
    expect(updatedModel.elements['hero-title'].baseProperties.style?.fontSize).toBe('48px');

    // Desktop resolution yields base value
    const resolvedDesktop = resolveElementProperties(updatedModel.elements['hero-title'], 'desktop');
    expect(resolvedDesktop.style?.fontSize).toBe('48px');

    // Mobile resolution yields mobile override value
    const resolvedMobile = resolveElementProperties(updatedModel.elements['hero-title'], 'mobile');
    expect(resolvedMobile.style?.fontSize).toBe('24px');
  });
});
