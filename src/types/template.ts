export type ViewportScope = 'all' | 'desktop' | 'tablet' | 'mobile';

export type ElementType = 'heading' | 'paragraph' | 'button' | 'image' | 'card' | 'container' | 'section';

export interface ElementProperties {
  content?: {
    text?: string;
    src?: string;
    alt?: string;
    badgeText?: string;
  };
  style?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
    textAlign?: 'left' | 'center' | 'right';
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    display?: 'block' | 'flex' | 'grid' | 'none';
    position?: 'relative' | 'absolute' | 'fixed';
  };
  size?: {
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
  };
  layout?: {
    flexDirection?: 'row' | 'column';
    order?: number;
    gap?: string;
  };
}

export interface TemplateElement {
  id: string; // Stable element ID (e.g. "hero-title")
  type: ElementType;
  label: string; // Human-readable name (e.g. "Hero Main Title")
  parentId?: string;
  baseProperties: ElementProperties; // Shared base values
  viewportOverrides: {
    desktop?: Partial<ElementProperties>;
    tablet?: Partial<ElementProperties>;
    mobile?: Partial<ElementProperties>;
  };
}

export interface TemplatePage {
  id: string;
  name: string;
  slug: string;
  elements: Record<string, TemplateElement>;
}

export interface TemplateModel {
  templateId: string;
  name: string;
  version: number; // Global template revision counter
  elements: Record<string, TemplateElement>;
  pages?: Record<string, TemplatePage>;
  activePageId?: string;
}

// Scope-Specific Patch: exact properties being modified for a given scope
export type ScopeSpecificPatch = Partial<ElementProperties>;

export interface EditCommand {
  id: string;
  timestamp: number;
  source: 'canvas' | 'code' | 'ai' | 'restore';
  targetIds: string[];
  viewportScope: ViewportScope;
  baseRevision: number;
  changes: Record<string, ScopeSpecificPatch>; // Map of elementId -> Scope-specific patch
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface RevisionHistoryEntry {
  id: string;
  timestamp: number;
  elementId: string;
  viewportScope: ViewportScope;
  revision: number;
  previousState: ScopeSpecificPatch; // Exact base or override state prior to edit
  nextState: ScopeSpecificPatch;     // Exact base or override state after edit
  actionType: 'manual' | 'ai_accepted' | 'restore';
  description: string;
}

export interface Proposal {
  id: string;
  elementId: string;
  viewportScope: ViewportScope;
  status: 'pending' | 'accepted' | 'rejected' | 'invalid';
  beforeProperties: ElementProperties; // Resolved preview before change
  proposedPatch: ScopeSpecificPatch;   // Scope-specific patch ONLY
  proposedPreviewProperties: ElementProperties; // Resolved preview after change
  validationErrors?: string[];
}
