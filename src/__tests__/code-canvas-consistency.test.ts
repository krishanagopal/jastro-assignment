import { describe, expect, it } from 'vitest';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { commitEditCommand } from '../engine/commit';
import { validateEditCommand } from '../engine/validation';
import { EditCommand } from '../types/template';

describe('Code & Canvas State Consistency', () => {
  it('updates canonical state when a valid code edit command is committed', () => {
    const codeEditCommand: EditCommand = {
      id: 'cmd_code_1',
      timestamp: Date.now(),
      source: 'code',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          content: { text: 'Title Modified Via Code' },
          style: { color: '#00ff00' },
        },
      },
    };

    const validation = validateEditCommand(codeEditCommand, INITIAL_TEMPLATE, ['hero-title']);
    expect(validation.valid).toBe(true);

    const { updatedModel } = commitEditCommand(INITIAL_TEMPLATE, codeEditCommand);
    expect(updatedModel.elements['hero-title'].baseProperties.content?.text).toBe('Title Modified Via Code');
    expect(updatedModel.elements['hero-title'].baseProperties.style?.color).toBe('#00ff00');
  });

  it('rejects invalid code payload edits and leaves canonical state completely untouched', () => {
    const invalidCodeCommand: EditCommand = {
      id: 'cmd_code_invalid',
      timestamp: Date.now(),
      source: 'code',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          invalidCategory: { value: 'bad' },
        } as any,
      },
    };

    const validation = validateEditCommand(invalidCodeCommand, INITIAL_TEMPLATE, ['hero-title']);
    expect(validation.valid).toBe(false);

    // Initial state remains untouched
    expect(INITIAL_TEMPLATE.elements['hero-title'].baseProperties.content?.text).toBe(
      'Scale Your Business With Intelligent Solutions'
    );
  });
});
