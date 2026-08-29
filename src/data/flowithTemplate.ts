import { TemplateModel } from '../types/template';

export const FLOWITH_TEMPLATE: TemplateModel = {
  templateId: 'flowith-automation-v1',
  name: 'Flowith Automation - Enterprise Workflow Suite',
  version: 1,
  elements: {
    // ----------------------------------------------------
    // 1. CONTINUOUS NAVBAR HEADER & CHILDREN (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-navbar-container': {
      id: 'flowith-navbar-container',
      type: 'container',
      label: 'Flowith Navbar Container',
      baseProperties: {
        style: {
          backgroundColor: '#ffffff',
          padding: '12px 32px',
          borderRadius: '0px',
          display: 'flex',
        },
        size: { width: '100%' },
        layout: { flexDirection: 'row', gap: '16px', order: 1 },
      },
      viewportOverrides: {
        mobile: { style: { padding: '10px 16px' } },
      },
    },
    'flowith-logo': {
      id: 'flowith-logo',
      type: 'card',
      label: 'Flowith Brand Logo',
      parentId: 'flowith-navbar-container',
      baseProperties: {
        content: { badgeText: '🌱 Flowith', text: 'AUTOMATION' },
        style: { color: '#0f172a', fontSize: '14px', backgroundColor: 'transparent' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-nav-links': {
      id: 'flowith-nav-links',
      type: 'container',
      label: 'Flowith Navigation Links Container',
      parentId: 'flowith-navbar-container',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '24px', order: 2 },
      },
      viewportOverrides: {
        mobile: { style: { display: 'none' } },
      },
    },
    'flowith-link-solutions': {
      id: 'flowith-link-solutions',
      type: 'button',
      label: 'Nav Link: Solutions',
      parentId: 'flowith-nav-links',
      baseProperties: {
        content: { text: 'Solutions' },
        style: { color: '#475569', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-link-platform': {
      id: 'flowith-link-platform',
      type: 'button',
      label: 'Nav Link: Platform',
      parentId: 'flowith-nav-links',
      baseProperties: {
        content: { text: 'Platform' },
        style: { color: '#475569', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'flowith-link-pricing': {
      id: 'flowith-link-pricing',
      type: 'button',
      label: 'Nav Link: Pricing',
      parentId: 'flowith-nav-links',
      baseProperties: {
        content: { text: 'Pricing' },
        style: { color: '#475569', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 3 },
      },
      viewportOverrides: {},
    },
    'flowith-link-resources': {
      id: 'flowith-link-resources',
      type: 'button',
      label: 'Nav Link: Resources',
      parentId: 'flowith-nav-links',
      baseProperties: {
        content: { text: 'Resources' },
        style: { color: '#475569', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 4 },
      },
      viewportOverrides: {},
    },
    'flowith-link-company': {
      id: 'flowith-link-company',
      type: 'button',
      label: 'Nav Link: Company',
      parentId: 'flowith-nav-links',
      baseProperties: {
        content: { text: 'Company' },
        style: { color: '#475569', fontSize: '13px', backgroundColor: 'transparent' },
        layout: { order: 5 },
      },
      viewportOverrides: {},
    },
    'flowith-navbar-actions': {
      id: 'flowith-navbar-actions',
      type: 'container',
      label: 'Flowith Navbar Actions',
      parentId: 'flowith-navbar-container',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '12px', order: 3 },
      },
      viewportOverrides: {},
    },
    'flowith-nav-cta': {
      id: 'flowith-nav-cta',
      type: 'button',
      label: 'Flowith Action CTA Button',
      parentId: 'flowith-navbar-actions',
      baseProperties: {
        content: { text: 'Start Free Trial →' },
        style: { backgroundColor: '#059669', color: '#ffffff', fontSize: '13px', padding: '8px 18px', borderRadius: '10px' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },

    // ----------------------------------------------------
    // 2. CONTINUOUS HERO SECTION & CHILDREN (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-hero-section': {
      id: 'flowith-hero-section',
      type: 'section',
      label: 'Flowith Hero Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 32px 36px', backgroundColor: '#fafcfb' },
        size: { width: '100%', maxWidth: '100%' },
        layout: { flexDirection: 'column', gap: '18px', order: 2 },
      },
      viewportOverrides: {
        mobile: { style: { padding: '28px 16px 20px' } },
      },
    },
    'flowith-hero-badge': {
      id: 'flowith-hero-badge',
      type: 'card',
      label: 'Flowith Announcement Badge',
      parentId: 'flowith-hero-section',
      baseProperties: {
        content: { badgeText: 'Flowith 2.0', text: '•   Enterprise Workflow Engine   ›' },
        style: { backgroundColor: '#ecfdf5', color: '#047857', fontSize: '12px', padding: '6px 16px', borderRadius: '9999px', textAlign: 'center' },
        size: { width: 'auto', maxWidth: '420px' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-hero-title': {
      id: 'flowith-hero-title',
      type: 'heading',
      label: 'Flowith Main Headline',
      parentId: 'flowith-hero-section',
      baseProperties: {
        content: { text: 'Orchestrate Business Operations with Intelligent AI Flow' },
        style: { color: '#0f172a', fontSize: '44px', textAlign: 'center' },
        size: { maxWidth: '850px', width: '100%' },
        layout: { order: 2 },
      },
      viewportOverrides: {
        mobile: { style: { fontSize: '28px', textAlign: 'center' } },
      },
    },
    'flowith-hero-subtitle': {
      id: 'flowith-hero-subtitle',
      type: 'paragraph',
      label: 'Flowith Hero Subtitle',
      parentId: 'flowith-hero-section',
      baseProperties: {
        content: { text: 'Streamline team workflows, automate data sync across tools, and empower enterprise operations with zero code.' },
        style: { color: '#475569', fontSize: '16px', textAlign: 'center' },
        size: { maxWidth: '640px', width: '100%' },
        layout: { order: 3 },
      },
      viewportOverrides: {
        mobile: { style: { fontSize: '14px' } },
      },
    },
    'flowith-hero-cta-group': {
      id: 'flowith-hero-cta-group',
      type: 'container',
      label: 'Flowith Hero CTA Group Container',
      parentId: 'flowith-hero-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '16px', order: 4 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '12px' } },
      },
    },
    'flowith-primary-cta': {
      id: 'flowith-primary-cta',
      type: 'button',
      label: 'Flowith Primary CTA Trial Button',
      parentId: 'flowith-hero-cta-group',
      baseProperties: {
        content: { text: '🌱 Start Free 14-Day Trial' },
        style: { backgroundColor: '#059669', color: '#ffffff', fontSize: '14px', padding: '12px 26px', borderRadius: '10px', textAlign: 'center' },
        size: { width: 'auto' },
        layout: { order: 1 },
      },
      viewportOverrides: {
        mobile: { size: { width: '100%' } },
      },
    },
    'flowith-secondary-cta': {
      id: 'flowith-secondary-cta',
      type: 'button',
      label: 'Flowith Secondary Platform Button',
      parentId: 'flowith-hero-cta-group',
      baseProperties: {
        content: { text: 'Explore Platform →' },
        style: { backgroundColor: '#ffffff', color: '#0f172a', fontSize: '14px', padding: '12px 24px', borderRadius: '10px', textAlign: 'center' },
        size: { width: 'auto' },
        layout: { order: 2 },
      },
      viewportOverrides: {
        mobile: { size: { width: '100%' } },
      },
    },
    'flowith-trust-group': {
      id: 'flowith-trust-group',
      type: 'container',
      label: 'Flowith Trust Group Container',
      parentId: 'flowith-hero-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        layout: { flexDirection: 'row', gap: '24px', order: 5 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '12px' } },
      },
    },
    'flowith-trust-soc2': {
      id: 'flowith-trust-soc2',
      type: 'card',
      label: 'Trust: SOC2 Certified',
      parentId: 'flowith-trust-group',
      baseProperties: {
        content: { badgeText: 'ENTERPRISE', text: '✔ SOC2 Type II Certified' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-trust-uptime': {
      id: 'flowith-trust-uptime',
      type: 'card',
      label: 'Trust: 99.9% Uptime',
      parentId: 'flowith-trust-group',
      baseProperties: {
        content: { badgeText: 'SLA', text: '⏱ 99.9% Reliable SLA' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'flowith-trust-gdpr': {
      id: 'flowith-trust-gdpr',
      type: 'card',
      label: 'Trust: GDPR Compliant',
      parentId: 'flowith-trust-group',
      baseProperties: {
        content: { badgeText: 'PRIVACY', text: '🔒 GDPR & HIPAA Ready' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        layout: { order: 3 },
      },
      viewportOverrides: {},
    },

    // ----------------------------------------------------
    // 3. CONTINUOUS WORKFLOW MODULES SECTION (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-cards-section': {
      id: 'flowith-cards-section',
      type: 'section',
      label: 'Flowith Workflow Modules Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 32px', backgroundColor: '#f8fafc' },
        size: { width: '100%', maxWidth: '100%' },
        layout: { flexDirection: 'column', gap: '20px', order: 3 },
      },
      viewportOverrides: {},
    },
    'flowith-cards-heading': {
      id: 'flowith-cards-heading',
      type: 'heading',
      label: 'Flowith Section Heading',
      parentId: 'flowith-cards-section',
      baseProperties: {
        content: { text: 'Automate Complex Enterprise Operations' },
        style: { fontSize: '30px', color: '#0f172a', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-cards-desc': {
      id: 'flowith-cards-desc',
      type: 'paragraph',
      label: 'Flowith Section Description',
      parentId: 'flowith-cards-section',
      baseProperties: {
        content: { text: 'Connect team workflows, customer data pipelines, and operational triggers seamlessly.' },
        style: { fontSize: '15px', color: '#64748b', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'flowith-cards-grid': {
      id: 'flowith-cards-grid',
      type: 'container',
      label: 'Flowith Cards Grid Container',
      parentId: 'flowith-cards-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1100px' },
        layout: { flexDirection: 'row', gap: '20px', order: 3 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '16px' } },
      },
    },
    'flowith-card-1': {
      id: 'flowith-card-1',
      type: 'card',
      label: 'Flowith Card 1: Intelligent Sync',
      parentId: 'flowith-cards-grid',
      baseProperties: {
        content: { badgeText: 'INTELLIGENT SYNC', text: 'Intelligent Data Sync: Synchronize CRM, billing, and database updates across tools in real time.' },
        style: { backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-card-2': {
      id: 'flowith-card-2',
      type: 'card',
      label: 'Flowith Card 2: Operations Automation',
      parentId: 'flowith-cards-grid',
      baseProperties: {
        content: { badgeText: 'OPERATIONS', text: 'Operations Automation: Eliminate repetitive manual work with event-driven automated flows.' },
        style: { backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-card-3': {
      id: 'flowith-card-3',
      type: 'card',
      label: 'Flowith Card 3: Enterprise Governance',
      parentId: 'flowith-cards-grid',
      baseProperties: {
        content: { badgeText: 'GOVERNANCE', text: 'Enterprise Governance: Role-based access control, audit logs, and SOC2 compliance out of the box.' },
        style: { backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },

    // ----------------------------------------------------
    // 4. CONTINUOUS FEATURES GRID SECTION (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-feat-section': {
      id: 'flowith-feat-section',
      type: 'section',
      label: 'Flowith Features Section Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 32px', backgroundColor: '#ffffff' },
        size: { width: '100%', maxWidth: '100%' },
        layout: { flexDirection: 'column', gap: '20px', order: 4 },
      },
      viewportOverrides: {},
    },
    'flowith-feat-heading': {
      id: 'flowith-feat-heading',
      type: 'heading',
      label: 'Flowith Features Heading',
      parentId: 'flowith-feat-section',
      baseProperties: {
        content: { text: 'Powerful Enterprise Automation Platform' },
        style: { fontSize: '30px', color: '#0f172a', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-feat-desc': {
      id: 'flowith-feat-desc',
      type: 'paragraph',
      label: 'Flowith Features Description',
      parentId: 'flowith-feat-section',
      baseProperties: {
        content: { text: 'Everything required to design, test, and scale enterprise operational workflows.' },
        style: { fontSize: '15px', color: '#64748b', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'flowith-feat-grid': {
      id: 'flowith-feat-grid',
      type: 'container',
      label: 'Flowith Feature Cards Grid Container',
      parentId: 'flowith-feat-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1100px' },
        layout: { flexDirection: 'row', gap: '20px', order: 3 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '16px' } },
      },
    },
    'flowith-feat-1': {
      id: 'flowith-feat-1',
      type: 'card',
      label: 'Feature: Visual Flow Canvas',
      parentId: 'flowith-feat-grid',
      baseProperties: {
        content: { badgeText: 'VISUAL BUILDER', text: 'Visual Flow Canvas: Drag-and-drop workflow designer for team collaboration.' },
        style: { backgroundColor: '#f8fafc', color: '#334155', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-feat-2': {
      id: 'flowith-feat-2',
      type: 'card',
      label: 'Feature: 500+ Tool Integrations',
      parentId: 'flowith-feat-grid',
      baseProperties: {
        content: { badgeText: 'INTEGRATIONS', text: '500+ Connectors: Connect Slack, Salesforce, HubSpot, Zendesk, and PostgreSQL.' },
        style: { backgroundColor: '#f8fafc', color: '#334155', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-feat-3': {
      id: 'flowith-feat-3',
      type: 'card',
      label: 'Feature: Real-Time Audit Logs',
      parentId: 'flowith-feat-grid',
      baseProperties: {
        content: { badgeText: 'SECURITY', text: 'Real-Time Audit Logs: Complete transparency into workflow execution history.' },
        style: { backgroundColor: '#f8fafc', color: '#334155', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },

    // ----------------------------------------------------
    // 5. CONTINUOUS HOW IT WORKS SECTION (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-how-section': {
      id: 'flowith-how-section',
      type: 'section',
      label: 'Flowith How It Works Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 32px', backgroundColor: '#fafcfb' },
        size: { width: '100%', maxWidth: '100%' },
        layout: { flexDirection: 'column', gap: '20px', order: 5 },
      },
      viewportOverrides: {},
    },
    'flowith-how-heading': {
      id: 'flowith-how-heading',
      type: 'heading',
      label: 'Flowith Process Heading',
      parentId: 'flowith-how-section',
      baseProperties: {
        content: { text: 'Three Simple Steps to Automated Operations' },
        style: { fontSize: '30px', color: '#0f172a', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-how-grid': {
      id: 'flowith-how-grid',
      type: 'container',
      label: 'Flowith Process Steps Container',
      parentId: 'flowith-how-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1000px' },
        layout: { flexDirection: 'row', gap: '20px', order: 2 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '16px' } },
      },
    },
    'flowith-step-1': {
      id: 'flowith-step-1',
      type: 'card',
      label: 'Step 01: Connect Applications',
      parentId: 'flowith-how-grid',
      baseProperties: {
        content: { badgeText: 'STEP 01', text: 'Connect Applications: Authenticate your enterprise software tools safely.' },
        style: { backgroundColor: '#ffffff', color: '#1e293b', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-step-2': {
      id: 'flowith-step-2',
      type: 'card',
      label: 'Step 02: Configure Triggers',
      parentId: 'flowith-how-grid',
      baseProperties: {
        content: { badgeText: 'STEP 02', text: 'Configure Triggers: Set up event rules, filters, and branching logic.' },
        style: { backgroundColor: '#ffffff', color: '#1e293b', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-step-3': {
      id: 'flowith-step-3',
      type: 'card',
      label: 'Step 03: Run Automated Flow',
      parentId: 'flowith-how-grid',
      baseProperties: {
        content: { badgeText: 'STEP 03', text: 'Run Automated Flow: Launch workflows with sub-second execution speeds.' },
        style: { backgroundColor: '#ffffff', color: '#1e293b', padding: '20px', borderRadius: '12px' },
        size: { width: '30%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },

    // ----------------------------------------------------
    // 6. CONTINUOUS PRODUCT CONVERSION CTA PANEL (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-cta-section': {
      id: 'flowith-cta-section',
      type: 'section',
      label: 'Flowith Conversion CTA Section',
      baseProperties: {
        style: { display: 'flex', padding: '48px 32px', backgroundColor: '#ecfdf5', borderRadius: '20px' },
        size: { width: '100%', maxWidth: '900px' },
        layout: { flexDirection: 'column', gap: '18px', order: 6 },
      },
      viewportOverrides: {},
    },
    'flowith-cta-heading': {
      id: 'flowith-cta-heading',
      type: 'heading',
      label: 'Flowith CTA Heading',
      parentId: 'flowith-cta-section',
      baseProperties: {
        content: { text: 'Ready to Transform Your Enterprise Workflows?' },
        style: { fontSize: '32px', color: '#064e3b', textAlign: 'center' },
        layout: { order: 1 },
      },
      viewportOverrides: {},
    },
    'flowith-cta-desc': {
      id: 'flowith-cta-desc',
      type: 'paragraph',
      label: 'Flowith CTA Description',
      parentId: 'flowith-cta-section',
      baseProperties: {
        content: { text: 'Build and scale intelligent operational flows with team collaboration and guaranteed SLAs.' },
        style: { fontSize: '15px', color: '#047857', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
    'flowith-cta-btn': {
      id: 'flowith-cta-btn',
      type: 'button',
      label: 'Flowith Conversion CTA Button',
      parentId: 'flowith-cta-section',
      baseProperties: {
        content: { text: '🌱 Start Building for Free' },
        style: { backgroundColor: '#059669', color: '#ffffff', fontSize: '14px', padding: '12px 28px', borderRadius: '10px' },
        size: { width: 'auto' },
        layout: { order: 3 },
      },
      viewportOverrides: {},
    },

    // ----------------------------------------------------
    // 7. CONTINUOUS FOOTER SECTION & CHILDREN (LIGHT THEME)
    // ----------------------------------------------------
    'flowith-footer-section': {
      id: 'flowith-footer-section',
      type: 'section',
      label: 'Flowith Footer Wrapper',
      baseProperties: {
        style: { display: 'flex', padding: '48px 32px 24px', backgroundColor: '#f8fafc' },
        size: { width: '100%', maxWidth: '100%' },
        layout: { flexDirection: 'column', gap: '28px', order: 7 },
      },
      viewportOverrides: {},
    },
    'flowith-footer-columns': {
      id: 'flowith-footer-columns',
      type: 'container',
      label: 'Flowith Footer Columns Container',
      parentId: 'flowith-footer-section',
      baseProperties: {
        style: { display: 'flex', backgroundColor: 'transparent' },
        size: { width: '100%', maxWidth: '1100px' },
        layout: { flexDirection: 'row', gap: '24px', order: 1 },
      },
      viewportOverrides: {
        mobile: { layout: { flexDirection: 'column', gap: '20px' } },
      },
    },
    'flowith-footer-brand': {
      id: 'flowith-footer-brand',
      type: 'card',
      label: 'Flowith Footer Brand',
      parentId: 'flowith-footer-columns',
      baseProperties: {
        content: { badgeText: '🌱 Flowith', text: 'Flowith Automation: Enterprise workflow suite for modern operational teams.' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        size: { width: '35%' },
        layout: { order: 1 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-footer-products': {
      id: 'flowith-footer-products',
      type: 'card',
      label: 'Flowith Footer Products',
      parentId: 'flowith-footer-columns',
      baseProperties: {
        content: { badgeText: 'PRODUCTS', text: 'Solutions • Connectors • Flow Builder • Pricing' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        size: { width: '20%' },
        layout: { order: 2 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-footer-company': {
      id: 'flowith-footer-company',
      type: 'card',
      label: 'Flowith Footer Company',
      parentId: 'flowith-footer-columns',
      baseProperties: {
        content: { badgeText: 'COMPANY', text: 'About Us • Customers • Careers • Trust Center' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        size: { width: '20%' },
        layout: { order: 3 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-footer-resources': {
      id: 'flowith-footer-resources',
      type: 'card',
      label: 'Flowith Footer Resources',
      parentId: 'flowith-footer-columns',
      baseProperties: {
        content: { badgeText: 'RESOURCES', text: 'Documentation • API Docs • Status Page • Support' },
        style: { backgroundColor: 'transparent', color: '#475569', fontSize: '13px' },
        size: { width: '20%' },
        layout: { order: 4 },
      },
      viewportOverrides: { mobile: { size: { width: '100%' } } },
    },
    'flowith-footer-bottom': {
      id: 'flowith-footer-bottom',
      type: 'card',
      label: 'Flowith Footer Bottom Bar',
      parentId: 'flowith-footer-section',
      baseProperties: {
        content: { badgeText: 'FLOWITH AUTOMATION', text: '© 2026 Flowith Automation Inc. All rights reserved. • Privacy Policy • Terms of Service' },
        style: { backgroundColor: 'transparent', color: '#64748b', fontSize: '12px', textAlign: 'center' },
        layout: { order: 2 },
      },
      viewportOverrides: {},
    },
  },
};
