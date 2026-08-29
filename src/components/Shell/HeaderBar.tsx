import React, { useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  Code,
  Download,
  FileCode,
  Frame,
  GitBranch,
  History,
  Info,
  Laptop,
  Layout,
  Palette,
  Plus,
  RotateCcw,
  Smartphone,
  Sparkles,
  Square,
  Tablet,
  Type,
  Users,
  X,
} from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';
import { TemplateElement, ViewportScope } from '../../types/template';
import { STARTER_TEMPLATES } from '../../data/starterTemplates';

interface HeaderBarProps {
  onToggleCodeSurface: () => void;
  isCodeSurfaceOpen: boolean;
  onToggleHistoryDrawer: () => void;
  isHistoryDrawerOpen: boolean;
  onOpenAiProposalsModal: () => void;
  onOpenTemplatesGallery: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onToggleCodeSurface,
  isCodeSurfaceOpen,
  onToggleHistoryDrawer,
  isHistoryDrawerOpen,
  onOpenAiProposalsModal,
  onOpenTemplatesGallery,
}) => {
  const {
    activeViewport,
    setActiveViewport,
    activeEditScope,
    setActiveEditScope,
    canonicalTemplate,
    resetToInitialState,
    addElement,
    loadStarterTemplate,
  } = useTemplateStore();

  // Dropdowns & Modals State
  const [isCanvasDropdownOpen, setIsCanvasDropdownOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [activeInfoTooltip, setActiveInfoTooltip] = useState<string | null>(null);

  const handleViewportSwitch = (viewport: 'desktop' | 'tablet' | 'mobile') => {
    setActiveViewport(viewport);
    setActiveEditScope(viewport);
  };

  const handleAddHeading = () => {
    const id = `heading_${Date.now()}`;
    const newElem: TemplateElement = {
      id,
      type: 'heading',
      label: `New Heading (${Object.keys(canonicalTemplate.elements).length + 1})`,
      baseProperties: {
        content: { text: 'New Custom Heading Title' },
        style: { fontSize: '28px', color: '#ffffff', textAlign: 'center' },
        size: { width: '100%' },
        layout: { order: Object.keys(canonicalTemplate.elements).length + 1 },
      },
      viewportOverrides: {},
    };
    addElement(newElem);
  };

  const handleAddContainer = () => {
    const id = `card_${Date.now()}`;
    const newElem: TemplateElement = {
      id,
      type: 'card',
      label: `New Card (${Object.keys(canonicalTemplate.elements).length + 1})`,
      baseProperties: {
        content: {
          badgeText: 'FEATURE',
          text: 'Custom interactive card block built dynamically using top toolbar creation tool.',
        },
        style: {
          backgroundColor: '#0c0d12',
          color: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
        },
        size: { width: '100%' },
        layout: { order: Object.keys(canonicalTemplate.elements).length + 1 },
      },
      viewportOverrides: {},
    };
    addElement(newElem);
  };

  const handleAddButton = () => {
    const id = `btn_${Date.now()}`;
    const newElem: TemplateElement = {
      id,
      type: 'button',
      label: `New Button (${Object.keys(canonicalTemplate.elements).length + 1})`,
      baseProperties: {
        content: { text: 'Custom Action Button' },
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: '12px 24px',
          borderRadius: '8px',
        },
        size: { width: 'auto' },
        layout: { order: Object.keys(canonicalTemplate.elements).length + 1 },
      },
      viewportOverrides: {},
    };
    addElement(newElem);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(canonicalTemplate, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `template_v${canonicalTemplate.version}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <header className="w-full bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-4 text-slate-100 select-none z-40 relative shadow-2xl">
      {/* Left Toolbar Tools (All Metallic Grey Icons) */}
      <div className="flex items-center gap-2">
        {/* Canvas Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsCanvasDropdownOpen((prev) => !prev)}
            onMouseEnter={() => setActiveInfoTooltip('Canvas Menu: Manage template exports, code surface, and revision history.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="flex items-center gap-1.5 bg-gradient-to-b from-[#22222a] to-[#121217] border border-white/15 hover:border-white/40 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer text-slate-200 shadow transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Canvas</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isCanvasDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 text-xs text-slate-200 space-y-1">
              <button
                onClick={() => {
                  handleDownloadJson();
                  setIsCanvasDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Template JSON</span>
              </button>
              <button
                onClick={() => {
                  onToggleCodeSurface();
                  setIsCanvasDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <FileCode className="w-3.5 h-3.5 text-slate-400" />
                <span>Toggle Code Surface</span>
              </button>
              <button
                onClick={() => {
                  onToggleHistoryDrawer();
                  setIsCanvasDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>View Revision History</span>
              </button>
              <div className="border-t border-white/10 my-1"></div>
              <button
                onClick={() => {
                  if (confirm('Reset template state to initial seed state?')) {
                    resetToInitialState();
                  }
                  setIsCanvasDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-950/50 text-red-400 transition-colors text-left"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Seed State</span>
              </button>
            </div>
          )}
        </div>

        {/* Standalone Templates Button */}
        <button
          onClick={onOpenTemplatesGallery}
          onMouseEnter={() => setActiveInfoTooltip('Starter Templates Gallery: Browse, preview, and load pre-built site templates.')}
          onMouseLeave={() => setActiveInfoTooltip(null)}
          className="flex items-center gap-1.5 bg-[#171717] border border-[#333333] hover:border-[#555555] hover:bg-[#242424] px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-200 shadow cursor-pointer transition-all"
        >
          <Palette className="w-3.5 h-3.5 text-neutral-300" />
          <span>Templates</span>
        </button>

        {/* Quick Creation Toolbar */}
        <div className="flex items-center gap-1 bg-[#111111] border border-[#262626] p-1 rounded-lg">
          <button
            onClick={handleAddContainer}
            onMouseEnter={() => setActiveInfoTooltip('Add Card: Inserts a responsive layout card element.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="p-1.5 hover:bg-[#1F1F1F] rounded text-neutral-400 hover:text-white transition-colors"
            title="Add Container Frame (+ Card)"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleAddContainer}
            onMouseEnter={() => setActiveInfoTooltip('Add Frame: Inserts a layout frame container.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="p-1.5 hover:bg-[#1F1F1F] rounded text-neutral-400 hover:text-white transition-colors"
            title="Add Frame Layout Section"
          >
            <Frame className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleAddHeading}
            onMouseEnter={() => setActiveInfoTooltip('Add Text: Inserts a new headline text node.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="p-1.5 hover:bg-[#1F1F1F] rounded text-neutral-400 hover:text-white transition-colors"
            title="Add Text Heading"
          >
            <Type className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleAddButton}
            onMouseEnter={() => setActiveInfoTooltip('Add Button: Inserts an interactive action button.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="p-1.5 hover:bg-[#1F1F1F] rounded text-neutral-400 hover:text-white transition-colors"
            title="Add Button Shape"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Site & Branch Badge + Viewport Selector */}
      <div className="flex items-center gap-3">
        {/* Site Branch Badge */}
        <div className="relative">
          <button
            onClick={() => setIsBranchModalOpen((prev) => !prev)}
            onMouseEnter={() => setActiveInfoTooltip('Git Branch: Main authoritative template branch & version v' + canonicalTemplate.version)}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="flex items-center gap-2 bg-[#111111] border border-[#262626] hover:border-[#3A3A3A] px-3 py-1.5 rounded-lg text-xs cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-neutral-300">Site</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-200 font-mono text-[11px] font-bold">main</span>
          </button>

          {isBranchModalOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#151515] border border-[#303030] rounded-xl shadow-2xl p-3 z-50 text-xs text-neutral-200 space-y-2">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-2 font-bold text-neutral-100">
                <span>Branch Context</span>
                <span className="text-[10px] font-mono text-neutral-300 bg-[#242424] px-2 py-0.5 rounded border border-[#333333]">CLEAN</span>
              </div>
              <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
                <p>Branch: <strong className="text-white">main</strong></p>
                <p>Revision Counter: <strong className="text-neutral-200">v{canonicalTemplate.version}</strong></p>
                <p>Total Elements: <strong className="text-white">{Object.keys(canonicalTemplate.elements).length}</strong></p>
              </div>
            </div>
          )}
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center bg-[#12131a] p-1 rounded-lg border border-white/15">
          <button
            onClick={() => handleViewportSwitch('desktop')}
            onMouseEnter={() => setActiveInfoTooltip('Desktop Viewport: 1200px desktop canvas frame preview.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              activeViewport === 'desktop'
                ? 'bg-gradient-to-b from-white to-[#cfcfcf] text-black font-bold shadow-lg border border-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => handleViewportSwitch('tablet')}
            onMouseEnter={() => setActiveInfoTooltip('Tablet Viewport: 768px tablet canvas frame preview.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              activeViewport === 'tablet'
                ? 'bg-gradient-to-b from-white to-[#cfcfcf] text-black font-bold shadow-lg border border-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => handleViewportSwitch('mobile')}
            onMouseEnter={() => setActiveInfoTooltip('Phone Viewport: 375px mobile canvas frame preview.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              activeViewport === 'mobile'
                ? 'bg-gradient-to-b from-white to-[#cfcfcf] text-black font-bold shadow-lg border border-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone</span>
          </button>
        </div>

        {/* Target Edit Scope */}
        <div
          onMouseEnter={() => setActiveInfoTooltip('Scope Selector: Target ALL base properties or specific viewport overrides.')}
          onMouseLeave={() => setActiveInfoTooltip(null)}
          className="flex items-center gap-1.5 bg-[#12131a] border border-white/15 px-2.5 py-1 rounded-lg text-xs"
        >
          <span className="text-slate-400 font-medium">Scope:</span>
          <select
            value={activeEditScope}
            onChange={(e) => setActiveEditScope(e.target.value as ViewportScope)}
            className="bg-[#050508] text-slate-200 font-bold border border-white/15 rounded px-2 py-0.5 focus:outline-none cursor-pointer"
          >
            <option value="all">ALL (Base)</option>
            <option value="desktop">DESKTOP</option>
            <option value="tablet">TABLET</option>
            <option value="mobile">MOBILE</option>
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Code Surface Toggle */}
        <button
          onClick={onToggleCodeSurface}
          onMouseEnter={() => setActiveInfoTooltip('Code Surface: Edit raw JSON template state model directly.')}
          onMouseLeave={() => setActiveInfoTooltip(null)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            isCodeSurfaceOpen ? 'bg-white text-black font-bold shadow-lg' : 'bg-[#12131a] border border-white/15 text-slate-300 hover:text-white'
          }`}
          title="Toggle Code Surface"
        >
          <Code className="w-3.5 h-3.5 text-slate-400" />
          <span>Code</span>
        </button>

        {/* History Drawer Toggle */}
        <button
          onClick={onToggleHistoryDrawer}
          onMouseEnter={() => setActiveInfoTooltip('History Drawer: View audit log and recover single element revisions.')}
          onMouseLeave={() => setActiveInfoTooltip(null)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            isHistoryDrawerOpen ? 'bg-white text-black font-bold shadow-lg' : 'bg-[#12131a] border border-white/15 text-slate-300 hover:text-white'
          }`}
          title="View History"
        >
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span>History</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            if (confirm('Reset template to initial seed state?')) {
              resetToInitialState();
            }
          }}
          onMouseEnter={() => setActiveInfoTooltip('Reset State: Reset template back to initial seed model.')}
          onMouseLeave={() => setActiveInfoTooltip(null)}
          className="p-1.5 bg-[#12131a] border border-white/15 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          title="Reset Template"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Collaborators Avatars */}
        <div className="relative">
          <div
            onClick={() => setIsCollaboratorsOpen((prev) => !prev)}
            onMouseEnter={() => setActiveInfoTooltip('Active Collaborators: View real-time team members editing the canvas.')}
            onMouseLeave={() => setActiveInfoTooltip(null)}
            className="flex items-center -space-x-1.5 ml-1 cursor-pointer"
            title="Active Collaborators"
          >
            <div className="w-6 h-6 rounded-full bg-[#2a2a32] border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow">
              P
            </div>
            <div className="w-6 h-6 rounded-full bg-[#3a3a44] border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow">
              M
            </div>
          </div>

          {isCollaboratorsOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl p-3 z-50 text-xs text-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-100 border-b border-white/10 pb-2">
                <Users className="w-4 h-4 text-slate-300" />
                <span>Active Collaborators</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-[#2a2a32] text-white font-bold text-[9px] flex items-center justify-center">P</div>
                  <div>
                    <p className="font-bold text-slate-200">Paul (Product Lead)</p>
                    <p className="text-[9px] text-slate-400">Editing Hero Headline</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-[#3a3a44] text-white font-bold text-[9px] flex items-center justify-center">M</div>
                  <div>
                    <p className="font-bold text-slate-200">Monika (Design Lead)</p>
                    <p className="text-[9px] text-slate-400">Editing Service Cards</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liquid Glass Publish Button */}
        <button
          onClick={() => setIsPublishModalOpen(true)}
          onMouseEnter={() => setActiveInfoTooltip('Publish Project: Export production JSON bundle or web package.')}
          onMouseLeave={() => setActiveInfoTooltip(null)}
          className="bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black font-extrabold text-xs px-4 py-1.5 rounded-lg shadow-lg hover:from-white hover:to-[#e0e0e0] transition-all active:scale-95 flex items-center gap-1.5 border border-white"
        >
          <span>Publish</span>
        </button>
      </div>

      {/* Floating Info Tooltip Banner */}
      {activeInfoTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#0c0d12]/95 border border-white/20 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono shadow-2xl flex items-center gap-2 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{activeInfoTooltip}</span>
        </div>
      )}

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0d12]/95 border border-white/15 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base">Publish Project Bundle</h3>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your template is ready to deploy! Export the standalone JSON model bundle or clean website package below:
            </p>

            <div className="p-3 bg-[#050508] rounded-xl border border-white/15 text-xs font-mono text-slate-400 space-y-1">
              <p>Template: <strong className="text-white">Vesper.ai Operational Infrastructure</strong></p>
              <p>Revision: <strong className="text-slate-200">v{canonicalTemplate.version}</strong></p>
              <p>Status: <strong className="text-emerald-400">Validated & Ready for Deployment</strong></p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 bg-[#12131a] hover:bg-[#262b3a] text-xs text-slate-300 font-semibold rounded-lg border border-white/15"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDownloadJson();
                  alert('Template bundle successfully exported!');
                  setIsPublishModalOpen(false);
                }}
                className="px-4 py-2 bg-gradient-to-b from-white to-[#cfcfcf] text-black text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 border border-white"
              >
                <Download className="w-4 h-4" />
                <span>Export & Download Bundle</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Starter Templates Modal */}
      {isTemplatesModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative bg-[#0c0d12]/95 border border-white/15 rounded-2xl w-full max-w-3xl p-6 shadow-2xl text-slate-100 flex flex-col gap-4 max-h-[85vh] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-extrabold text-base text-white">Ready-to-Go Starter Templates</h3>
                  <p className="text-xs text-slate-400">Select any template to instantiate its pages and elements for immediate editing.</p>
                </div>
              </div>
              <button
                onClick={() => setIsTemplatesModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 max-h-[65vh]">
              {STARTER_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-[#050508]/90 border border-white/15 rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all group shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {tmpl.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {tmpl.pageCount} Page{tmpl.pageCount > 1 ? 's' : ''}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                      {tmpl.name}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      loadStarterTemplate({
                        templateModel: tmpl.templateModel,
                        pages: tmpl.pages,
                      });
                      setIsTemplatesModalOpen(false);
                    }}
                    className="w-full py-2 bg-gradient-to-b from-white via-[#f0f0f0] to-[#d6d6d6] text-black text-xs font-extrabold rounded-lg shadow-md border border-white hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Use & Edit Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
