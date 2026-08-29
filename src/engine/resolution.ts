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

/**
 * Applies a scope-specific property patch to an element and returns a new TemplateElement.
 */
export function applyScopePatchToElement(
  element: TemplateElement,
  scope: ViewportScope,
  patch: Partial<ElementProperties>,
  isRestore = false
): TemplateElement {
  // Full revision restore (e.g. history recovery where patch provides full ElementProperties)
  const isFullRestore =
    isRestore &&
    (patch.content !== undefined || patch.size !== undefined || patch.layout !== undefined);

  if (isFullRestore) {
    if (scope === 'all') {
      return {
        ...element,
        baseProperties: JSON.parse(JSON.stringify(patch as ElementProperties)),
      };
    }
    return {
      ...element,
      viewportOverrides: {
        ...element.viewportOverrides,
        [scope]: JSON.parse(JSON.stringify(patch as ElementProperties)),
      },
    };
  }

  // Partial edit / property reset patch
  if (scope === 'all') {
    const updatedStyle = { ...element.baseProperties.style, ...patch.style };
    if (patch.style) {
      for (const k in patch.style) {
        if ((patch.style as any)[k] === undefined) {
          delete (updatedStyle as any)[k];
        }
      }
    }

    const updatedContent = patch.content
      ? { ...element.baseProperties.content, ...patch.content }
      : element.baseProperties.content;
    const updatedSize = patch.size
      ? { ...element.baseProperties.size, ...patch.size }
      : element.baseProperties.size;
    const updatedLayout = patch.layout
      ? { ...element.baseProperties.layout, ...patch.layout }
      : element.baseProperties.layout;

    return {
      ...element,
      baseProperties: {
        content: updatedContent,
        style: updatedStyle,
        size: updatedSize,
        layout: updatedLayout,
      },
    };
  }

  const existingOverride = element.viewportOverrides[scope] || {};
  const updatedStyle = { ...existingOverride.style, ...patch.style };
  if (patch.style) {
    for (const k in patch.style) {
      if ((patch.style as any)[k] === undefined) {
        delete (updatedStyle as any)[k];
      }
    }
  }

  const updatedContent = patch.content
    ? { ...existingOverride.content, ...patch.content }
    : existingOverride.content;
  const updatedSize = patch.size
    ? { ...existingOverride.size, ...patch.size }
    : existingOverride.size;
  const updatedLayout = patch.layout
    ? { ...existingOverride.layout, ...patch.layout }
    : existingOverride.layout;

  const updatedOverride = {
    content: updatedContent,
    style: updatedStyle,
    size: updatedSize,
    layout: updatedLayout,
  };

  return {
    ...element,
    viewportOverrides: {
      ...element.viewportOverrides,
      [scope]: updatedOverride,
    },
  };
}
