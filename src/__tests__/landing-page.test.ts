import { describe, expect, it } from 'vitest';
import { TRIAL_STARTER_TEMPLATES } from '../data/starterTemplates';
import { VesperLandingPage } from '../components/Landing/VesperLandingPage';

describe('Vesper SaaS Landing Page Content & Capabilities', () => {
  it('exports VesperLandingPage component correctly', () => {
    expect(VesperLandingPage).toBeDefined();
    expect(typeof VesperLandingPage).toBe('function');
  });

  it('showcases exactly two trial starter templates on the landing page', () => {
    expect(TRIAL_STARTER_TEMPLATES).toHaveLength(2);
    const templateIds = TRIAL_STARTER_TEMPLATES.map((t) => t.id);
    expect(templateIds).toContain('apex-ai-workflows');
    expect(templateIds).toContain('flowith-automation');
  });

  it('guarantees trial starter templates have badges, descriptions, and valid templateModels', () => {
    TRIAL_STARTER_TEMPLATES.forEach((tmpl) => {
      expect(tmpl.badge).toBeDefined();
      expect(tmpl.description).toBeDefined();
      expect(tmpl.templateModel).toBeDefined();
      expect(tmpl.templateModel.elements).toBeDefined();
    });
  });
});
