import { describe, expect, it } from 'vitest';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { validateEditCommand } from '../engine/validation';
import { EditCommand } from '../types/template';

describe('Validation Pipeline', () => {
  it('approves a valid canvas edit command targeting an existing element', () => {
    const command: EditCommand = {
      id: 'cmd_1',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          content: { text: 'New Valid Title' },
        },
      },
    };

    const result = validateEditCommand(command, INITIAL_TEMPLATE, ['hero-title']);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects edit commands with non-existent target element IDs', () => {
    const command: EditCommand = {
      id: 'cmd_2',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['non-existent-id'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'non-existent-id': {
          content: { text: 'Test' },
        },
      },
    };

    const result = validateEditCommand(command, INITIAL_TEMPLATE, []);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('does not exist');
  });

  it('rejects stale revision edit commands', () => {
    const command: EditCommand = {
      id: 'cmd_3',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version - 1, // Stale revision
      changes: {
        'hero-title': {
          content: { text: 'Test' },
        },
      },
    };

    const result = validateEditCommand(command, INITIAL_TEMPLATE, ['hero-title']);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('Stale revision');
  });

  it('rejects invalid viewport scope strings', () => {
    const command: EditCommand = {
      id: 'cmd_4',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'ultra-wide' as any,
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          content: { text: 'Test' },
        },
      },
    };

    const result = validateEditCommand(command, INITIAL_TEMPLATE, ['hero-title']);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('Invalid viewport scope');
  });

  it('rejects forbidden property categories outside allowed top fields', () => {
    const command: EditCommand = {
      id: 'cmd_5',
      timestamp: Date.now(),
      source: 'canvas',
      targetIds: ['hero-title'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-title': {
          forbiddenCategory: { payload: 'malicious' },
        } as any,
      },
    };

    const result = validateEditCommand(command, INITIAL_TEMPLATE, ['hero-title']);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('Forbidden property category');
  });
});
