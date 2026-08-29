import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  FilePlus,
  Folder,
  FolderOpen,
  Frame,
  Grid,
  Info,
  Layers,
  MousePointer,
  Plus,
  Search,
  Smartphone,
  Tablet,
  Type,
  Unlock,
  X,
} from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';
import { TemplateElement } from '../../types/template';

export const LeftSidebar: React.FC = () => {
  const {
    canonicalTemplate,
    selectedElementIds,
    selectElement,
    activeViewport,
    pages,
    activePageId,
    setActivePage,
    addPage,
    addElement,
  } = useTemplateStore();

  const [activeTab, setActiveTab] = useState<'pages' | 'layers' | 'assets'>('pages');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLayerInfo, setHoveredLayerInfo] = useState<string | null>(null);
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'viewport-group': true,
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const elementsList = Object.values(canonicalTemplate.elements);
  const filteredElements = elementsList.filter(
    (el) =>
      el.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Metallic Grey Icons for all element types
  const getElementIcon = (type: string) => {
    switch (type) {
      case 'heading':
        return <Type className="w-3.5 h-3.5 text-slate-400" />;
      case 'card':
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
      case 'button':
        return <MousePointer className="w-3.5 h-3.5 text-slate-400" />;
      default:
        return <Frame className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getComponentInfo = (type: string, label: string) => {
    switch (type) {
      case 'heading':
        return `${label}: Text node element rendering hero typography.`;
      case 'card':
        return `${label}: Interactive card node container with badge and paragraph text.`;
      case 'button':
        return `${label}: Action button node with customizable click behavior and style.`;
      default:
        return `${label}: Layout element node in template model.`;
    }
  };

  const handleCreatePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageName.trim()) return;
    addPage(newPageName.trim(), newPageSlug.trim() || newPageName.toLowerCase().replace(/\s+/g, '-'));
    setNewPageName('');
    setNewPageSlug('');
    setIsAddPageModalOpen(false);
  };

  const handleQuickAdd = (type: 'heading' | 'card' | 'button' | 'container') => {
    const id = `${type}_${Date.now()}`;
    let label = 'New Element';
    let baseProps = {};

    if (type === 'heading') {
      label = `New Heading (${elementsList.length + 1})`;
      baseProps = {
        content: { text: 'New Page Headline' },
        style: { fontSize: '28px', color: '#ffffff', textAlign: 'center' },
        size: { width: '100%' },
        layout: { order: elementsList.length + 1 },
      };
    } else if (type === 'card') {
      label = `New Card (${elementsList.length + 1})`;
      baseProps = {
        content: { badgeText: 'NEW', text: 'New feature card section block.' },
        style: { backgroundColor: '#0c0d12', color: '#ffffff', padding: '24px', borderRadius: '16px' },
        size: { width: '100%' },
        layout: { order: elementsList.length + 1 },
      };
    } else if (type === 'button') {
      label = `New Button (${elementsList.length + 1})`;
      baseProps = {
        content: { text: 'Get Started' },
        style: { backgroundColor: '#ffffff', color: '#000000', padding: '12px 24px', borderRadius: '8px' },
        size: { width: 'auto' },
        layout: { order: elementsList.length + 1 },
      };
    } else {
      label = `New Section (${elementsList.length + 1})`;
      baseProps = {
        content: { text: 'Section Container' },
        style: { backgroundColor: '#08080a', color: '#ffffff', padding: '32px', borderRadius: '12px' },
        size: { width: '100%' },
        layout: { order: elementsList.length + 1 },
      };
    }

    const newElem: TemplateElement = {
      id,
      type,
      label,
      baseProperties: baseProps,
      viewportOverrides: {},
    };

    addElement(newElem);
  };

  return (
    <aside className="w-64 bg-[#050508]/90 backdrop-blur-xl border-r border-white/10 flex flex-col select-none text-slate-200 z-30 shadow-2xl relative">
      {/* Top Sidebar Header Tabs */}
      <div className="flex items-center border-b border-white/10 bg-[#000000]/40 p-1">
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
            activeTab === 'pages'
              ? 'bg-white/10 text-white font-semibold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Pages
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
            activeTab === 'layers'
              ? 'bg-white/10 text-white font-semibold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Layers
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
            activeTab === 'assets'
              ? 'bg-white/10 text-white font-semibold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Insert (+)
        </button>
      </div>

      {/* Pages View with Add Page Button & Whole Website Preview */}
      {activeTab === 'pages' && (
        <div className="flex-1 flex flex-col p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Site Pages</span>
            <button
              onClick={() => setIsAddPageModalOpen(true)}
              className="flex items-center gap-1 bg-gradient-to-b from-white to-[#cfcfcf] text-black text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-white shadow hover:scale-102 transition-all cursor-pointer"
            >
              <FilePlus className="w-3 h-3 text-black" />
              <span>+ Add Page</span>
            </button>
          </div>

          {/* Full Site Preview Option */}
          <div
            onClick={() => setActivePage('preview-all')}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
              activePageId === 'preview-all'
                ? 'bg-[#242424] border-[#444444] text-white shadow-xl font-bold'
                : 'bg-[#111111] border-[#222222] text-neutral-300 hover:bg-[#1F1F1F] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Grid className="w-4 h-4 text-neutral-400 shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold truncate">🌐 Preview Whole Website</p>
                <p className="text-[10px] font-mono text-neutral-400 truncate">All Pages View</p>
              </div>
            </div>
            {activePageId === 'preview-all' && (
              <span className="text-[9px] font-mono uppercase bg-[#171717] border border-[#3A3A3A] text-neutral-200 px-1.5 py-0.5 rounded font-bold">
                Live
              </span>
            )}
          </div>

          <div className="w-full h-px bg-[#222222] my-1"></div>

          <div className="space-y-1.5 flex-1 overflow-y-auto">
            {Object.values(pages).map((page) => {
              const isActive = page.id === activePageId;
              return (
                <div
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2a2a32] border-white/30 text-white shadow-lg font-bold'
                      : 'bg-[#000000]/40 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isActive ? (
                      <FolderOpen className="w-4 h-4 text-slate-200 shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <div className="truncate">
                      <p className="text-xs truncate">{page.name}</p>
                      <p className="text-[10px] font-mono text-slate-400 truncate">{page.slug}</p>
                    </div>
                  </div>
                  {isActive && (
                    <span className="text-[9px] font-mono uppercase bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                      Active
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Layers Tree View */}
      {activeTab === 'layers' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Search Box */}
          <div className="p-2.5 border-b border-white/10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search layers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#000000]/60 border border-white/15 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-white/40 font-sans"
              />
            </div>
          </div>

          {/* Layer Tree */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {/* Viewport Frame Group */}
            <div className="mb-2">
              <button
                onClick={() => toggleFolder('viewport-group')}
                className="w-full flex items-center justify-between p-1.5 text-xs text-slate-400 hover:text-white font-semibold rounded hover:bg-white/5"
              >
                <div className="flex items-center gap-1.5">
                  {expandedFolders['viewport-group'] ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <Frame className="w-3.5 h-3.5 text-slate-400" />
                  <span className="capitalize">{activeViewport} Viewport</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Primary</span>
              </button>

              {expandedFolders['viewport-group'] !== false && (
                <div className="pl-4 mt-1 space-y-0.5">
                  {filteredElements.map((element) => {
                    const isSelected = selectedElementIds.includes(element.id);
                    return (
                      <div
                        key={element.id}
                        onClick={() => selectElement(element.id, false)}
                        onMouseEnter={() => setHoveredLayerInfo(getComponentInfo(element.type, element.label))}
                        onMouseLeave={() => setHoveredLayerInfo(null)}
                        className={`group flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#2a2a32] text-white font-semibold border border-white/20 shadow'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {getElementIcon(element.type)}
                          <span className="truncate">{element.label}</span>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span title="Component Info">
                            <Info className="w-3 h-3 text-slate-400 hover:text-white" />
                          </span>
                          <Eye className="w-3 h-3 text-slate-400 hover:text-white" />
                          <Unlock className="w-3 h-3 text-slate-400 hover:text-white" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tablet Frame Node */}
            <div className="border-t border-white/10 pt-2">
              <div className="flex items-center justify-between px-2 py-1 text-slate-500 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <Tablet className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tablet</span>
                </div>
                <span>1199–810</span>
              </div>
            </div>

            {/* Phone Frame Node */}
            <div>
              <div className="flex items-center justify-between px-2 py-1 text-slate-500 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone</span>
                </div>
                <span>809–0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insert (+) Elements View */}
      {activeTab === 'assets' && (
        <div className="p-3 text-xs text-slate-400 space-y-4 overflow-y-auto">
          <div>
            <p className="font-bold text-slate-200 mb-2 uppercase text-[10px] tracking-wider font-mono">Basic Components</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickAdd('heading')}
                className="p-3 bg-[#000000]/60 border border-white/15 rounded-xl flex flex-col items-center gap-1.5 hover:border-white/40 hover:bg-white/5 cursor-pointer text-slate-200 transition-all"
              >
                <Type className="w-5 h-5 text-slate-300" />
                <span className="text-[11px] font-semibold">Heading</span>
              </button>
              <button
                onClick={() => handleQuickAdd('card')}
                className="p-3 bg-[#000000]/60 border border-white/15 rounded-xl flex flex-col items-center gap-1.5 hover:border-white/40 hover:bg-white/5 cursor-pointer text-slate-200 transition-all"
              >
                <Grid className="w-5 h-5 text-slate-300" />
                <span className="text-[11px] font-semibold">Card Block</span>
              </button>
              <button
                onClick={() => handleQuickAdd('button')}
                className="p-3 bg-[#000000]/60 border border-white/15 rounded-xl flex flex-col items-center gap-1.5 hover:border-white/40 hover:bg-white/5 cursor-pointer text-slate-200 transition-all"
              >
                <MousePointer className="w-5 h-5 text-slate-300" />
                <span className="text-[11px] font-semibold">Button</span>
              </button>
              <button
                onClick={() => handleQuickAdd('container')}
                className="p-3 bg-[#000000]/60 border border-white/15 rounded-xl flex flex-col items-center gap-1.5 hover:border-white/40 hover:bg-white/5 cursor-pointer text-slate-200 transition-all"
              >
                <Frame className="w-5 h-5 text-slate-300" />
                <span className="text-[11px] font-semibold">Section</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Hover Info Banner */}
      {hoveredLayerInfo && (
        <div className="p-2.5 bg-[#000000]/95 border-t border-white/15 text-[11px] text-slate-300 font-mono flex items-start gap-2 shadow-2xl backdrop-blur-xl">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-tight">{hoveredLayerInfo}</p>
        </div>
      )}

      {/* Add Page Modal */}
      {isAddPageModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePageSubmit}
            className="bg-[#0c0d12]/95 border border-white/15 rounded-2xl w-full max-w-md p-5 shadow-2xl text-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-slate-300" />
                <h3 className="font-extrabold text-sm">Create New Page</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPageModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">PAGE NAME</label>
                <input
                  type="text"
                  placeholder="e.g. About Us, Contact, Pricing"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  className="w-full bg-[#000000]/60 border border-white/15 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">URL SLUG</label>
                <input
                  type="text"
                  placeholder="e.g. /about, /contact"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-full bg-[#000000]/60 border border-white/15 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddPageModalOpen(false)}
                className="px-3 py-1.5 bg-[#12131a] hover:bg-white/10 text-xs text-slate-300 rounded-lg border border-white/15"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-b from-white to-[#cfcfcf] text-black text-xs font-bold rounded-lg shadow-lg border border-white"
              >
                Create Page
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
};
