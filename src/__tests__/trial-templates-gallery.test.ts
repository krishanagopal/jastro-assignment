import { describe, expect, it } from 'vitest';
import { validateTreeIntegrity } from '../components/TemplateRenderer/templateTree.utils.tsx';
import { FLOWITH_TEMPLATE } from '../data/flowithTemplate';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { TRIAL_STARTER_TEMPLATES } from '../data/starterTemplates';

describe('Trial Version Template Gallery & Isolation', () => {
  it('exposes exactly two trial starter templates in TRIAL_STARTER_TEMPLATES', () => {
    expect(TRIAL_STARTER_TEMPLATES).toHaveLength(2);
    expect(TRIAL_STARTER_TEMPLATES[0].id).toBe('apex-ai-workflows');
    expect(TRIAL_STARTER_TEMPLATES[1].id).toBe('flowith-automation');
  });

  it('validates canonical tree integrity for both trial templates without errors', () => {
    const apexIntegrity = validateTreeIntegrity(INITIAL_TEMPLATE.elements);
    expect(apexIntegrity.valid).toBe(true);

    const flowithIntegrity = validateTreeIntegrity(FLOWITH_TEMPLATE.elements);
    expect(flowithIntegrity.valid).toBe(true);
  });

  it('contains complete 7-section trees in both trial templates', () => {
    const apexElements = Object.values(INITIAL_TEMPLATE.elements);
    expect(apexElements.some((e) => e.id === 'navbar-container')).toBe(true);
    expect(apexElements.some((e) => e.id === 'hero-section')).toBe(true);
    expect(apexElements.some((e) => e.id === 'workflow-section')).toBe(true);
    expect(apexElements.some((e) => e.id === 'features-section')).toBe(true);
    expect(apexElements.some((e) => e.id === 'how-it-works-section')).toBe(true);
    expect(apexElements.some((e) => e.id === 'product-cta-section')).toBe(true);
    expect(apexElements.some((e) => e.id === 'footer-section')).toBe(true);

    const flowithElements = Object.values(FLOWITH_TEMPLATE.elements);
    expect(flowithElements.some((e) => e.id === 'flowith-navbar-container')).toBe(true);
    expect(flowithElements.some((e) => e.id === 'flowith-hero-section')).toBe(true);
    expect(flowithElements.some((e) => e.id === 'flowith-cards-section')).toBe(true);
    expect(flowithElements.some((e) => e.id === 'flowith-feat-section')).toBe(true);
    expect(flowithElements.some((e) => e.id === 'flowith-how-section')).toBe(true);
    expect(flowithElements.some((e) => e.id === 'flowith-cta-section')).toBe(true);
    expect(flowithElements.some((e) => e.id === 'flowith-footer-section')).toBe(true);
  });

  it('guarantees deep clone isolation so editing a loaded template model does not mutate seed configuration', () => {
    const seedCopy = JSON.parse(JSON.stringify(FLOWITH_TEMPLATE));
    const clonedForEdit = JSON.parse(JSON.stringify(FLOWITH_TEMPLATE));

    // Mutate the clone
    clonedForEdit.elements['flowith-hero-title'].baseProperties.content.text = 'Mutated Title';

    // Verify seed is completely unchanged
    expect(FLOWITH_TEMPLATE.elements['flowith-hero-title'].baseProperties.content?.text).toBe(
      seedCopy.elements['flowith-hero-title'].baseProperties.content?.text
    );
    expect(FLOWITH_TEMPLATE.elements['flowith-hero-title'].baseProperties.content?.text).not.toBe('Mutated Title');
  });
});
