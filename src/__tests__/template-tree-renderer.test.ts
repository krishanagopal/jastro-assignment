import { describe, expect, it } from 'vitest';
import { getChildElements, getRootElements, validateTreeIntegrity } from '../components/TemplateRenderer/templateTree.utils.tsx';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { TemplateElement } from '../types/template';

describe('Shared Template Tree Renderer Architecture', () => {
  it('validates canonical tree integrity for INITIAL_TEMPLATE without errors', () => {
    const integrity = validateTreeIntegrity(INITIAL_TEMPLATE.elements);
    expect(integrity.valid).toBe(true);
    expect(integrity.errors).toHaveLength(0);
  });

  it('discovers all 7 top-level landing page root sections deterministically', () => {
    const rootElements = getRootElements(INITIAL_TEMPLATE.elements, 'desktop');

    // Root sections: navbar-container, hero-section, workflow-section, features-section, how-it-works-section, product-cta-section, footer-section
    const rootIds = rootElements.map((el) => el.id);
    expect(rootIds).toContain('navbar-container');
    expect(rootIds).toContain('hero-section');
    expect(rootIds).toContain('workflow-section');
    expect(rootIds).toContain('features-section');
    expect(rootIds).toContain('how-it-works-section');
    expect(rootIds).toContain('product-cta-section');
    expect(rootIds).toContain('footer-section');
  });

  it('discovers children for containers deterministically sorted by layout.order', () => {
    const navbarChildren = getChildElements(INITIAL_TEMPLATE.elements, 'navbar-container', 'desktop');
    const navbarChildIds = navbarChildren.map((el) => el.id);

    expect(navbarChildIds).toEqual(['navbar-logo', 'navbar-nav-links', 'navbar-actions']);

    const heroChildren = getChildElements(INITIAL_TEMPLATE.elements, 'hero-section', 'desktop');
    const heroChildIds = heroChildren.map((el) => el.id);

    expect(heroChildIds).toEqual([
      'hero-badge',
      'hero-title',
      'hero-subtitle',
      'hero-cta-group',
      'trust-indicators-group',
    ]);
  });

  it('detects invalid tree relationships such as non-existent parentId or self-parenting', () => {
    const invalidElements: Record<string, TemplateElement> = {
      ...INITIAL_TEMPLATE.elements,
      'broken-child': {
        id: 'broken-child',
        type: 'heading',
        label: 'Broken Node',
        parentId: 'non-existent-parent-id',
        baseProperties: { content: { text: 'Test' } },
        viewportOverrides: {},
      },
    };

    const integrity = validateTreeIntegrity(invalidElements);
    expect(integrity.valid).toBe(false);
    expect(integrity.errors[0]).toContain('references non-existent parentId');
  });
});
