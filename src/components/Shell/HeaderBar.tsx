import React, { useState } from 'react';
import {
  Code,
  Compass,
  History,
  Laptop,
  Layers,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  XCircle,
} from 'lucide-react';
import { generateAiProposals } from '../../engine/aiDemoEngine';
import { useTemplateStore } from '../../state/templateStore';
import { ViewportScope } from '../../types/template';

interface HeaderBarProps {
  onToggleCodeSurface: () => void;
  isCodeSurfaceOpen: boolean;
  onToggleHistoryDrawer: () => void;
  isHistoryDrawerOpen: boolean;
  onOpenAiProposalsModal: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onToggleCodeSurface,
  isCodeSurfaceOpen,
  onToggleHistoryDrawer,
  isHistoryDrawerOpen,
  onOpenAiProposalsModal,
}) => {
  const {
    activeViewport,
    setActiveViewport,
    activeEditScope,
    setActiveEditScope,
    selectedElementIds,
    clearSelection,
    canonicalTemplate,
    setPendingProposals,
    resetToInitialState,
  } = useTemplateStore();

  const [aiPrompt, setAiPrompt] = useState('');
  const [demoPromptSelect, setDemoPromptSelect] = useState('');

  const handleRunAiDemo = (promptToRun?: string) => {
    const text = promptToRun || aiPrompt;
    if (!text.trim()) return;

    if (selectedElementIds.length === 0) {
      alert('Please select at least one element on the canvas first to target with AI.');
      return;
    }

    const proposals = generateAiProposals({
      instruction: text,
      selectedElementIds,
      viewportScope: activeEditScope,
      state: canonicalTemplate,
    });

    setPendingProposals(proposals);
    onOpenAiProposalsModal();
    setAiPrompt('');
  };

  const demoScenarios = [
    { label: '✨ Scenario 1: Content Rewrite (Headline/Text)', prompt: 'Make headline punchier and improve CTA button' },
    { label: '🎨 Scenario 2: Style Change (Dark Indigo Theme)', prompt: 'Apply dark indigo theme with rounded buttons' },
    { label: '📐 Scenario 3: Layout & Order Adjustment', prompt: 'Swap section layout and increase card width' },
    { label: '📱 Scenario 4: One-Viewport Mobile Stack', prompt: 'Stack service cards vertically on mobile only' },
    { label: '🔥 Scenario 5: Multi-Element Summer Promo', prompt: 'Update headline, button, and footer for summer promo' },
    { label: '⚠️ Scenario 6: Safe Failure (Unselected/Invalid)', prompt: 'Delete whole website' },
  ];

  return (
    <header className="w-full glass-panel sticky top-0 z-40 px-4 py-3 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-slate-100">
      {/* Brand & Mode */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">Scoped AI Editor</span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeViewport === 'desktop'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
            title="Desktop View (~1440px)"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setActiveViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeViewport === 'tablet'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
            title="Tablet View (~768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setActiveViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeViewport === 'mobile'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
            title="Mobile View (~375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Target Scope Selector */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400 font-medium">Edit Scope:</span>
          <select
            value={activeEditScope}
            onChange={(e) => setActiveEditScope(e.target.value as ViewportScope)}
            className="bg-slate-900 text-blue-300 font-semibold border border-slate-600 rounded px-2 py-0.5 focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">ALL VIEWS (Base)</option>
            <option value="desktop">DESKTOP ONLY</option>
            <option value="tablet">TABLET ONLY</option>
            <option value="mobile">MOBILE ONLY</option>
          </select>
        </div>
      </div>

      {/* AI Scenario Bar */}
      <div className="flex-1 max-w-xl mx-2 flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/80 shadow-inner">
        <Sparkles className="w-4 h-4 text-purple-400 ml-2 shrink-0 animate-pulse" />
        <input
          type="text"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRunAiDemo()}
          placeholder="AI Instruction (e.g. 'Apply dark indigo theme', 'Make headline punchier')..."
          className="w-full bg-transparent text-slate-100 text-xs px-2 focus:outline-none placeholder-slate-500"
        />

        {/* Demo Selector Dropdown */}
        <select
          value={demoPromptSelect}
          onChange={(e) => {
            const val = e.target.value;
            setDemoPromptSelect(val);
            if (val) {
              setAiPrompt(val);
              handleRunAiDemo(val);
            }
          }}
          className="bg-slate-800 text-slate-300 text-xs border border-slate-700 rounded-md px-2 py-1 focus:outline-none max-w-[150px] cursor-pointer"
        >
          <option value="">Documented Demos...</option>
          {demoScenarios.map((sc, idx) => (
            <option key={idx} value={sc.prompt}>
              {sc.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleRunAiDemo()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
        >
          <span>Generate</span>
        </button>
      </div>

      {/* Action Buttons & Selection Info */}
      <div className="flex items-center gap-2">
        {selectedElementIds.length > 0 && (
          <div className="flex items-center gap-1.5 bg-blue-950/80 text-blue-300 border border-blue-700/60 px-2.5 py-1 rounded-lg text-xs font-medium">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {selectedElementIds.length} Selected
            </span>
            <button
              onClick={clearSelection}
              className="text-blue-400 hover:text-white ml-1 p-0.5 rounded"
              title="Clear selection"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={onToggleCodeSurface}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isCodeSurfaceOpen
              ? 'bg-purple-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
          title="Toggle Code Surface Editor"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Code Editor</span>
        </button>

        <button
          onClick={onToggleHistoryDrawer}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isHistoryDrawerOpen
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
          title="View Revision History & Recover"
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset the template to initial seed state? This clears all manual and AI edits.')) {
              resetToInitialState();
            }
          }}
          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
          title="Reset to Initial Seed Template"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
