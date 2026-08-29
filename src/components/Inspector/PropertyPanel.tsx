import React, { useState } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Sliders,
  Sparkles,
  Palette,
  Layout,
  Info,
  Settings,
  Zap,
  Box,
  RotateCcw,
  Type,
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

  const handleResetTypography = () => {
    const resetTypographyStyle: Record<string, any> = {
      fontWeight: undefined,
      fontStyle: undefined,
      textDecoration: undefined,
      fontSize: undefined,
      lineHeight: undefined,
      letterSpacing: undefined,
      textAlign: undefined,
      textTransform: undefined,
      color: undefined,
    };

    executeCommand({
      source: 'restore',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          style: resetTypographyStyle,
        },
      },
    });
  };

  const handleResetColor = (colorProperty: 'backgroundColor' | 'color' | 'borderColor') => {
    executeCommand({
      source: 'restore',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          style: {
            [colorProperty]: undefined,
          },
        },
      },
    });
  };

  const handleResetThemeColors = () => {
    executeCommand({
      source: 'restore',
      targetIds: [primaryElementId],
      viewportScope: activeEditScope,
      changes: {
        [primaryElementId]: {
          style: {
            backgroundColor: undefined,
            color: undefined,
            borderColor: undefined,
          },
        },
      },
    });
  };

  const formatColorForPicker = (val: string | undefined): string => {
    if (!val) return '#000000';
    const trimmed = val.trim().toLowerCase();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
      if (trimmed.length === 4) {
        return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
      }
      return trimmed;
    }
    return '#000000';
  };

  const isTextElement = element
    ? ['heading', 'paragraph', 'button', 'card', 'text', 'label', 'badge'].includes(element.type)
    : false;

  const colorPresets = [
    { label: 'Pure Black', bg: '#000000', text: '#ffffff' },
    { label: 'Dark Graphite', bg: '#0c0d12', text: '#f3f3f3' },
    { label: 'Slate Dark', bg: '#0f172a', text: '#f8fafc' },
    { label: 'Light Clean', bg: '#ffffff', text: '#0f172a' },
    { label: 'Vesper Liquid', bg: '#181924', text: '#ffffff' },
  ];

  return (
    <aside className="w-80 bg-[#0A0A0A] backdrop-blur-xl border-l border-[#222222] flex flex-col h-full min-h-0 overflow-hidden select-none text-slate-200 z-30 shadow-2xl relative">
      {/* 1. Fixed Inspector Header Tabs */}
      <div className="flex items-center border-b border-[#242424] bg-[#0A0A0A] p-1 shrink-0">
        <button
          onClick={() => setActiveInspectorTab('style')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeInspectorTab === 'style'
              ? 'bg-[#242424] text-white shadow border border-[#444444]'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-neutral-400" />
          <span>Style</span>
        </button>
        <button
          onClick={() => setActiveInspectorTab('settings')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeInspectorTab === 'settings'
              ? 'bg-[#242424] text-white shadow border border-[#444444]'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-neutral-400" />
          <span>Settings</span>
        </button>
        <button
          onClick={() => setActiveInspectorTab('interactions')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeInspectorTab === 'interactions'
              ? 'bg-[#242424] text-white shadow border border-[#444444]'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-neutral-400" />
          <span>Interactions</span>
        </button>
      </div>

      {/* 2. Fixed Selected Element Header */}
      <div className="p-3 border-b border-[#242424] bg-[#111111] flex items-center justify-between shrink-0">
        <div>
          <h4 className="font-bold text-xs text-white truncate max-w-[180px]">{element.label}</h4>
          <p className="text-[10px] font-mono text-neutral-400">Selector: .{element.id}</p>
        </div>
        <span className="text-[10px] font-mono uppercase bg-[#171717] text-neutral-200 px-2 py-0.5 rounded border border-[#3A3A3A]">
          {activeEditScope}
        </span>
      </div>

      {/* 3. Primary Scrollable Inspector Content Area */}
      {activeInspectorTab === 'style' && (
        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Content Section */}
          {element.type === 'heading' && (
            <div
              onMouseEnter={() => setHoveredPropertyInfo('Heading Content: Edit main title text for current scope.')}
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-2 border-b border-[#262626] pb-3"
            >
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                <span>Heading Text</span>
                <Info className="w-3 h-3 text-neutral-500" />
              </label>
              <textarea
                rows={2}
                value={scopeSpecificProps?.content?.text ?? resolvedProps?.content?.text ?? ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full bg-[#111111] border border-[#303030] rounded-lg p-2 text-xs text-neutral-100 focus:outline-none focus:border-[#707070] font-sans"
              />
            </div>
          )}

          {element.type === 'button' && (
            <div
              onMouseEnter={() => setHoveredPropertyInfo('Button Label: Edit CTA button text for current scope.')}
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-2 border-b border-[#262626] pb-3"
            >
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                <span>Button Label</span>
                <Info className="w-3 h-3 text-neutral-500" />
              </label>
              <input
                type="text"
                value={scopeSpecificProps?.content?.text ?? resolvedProps?.content?.text ?? ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full bg-[#111111] border border-[#303030] rounded-lg p-2 text-xs text-neutral-100 focus:outline-none focus:border-[#707070] font-sans"
              />
            </div>
          )}

          {element.type === 'card' && (
            <div
              onMouseEnter={() => setHoveredPropertyInfo('Card Content: Edit badge category and description text.')}
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-2 border-b border-[#262626] pb-3"
            >
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                <span>Card Badge & Text</span>
                <Info className="w-3 h-3 text-neutral-500" />
              </label>
              <input
                type="text"
                placeholder="Badge Text"
                value={scopeSpecificProps?.content?.badgeText ?? resolvedProps?.content?.badgeText ?? ''}
                onChange={(e) => handleBadgeChange(e.target.value)}
                className="w-full bg-[#111111] border border-[#303030] rounded-lg p-2 text-xs text-neutral-100 mb-2 focus:outline-none focus:border-[#707070]"
              />
              <textarea
                rows={2}
                value={scopeSpecificProps?.content?.text ?? resolvedProps?.content?.text ?? ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full bg-[#111111] border border-[#303030] rounded-lg p-2 text-xs text-neutral-100 focus:outline-none focus:border-[#707070]"
              />
            </div>
          )}

          {/* Advanced Typography Controls Section */}
          {isTextElement && (
            <div
              onMouseEnter={() =>
                setHoveredPropertyInfo(
                  'Typography Controls: Fine-tune font family, size, weight, line height, letter spacing, alignment, and text transform for active scope.'
                )
              }
              onMouseLeave={() => setHoveredPropertyInfo(null)}
              className="space-y-3 border-b border-[#262626] pb-4"
            >
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Typography</span>
                </label>
                <button
                  onClick={handleResetTypography}
                  title="Reset Typography for current scope"
                  className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-white bg-[#171717] hover:bg-[#242424] px-2 py-0.5 rounded border border-[#333333] transition-all cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Font Family */}
              <div>
                <span className="text-[10px] text-neutral-400 font-mono block mb-1">Font Family</span>
                <select
                  value={scopeSpecificProps?.style?.fontFamily ?? resolvedProps?.style?.fontFamily ?? 'sans-serif'}
                  onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                  className="w-full bg-[#111111] text-neutral-200 border border-[#303030] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#707070] cursor-pointer font-sans"
                >
                  <option value="sans-serif">System Sans-Serif</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Outfit', sans-serif">Outfit</option>
                  <option value="monospace">Monospace / Code</option>
                  <option value="serif">Serif</option>
                </select>
              </div>

              {/* Font Size & Font Weight */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Font Size</span>
                  <div className="flex items-center bg-[#111111] border border-[#303030] rounded-lg px-2 py-1">
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={
                        parseInt(String(scopeSpecificProps?.style?.fontSize ?? resolvedProps?.style?.fontSize ?? '16')) || 16
                      }
                      onChange={(e) => {
                        const val = Math.max(1, parseInt(e.target.value) || 16);
                        handleStyleChange('fontSize', `${val}px`);
                      }}
                      className="w-full bg-transparent text-xs text-neutral-100 focus:outline-none font-mono"
                    />
                    <span className="text-[10px] font-mono text-neutral-500">px</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Font Weight</span>
                  <select
                    value={scopeSpecificProps?.style?.fontWeight ?? resolvedProps?.style?.fontWeight ?? '400'}
                    onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                    className="w-full bg-[#111111] text-neutral-200 border border-[#303030] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#707070] cursor-pointer font-mono"
                  >
                    <option value="100">Thin (100)</option>
                    <option value="200">Extra Light (200)</option>
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                    <option value="900">Black (900)</option>
                  </select>
                </div>
              </div>

              {/* Font Style & Text Decoration */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Font Style</span>
                  <div className="flex items-center bg-[#111111] p-0.5 rounded-lg border border-[#303030]">
                    <button
                      onClick={() => handleStyleChange('fontStyle', 'normal')}
                      className={`flex-1 py-1 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-all ${
                        (scopeSpecificProps?.style?.fontStyle ?? resolvedProps?.style?.fontStyle ?? 'normal') ===
                        'normal'
                          ? 'bg-[#242424] text-white shadow border border-[#555555]'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <span>Normal</span>
                    </button>
                    <button
                      onClick={() => handleStyleChange('fontStyle', 'italic')}
                      className={`flex-1 py-1 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-all ${
                        (scopeSpecificProps?.style?.fontStyle ?? resolvedProps?.style?.fontStyle) === 'italic'
                          ? 'bg-[#242424] text-white shadow border border-[#555555]'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Italic className="w-3 h-3" />
                      <span>Italic</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Text Decoration</span>
                  <div className="flex items-center bg-[#111111] p-0.5 rounded-lg border border-[#303030]">
                    <button
                      onClick={() => handleStyleChange('textDecoration', 'none')}
                      title="None"
                      className={`flex-1 py-1 text-xs font-semibold rounded transition-all ${
                        (scopeSpecificProps?.style?.textDecoration ?? resolvedProps?.style?.textDecoration ?? 'none') ===
                        'none'
                          ? 'bg-[#242424] text-white shadow border border-[#555555]'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      None
                    </button>
                    <button
                      onClick={() => handleStyleChange('textDecoration', 'underline')}
                      title="Underline"
                      className={`flex-1 py-1 text-xs font-semibold rounded flex items-center justify-center transition-all ${
                        (scopeSpecificProps?.style?.textDecoration ?? resolvedProps?.style?.textDecoration) ===
                        'underline'
                          ? 'bg-[#242424] text-white shadow border border-[#555555]'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleStyleChange('textDecoration', 'line-through')}
                      title="Line Through"
                      className={`flex-1 py-1 text-xs font-semibold rounded flex items-center justify-center transition-all ${
                        (scopeSpecificProps?.style?.textDecoration ?? resolvedProps?.style?.textDecoration) ===
                        'line-through'
                          ? 'bg-[#242424] text-white shadow border border-[#555555]'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Strikethrough className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Line Height & Letter Spacing */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Line Height</span>
                  <input
                    type="text"
                    placeholder="1.4"
                    value={scopeSpecificProps?.style?.lineHeight ?? resolvedProps?.style?.lineHeight ?? ''}
                    onChange={(e) => handleStyleChange('lineHeight', e.target.value)}
                    className="w-full bg-[#111111] text-neutral-200 border border-[#303030] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#707070] font-mono"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Letter Spacing</span>
                  <input
                    type="text"
                    placeholder="0px"
                    value={scopeSpecificProps?.style?.letterSpacing ?? resolvedProps?.style?.letterSpacing ?? ''}
                    onChange={(e) => handleStyleChange('letterSpacing', e.target.value)}
                    className="w-full bg-[#111111] text-neutral-200 border border-[#303030] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#707070] font-mono"
                  />
                </div>
              </div>

              {/* Text Alignment & Text Transform */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Text Alignment</span>
                  <div className="grid grid-cols-4 gap-0.5 bg-[#111111] p-0.5 rounded-lg border border-[#303030]">
                    {(['left', 'center', 'right', 'justify'] as const).map((align) => {
                      const isActive =
                        (scopeSpecificProps?.style?.textAlign ?? resolvedProps?.style?.textAlign ?? 'left') === align;
                      return (
                        <button
                          key={align}
                          onClick={() => handleStyleChange('textAlign', align)}
                          title={`Align ${align}`}
                          className={`py-1 rounded flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-[#242424] text-white shadow border border-[#555555]'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                          {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                          {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                          {align === 'justify' && <AlignJustify className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block mb-1">Text Transform</span>
                  <select
                    value={scopeSpecificProps?.style?.textTransform ?? resolvedProps?.style?.textTransform ?? 'none'}
                    onChange={(e) => handleStyleChange('textTransform', e.target.value)}
                    className="w-full bg-[#111111] text-neutral-200 border border-[#303030] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#707070] cursor-pointer"
                  >
                    <option value="none">None</option>
                    <option value="uppercase">UPPERCASE</option>
                    <option value="lowercase">lowercase</option>
                    <option value="capitalize">Capitalize</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Professional COLOR & THEME Section */}
          <div
            onMouseEnter={() =>
              setHoveredPropertyInfo(
                'Color & Theme: Customize background, text, and border colors, or apply quick theme presets for active scope.'
              )
            }
            onMouseLeave={() => setHoveredPropertyInfo(null)}
            className="space-y-3 border-b border-[#262626] pb-4"
          >
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-neutral-400" />
                <span>Color & Theme</span>
              </label>
              <button
                onClick={handleResetThemeColors}
                title="Reset all theme colors for current scope"
                className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-white bg-[#171717] hover:bg-[#242424] px-2 py-0.5 rounded border border-[#333333] transition-all cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset Theme Colors</span>
              </button>
            </div>

            {/* Quick Theme Presets */}
            <div>
              <span className="text-[10px] text-neutral-400 font-mono block mb-1">Quick Theme Presets</span>
              <div className="grid grid-cols-2 gap-1.5">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      executeCommand({
                        source: 'canvas',
                        targetIds: [primaryElementId],
                        viewportScope: activeEditScope,
                        changes: {
                          [primaryElementId]: {
                            style: {
                              backgroundColor: preset.bg,
                              color: preset.text,
                            },
                          },
                        },
                      });
                    }}
                    className="flex items-center gap-2 p-1.5 bg-[#111111] hover:bg-[#171717] rounded-lg border border-[#262626] text-[10px] text-neutral-300 font-mono transition-all text-left cursor-pointer"
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-[#444444] shrink-0"
                      style={{ backgroundColor: preset.bg }}
                    ></div>
                    <span className="truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Background Color */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-neutral-400 font-mono">Background Color</span>
                <button
                  onClick={() => handleResetColor('backgroundColor')}
                  title="Reset Background Color for current scope"
                  className="text-[9px] font-mono text-neutral-500 hover:text-neutral-300 cursor-pointer"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-1.5 bg-[#111111] border border-[#303030] rounded-lg p-1">
                <input
                  type="color"
                  value={formatColorForPicker(scopeSpecificProps?.style?.backgroundColor ?? resolvedProps?.style?.backgroundColor)}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent shrink-0"
                />
                <input
                  type="text"
                  value={scopeSpecificProps?.style?.backgroundColor ?? resolvedProps?.style?.backgroundColor ?? ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  placeholder="#000000 or rgba(...)"
                  className="w-full bg-transparent text-xs text-neutral-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Custom Text Color */}
            {isTextElement && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-neutral-400 font-mono">Text Color</span>
                  <button
                    onClick={() => handleResetColor('color')}
                    title="Reset Text Color for current scope"
                    className="text-[9px] font-mono text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex items-center gap-1.5 bg-[#111111] border border-[#303030] rounded-lg p-1">
                  <input
                    type="color"
                    value={formatColorForPicker(scopeSpecificProps?.style?.color ?? resolvedProps?.style?.color)}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent shrink-0"
                  />
                  <input
                    type="text"
                    value={scopeSpecificProps?.style?.color ?? resolvedProps?.style?.color ?? ''}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    placeholder="#ffffff or rgba(...)"
                    className="w-full bg-transparent text-xs text-neutral-200 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* Custom Border Color */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-neutral-400 font-mono">Border Color</span>
                <button
                  onClick={() => handleResetColor('borderColor')}
                  title="Reset Border Color for current scope"
                  className="text-[9px] font-mono text-neutral-500 hover:text-neutral-300 cursor-pointer"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-1.5 bg-[#111111] border border-[#303030] rounded-lg p-1">
                <input
                  type="color"
                  value={formatColorForPicker(scopeSpecificProps?.style?.borderColor ?? resolvedProps?.style?.borderColor)}
                  onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent shrink-0"
                />
                <input
                  type="text"
                  value={scopeSpecificProps?.style?.borderColor ?? resolvedProps?.style?.borderColor ?? ''}
                  onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                  placeholder="#333333 or rgba(...)"
                  className="w-full bg-transparent text-xs text-neutral-200 focus:outline-none font-mono"
                />
              </div>
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
