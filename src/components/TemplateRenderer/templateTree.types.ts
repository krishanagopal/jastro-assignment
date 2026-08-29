import { ElementProperties, TemplateElement, ViewportScope } from '../../types/template';

export interface RenderContext {
  elementsMap: Record<string, TemplateElement>;
  activeViewport: ViewportScope;
  selectedElementIds?: string[];
  isEditorMode: boolean;
  onSelectElement?: (id: string, multiSelect: boolean) => void;
}

export interface TreeValidationResult {
  valid: boolean;
  errors: string[];
}
