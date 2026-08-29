import React, { useState } from 'react';
import { ArrowLeft, Laptop, Smartphone, Tablet } from 'lucide-react';
import { StarterTemplate } from '../../data/starterTemplates';
import { TemplateTreeRenderer } from '../TemplateRenderer/TemplateTreeRenderer';
import { loadPersistedTemplate } from '../../utils/templatePersistence';

interface FullTemplatePreviewPageProps {
  template: StarterTemplate;
  onBackToGallery: () => void;
}

export const FullTemplatePreviewPage: React.FC<FullTemplatePreviewPageProps> = ({
  template,
  onBackToGallery,
}) => {
  const [activeViewport, setActiveViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const savedModel = loadPersistedTemplate(template.id);
  const activeTemplateModel = savedModel || template.templateModel;

  const pageKeys = Object.keys(template.pages);
  const [selectedPageId, setSelectedPageId] = useState<string>(pageKeys[0] || 'home');

  const getViewportWidthClass = () => {
    switch (activeViewport) {
      case 'desktop':
        return 'w-full max-w-6xl';
      case 'tablet':
        return 'w-[768px]';
      case 'mobile':
        return 'w-[375px]';
    }
  };

  const activePageObj = template.pages[selectedPageId] || template.pages.home;
  const pageElements = activeTemplateModel.elements || activePageObj?.elements;

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-slate-100 font-sans flex flex-col selection:bg-[#2a2a32] selection:text-white relative overflow-x-hidden">
      {/* Top Controls Bar */}
      <header className="bg-[#0A0A0A] border-b border-[#242424] px-6 py-3 flex items-center justify-between z-30 relative shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGallery}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#171717] hover:bg-[#242424] px-3 py-1.5 rounded-lg border border-[#333333] transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Gallery</span>
          </button>
          <div className="h-4 w-px bg-[#262626]"></div>
          <div>
            <h1 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <span>{template.name}</span>
              <span className="text-[10px] font-mono bg-[#171717] text-neutral-300 border border-[#3A3A3A] px-2 py-0.5 rounded-full">
                Live Full Preview
              </span>
            </h1>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-xl border border-[#262626]">
          <button
            onClick={() => setActiveViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeViewport === 'desktop'
                ? 'bg-[#242424] text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setActiveViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeViewport === 'tablet'
                ? 'bg-[#242424] text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setActiveViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeViewport === 'mobile'
                ? 'bg-[#242424] text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Page Switcher Tabs if template has pages */}
        <div className="flex items-center gap-2">
          {pageKeys.map((pageId) => (
            <button
              key={pageId}
              onClick={() => setSelectedPageId(pageId)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedPageId === pageId
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'bg-[#171717] text-neutral-400 hover:text-neutral-200 border border-[#333333]'
              }`}
            >
              {template.pages[pageId]?.name || pageId}
            </button>
          ))}
        </div>
      </header>

      {/* Main Preview Container */}
      {(() => {
        const isLightTree = Object.values(pageElements).some(
          (el) => el.id.includes('flowith') || el.baseProperties?.style?.backgroundColor === '#fafcfb'
        );

        return (
          <main className="flex-1 bg-[#020204] p-4 sm:p-8 flex flex-col items-center justify-start overflow-y-auto">
            <div
              className={`${getViewportWidthClass()} transition-all duration-300 ${
                isLightTree ? 'bg-[#fafcfb] text-slate-900 border-slate-300' : 'bg-[#06070b] text-slate-100 border-white/10'
              } rounded-2xl shadow-2xl overflow-hidden my-4`}
            >
              {/* Simulated Browser Bar */}
              <div className="h-9 bg-[#0b0d14] border-b border-white/10 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  https://preview.vesper.ai{activePageObj?.slug || '/'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  SSL Encrypted
                </span>
              </div>

              {/* Rendered Website Content */}
              <TemplateTreeRenderer
                elementsMap={pageElements}
                activeViewport={activeViewport}
                isEditorMode={false}
              />
            </div>
          </main>
        );
      })()}
    </div>
  );
};
