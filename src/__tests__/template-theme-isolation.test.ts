import { describe, expect, it } from 'vitest';
import { resolveElementProperties } from '../engine/resolution';
import { FLOWITH_TEMPLATE } from '../data/flowithTemplate';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';

describe('Global Editor Theme & Template Isolation Safety', () => {
  it('preserves canonical seed properties for ApexAI Workflows without modifications', () => {
    const navbar = INITIAL_TEMPLATE.elements['navbar-container'];
    expect(navbar).toBeDefined();
    expect(navbar.baseProperties.style?.backgroundColor).toBe('#05070e');
    expect(navbar.baseProperties.style?.padding).toBe('14px 28px');

    const heroTitle = INITIAL_TEMPLATE.elements['hero-title'];
    expect(heroTitle).toBeDefined();
    expect(heroTitle.baseProperties.content?.text).toContain('Automate Complex Workflows');
  });

  it('preserves canonical seed properties for Flowith Automation without modifications', () => {
    const navbar = FLOWITH_TEMPLATE.elements['flowith-navbar-container'];
    expect(navbar).toBeDefined();
    expect(navbar.baseProperties.style?.backgroundColor).toBe('#ffffff');

    const heroSection = FLOWITH_TEMPLATE.elements['flowith-hero-section'];
    expect(heroSection).toBeDefined();
    expect(heroSection.baseProperties.style?.backgroundColor).toBe('#fafcfb');

    const ctaBtn = FLOWITH_TEMPLATE.elements['flowith-primary-cta'];
    expect(ctaBtn).toBeDefined();
    expect(ctaBtn.baseProperties.style?.backgroundColor).toBe('#059669');
  });

  it('resolves model element properties independently of editor shell chrome colors', () => {
    const flowithTitle = FLOWITH_TEMPLATE.elements['flowith-hero-title'];
    const resolvedFlowithProps = resolveElementProperties(flowithTitle, 'desktop');
    expect(resolvedFlowithProps.style?.color).toBe('#0f172a');

    const apexCta = INITIAL_TEMPLATE.elements['nav-cta-btn'];
    const resolvedApexProps = resolveElementProperties(apexCta, 'desktop');
    expect(resolvedApexProps.style?.backgroundColor).toBe('#6366f1');
    expect(resolvedApexProps.style?.color).toBe('#ffffff');
  });
});
