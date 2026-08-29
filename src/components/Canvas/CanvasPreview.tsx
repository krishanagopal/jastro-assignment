import React, { useState } from 'react';
import {
  ChevronRight,
  Grid,
  Hand,
  Image,
  Laptop,
  Layers,
  Moon,
  MousePointer,
  Palette,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';
import { TemplateTreeRenderer } from '../TemplateRenderer/TemplateTreeRenderer';

export type CanvasThemeTexture = 'wave' | 'slate' | 'grid' | 'cosmic' | 'checker';

export const CanvasPreview: React.FC = () => {
  const { canonicalTemplate, activeViewport, selectedElementIds, selectElement, pages, activePageId } = useTemplateStore();
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTool, setActiveTool] = useState<'pointer' | 'hand'>('pointer');
  const [canvasTexture, setCanvasTexture] = useState<CanvasThemeTexture>('wave');
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);

  const isPreviewAllMode = activePageId === 'preview-all';
  const activePage = isPreviewAllMode
    ? { name: 'Whole Website (All Pages)', slug: '/all-pages' }
    : pages[activePageId] || { name: 'Home Page', slug: '/' };

  const getViewportWidthClass = () => {
    switch (activeViewport) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      case 'desktop':
      default:
        return 'w-[1200px] max-w-full';
    }
  };

  const getViewportBadgeIcon = () => {
    switch (activeViewport) {
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5 text-slate-400" />;
      case 'tablet':
        return <Tablet className="w-3.5 h-3.5 text-slate-400" />;
      case 'desktop':
      default:
        return <Laptop className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // Background Texture Classes
  const getTextureStyle = () => {
    switch (canvasTexture) {
      case 'slate':
        return 'bg-gradient-to-br from-[#181924] via-[#0c0d12] to-[#020203]';
      case 'grid':
        return 'bg-[#090a0e] bg-[radial-gradient(#262938_1px,transparent_1px)] [background-size:16px_16px]';
      case 'cosmic':
        return 'bg-[#06070a] bg-[radial-gradient(ellipse_at_center,rgba(50,55,75,0.4)_0%,rgba(0,0,0,0.9)_100%)]';
      case 'checker':
        return 'bg-[#0a0b10] bg-[linear-gradient(45deg,#12131c_25%,transparent_25%),linear-gradient(-45deg,#12131c_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#12131c_75%),linear-gradient(-45deg,transparent_75%,#12131c_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]';
      case 'wave':
      default:
        return 'bg-[#000000]';
    }
  };

  const renderElementsList = (elementsMap: Record<string, any>) => {
    return (
      <TemplateTreeRenderer
        elementsMap={elementsMap}
        activeViewport={activeViewport}
        selectedElementIds={selectedElementIds}
        isEditorMode={true}
        onSelectElement={selectElement}
      />
    );
  };

  const selectedElement = selectedElementIds.length > 0 ? canonicalTemplate.elements[selectedElementIds[0]] : null;

  return (
    <main
      className={`flex-1 min-w-0 min-h-0 flex flex-col items-center justify-start p-4 sm:p-6 overflow-y-auto relative select-none z-20 transition-all duration-300 ${getTextureStyle()}`}
    >
      {/* Silver Particle Wave Video Background when wave texture selected */}
      {canvasTexture === 'wave' && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Dark Ambient Radial Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.85)_100%)]"></div>

      {/* Viewport Frame Header Tag (Sticky Top) */}
      <div className="sticky top-0 z-30 shrink-0 flex items-center gap-2 px-3.5 py-1.5 bg-[#0c0d12]/95 border border-white/20 rounded-full text-xs text-slate-300 shadow-2xl backdrop-blur-xl mb-4">
        {getViewportBadgeIcon()}
        <span className="font-semibold capitalize text-white">{activeViewport} Frame</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 font-mono text-[11px] font-bold">{activePage.name}</span>
        <span className="text-slate-500 font-mono text-[11px]">
          ({activeViewport === 'desktop' ? '1200px' : activeViewport === 'tablet' ? '768px' : '375px'})
        </span>
      </div>

      {/* Center Studio Canvas Document Frame */}
      {(() => {
        const isLightTree = Object.values(canonicalTemplate.elements).some(
          (el) => el.id.includes('flowith') || el.baseProperties?.style?.backgroundColor === '#fafcfb'
        );

        return (
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className={`transition-all duration-200 ${getViewportWidthClass()} ${
              isLightTree ? 'bg-[#fafcfb] text-slate-900 border-slate-300' : 'bg-[#06070a]/90 text-slate-100 border-white/15'
            } shadow-2xl rounded-2xl border relative my-4 h-auto min-h-full z-20 shrink-0`}
          >
            {isPreviewAllMode ? (
              <div className="divide-y divide-white/15">
                {Object.values(pages).map((page) => (
                  <div key={page.id} className="relative">
                    {/* Page Banner Header */}
                    <div className="sticky top-0 bg-[#0c0d12]/95 border-b border-white/10 px-6 py-2.5 flex items-center justify-between z-20 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono">📄 {page.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                          {page.slug}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Page Block</span>
                    </div>

                    {/* Page Elements */}
                    {renderElementsList(page.elements)}
                  </div>
                ))}
              </div>
            ) : (
              renderElementsList(canonicalTemplate.elements)
            )}
          </div>
        );
      })()}

      {/* Webflow-Style Bottom Breadcrumbs Bar + Controls (Sticky Bottom) */}
      <div className="sticky bottom-0 z-40 shrink-0 w-full flex items-center justify-between gap-4 mt-4">
        {/* Left Webflow Breadcrumbs Hierarchy */}
        <div className="flex items-center gap-1.5 bg-[#0c0d12]/90 border border-white/15 rounded-xl px-3 py-1.5 shadow-2xl backdrop-blur-xl text-xs text-slate-300 font-mono">
          <span className="text-slate-400">Body</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span>{activePage.name}</span>
          {selectedElement && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded border border-white/15">
                {selectedElement.label}
              </span>
            </>
          )}
        </div>

        {/* Right Floating Canvas Controls Toolbar */}
        <div className="flex items-center gap-2 bg-[#0c0d12]/90 border border-white/15 rounded-xl p-1 shadow-2xl backdrop-blur-xl text-xs text-slate-200">
          <button
            onClick={() => setActiveTool('pointer')}
            className={`p-1.5 rounded-lg transition-all ${
              activeTool === 'pointer' ? 'bg-white/20 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Pointer Tool"
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTool('hand')}
            className={`p-1.5 rounded-lg transition-all ${
              activeTool === 'hand' ? 'bg-white/20 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Hand Pan Tool"
          >
            <Hand className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1"></div>

          {/* Canvas Background Theme Texture Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsThemePickerOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-semibold"
              title="Change Canvas Background Texture"
            >
              <Palette className="w-3.5 h-3.5 text-slate-300" />
              <span className="capitalize font-mono text-[11px]">{canvasTexture}</span>
            </button>

            {isThemePickerOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-52 bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 text-xs text-slate-200 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 border-b border-white/10 font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Canvas Background Theme
                </div>
                <button
                  onClick={() => {
                    setCanvasTexture('wave');
                    setIsThemePickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    canvasTexture === 'wave' ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>🌊 Silver Particle Wave</span>
                </button>
                <button
                  onClick={() => {
                    setCanvasTexture('slate');
                    setIsThemePickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    canvasTexture === 'slate' ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>🌑 Metallic Graphite Slate</span>
                </button>
                <button
                  onClick={() => {
                    setCanvasTexture('grid');
                    setIsThemePickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    canvasTexture === 'grid' ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>📐 Architectural Grid</span>
                </button>
                <button
                  onClick={() => {
                    setCanvasTexture('cosmic');
                    setIsThemePickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    canvasTexture === 'cosmic' ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>🌌 Cosmic Ambient Glow</span>
                </button>
                <button
                  onClick={() => {
                    setCanvasTexture('checker');
                    setIsThemePickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    canvasTexture === 'checker' ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>🏁 Studio Checkerboard</span>
                </button>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-white/10 mx-1"></div>

          <button
            onClick={() => setZoomLevel((prev) => Math.max(50, prev - 10))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs text-slate-300 font-bold px-1">{zoomLevel}%</span>

          <button
            onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </main>
  );
};
