import React from 'react';
import { resolveElementProperties } from '../../engine/resolution';
import { RenderContext } from './templateTree.types';
import { getChildElements, renderFormattedHeadline } from './templateTree.utils.tsx';

export interface TemplateElementRendererProps extends RenderContext {
  elementId: string;
}

export const TemplateElementRenderer: React.FC<TemplateElementRendererProps> = ({
  elementId,
  elementsMap,
  activeViewport,
  selectedElementIds = [],
  isEditorMode,
  onSelectElement,
}) => {
  const element = elementsMap[elementId];
  if (!element) return null;

  const props = resolveElementProperties(element, activeViewport);
  const isSelected = selectedElementIds.includes(element.id);
  const children = getChildElements(elementsMap, element.id, activeViewport);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditorMode) return;
    e.stopPropagation();
    onSelectElement?.(element.id, e.shiftKey);
  };

  // Derive unified inline styles from resolved model properties exactly once
  const nodeStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    color: props?.style?.color || undefined,
    backgroundColor: props?.style?.backgroundColor || undefined,
    fontSize: props?.style?.fontSize || undefined,
    padding: props?.style?.padding || undefined,
    borderRadius: props?.style?.borderRadius || undefined,
    textAlign: (props?.style?.textAlign as any) || undefined,
    width: props?.size?.width || undefined,
    maxWidth: props?.size?.maxWidth || undefined,
    display: props?.style?.display || (element.type === 'container' || element.type === 'section' ? 'flex' : undefined),
    flexDirection: props?.layout?.flexDirection || undefined,
    gap: props?.layout?.gap || undefined,
    alignItems: props?.layout?.flexDirection === 'row' ? 'center' : undefined,
  };

  const editorOverlayClasses = isEditorMode
    ? `relative group cursor-pointer transition-all duration-150 ${
        isSelected
          ? 'ring-2 ring-neutral-300 ring-offset-2 ring-offset-black shadow-xl z-40'
          : 'hover:ring-1 hover:ring-neutral-400/40'
      }`
    : 'relative';

  const renderSelectionBadge = () =>
    isEditorMode && isSelected ? (
      <div className="absolute -top-3.5 left-3 bg-[#202020] text-neutral-200 border border-[#4A4A4A] font-mono text-[10px] px-2.5 py-0.5 rounded-full shadow-lg z-50 font-bold flex items-center gap-1 pointer-events-none">
        <span>{element.label}</span>
      </div>
    ) : null;

  // 1. Heading Node
  if (element.type === 'heading') {
    return (
      <div onClick={handleClick} style={nodeStyle} className={editorOverlayClasses}>
        {renderSelectionBadge()}
        <h1 className="font-extrabold tracking-tight leading-tight" style={{ color: props?.style?.color || 'inherit' }}>
          {renderFormattedHeadline(props?.content?.text)}
        </h1>
      </div>
    );
  }

  // 2. Paragraph Node
  if (element.type === 'paragraph') {
    return (
      <div onClick={handleClick} style={nodeStyle} className={editorOverlayClasses}>
        {renderSelectionBadge()}
        <p className="leading-relaxed text-base font-normal" style={{ color: props?.style?.color || 'inherit' }}>
          {props?.content?.text}
        </p>
      </div>
    );
  }

  // 3. Button Node - Resolved styling applied directly to button element (no double padding/wrappers)
  if (element.type === 'button') {
    const isSecondary = props?.content?.text?.includes('▷') || props?.content?.text?.includes('Simulator');
    const isPrimary =
      props?.content?.text?.includes('⚡') ||
      props?.content?.text?.includes('Start') ||
      props?.content?.text?.includes('Get Started');

    return (
      <button
        onClick={handleClick}
        style={nodeStyle}
        className={`font-semibold inline-flex items-center justify-center gap-2 border transition-all ${
          isSecondary
            ? 'border-slate-700/60 shadow-xl backdrop-blur-md hover:bg-slate-800'
            : isPrimary
            ? 'border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:brightness-110'
            : 'border-transparent hover:text-white'
        } ${editorOverlayClasses}`}
      >
        {renderSelectionBadge()}
        <span>{props?.content?.text}</span>
      </button>
    );
  }

  // 4. Card / Pill Badge Node
  if (element.type === 'card') {
    const isLightText =
      props?.style?.color === '#475569' ||
      props?.style?.color === '#334155' ||
      props?.style?.color === '#0f172a' ||
      props?.style?.color === '#047857' ||
      props?.style?.color === '#64748b' ||
      props?.style?.color === '#1e293b';

    return (
      <div onClick={handleClick} style={nodeStyle} className={editorOverlayClasses}>
        {renderSelectionBadge()}
        <div className="flex flex-col gap-2 text-left">
          {props?.content?.badgeText && (
            <span
              className={`inline-block font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-md self-start border ${
                isLightText
                  ? 'text-emerald-800 bg-emerald-100/90 border-emerald-300'
                  : 'text-indigo-300 bg-indigo-950/60 border-indigo-800/50'
              }`}
            >
              {props?.content?.badgeText}
            </span>
          )}
          {props?.content?.text && (
            <p className="leading-relaxed text-sm font-medium" style={{ color: props?.style?.color || 'inherit' }}>
              {props?.content?.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 5. Container & Section Structural Node
  return (
    <div onClick={handleClick} style={nodeStyle} className={editorOverlayClasses}>
      {renderSelectionBadge()}
      {children.length > 0 && (
        <div
          className={`w-full flex ${
            props?.layout?.flexDirection === 'row'
              ? activeViewport === 'mobile'
                ? 'flex-col items-center'
                : 'flex-row items-center justify-between'
              : 'flex-col items-center'
          }`}
          style={{ gap: props?.layout?.gap || '16px', boxSizing: 'border-box' }}
        >
          {children.map((child) => (
            <TemplateElementRenderer
              key={child.id}
              elementId={child.id}
              elementsMap={elementsMap}
              activeViewport={activeViewport}
              selectedElementIds={selectedElementIds}
              isEditorMode={isEditorMode}
              onSelectElement={onSelectElement}
            />
          ))}
        </div>
      )}
    </div>
  );
};
