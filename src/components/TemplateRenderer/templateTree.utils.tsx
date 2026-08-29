import React from 'react';
import { resolveElementProperties } from '../../engine/resolution';
import { TemplateElement, ViewportScope } from '../../types/template';
import { TreeValidationResult } from './templateTree.types';

/**
 * Returns all top-level root elements (!parentId), sorted deterministically by layout.order.
 */
export function getRootElements(
  elementsMap: Record<string, TemplateElement>,
  viewport: ViewportScope
): TemplateElement[] {
  return Object.values(elementsMap)
    .filter((el) => !el.parentId)
    .sort((a, b) => {
      const orderA = resolveElementProperties(a, viewport)?.layout?.order || 0;
      const orderB = resolveElementProperties(b, viewport)?.layout?.order || 0;
      return orderA - orderB;
    });
}

/**
 * Returns all child elements of a specific parentId, sorted deterministically by layout.order.
 */
export function getChildElements(
  elementsMap: Record<string, TemplateElement>,
  parentId: string,
  viewport: ViewportScope
): TemplateElement[] {
  return Object.values(elementsMap)
    .filter((el) => el.parentId === parentId)
    .sort((a, b) => {
      const orderA = resolveElementProperties(a, viewport)?.layout?.order || 0;
      const orderB = resolveElementProperties(b, viewport)?.layout?.order || 0;
      return orderA - orderB;
    });
}

/**
 * Validates canonical tree integrity (unique IDs, parent existence, no self-parenting, no cycles).
 */
export function validateTreeIntegrity(elementsMap: Record<string, TemplateElement>): TreeValidationResult {
  const errors: string[] = [];

  for (const element of Object.values(elementsMap)) {
    // Self parenting check
    if (element.parentId === element.id) {
      errors.push(`Element "${element.id}" is set as its own parent.`);
    }

    // Parent existence check
    if (element.parentId && !elementsMap[element.parentId]) {
      errors.push(`Element "${element.id}" references non-existent parentId "${element.parentId}".`);
    }

    // Cycle detection
    let currentParentId = element.parentId;
    const visited = new Set<string>([element.id]);
    while (currentParentId) {
      if (visited.has(currentParentId)) {
        errors.push(`Circular parent-child relationship detected involving element "${element.id}".`);
        break;
      }
      visited.add(currentParentId);
      currentParentId = elementsMap[currentParentId]?.parentId;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Helper to render gradient text for key landing page keywords.
 */
export function renderFormattedHeadline(text?: string): React.ReactNode {
  if (!text) return null;
  if (text.includes('Intelligent AI Flow')) {
    const parts = text.split('Intelligent AI Flow');
    return (
      <span>
        {parts[0]}
        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent font-extrabold">
          Intelligent AI Flow
        </span>
        {parts[1]}
      </span>
    );
  }

  const gradientTargets = [
    'Autonomous AI Agents',
    'AI Agents',
    'Intelligent Solutions',
    'Growth Platform',
    'Enterprise Workflows',
    'AI Infrastructure',
    'Digital Products',
    'Complex Workflows',
  ];

  for (const target of gradientTargets) {
    if (text.includes(target)) {
      const parts = text.split(target);
      return (
        <span>
          {parts[0]}
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-sky-300 bg-clip-text text-transparent font-extrabold drop-shadow-sm">
            {target}
          </span>
          {parts[1]}
        </span>
      );
    }
  }
  return <span>{text}</span>;
}
