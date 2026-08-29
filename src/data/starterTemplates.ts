import { TemplateModel, TemplatePage } from '../types/template';
import { FLOWITH_TEMPLATE } from './flowithTemplate';
import { INITIAL_TEMPLATE } from './initialTemplate';

export interface StarterTemplate {
  id: string;
  name: string;
  category: 'Single Page' | 'Multi Page';
  description: string;
  badge: string;
  pageCount: number;
  templateModel: TemplateModel;
  pages: Record<string, TemplatePage>;
}

// ----------------------------------------------------
// TRIAL STARTER TEMPLATES (EXACTLY TWO SELECTION ITEMS)
// ----------------------------------------------------
export const APEX_AI_WORKFLOWS_STARTER: StarterTemplate = {
  id: 'apex-ai-workflows',
  name: 'ApexAI Workflows',
  category: 'Single Page',
  badge: 'DARK MONOCHROME',
  description: 'Dark premium black & grey operational landing page with silver accents, dual CTAs, and automated workflow cards.',
  pageCount: 1,
  templateModel: INITIAL_TEMPLATE,
  pages: {
    home: {
      id: 'home',
      name: 'Home Page',
      slug: '/',
      elements: INITIAL_TEMPLATE.elements,
    },
  },
};

export const FLOWITH_AUTOMATION_STARTER: StarterTemplate = {
  id: 'flowith-automation',
  name: 'Flowith Automation',
  category: 'Single Page',
  badge: 'LIGHT ENTERPRISE',
  description: 'Light enterprise workflow suite with emerald accents, clean spacious typography, organic cards, and SLA proof.',
  pageCount: 1,
  templateModel: FLOWITH_TEMPLATE,
  pages: {
    home: {
      id: 'home',
      name: 'Home Page',
      slug: '/',
      elements: FLOWITH_TEMPLATE.elements,
    },
  },
};

export const TRIAL_STARTER_TEMPLATES: StarterTemplate[] = [
  APEX_AI_WORKFLOWS_STARTER,
  FLOWITH_AUTOMATION_STARTER,
];

// Preserved starter templates collection for backwards compatibility
export const STARTER_TEMPLATES: StarterTemplate[] = TRIAL_STARTER_TEMPLATES;
