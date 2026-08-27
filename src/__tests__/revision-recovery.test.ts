import { describe, expect, it } from 'vitest';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { commitEditCommand } from '../engine/commit';
import { EditCommand } from '../types/template';

describe('Revision History & Independent Recovery', () => {
  it('creates scope-specific revision history entries on committed edits', () => {
    const editCommand: EditCommand = {
      id: 'cmd_edit_1',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'mobile',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          style: { fontSize: '30px' },
        },
      },
    };

    const { newHistoryEntries } = commitEditCommand(INITIAL_TEMPLATE, editCommand);

    expect(newHistoryEntries).toHaveLength(1);
    const entry = newHistoryEntries[0];
    expect(entry.elementId).toBe('hero-title');
    expect(entry.viewportScope).toBe('mobile');
    expect(entry.previousState.style?.fontSize).toBe('26px'); // Initial mobile override font size
    expect(entry.nextState.style?.fontSize).toBe('30px');
    expect(entry.actionType).toBe('manual');
  });

  it('restores one element at a specific viewport scope without affecting unrelated elements or viewports', () => {
    // 1. First edit: Modify mobile override of 'hero-title'
    const edit1Result = commitEditCommand(INITIAL_TEMPLATE, {
      id: 'cmd_1',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'mobile',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': { style: { color: '#111111' } },
      },
    });

    const modelAfterEdit1 = edit1Result.updatedModel;

    // 2. Second edit: Modify base property of 'hero-subtitle' (unrelated element)
    const edit2Result = commitEditCommand(modelAfterEdit1, {
      id: 'cmd_2',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-subtitle'],
      viewportScope: 'all',
      baseRevision: modelAfterEdit1.version,
      changes: {
        'hero-subtitle': { content: { text: 'Subtitle Edit' } },
      },
    });

    const modelAfterEdit2 = edit2Result.updatedModel;

    // 3. Restore 'hero-title' mobile override back to initial state using history entry 1 previousState
    const historyEntry1 = edit1Result.newHistoryEntries[0];

    const restoreCommand: EditCommand = {
      id: 'cmd_restore',
      timestamp: Date.now(),
      source: 'restore',
      targetIds: ['hero-title'],
      viewportScope: historyEntry1.viewportScope,
      baseRevision: modelAfterEdit2.version,
      changes: {
        'hero-title': historyEntry1.previousState,
      },
    };

    const restoreResult = commitEditCommand(modelAfterEdit2, restoreCommand);
    const finalModel = restoreResult.updatedModel;

    // 'hero-title' mobile color is restored to initial undefined/base
    expect(finalModel.elements['hero-title'].viewportOverrides.mobile?.style?.color).toBeUndefined();

    // Unrelated element 'hero-subtitle' retains its edit!
    expect(finalModel.elements['hero-subtitle'].baseProperties.content?.text).toBe('Subtitle Edit');

    // Restore action created a new history entry!
    expect(restoreResult.newHistoryEntries).toHaveLength(1);
    expect(restoreResult.newHistoryEntries[0].actionType).toBe('restore');
  });
});
