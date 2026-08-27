import React from 'react';
import { AlignCenter, AlignLeft, AlignRight, Layers, Sliders, Type } from 'lucide-react';
import { resolveElementProperties } from '../../engine/resolution';
import { useTemplateStore } from '../../state/templateStore';

export const PropertyPanel: React.FC = () => {
  const {
    canonicalTemplate,
    selectedElementIds,
    activeViewport,
    activeEditScope,
    executeCommand,
  } = useTemplateStore();

  if (selectedElementIds.length === 0) {
    return (
      <aside className="w-80 glass-panel border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-400 gap-4">
        <div className="p-4 bg-slate-900/90 rounded-full border border-slate-800 shadow-inner">
          <Sliders className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="font-bold text-slate-200 text-sm">No Element Selected</h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
          Click any element on the canvas to inspect and edit its content, style, size, layout, or viewport overrides.
        </p>
      </aside>
    );
  }

  const selectedElement = canonicalTemplate.elements[selectedElementIds[0]];
  if (!selectedElement) return null;

  const resolvedProps = resolveElementProperties(selectedElement, activeViewport);

  const handlePropertyChange = (category: 'content' | 'style' | 'size' | 'layout', key: string, value: any) => {
    executeCommand({
      source: 'canvas',
      targetIds: selectedElementIds,
      viewportScope: activeEditScope,
      changes: {
        [selectedElement.id]: {
          [category]: {
            [key]: value,
          },
        },
      },
    });
  };

  const presetColors = ['#0f172a', '#2563eb', '#4f46e5', '#dc2626', '#16a34a', '#d97706', '#ffffff', '#f8fafc'];
  const presetFontSizes = ['14px', '16px', '18px', '24px', '32px', '40px'];

  return (
    <aside className="w-80 glass-panel border-l border-slate-800 p-5 flex flex-col gap-5 overflow-y-auto max-h-screen text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-blue-400" />
          <h3 className="font-extrabold text-sm text-slate-100">{selectedElement.label}</h3>
        </div>
        <span className="text-[10px] font-black uppercase bg-blue-950 text-blue-300 border border-blue-800/80 px-2 py-0.5 rounded-md">
          {selectedElement.type}
        </span>
      </div>

      {/* Target Scope Warning */}
      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs flex flex-col gap-1 shadow-inner">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Targeting Scope:</span>
          <span className="font-black text-blue-400 uppercase tracking-wide">
            {activeEditScope.toUpperCase()}
          </span>
        </div>
        {activeEditScope !== 'all' && (
          <p className="text-[10px] text-amber-300/90 leading-tight mt-1">
            ⚠️ Edits override values for <strong>{activeEditScope.toUpperCase()}</strong> view without touching base properties.
          </p>
        )}
      </div>

      {/* 1. Content Editing */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          Content
        </label>
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-slate-400">Text Content:</span>
          <textarea
            value={resolvedProps.content?.text || ''}
            onChange={(e) => handlePropertyChange('content', 'text', e.target.value)}
            rows={3}
            className="w-full bg-slate-950 text-xs text-slate-100 p-2.5 rounded-lg border border-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Element text content..."
          />
        </div>

        {selectedElement.type === 'card' && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-400">Badge Label:</span>
            <input
              type="text"
              value={resolvedProps.content?.badgeText || ''}
              onChange={(e) => handlePropertyChange('content', 'badgeText', e.target.value)}
              className="w-full bg-slate-950 text-xs text-slate-100 p-2 rounded-lg border border-slate-800 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* 2. Styling Controls */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          Style & Typography
        </label>

        {/* Font Size Preset Chips */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-slate-400">Font Size Quick Presets</span>
          <div className="flex flex-wrap gap-1">
            {presetFontSizes.map((sz) => (
              <button
                key={sz}
                onClick={() => handlePropertyChange('style', 'fontSize', sz)}
                className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                  resolvedProps.style?.fontSize === sz
                    ? 'bg-blue-600 text-white border-blue-500 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-400">Text Color</span>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <input
                type="color"
                value={resolvedProps.style?.color || '#0f172a'}
                onChange={(e) => handlePropertyChange('style', 'color', e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-[10px] font-mono text-slate-300 uppercase">
                {resolvedProps.style?.color || '#0f172a'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-400">Background</span>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <input
                type="color"
                value={resolvedProps.style?.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropertyChange('style', 'backgroundColor', e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-[10px] font-mono text-slate-300 uppercase">
                {resolvedProps.style?.backgroundColor || '#ffffff'}
              </span>
            </div>
          </div>
        </div>

        {/* Text Alignment */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-slate-400">Alignment</span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handlePropertyChange('style', 'textAlign', 'left')}
              className={`flex-1 p-1.5 rounded flex items-center justify-center transition-colors ${
                resolvedProps.style?.textAlign === 'left' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePropertyChange('style', 'textAlign', 'center')}
              className={`flex-1 p-1.5 rounded flex items-center justify-center transition-colors ${
                resolvedProps.style?.textAlign === 'center' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handlePropertyChange('style', 'textAlign', 'right')}
              className={`flex-1 p-1.5 rounded flex items-center justify-center transition-colors ${
                resolvedProps.style?.textAlign === 'right' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Size & Ordering */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          Size & Layout
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-400">Width Preset</span>
            <div className="flex gap-1">
              <button
                onClick={() => handlePropertyChange('size', 'width', '100%')}
                className="flex-1 py-1 text-[10px] bg-slate-950 border border-slate-800 rounded text-slate-300 hover:bg-slate-800 font-semibold"
              >
                100%
              </button>
              <button
                onClick={() => handlePropertyChange('size', 'width', 'auto')}
                className="flex-1 py-1 text-[10px] bg-slate-950 border border-slate-800 rounded text-slate-300 hover:bg-slate-800 font-semibold"
              >
                Auto
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-400">Display Order</span>
            <input
              type="number"
              value={resolvedProps.layout?.order || 0}
              onChange={(e) => handlePropertyChange('layout', 'order', parseInt(e.target.value) || 0)}
              className="bg-slate-950 text-xs text-slate-100 p-2 rounded-lg border border-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
