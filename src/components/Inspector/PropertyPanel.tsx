import React, { useState } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders,
  Sparkles,
  Palette,
  Layout,
  Info,
  Settings,
  Zap,
  Box,
} from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';
import { getScopeSpecificProperties, resolveElementProperties } from '../../engine/resolution';

export const PropertyPanel: React.FC = () => {
  const {
    canonicalTemplate,
    selectedElementIds,
    activeEditScope,
    activeViewport,
    executeCommand,
  } = useTemplateStore();

  const [activeInspectorTab, setActiveInspectorTab] = useState<'style' | 'settings' | 'interactions'>('style');
  const [hoveredPropertyInfo, setHoveredPropertyInfo] = useState<string | null>(null);

  if (selectedElementIds.length === 0) {
    return (
      <aside className="w-80 bg-[#0A0A0A] backdrop-blur-xl border-l border-[#222222] p-6 flex flex-col items-center justify-center text-center text-neutral-400 select-none z-30 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#111111] border border-[#262626] flex items-center justify-center mb-4 text-neutral-300 shadow-inner">
          <Sliders className="w-7 h-7" />
        </div>
        <h3 className="font-bold text-neutral-200 text-sm mb-1">No Element Selected</h3>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-[220px]">
          Select any layer or canvas element to inspect and edit its position, size, layout, styles, or settings.
        </p>
      </aside>
    );
  }

  const primaryElementId = selectedElementIds[0];
  const element = canonicalTemplate.elements[primaryElementId];

  if (!element) return null;

  const resolvedProps = resolveElementProperties(element, activeViewport);
  const scopeSpecificProps = getScopeSpecificProperties(element, activeEditScope);

  const handleTextChange = (text: string) => {
    executeCommand({
      source: 'canvas',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          content: { text },
        },
      },
    });
  };

  const handleBadgeChange = (badgeText: string) => {
    executeCommand({
      source: 'canvas',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          content: { badgeText },
        },
      },
    });
  };

  const handleStyleChange = (key: string, value: string) => {
    executeCommand({
      source: 'canvas',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          style: { [key]: value },
        },
      },
    });
  };

  const handleSizeChange = (key: string, value: string) => {
    executeCommand({
      source: 'canvas',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          size: { [key]: value },
        },
      },
    });
  };

  // Preset themes
  const colorPresets = [
    { label: 'Pure Black', bg: '#000000', text: '#ffffff' },
    { label: 'Dark Graphite', bg: '#0c0d12', text: '#f3f3f3' },
    { label: 'Slate Dark', bg: '#0f172a', text: '#f8fafc' },
    { label: 'Light Clean', bg: '#ffffff', text: '#0f172a' },
    { label: 'Vesper Liquid', bg: '#181924', text: '#ffffff' },
  ];

  return (
    <aside className="w-80 bg-[#050508]/90 backdrop-blur-xl border-l border-white/10 flex flex-col select-none text-slate-200 z-30 shadow-2xl overflow-y-auto relative">
      {/* Inspector Webflow Studio Top Tabs */}
      <div className="flex items-center border-b border-white/10 bg-[#000000]/40 p-1">
        <button
          onClick={() => setActiveInspectorTab('style')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeInspectorTab === 'style'
              ? 'bg-white/10 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span>Style</span>
        </button>
        <button
          onClick={() => setActiveInspectorTab('settings')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeInspectorTab === 'settings'
              ? 'bg-white/10 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-slate-400" />
          <span>Settings</span>
        </button>
        <button
          onClick={() => setActiveInspectorTab('interactions')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeInspectorTab === 'interactions'
              ? 'bg-white/10 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-slate-400" />
          <span>Interactions</span>
        </button>
      </div>

      {/* Selected Element Header */}
      <div className="p-3 border-b border-white/10 bg-[#000000]/30 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-xs text-white truncate max-w-[180px]">{element.label}</h4>
          <p className="text-[10px] font-mono text-slate-400">Selector: .{element.id}</p>
        </div>
        <span className="text-[10px] font-mono uppercase bg-[#2a2a32] text-slate-200 px-2 py-0.5 rounded border border-white/20">
          {activeEditScope}
        </span>
      </div>

      {/* Style Tab Content */}
      {activeInspectorTab === 'style' && (
        <div className="p-3 space-y-4 text-xs">
          {/* Content Section */}
          {element.type === 'heading' && (
            <div
              onMouseEnter={() => setHoveredPropertyInfo('Heading Content: Edit main title text for current scope.')}
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-2 border-b border-white/10 pb-3"
            >
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Heading Text</span>
                <Info className="w-3 h-3 text-slate-500" />
              </label>
              <textarea
                rows={2}
                value={scopeSpecificProps?.content?.text ?? resolvedProps?.content?.text ?? ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full bg-[#000000]/60 border border-white/15 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-white/40 font-sans"
              />
            </div>
          )}

          {element.type === 'button' && (
            <div
              onMouseEnter={() => setHoveredPropertyInfo('Button Label: Edit CTA button text for current scope.')}
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-2 border-b border-white/10 pb-3"
            >
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Button Label</span>
                <Info className="w-3 h-3 text-slate-500" />
              </label>
              <input
                type="text"
                value={scopeSpecificProps?.content?.text ?? resolvedProps?.content?.text ?? ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full bg-[#000000]/60 border border-white/15 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-white/40 font-sans"
              />
            </div>
          )}

          {element.type === 'card' && (
            <div
              onMouseEnter={() => setHoveredPropertyInfo('Card Content: Edit badge category and description text.')}
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-2 border-b border-white/10 pb-3"
            >
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Card Badge & Text</span>
                <Info className="w-3 h-3 text-slate-500" />
              </label>
              <input
                type="text"
                placeholder="Badge Text"
                value={scopeSpecificProps?.content?.badgeText ?? resolvedProps?.content?.badgeText ?? ''}
                onChange={(e) => handleBadgeChange(e.target.value)}
                className="w-full bg-[#000000]/60 border border-white/15 rounded-lg p-2 text-xs text-slate-100 mb-2 focus:outline-none focus:border-white/40"
              />
              <textarea
                rows={2}
                value={scopeSpecificProps?.content?.text ?? resolvedProps?.content?.text ?? ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full bg-[#000000]/60 border border-white/15 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-white/40"
              />
            </div>
          )}

          {/* Webflow Spacing Box Model Widget */}
          <div
            onMouseEnter={() => setHoveredPropertyInfo('Box Model Spacing: Modify element padding bounds.')}
            onMouseLeave={() => setHoveredPropertyInfo(null)}
            className="space-y-2 border-b border-white/10 pb-3"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span>Spacing (Padding)</span>
                <Info className="w-3 h-3 text-slate-500" />
              </span>
              <Box className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Box Model Visual Box */}
            <div className="p-3 bg-[#000000]/80 border border-white/15 rounded-xl flex flex-col items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">PADDING</span>
              <div className="w-full grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
                <div></div>
                <input
                  type="text"
                  placeholder="24px"
                  value={resolvedProps?.style?.padding || '24px'}
                  onChange={(e) => handleStyleChange('padding', e.target.value)}
                  className="bg-[#12131a] border border-white/15 rounded px-1.5 py-1 text-center text-slate-200 focus:outline-none"
                />
                <div></div>
              </div>
            </div>
          </div>

          {/* Display & Layout Tools */}
          <div
            onMouseEnter={() => setHoveredPropertyInfo('Display Mode: Toggle CSS block, flex, or grid display layout.')}
            onMouseLeave={() => setHoveredPropertyInfo(null)}
            className="space-y-2 border-b border-white/10 pb-3"
          >
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span>Layout Display</span>
              <Info className="w-3 h-3 text-slate-500" />
            </label>
            <div className="grid grid-cols-4 gap-1 bg-[#000000]/60 p-1 rounded-lg border border-white/15 font-mono text-[11px]">
              {(['block', 'flex', 'grid', 'none'] as const).map((disp) => (
                <button
                  key={disp}
                  onClick={() => handleStyleChange('display', disp)}
                  className={`py-1 rounded capitalize transition-all ${
                    (resolvedProps?.style?.display || 'block') === disp
                      ? 'bg-white text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {disp}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Theme Presets */}
          <div
            onMouseEnter={() => setHoveredPropertyInfo('Quick Theme Presets: 1-click background theme presets.')}
            onMouseLeave={() => setHoveredPropertyInfo(null)}
            className="space-y-2 border-b border-white/10 pb-3"
          >
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span>Quick Theme Presets</span>
              <Info className="w-3 h-3 text-slate-500" />
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleStyleChange('backgroundColor', preset.bg);
                    handleStyleChange('color', preset.text);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-white/15 bg-[#000000]/60 hover:border-white/40 text-left transition-all"
                >
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: preset.bg }}></div>
                  <span className="text-[10px] text-slate-300 font-medium truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size & Dimensions */}
          <div
            onMouseEnter={() => setHoveredPropertyInfo('Dimensions: Modify element width and minimum height bounds.')}
            onMouseLeave={() => setHoveredPropertyInfo(null)}
            className="space-y-2.5 border-b border-white/10 pb-3"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span>Dimensions</span>
                <Info className="w-3 h-3 text-slate-500" />
              </span>
              <Layout className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block mb-1">WIDTH</span>
                <input
                  type="text"
                  value={scopeSpecificProps?.size?.width ?? resolvedProps?.size?.width ?? ''}
                  onChange={(e) => handleSizeChange('width', e.target.value)}
                  className="w-full bg-[#000000]/60 border border-white/15 rounded p-1.5 text-xs text-slate-200"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block mb-1">MIN HEIGHT</span>
                <input
                  type="text"
                  value={scopeSpecificProps?.size?.minHeight ?? resolvedProps?.size?.minHeight ?? 'auto'}
                  onChange={(e) => handleSizeChange('minHeight', e.target.value)}
                  className="w-full bg-[#000000]/60 border border-white/15 rounded p-1.5 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Style & Fill Alignment */}
          <div
            onMouseEnter={() => setHoveredPropertyInfo('Styling & Fill: Adjust text alignment, color, and background fill.')}
            onMouseLeave={() => setHoveredPropertyInfo(null)}
            className="space-y-2.5 border-b border-white/10 pb-3"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span>Style & Fill</span>
                <Info className="w-3 h-3 text-slate-500" />
              </span>
              <Palette className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Alignment Tools */}
            <div className="flex items-center bg-[#000000]/60 p-1 rounded-lg border border-white/15">
              <button
                onClick={() => handleStyleChange('textAlign', 'left')}
                className={`flex-1 py-1 flex items-center justify-center rounded ${
                  resolvedProps?.style?.textAlign === 'left' ? 'bg-white/20 text-white' : 'text-slate-400'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStyleChange('textAlign', 'center')}
                className={`flex-1 py-1 flex items-center justify-center rounded ${
                  resolvedProps?.style?.textAlign === 'center' ? 'bg-white/20 text-white' : 'text-slate-400'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStyleChange('textAlign', 'right')}
                className={`flex-1 py-1 flex items-center justify-center rounded ${
                  resolvedProps?.style?.textAlign === 'right' ? 'bg-white/20 text-white' : 'text-slate-400'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Color Inputs */}
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Text Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={resolvedProps?.style?.color || '#ffffff'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer border border-white/15 bg-transparent"
                  />
                  <input
                    type="text"
                    value={resolvedProps?.style?.color || '#ffffff'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    className="w-20 bg-[#000000]/60 border border-white/15 rounded px-2 py-0.5 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Background</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={resolvedProps?.style?.backgroundColor || '#000000'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer border border-white/15 bg-transparent"
                  />
                  <input
                    type="text"
                    value={resolvedProps?.style?.backgroundColor || '#000000'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className="w-20 bg-[#000000]/60 border border-white/15 rounded px-2 py-0.5 text-xs text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab Content */}
      {activeInspectorTab === 'settings' && (
        <div className="p-4 space-y-3 text-xs">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Element Label</label>
            <input
              type="text"
              value={element.label}
              disabled
              className="w-full bg-[#000000]/60 border border-white/15 rounded p-2 text-slate-300 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Element Tag Type</label>
            <input
              type="text"
              value={`<${element.type}>`}
              disabled
              className="w-full bg-[#000000]/60 border border-white/15 rounded p-2 text-slate-300 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Stable ID</label>
            <input
              type="text"
              value={element.id}
              disabled
              className="w-full bg-[#000000]/60 border border-white/15 rounded p-2 text-slate-400 font-mono text-[11px]"
            />
          </div>
        </div>
      )}

      {/* Interactions Tab Content */}
      {activeInspectorTab === 'interactions' && (
        <div className="p-4 space-y-3 text-xs">
          <div className="p-3 bg-[#000000]/60 border border-white/15 rounded-xl space-y-2">
            <p className="font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-slate-300" />
              <span>Hover Scale & Glow</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Enables smooth CSS micro-interactions and liquid metallic shine triggers on hover.
            </p>
            <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-bold">
              ACTIVE IN CANVAS
            </span>
          </div>
        </div>
      )}

      {/* Hover Property Info Tooltip */}
      {hoveredPropertyInfo && (
        <div className="p-2.5 bg-[#000000]/95 border-t border-white/15 text-[11px] text-slate-300 font-mono flex items-start gap-2 shadow-2xl backdrop-blur-xl">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-tight">{hoveredPropertyInfo}</p>
        </div>
      )}
    </aside>
  );
};
