import React from 'react';
import { RenderContext } from './templateTree.types';
import { getRootElements, validateTreeIntegrity } from './templateTree.utils.tsx';
import { TemplateElementRenderer } from './TemplateElementRenderer';

export const TemplateTreeRenderer: React.FC<RenderContext> = ({
  elementsMap,
  activeViewport,
  selectedElementIds = [],
  isEditorMode,
  onSelectElement,
}) => {
  // Validate tree integrity
  const treeValidation = validateTreeIntegrity(elementsMap);
  if (!treeValidation.valid) {
    console.warn('Template Tree Validation Errors:', treeValidation.errors);
  }

  // Get root-level elements (!parentId) sorted deterministically
  const rootElements = getRootElements(elementsMap, activeViewport);

  // Dynamically detect root theme background (Light vs Dark)
  const isLightTree = Object.values(elementsMap).some(
    (el) =>
      el.id.includes('flowith') ||
      el.baseProperties?.style?.backgroundColor === '#ffffff' ||
      el.baseProperties?.style?.backgroundColor === '#fafcfb'
  );

  const wrapperBg = isLightTree ? '#fafcfb' : '#03050c';
  const wrapperTextColor = isLightTree ? '#0f172a' : '#f8fafc';

  return (
    <div
      style={{ backgroundColor: wrapperBg, color: wrapperTextColor }}
      className="w-full flex flex-col items-center min-h-full h-auto relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Atmosphere */}
      {isLightTree ? (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px] pointer-events-none rounded-full"></div>
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full"></div>
      )}

      {rootElements.map((rootElem) => (
        <TemplateElementRenderer
          key={rootElem.id}
          elementId={rootElem.id}
          elementsMap={elementsMap}
          activeViewport={activeViewport}
          selectedElementIds={selectedElementIds}
          isEditorMode={isEditorMode}
          onSelectElement={onSelectElement}
        />
      ))}
    </div>
  );
};
