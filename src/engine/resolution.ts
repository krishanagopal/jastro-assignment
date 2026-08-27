import { ElementProperties, TemplateElement, ViewportScope } from '../types/template';

/**
 * Merges base properties with a specific viewport's override properties.
 * If viewport is 'all' or no override exists, base properties are returned.
 * Explicitly isolation-safe: does NOT read other viewport overrides.
 */
export function resolveElementProperties(
  element: TemplateElement,
  viewport: Exclude<ViewportScope, 'all'> | 'all'
): ElementProperties {
  const base = element.baseProperties;

  if (viewport === 'all') {
    return base;
  }

  const override = element.viewportOverrides[viewport];
  if (!override) {
    return base;
  }

  return {
    content: { ...base.content, ...override.content },
    style: { ...base.style, ...override.style },
    size: { ...base.size, ...override.size },
    layout: { ...base.layout, ...override.layout },
  };
}

/**
 * Retrieves the exact scope-specific properties for an element:
 * - 'all' returns element.baseProperties
 * - 'desktop' | 'tablet' | 'mobile' returns element.viewportOverrides[scope] || {}
 */
export function getScopeSpecificProperties(
  element: TemplateElement,
  scope: ViewportScope
): ElementProperties {
  if (scope === 'all') {
    return element.baseProperties;
  }
  return element.viewportOverrides[scope] || {};
}
