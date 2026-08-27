import { resolveElementProperties } from './resolution';
import { Proposal, TemplateModel, ViewportScope } from '../types/template';

export interface AiRequestOptions {
  instruction: string;
  selectedElementIds: string[];
  viewportScope: ViewportScope;
  state: TemplateModel;
}

/**
 * Deterministic scenario engine matching user prompts and selected elements.
 * Generates typed Proposal objects containing scope-specific patches (not full resolved copies).
 */
export function generateAiProposals(options: AiRequestOptions): Proposal[] {
  const { instruction, selectedElementIds, viewportScope, state } = options;
  const prompt = instruction.toLowerCase().trim();
  const proposals: Proposal[] = [];

  if (!selectedElementIds || selectedElementIds.length === 0) {
    return proposals;
  }

  // Helper to construct a single proposal object
  const createProposal = (
    elementId: string,
    proposedPatch: any,
    targetScope: ViewportScope = viewportScope
  ): Proposal => {
    const element = state.elements[elementId];
    if (!element) {
      return {
        id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        elementId,
        viewportScope: targetScope,
        status: 'invalid',
        beforeProperties: {},
        proposedPatch: {},
        proposedPreviewProperties: {},
        validationErrors: [`Target element "${elementId}" does not exist in template.`],
      };
    }

    // Verify selection bounds
    if (!selectedElementIds.includes(elementId)) {
      return {
        id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        elementId,
        viewportScope: targetScope,
        status: 'invalid',
        beforeProperties: resolveElementProperties(element, targetScope === 'all' ? 'desktop' : targetScope),
        proposedPatch: {},
        proposedPreviewProperties: resolveElementProperties(element, targetScope === 'all' ? 'desktop' : targetScope),
        validationErrors: [`Selection Violation: Target element "${element.label}" (${elementId}) is not selected.`],
      };
    }

    const previewViewport = targetScope === 'all' ? 'desktop' : targetScope;
    const beforeProperties = resolveElementProperties(element, previewViewport);

    // Create simulated preview properties
    const proposedPreviewProperties = JSON.parse(JSON.stringify(beforeProperties));
    if (proposedPatch.content) {
      proposedPreviewProperties.content = { ...proposedPreviewProperties.content, ...proposedPatch.content };
    }
    if (proposedPatch.style) {
      proposedPreviewProperties.style = { ...proposedPreviewProperties.style, ...proposedPatch.style };
    }
    if (proposedPatch.size) {
      proposedPreviewProperties.size = { ...proposedPreviewProperties.size, ...proposedPatch.size };
    }
    if (proposedPatch.layout) {
      proposedPreviewProperties.layout = { ...proposedPreviewProperties.layout, ...proposedPatch.layout };
    }

    return {
      id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      elementId,
      viewportScope: targetScope,
      status: 'pending',
      beforeProperties,
      proposedPatch,
      proposedPreviewProperties,
    };
  };

  // Scenario 1: Content Rewrite
  if (prompt.includes('rewrite') || prompt.includes('headline') || prompt.includes('content') || prompt.includes('text') || prompt.includes('punchy')) {
    for (const id of selectedElementIds) {
      const elem = state.elements[id];
      if (!elem) continue;

      if (elem.type === 'heading') {
        proposals.push(
          createProposal(id, {
            content: { text: 'Elevate Your Business With Intelligent Automation' },
          })
        );
      } else if (elem.type === 'paragraph') {
        proposals.push(
          createProposal(id, {
            content: { text: 'Accelerate revenue and boost operational performance with our modern AI platform.' },
          })
        );
      } else if (elem.type === 'button') {
        proposals.push(
          createProposal(id, {
            content: { text: 'Claim Your Free Strategy Session' },
          })
        );
      } else if (elem.type === 'card') {
        proposals.push(
          createProposal(id, {
            content: { text: 'AI-Powered Solutions: Automate customer workflows and reduce overhead by 40%.', badgeText: 'High ROI' },
          })
        );
      }
    }
    return proposals;
  }

  // Scenario 2: Style Change (Dark Luxury Theme / Colors)
  if (prompt.includes('dark') || prompt.includes('theme') || prompt.includes('color') || prompt.includes('style') || prompt.includes('indigo')) {
    for (const id of selectedElementIds) {
      const elem = state.elements[id];
      if (!elem) continue;

      if (elem.type === 'button') {
        proposals.push(
          createProposal(id, {
            style: {
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '14px 32px',
            },
          })
        );
      } else if (elem.type === 'heading' || elem.type === 'paragraph') {
        proposals.push(
          createProposal(id, {
            style: {
              color: '#1e1b4b',
              fontSize: elem.type === 'heading' ? '40px' : '19px',
            },
          })
        );
      } else if (elem.type === 'card') {
        proposals.push(
          createProposal(id, {
            style: {
              backgroundColor: '#1e1b4b',
              color: '#f8fafc',
              borderRadius: '16px',
            },
          })
        );
      }
    }
    return proposals;
  }

  // Scenario 3: Move / Resize / Reorder
  if (prompt.includes('reorder') || prompt.includes('swap') || prompt.includes('size') || prompt.includes('width') || prompt.includes('layout')) {
    for (const id of selectedElementIds) {
      const elem = state.elements[id];
      if (!elem) continue;

      proposals.push(
        createProposal(id, {
          size: { width: '100%', maxWidth: '900px' },
          layout: { order: (elem.baseProperties.layout?.order || 1) + 1 },
        })
      );
    }
    return proposals;
  }

  // Scenario 4: One-Viewport Responsive Adjustment (Mobile specific)
  if (prompt.includes('mobile') || prompt.includes('stack') || prompt.includes('responsive')) {
    const targetScope: ViewportScope = 'mobile';
    for (const id of selectedElementIds) {
      const elem = state.elements[id];
      if (!elem) continue;

      proposals.push(
        createProposal(
          id,
          {
            size: { width: '100%' },
            style: { textAlign: 'center', fontSize: '15px' },
          },
          targetScope
        )
      );
    }
    return proposals;
  }

  // Scenario 5: Multi-Element Edit ("summer sale", "promo")
  if (prompt.includes('multi') || prompt.includes('summer') || prompt.includes('promo') || prompt.includes('campaign')) {
    for (const id of selectedElementIds) {
      const elem = state.elements[id];
      if (!elem) continue;

      if (elem.type === 'heading') {
        proposals.push(createProposal(id, { content: { text: 'Summer Special: 50% Off All Growth Packages' } }));
      } else if (elem.type === 'button') {
        proposals.push(createProposal(id, { content: { text: 'Unlock Summer Discount' }, style: { backgroundColor: '#dc2626', color: '#ffffff' } }));
      } else if (elem.type === 'card' || elem.type === 'paragraph') {
        proposals.push(createProposal(id, { style: { backgroundColor: '#fef2f2', color: '#991b1b' } }));
      }
    }
    return proposals;
  }

  // Scenario 6: Safe Failure / Unsupported Instruction
  if (prompt.includes('delete') || prompt.includes('drop') || prompt.includes('hack') || prompt.includes('destroy')) {
    for (const id of selectedElementIds) {
      proposals.push({
        id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        elementId: id,
        viewportScope,
        status: 'invalid',
        beforeProperties: {},
        proposedPatch: {},
        proposedPreviewProperties: {},
        validationErrors: [`Unsupported or unsafe AI instruction: "${instruction}". Destructive actions are prohibited.`],
      });
    }
    return proposals;
  }

  // Default fallback for general text prompts
  for (const id of selectedElementIds) {
    const elem = state.elements[id];
    if (!elem) continue;

    proposals.push(
      createProposal(id, {
        content: { text: `${elem.baseProperties.content?.text || ''} (AI Enhanced)` },
        style: { color: '#2563eb' },
      })
    );
  }

  return proposals;
}
