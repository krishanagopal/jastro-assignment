import { EditCommand, TemplateModel, ValidationResult } from '../types/template';

const ALLOWED_TOP_FIELDS = new Set(['content', 'style', 'size', 'layout']);

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
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
