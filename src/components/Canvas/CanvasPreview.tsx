import React from 'react';
import { Globe, Laptop, Layers, MousePointer, ShieldCheck, Smartphone, Tablet } from 'lucide-react';
import { resolveElementProperties } from '../../engine/resolution';
import { useTemplateStore } from '../../state/templateStore';
import { TemplateElement } from '../../types/template';

export const CanvasPreview: React.FC = () => {
  const {
    canonicalTemplate,
    selectedElementIds,
    selectElement,
    activeViewport,
    activeEditScope,
  } = useTemplateStore();

  // Width mapping for realistic previews: Desktop (1280px), Tablet (768px), Mobile (375px)
  const widthClassMap = {
    desktop: 'w-[1100px]',
    tablet: 'w-[720px]',
    mobile: 'w-[375px]',
  };

  const viewportLabelMap = {
    desktop: 'Desktop Preview (~1440px)',
    tablet: 'Tablet Preview (~768px)',
    mobile: 'Mobile Preview (~375px)',
  };

  const elementsMap = canonicalTemplate.elements;

  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    selectElement(elementId, isMulti);
  };

  const handleKeyDown = (e: React.KeyboardEvent, elementId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
      selectElement(elementId, isMulti);
    }
  };

  // Helper to render an individual modular element
  const renderElement = (elem: TemplateElement) => {
    if (!elem) return null;

    const resolvedProps = resolveElementProperties(elem, activeViewport);
    const isSelected = selectedElementIds.includes(elem.id);
    const hasOverride = !!elem.viewportOverrides[activeViewport];

    return (
      <div
        key={elem.id}
        tabIndex={0}
        onClick={(e) => handleElementClick(e, elem.id)}
        onKeyDown={(e) => handleKeyDown(e, elem.id)}
        className={`group relative transition-all duration-200 cursor-pointer rounded-xl border-2 focus:outline-none ${
          isSelected
            ? 'border-blue-500 bg-blue-500/10 ring-4 ring-blue-500/20 shadow-lg scale-[1.005]'
            : 'border-transparent hover:border-slate-300/80 hover:bg-slate-100/50'
        }`}
        style={{
          backgroundColor: resolvedProps.style?.backgroundColor || 'transparent',
          color: resolvedProps.style?.color || 'inherit',
          fontSize: resolvedProps.style?.fontSize || 'inherit',
          padding: resolvedProps.style?.padding || undefined,
          borderRadius: resolvedProps.style?.borderRadius || undefined,
          textAlign: resolvedProps.style?.textAlign || 'left',
          width: resolvedProps.size?.width || '100%',
          maxWidth: resolvedProps.size?.maxWidth || '100%',
          minHeight: resolvedProps.size?.minHeight || undefined,
        }}
      >
        {/* Selection Badge Overlay */}
        {isSelected && (
          <div className="absolute -top-3.5 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 z-30 tracking-wide">
            <MousePointer className="w-3 h-3" />
            <span>{elem.label}</span>
            <span className="ml-1 px-1.5 py-0.2 bg-blue-950/80 text-blue-200 rounded uppercase text-[9px] font-black">
              {activeEditScope.toUpperCase()}
            </span>
          </div>
        )}

        {/* Override Badge Overlay */}
        {hasOverride && !isSelected && (
          <div
            className="absolute -top-2.5 right-4 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-md z-20 uppercase tracking-widest"
            title={`Active ${activeViewport} Override`}
          >
            {activeViewport} OVERRIDE
          </div>
        )}

        {/* Content Renderers */}
        {elem.type === 'heading' && (
          <h2 className="font-extrabold tracking-tight leading-tight">
            {resolvedProps.content?.text}
          </h2>
        )}

        {elem.type === 'paragraph' && (
          <p className="leading-relaxed opacity-90">{resolvedProps.content?.text}</p>
        )}

        {elem.type === 'button' && (
          <button className="font-semibold shadow-md active:scale-95 transition-all inline-block hover:brightness-110">
            {resolvedProps.content?.text}
          </button>
        )}

        {elem.type === 'card' && (
          <div className="flex flex-col gap-2.5 h-full justify-between">
            {resolvedProps.content?.badgeText && (
              <span className="self-start text-[11px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md shadow-sm">
                {resolvedProps.content.badgeText}
              </span>
            )}
            <p className="font-medium text-sm leading-relaxed">
              {resolvedProps.content?.text}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-start bg-slate-950/90 min-h-screen relative select-none">
      {/* Scope Protection Banner */}
      <div className="mb-5 flex items-center justify-between w-full max-w-5xl bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">
            {viewportLabelMap[activeViewport]}
          </span>
        </div>

        {/* Candidate Custom Feature: Visual Scope Impact Indicator */}
        <div className="flex items-center gap-2 bg-blue-950/80 border border-blue-800/80 text-blue-300 px-3 py-1 rounded-lg text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>
            Scope Isolation: <strong className="text-white uppercase">{activeEditScope} VIEWS</strong>
          </span>
        </div>
      </div>

      {/* Simulated Browser Frame Window */}
      <div
        className={`transition-canvas bg-slate-900 rounded-2xl canvas-shadow border border-slate-800 overflow-hidden flex flex-col ${widthClassMap[activeViewport]}`}
      >
        {/* Browser Chrome Header Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="bg-slate-950/80 text-slate-400 text-[11px] font-mono px-4 py-1 rounded-lg border border-slate-800/80 flex items-center gap-1.5 w-64 justify-center">
            <Globe className="w-3 h-3 text-slate-500" />
            <span>https://apex-solutions.demo</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Webpage Content Surface */}
        <div className="bg-slate-100 text-slate-900 p-8 min-h-[750px] flex flex-col gap-10">
          {/* Section 1: Hero Banner */}
          <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto py-6">
            {renderElement(elementsMap['hero-title'])}
            {renderElement(elementsMap['hero-subtitle'])}
            {renderElement(elementsMap['hero-cta-button'])}
          </div>

          {/* Section 2: Services Grid (Responsive: 3 columns on Desktop/Tablet, 1 column on Mobile) */}
          <div
            className={`grid gap-6 ${
              activeViewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {renderElement(elementsMap['service-card-1'])}
            {renderElement(elementsMap['service-card-2'])}
            {renderElement(elementsMap['service-card-3'])}
          </div>

          {/* Section 3: Value Proposition Card */}
          <div className="w-full">
            {renderElement(elementsMap['value-prop-card'])}
          </div>

          {/* Section 4: Footer CTA & Copyright */}
          <div className="flex flex-col items-center gap-4 text-center border-t border-slate-300/60 pt-8 mt-4">
            {renderElement(elementsMap['cta-section-title'])}
            {renderElement(elementsMap['footer-text'])}
          </div>
        </div>
      </div>
    </div>
  );
};
