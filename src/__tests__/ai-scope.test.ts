import { describe, expect, it } from 'vitest';
import { INITIAL_TEMPLATE } from '../data/initialTemplate';
import { generateAiProposals } from '../engine/aiDemoEngine';
import { validateEditCommand } from '../engine/validation';
import { EditCommand } from '../types/template';

describe('AI Scope & Bounds Enforcement', () => {
  it('generates proposals targeting only the currently selected element IDs', () => {
    const selectedIds = ['hero-title'];
    const proposals = generateAiProposals({
      instruction: 'Make headline punchy',
      selectedElementIds: selectedIds,
      viewportScope: 'all',
      state: INITIAL_TEMPLATE,
    });

    expect(proposals).toHaveLength(1);
    expect(proposals[0].elementId).toBe('hero-title');
    expect(proposals[0].status).toBe('pending');
  });

  it('rejects AI proposal application if target ID is NOT currently selected', () => {
    // Attempting to execute an AI edit on 'hero-subtitle' when only 'hero-title' is selected
    const aiCommand: EditCommand = {
      id: 'cmd_ai_unselected',
      timestamp: Date.now(),
      source: 'ai',
      targetIds: ['hero-subtitle'],
      viewportScope: 'all',
      baseRevision: INITIAL_TEMPLATE.version,
      changes: {
        'hero-subtitle': { content: { text: 'Unselected edit' } },
      },
    };

    const validation = validateEditCommand(aiCommand, INITIAL_TEMPLATE, ['hero-title']);
    expect(validation.valid).toBe(false);
    expect(validation.errors[0]).toContain('AI selection violation');
  });

  it('handles safe failure scenarios when an unsupported or dangerous prompt is passed', () => {
    const proposals = generateAiProposals({
      instruction: 'delete whole website',
      selectedElementIds: ['hero-title'],
      viewportScope: 'all',
      state: INITIAL_TEMPLATE,
    });

    expect(proposals).toHaveLength(1);
    expect(proposals[0].status).toBe('invalid');
    expect(proposals[0].validationErrors![0]).toContain('Unsupported or unsafe AI instruction');
  });
});
