import { TemplateModel } from '../types/template';

export const INITIAL_TEMPLATE: TemplateModel = {
  templateId: 'apex-ai-workflows-v1',
  name: 'ApexAI Workflows - Autonomous AI Agents',
  version: 1,
  elements: {
    // ----------------------------------------------------
    // 1. NAVBAR HEADER & CHILDREN
    // ----------------------------------------------------
    'navbar-container': {
      id: 'navbar-container',
      type: 'container',
      label: 'Navbar Header Bar',
      baseProperties: {
        style: {
          backgroundColor: '#05070e',
          padding: '14px 28px',
          borderRadius: '16px',
          display: 'flex',
        },
        size: { width: '100%' },
        layout: { flexDirection: 'row', gap: '16px', order: 1 },
      },
      viewportOverrides: {
        mobile: { style: { padding: '12px 16px' } },
      },
    },
    'navbar-logo': {
      id: 'navbar-logo',
      type: 'card',
      label: 'ApexAI Brand Logo',
      parentId: 'navbar-container',
      baseProperties: {
        content: { badgeText: '⚡ ApexAI', text: 'WORKFLOWS' },
        style: { color: '#ffffff', fontSize: '14px', backgroundColor: 'transparent' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'navbar-nav-links': {
      id: 'navbar-nav-links',
      type: 'container',
      label: 'Navigation Links Container',
      parentId: 'navbar-container',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '24px', order: 2 },
      },
      viewportOverrides: {
        mobile: { style: { display: 'none' } },
      },
    },
    'nav-link-features': {
      id: 'nav-link-features',
      type: 'button',
      label: 'Nav Link: Features',
      parentId: 'navbar-nav-links',
      baseProperties: {
        content: { text: 'Features' },
        style: { color: '#cbd5e1', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'nav-link-playground': {
      id: 'nav-link-playground',
      type: 'button',
      label: 'Nav Link: Playground',
      parentId: 'navbar-nav-links',
      baseProperties: {
        content: { text: 'Playground' },
        style: { color: '#cbd5e1', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'nav-link-pricing': {
      id: 'nav-link-pricing',
      type: 'button',
      label: 'Nav Link: Pricing',
      parentId: 'navbar-nav-links',
      baseProperties: {
        content: { text: 'Pricing' },
        style: { color: '#cbd5e1', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 3 },
      },
      viewportOverrides: {},
    },
    'nav-link-wall': {
      id: 'nav-link-wall',
      type: 'button',
      label: 'Nav Link: Wall of Love',
      parentId: 'navbar-nav-links',
      baseProperties: {
        content: { text: 'Wall of Love' },
        style: { color: '#cbd5e1', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 4 },
      },
      viewportOverrides: {},
    },
    'nav-link-faq': {
      id: 'nav-link-faq',
      type: 'button',
      label: 'Nav Link: FAQ',
      parentId: 'navbar-nav-links',
      baseProperties: {
        content: { text: 'FAQ' },
        style: { color: '#cbd5e1', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 5 },
      },
      viewportOverrides: {},
    },
    'navbar-actions': {
      id: 'navbar-actions',
      type: 'container',
      label: 'Navbar Actions',
      parentId: 'navbar-container',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '12px', order: 3 },
      },
      viewportOverrides: {},
    },
    'nav-cta-btn': {
      id: 'nav-cta-btn',
      type: 'button',
      label: 'Navbar Action CTA Button',
      parentId: 'navbar-actions',
      baseProperties: {
        content: { text: 'Get Started Free →' },
        style: { backgroundColor: '#6366f1', color: '#ffffff', fontSize: '13px', padding: '8px 20px', borderRadius: '10px' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },

    // ----------------------------------------------------
    // 2. HERO SECTION & CHILDREN
    // ----------------------------------------------------
    'hero-section': {
      id: 'hero-section',
      type: 'section',
      label: 'Hero Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 24px 32px', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1000px' },
        layout: { flexDirection: 'column', gap: '20px', order: 2 },
      },
      viewportOverrides: {
        mobile: { style: { padding: '32px 16px 24px' } },
      },
    },
    'hero-badge': {
      id: 'hero-badge',
      type: 'card',
      label: 'Announcement Badge',
      parentId: 'hero-section',
      baseProperties: {
        content: { badgeText: 'ApexAI 3.0 Released', text: '•   Autonomous Multi-Agent Engine   ›' },
        style: { backgroundColor: '#090d16', color: '#93c5fd', fontSize: '12px', padding: '8px 18px', borderRadius: '9999px', textAlign: 'center' },
        size: { width: 'auto', maxWidth: '460px' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'hero-title': {
      id: 'hero-title',
      type: 'heading',
      label: 'Hero Main Title',
      parentId: 'hero-section',
      baseProperties: {
        content: { text: 'Automate Complex Workflows with Autonomous AI Agents' },
        style: { color: '#ffffff', fontSize: '48px', textAlign: 'center' },
        size: { maxWidth: '900px', width: '100%' },
        layout: { order: 2 },
      },
      viewportOverrides: {
        mobile: { style: { fontSize: '28px', textAlign: 'center' } },
      },
    },
    'hero-subtitle': {
      id: 'hero-subtitle',
      type: 'paragraph',
      label: 'Hero Subtitle Description',
      parentId: 'hero-section',
      baseProperties: {
        content: { text: 'Deploy intelligent agent pipelines that connect your API stack, automate operations, and execute code in real-time. Zero boilerplate required.' },
        style: { color: '#94a3b8', fontSize: '17px', textAlign: 'center' },
        size: { maxWidth: '680px', width: '100%' },
        layout: { order: 3 },
      },
      viewportOverrides: {
        mobile: { style: { fontSize: '14px' } },
      },
    },
    'hero-cta-group': {
      id: 'hero-cta-group',
      type: 'container',
      label: 'Hero CTA Group Container',
      parentId: 'hero-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '16px', order: 4 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '12px' } },
      },
    },
    'hero-cta-button': {
      id: 'hero-cta-button',
      type: 'button',
      label: 'Primary CTA Trial Button',
      parentId: 'hero-cta-group',
      baseProperties: {
        content: { text: '⚡ Start 14-Day Free Trial' },
        style: { backgroundColor: '#6366f1', color: '#ffffff', fontSize: '15px', padding: '14px 32px', borderRadius: '12px', textAlign: 'center' },
        size: { width: 'auto' },
        layout: { order: 1 },
      },
      viewportOverrides: {
        mobile: { size: { width: '100%' } },
      },
    },
    'hero-secondary-cta': {
      id: 'hero-secondary-cta',
      type: 'button',
      label: 'Secondary Simulator Button',
      parentId: 'hero-cta-group',
      baseProperties: {
        content: { text: '▷ Try Live Simulator' },
        style: { backgroundColor: '#0f172a', color: '#f8fafc', fontSize: '15px', padding: '14px 28px', borderRadius: '12px', textAlign: 'center' },
        size: { width: 'auto' },
        layout: { order: 2 },
      },
      viewportOverrides: {
        mobile: { size: { width: '100%' } },
      },
    },
    'trust-indicators-group': {
      id: 'trust-indicators-group',
      type: 'container',
      label: 'Trust Indicators Group Container',
      parentId: 'hero-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '24px', order: 5 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '12px' } },
      },
    },
    'trust-soc2': {
      id: 'trust-soc2',
      type: 'card',
      label: 'Trust Indicator: SOC2 Certified',
      parentId: 'trust-indicators-group',
      baseProperties: {
        content: { badgeText: 'SECURITY', text: '✔ SOC2 Type II Certified' },
        style: { backgroundColor: 'transparent', color: '#64748b', fontSize: '13px' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'trust-uptime': {
      id: 'trust-uptime',
      type: 'card',
      label: 'Trust Indicator: 99.99% Uptime',
      parentId: 'trust-indicators-group',
      baseProperties: {
        content: { badgeText: 'RELIABILITY', text: '⏱ 99.99% Guaranteed Uptime' },
        style: { backgroundColor: 'transparent', color: '#64748b', fontSize: '13px' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'trust-nocredit': {
      id: 'trust-nocredit',
      type: 'card',
      label: 'Trust Indicator: No Credit Card',
      parentId: 'trust-indicators-group',
      baseProperties: {
        content: { badgeText: 'NO RISK', text: '💳 No Credit Card Needed' },
        style: { backgroundColor: 'transparent', color: '#64748b', fontSize: '13px' },
        layout: { order: 3 },
      },
      viewportOverrides: {},
    },

    // ----------------------------------------------------
    // 3. WORKFLOW MODULES SECTION (BELOW THE FOLD)
    // ----------------------------------------------------
    'workflow-section': {
      id: 'workflow-section',
      type: 'section',
      label: 'Workflow Modules Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 24px', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1100px' },
        layout: { flexDirection: 'column', gap: '24px', order: 3 },
      },
      viewportOverrides: {},
    },
    'workflow-heading': {
      id: 'workflow-heading',
      type: 'heading',
      label: 'Workflow Section Heading',
      parentId: 'workflow-section',
      baseProperties: {
        content: { text: 'Engineered for Autonomous Operation' },
        style: { fontSize: '32px', color: '#ffffff', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'workflow-description': {
      id: 'workflow-description',
      type: 'paragraph',
      label: 'Workflow Section Description',
      parentId: 'workflow-section',
      baseProperties: {
        content: { text: 'Connect your data pipelines, execution sandboxes, and stateful agent loops in minutes.' },
        style: { fontSize: '15px', color: '#94a3b8', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'workflow-cards-group': {
      id: 'workflow-cards-group',
      type: 'container',
      label: 'Workflow Cards Grid Container',
      parentId: 'workflow-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '20px', order: 3 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '16px' } },
      },
    },
    'service-card-1': {
      id: 'service-card-1',
      type: 'card',
      label: 'Workflow Card: AI Lead Qualification',
      parentId: 'workflow-cards-group',
      baseProperties: {
        content: { badgeText: 'QUALIFICATION', text: 'AI Lead Qualification: Connect intelligent agents to automatically qualify and prioritize sales leads.' },
        style: { backgroundColor: '#0b0f19', color: '#e2e8f0', fontSize: '14px', padding: '24px', borderRadius: '14px' },
        size: { width: '30%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'service-card-2': {
      id: 'service-card-2',
      type: 'card',
      label: 'Workflow Card: Autonomous Operations',
      parentId: 'workflow-cards-group',
      baseProperties: {
        content: { badgeText: 'OPERATIONS', text: 'Autonomous Operations: Automate repetitive business workflows with deterministic multi-agent loops.' },
        style: { backgroundColor: '#0b0f19', color: '#e2e8f0', fontSize: '14px', padding: '24px', borderRadius: '14px' },
        size: { width: '30%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'service-card-3': {
      id: 'service-card-3',
      type: 'card',
      label: 'Workflow Card: Real-Time API Intelligence',
      parentId: 'workflow-cards-group',
      baseProperties: {
        content: { badgeText: 'INTELLIGENCE', text: 'Real-Time API Intelligence: Connect APIs, databases, and microservices through automated pipelines.' },
        style: { backgroundColor: '#0b0f19', color: '#e2e8f0', fontSize: '14px', padding: '24px', borderRadius: '14px' },
        size: { width: '30%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },

    // ----------------------------------------------------
    // 4. FEATURES GRID SECTION
    // ----------------------------------------------------
    'features-section': {
      id: 'features-section',
      type: 'section',
      label: 'Features Grid Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 24px', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1100px' },
        layout: { flexDirection: 'column', gap: '24px', order: 4 },
      },
      viewportOverrides: {},
    },
    'features-heading': {
      id: 'features-heading',
      type: 'heading',
      label: 'Features Section Heading',
      parentId: 'features-section',
      baseProperties: {
        content: { text: 'Built for High-Scale Enterprise Workflows' },
        style: { fontSize: '32px', color: '#ffffff', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'features-description': {
      id: 'features-description',
      type: 'paragraph',
      label: 'Features Section Description',
      parentId: 'features-section',
      baseProperties: {
        content: { text: 'Everything you need to build, execute, and scale multi-agent operational systems.' },
        style: { fontSize: '15px', color: '#94a3b8', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'features-grid': {
      id: 'features-grid',
      type: 'container',
      label: 'Features Grid Container',
      parentId: 'features-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '20px', order: 3 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '16px' } },
      },
    },
    'feature-1': {
      id: 'feature-1',
      type: 'card',
      label: 'Feature: Autonomous Agents',
      parentId: 'features-grid',
      baseProperties: {
        content: { badgeText: 'AGENTS', text: 'Autonomous Agents: Stateful multi-step reasoning with memory retention.' },
        style: { backgroundColor: '#090c14', color: '#e2e8f0', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'feature-2': {
      id: 'feature-2',
      type: 'card',
      label: 'Feature: API Integrations',
      parentId: 'features-grid',
      baseProperties: {
        content: { badgeText: 'APIS', text: 'API Integrations: Instant REST, GraphQL, and gRPC connection adapters.' },
        style: { backgroundColor: '#090c14', color: '#e2e8f0', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'feature-3': {
      id: 'feature-3',
      type: 'card',
      label: 'Feature: Real-Time Execution',
      parentId: 'features-grid',
      baseProperties: {
        content: { badgeText: 'RUNTIME', text: 'Real-Time Execution: Sandboxed execution with sub-millisecond latency.' },
        style: { backgroundColor: '#090c14', color: '#e2e8f0', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },

    // ----------------------------------------------------
    // 5. HOW IT WORKS SECTION
    // ----------------------------------------------------
    'how-it-works-section': {
      id: 'how-it-works-section',
      type: 'section',
      label: 'How It Works Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 24px', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1000px' },
        layout: { flexDirection: 'column', gap: '24px', order: 5 },
      },
      viewportOverrides: {},
    },
    'how-heading': {
      id: 'how-heading',
      type: 'heading',
      label: 'How It Works Heading',
      parentId: 'how-it-works-section',
      baseProperties: {
        content: { text: 'How ApexAI Operates' },
        style: { fontSize: '32px', color: '#ffffff', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'how-steps-container': {
      id: 'how-steps-container',
      type: 'container',
      label: 'Process Steps Container',
      parentId: 'how-it-works-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '20px', order: 2 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '16px' } },
      },
    },
    'step-1': {
      id: 'step-1',
      type: 'card',
      label: 'Step 01: Connect Systems',
      parentId: 'how-steps-container',
      baseProperties: {
        content: { badgeText: '01', text: 'Connect Your Systems: Plug in APIs, databases, and microservices.' },
        style: { backgroundColor: '#0b0e17', color: '#e2e8f0', padding: '24px', borderRadius: '14px' },
        size: { width: '30%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'step-2': {
      id: 'step-2',
      type: 'card',
      label: 'Step 02: Build Workflows',
      parentId: 'how-steps-container',
      baseProperties: {
        content: { badgeText: '02', text: 'Build Intelligent Workflows: Design agent pipelines visually or via code.' },
        style: { backgroundColor: '#0b0e17', color: '#e2e8f0', padding: '24px', borderRadius: '14px' },
        size: { width: '30%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'step-3': {
      id: 'step-3',
      type: 'card',
      label: 'Step 03: Deploy Agents',
      parentId: 'how-steps-container',
      baseProperties: {
        content: { badgeText: '03', text: 'Deploy Autonomous Agents: Launch agents with zero boilerplate.' },
        style: { backgroundColor: '#0b0e17', color: '#e2e8f0', padding: '24px', borderRadius: '14px' },
        size: { width: '30%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },

    // ----------------------------------------------------
    // 6. PRODUCT CONVERSION CTA SECTION
    // ----------------------------------------------------
    'product-cta-section': {
      id: 'product-cta-section',
      type: 'section',
      label: 'Final Conversion CTA Section',
      baseProperties: {
        style: { display: 'flex', padding: '56px 24px', backgroundColor: '#080c16', borderRadius: '24px' },
        size: { width: '100%', maxWidth: '900px' },
        layout: { flexDirection: 'column', gap: '20px', order: 6 },
      },
      viewportOverrides: {},
    },
    'cta-heading': {
      id: 'cta-heading',
      type: 'heading',
      label: 'CTA Section Heading',
      parentId: 'product-cta-section',
      baseProperties: {
        content: { text: 'Ready to Automate Your Workflows?' },
        style: { fontSize: '36px', color: '#ffffff', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'cta-description': {
      id: 'cta-description',
      type: 'paragraph',
      label: 'CTA Section Description',
      parentId: 'product-cta-section',
      baseProperties: {
        content: { text: 'Build, deploy and scale intelligent AI-powered workflows without unnecessary complexity.' },
        style: { fontSize: '16px', color: '#94a3b8', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'cta-button': {
      id: 'cta-button',
      type: 'button',
      label: 'Start Building CTA Button',
      parentId: 'product-cta-section',
      baseProperties: {
        content: { text: '⚡ Start Building for Free' },
        style: { backgroundColor: '#6366f1', color: '#ffffff', fontSize: '15px', padding: '14px 32px', borderRadius: '12px' },
        size: { width: 'auto' },
        layout: { order: 3 },
      },
      viewportOverrides: {},
    },

    // ----------------------------------------------------
    // 7. FOOTER SECTION & CHILDREN
    // ----------------------------------------------------
    'footer-section': {
      id: 'footer-section',
      type: 'section',
      label: 'Footer Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 24px 24px', backgroundColor: '#020306' },
        size: { width: '100%', maxWidth: '1100px' },
        layout: { flexDirection: 'column', gap: '32px', order: 7 },
      },
      viewportOverrides: {},
    },
    'footer-content-group': {
      id: 'footer-content-group',
      type: 'container',
      label: 'Footer Columns Container',
      parentId: 'footer-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '24px', order: 1 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '20px' } },
      },
    },
    'footer-brand': {
      id: 'footer-brand',
      type: 'card',
      label: 'Footer Brand Column',
      parentId: 'footer-content-group',
      baseProperties: {
        content: { badgeText: 'ApexAI', text: 'ApexAI Workflows: Operational multi-agent engine for intelligent business automation.' },
        style: { backgroundColor: 'transparent', color: '#94a3b8', fontSize: '13px' },
        size: { width: '35%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'footer-product-links': {
      id: 'footer-product-links',
      type: 'card',
      label: 'Footer Product Links Column',
      parentId: 'footer-content-group',
      baseProperties: {
        content: { badgeText: 'PRODUCT', text: 'Features • Integrations • Playground • Pricing' },
        style: { backgroundColor: 'transparent', color: '#94a3b8', fontSize: '13px' },
        size: { width: '20%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'footer-company-links': {
      id: 'footer-company-links',
      type: 'card',
      label: 'Footer Company Links Column',
      parentId: 'footer-content-group',
      baseProperties: {
        content: { badgeText: 'COMPANY', text: 'About Us • Careers • Contact • Security' },
        style: { backgroundColor: 'transparent', color: '#94a3b8', fontSize: '13px' },
        size: { width: '20%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'footer-resource-links': {
      id: 'footer-resource-links',
      type: 'card',
      label: 'Footer Resources Column',
      parentId: 'footer-content-group',
      baseProperties: {
        content: { badgeText: 'RESOURCES', text: 'Documentation • API Reference • Help Center' },
        style: { backgroundColor: 'transparent', color: '#94a3b8', fontSize: '13px' },
        size: { width: '20%' },
        layout: { order: 4 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'footer-bottom': {
      id: 'footer-bottom',
      type: 'card',
      label: 'Footer Bottom Bar',
      parentId: 'footer-section',
      baseProperties: {
        content: { badgeText: 'APEXAI WORKFLOWS', text: '© 2026 ApexAI Workflows Inc. All rights reserved. • Privacy Policy • Terms of Service' },
        style: { backgroundColor: 'transparent', color: '#64748b', fontSize: '12px', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
  },
};
