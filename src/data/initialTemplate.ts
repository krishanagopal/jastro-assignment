import { TemplateModel } from '../types/template';

export const INITIAL_TEMPLATE: TemplateModel = {
  templateId: 'apex-solutions-v1',
  name: 'Apex Solutions - Business Landing Page',
  version: 1,
  elements: {
    'hero-title': {
      id: 'hero-title',
      type: 'heading',
      label: 'Hero Headline',
      baseProperties: {
        content: {
          text: 'Scale Your Business With Intelligent Solutions',
        },
        style: {
          color: '#0f172a',
          fontSize: '36px',
          textAlign: 'center',
        },
        size: {
          maxWidth: '800px',
        },
        layout: {
          order: 1,
        },
      },
      viewportOverrides: {
        mobile: {
          style: {
            fontSize: '26px',
            textAlign: 'center',
          },
        },
      },
    },
    'hero-subtitle': {
      id: 'hero-subtitle',
      type: 'paragraph',
      label: 'Hero Subtitle',
      baseProperties: {
        content: {
          text: 'Transform your digital presence with our high-impact growth strategy and automated workflow solutions.',
        },
        style: {
          color: '#475569',
          fontSize: '18px',
          textAlign: 'center',
        },
        size: {
          maxWidth: '650px',
        },
        layout: {
          order: 2,
        },
      },
      viewportOverrides: {
        mobile: {
          style: {
            fontSize: '15px',
          },
        },
      },
    },
    'hero-cta-button': {
      id: 'hero-cta-button',
      type: 'button',
      label: 'Hero CTA Button',
      baseProperties: {
        content: {
          text: 'Get Started Free',
        },
        style: {
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontSize: '16px',
          padding: '12px 28px',
          borderRadius: '8px',
          textAlign: 'center',
        },
        size: {
          width: 'auto',
        },
        layout: {
          order: 3,
        },
      },
      viewportOverrides: {
        mobile: {
          size: {
            width: '100%',
          },
        },
      },
    },
    'service-card-1': {
      id: 'service-card-1',
      type: 'card',
      label: 'Service Card: Strategy',
      baseProperties: {
        content: {
          text: 'Growth Strategy: Custom analytics & roadmap tailored to your target revenue targets.',
          badgeText: 'Strategy',
        },
        style: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          fontSize: '14px',
          padding: '24px',
          borderRadius: '12px',
        },
        size: {
          width: '30%',
        },
        layout: {
          order: 4,
        },
      },
      viewportOverrides: {
        mobile: {
          size: {
            width: '100%',
          },
        },
      },
    },
    'service-card-2': {
      id: 'service-card-2',
      type: 'card',
      label: 'Service Card: Automation',
      baseProperties: {
        content: {
          text: 'Workflow Automation: Streamline customer inquiries and operational bottlenecks automatically.',
          badgeText: 'Automation',
        },
        style: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          fontSize: '14px',
          padding: '24px',
          borderRadius: '12px',
        },
        size: {
          width: '30%',
        },
        layout: {
          order: 5,
        },
      },
      viewportOverrides: {
        mobile: {
          size: {
            width: '100%',
          },
        },
      },
    },
    'service-card-3': {
      id: 'service-card-3',
      type: 'card',
      label: 'Service Card: Design',
      baseProperties: {
        content: {
          text: 'Brand Optimization: Modern responsive UI design designed to build instant visitor trust.',
          badgeText: 'Design',
        },
        style: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          fontSize: '14px',
          padding: '24px',
          borderRadius: '12px',
        },
        size: {
          width: '30%',
        },
        layout: {
          order: 6,
        },
      },
      viewportOverrides: {
        mobile: {
          size: {
            width: '100%',
          },
        },
      },
    },
    'value-prop-card': {
      id: 'value-prop-card',
      type: 'card',
      label: 'Value Proposition Banner',
      baseProperties: {
        content: {
          text: 'Trusted by over 500+ small business owners across North America.',
          badgeText: 'Why Choose Us',
        },
        style: {
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontSize: '16px',
          padding: '32px',
          borderRadius: '16px',
          textAlign: 'center',
        },
        size: {
          width: '100%',
        },
        layout: {
          order: 7,
        },
      },
      viewportOverrides: {},
    },
    'cta-section-title': {
      id: 'cta-section-title',
      type: 'heading',
      label: 'Footer CTA Headline',
      baseProperties: {
        content: {
          text: 'Ready to elevate your business today?',
        },
        style: {
          color: '#0f172a',
          fontSize: '28px',
          textAlign: 'center',
        },
        size: {
          width: '100%',
        },
        layout: {
          order: 8,
        },
      },
      viewportOverrides: {},
    },
    'footer-text': {
      id: 'footer-text',
      type: 'paragraph',
      label: 'Footer Copyright',
      baseProperties: {
        content: {
          text: '© 2026 Apex Solutions Inc. All rights reserved.',
        },
        style: {
          color: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
        },
        size: {
          width: '100%',
        },
        layout: {
          order: 9,
        },
      },
      viewportOverrides: {},
    },
  },
};
