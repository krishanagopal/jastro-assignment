import { EditCommand, TemplateModel, ValidationResult } from '../types/template';

const ALLOWED_TOP_FIELDS = new Set(['content', 'style', 'size', 'layout']);

const ALLOWED_STYLE_PROPERTIES = new Set([
  'backgroundColor',
  'color',
  'borderColor',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'textDecoration',
  'lineHeight',
  'letterSpacing',
  'textAlign',
  'textTransform',
  'fontFamily',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'borderRadius',
  'display',
  'position',
]);

/**
 * Validates whether a given string is a valid CSS color (HEX, RGB, RGBA, HSL, transparent, inherit, currentColor).
 */
export function isValidCssColorString(color: string | undefined | null): boolean {
  if (color === undefined || color === null || color === '') return true;
  const trimmed = color.trim().toLowerCase();
  if (['transparent', 'inherit', 'currentcolor', 'initial', 'unset'].includes(trimmed)) {
    return true;
  }
  // Hex color matching: #333, #333333, #333333ff
  const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
  if (hexRegex.test(trimmed)) return true;

  // rgb(...) / rgba(...) matching
  const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i;
  if (rgbRegex.test(trimmed)) return true;

  // hsl(...) / hsla(...) matching
  const hslRegex = /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i;
  if (hslRegex.test(trimmed)) return true;

  return false;
}

/**
 * Validates an incoming EditCommand against canonical state and selection rules.
 * Returns { valid: boolean, errors: string[] }.
 */
export function validateEditCommand(
  command: EditCommand,
  state: TemplateModel,
  selectedElementIds: string[] = []
): ValidationResult {
  const errors: string[] = [];

  // 1. Revision Validation
  if (command.baseRevision !== state.version) {
    errors.push(
      `Stale revision: Command revision (${command.baseRevision}) does not match current state version (${state.version}).`
    );
  }

  // 2. Viewport Scope Validation
  const validScopes = ['all', 'desktop', 'tablet', 'mobile'];
  if (!validScopes.includes(command.viewportScope)) {
    errors.push(`Invalid viewport scope: "${command.viewportScope}". Must be one of ${validScopes.join(', ')}.`);
  }

  // 3. Target IDs Validation
  if (!command.targetIds || command.targetIds.length === 0) {
    errors.push('Edit command contains no target element IDs.');
  }

  for (const targetId of command.targetIds) {
    // ID existence check
    if (!state.elements[targetId]) {
      errors.push(`Target element ID "${targetId}" does not exist in template state.`);
      continue;
    }

    // Selection Bounds check for AI source
    if (command.source === 'ai' && !selectedElementIds.includes(targetId)) {
      errors.push(`AI selection violation: Target ID "${targetId}" is not currently selected.`);
    }

    // Check patch payload for targetId
    const patch = command.changes[targetId];
    if (!patch) {
      errors.push(`Missing property changes patch for target ID "${targetId}".`);
      continue;
    }

    // Allowed Fields check
    for (const key of Object.keys(patch)) {
      if (!ALLOWED_TOP_FIELDS.has(key)) {
        errors.push(
          `Forbidden property category "${key}" on element "${targetId}". Allowed fields: ${Array.from(
            ALLOWED_TOP_FIELDS
          ).join(', ')}.`
        );
      }
    }

    // Validate style property keys and values
    if (patch.style) {
      for (const styleKey of Object.keys(patch.style)) {
        if (!ALLOWED_STYLE_PROPERTIES.has(styleKey)) {
          errors.push(`Forbidden style property "${styleKey}" on element "${targetId}".`);
          continue;
        }

        if (['backgroundColor', 'color', 'borderColor'].includes(styleKey)) {
          const colorVal = (patch.style as any)[styleKey];
          if (!isValidCssColorString(colorVal)) {
            errors.push(`Invalid color format "${colorVal}" for style property "${styleKey}".`);
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
