import {
  EditCommand,
  RevisionHistoryEntry,
  ScopeSpecificPatch,
  TemplateModel,
  ViewportScope,
} from '../types/template';
import { getScopeSpecificProperties } from './resolution';

export interface CommitResult {
  updatedModel: TemplateModel;
  newHistoryEntries: RevisionHistoryEntry[];
}

/**
 * Commits a validated EditCommand to the canonical state.
 * Returns the updated TemplateModel and generated scope-specific history entries.
 */
export function commitEditCommand(
  state: TemplateModel,
  command: EditCommand
): CommitResult {
  // Deep clone elements to prevent direct mutation
  const updatedElements = JSON.parse(JSON.stringify(state.elements));
  const newHistoryEntries: RevisionHistoryEntry[] = [];
  const nextVersion = state.version + 1;

  for (const targetId of command.targetIds) {
    const element = updatedElements[targetId];
    if (!element) continue;

    const patch = command.changes[targetId];
    if (!patch) continue;

    // Capture previous scope-specific state before mutation
    const previousState: ScopeSpecificPatch = JSON.parse(
      JSON.stringify(getScopeSpecificProperties(element, command.viewportScope))
    );

    // Apply patch to intended scope ONLY
    if (command.viewportScope === 'all') {
      if (command.source === 'restore') {
        element.baseProperties = JSON.parse(JSON.stringify(patch));
      } else {
        element.baseProperties = mergeProperties(element.baseProperties, patch);
      }
    } else {
      if (command.source === 'restore') {
        element.viewportOverrides[command.viewportScope] = JSON.parse(JSON.stringify(patch));
      } else {
        const currentOverride = element.viewportOverrides[command.viewportScope] || {};
        element.viewportOverrides[command.viewportScope] = mergeProperties(currentOverride, patch);
      }
    }

    // Capture next scope-specific state after mutation
    const nextState: ScopeSpecificPatch = JSON.parse(
      JSON.stringify(getScopeSpecificProperties(element, command.viewportScope))
    );

    // Map source to actionType
    const actionType: RevisionHistoryEntry['actionType'] =
      command.source === 'ai'
        ? 'ai_accepted'
        : command.source === 'restore'
        ? 'restore'
        : 'manual';

    const historyEntry: RevisionHistoryEntry = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: command.timestamp || Date.now(),
      elementId: targetId,
      viewportScope: command.viewportScope,
      revision: nextVersion,
      previousState,
      nextState,
      actionType,
      description: formatCommitDescription(command, targetId, element.label),
    };

    newHistoryEntries.push(historyEntry);
  }

  const updatedModel: TemplateModel = {
    ...state,
    version: nextVersion,
    elements: updatedElements,
  };

  return {
    updatedModel,
    newHistoryEntries,
  };
}

/**
 * Deeply merges a scope-specific patch into existing properties object.
 */
function mergeProperties(
  target: ScopeSpecificPatch,
  patch: ScopeSpecificPatch
): ScopeSpecificPatch {
  const result: ScopeSpecificPatch = { ...target };

  if (patch.content) {
    result.content = { ...(result.content || {}), ...patch.content };
  }
  if (patch.style) {
    result.style = { ...(result.style || {}), ...patch.style };
  }
  if (patch.size) {
    result.size = { ...(result.size || {}), ...patch.size };
  }
  if (patch.layout) {
    result.layout = { ...(result.layout || {}), ...patch.layout };
  }

  return result;
}

function formatCommitDescription(
  command: EditCommand,
  elementId: string,
  elementLabel: string
): string {
  const scopeLabel = command.viewportScope.toUpperCase();
  if (command.source === 'restore') {
    return `Restored ${elementLabel} (${scopeLabel} scope)`;
  }
  if (command.source === 'ai') {
    return `AI Edit accepted for ${elementLabel} (${scopeLabel} scope)`;
  }
  return `Manual edit on ${elementLabel} (${scopeLabel} scope)`;
}
