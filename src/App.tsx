import React, { useState } from 'react';
import { ProposalReviewModal } from './components/AI/ProposalReviewModal';
import { CanvasPreview } from './components/Canvas/CanvasPreview';
import { CodeSurface } from './components/CodeEditor/CodeSurface';
import { ElementHistoryDrawer } from './components/History/ElementHistoryDrawer';
import { PropertyPanel } from './components/Inspector/PropertyPanel';
import { VesperLandingPage } from './components/Landing/VesperLandingPage';
import { HeaderBar } from './components/Shell/HeaderBar';
import { LeftSidebar } from './components/Sidebar/LeftSidebar';
import { TemplatesGalleryPage } from './components/Templates/TemplatesGalleryPage';
import { FullTemplatePreviewPage } from './components/Templates/FullTemplatePreviewPage';
import { StarterTemplate } from './data/starterTemplates';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'templates-gallery' | 'full-template-preview' | 'editor'>('landing');
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<StarterTemplate | null>(null);
  const [isCodeSurfaceOpen, setIsCodeSurfaceOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDesktopOnlyModalOpen, setIsDesktopOnlyModalOpen] = useState(false);

  const handleTryEditor = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsDesktopOnlyModalOpen(true);
    } else {
      setCurrentPage('editor');
    }
  };

  const desktopOnlyModal = isDesktopOnlyModalOpen ? (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0c0d12]/95 border border-white/20 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl shrink-0">
            💻
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Desktop Device Required</h3>
            <p className="text-[11px] text-slate-400 font-mono">Editor Workspace Notice</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Vesper Studio Editor is available for desktop devices only. You can check and test live starter templates though!
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={() => setIsDesktopOnlyModalOpen(false)}
            className="px-3.5 py-2 bg-[#171717] hover:bg-[#242424] text-xs font-semibold text-neutral-300 rounded-xl border border-[#333333] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsDesktopOnlyModalOpen(false);
              setCurrentPage('templates-gallery');
            }}
            className="px-4 py-2 bg-gradient-to-b from-white to-[#cfcfcf] text-black text-xs font-extrabold rounded-xl shadow-lg border border-white hover:brightness-105 transition-all cursor-pointer"
          >
            Check Templates Gallery
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (currentPage === 'landing') {
    return (
      <>
        <VesperLandingPage
          onGoToEditor={handleTryEditor}
        />
        {desktopOnlyModal}
      </>
    );
  }

  if (currentPage === 'templates-gallery') {
    return (
      <>
        <TemplatesGalleryPage
          onBackToEditor={handleTryEditor}
          onGoToLanding={() => setCurrentPage('landing')}
          onSelectLivePreview={(tmpl) => {
            setSelectedPreviewTemplate(tmpl);
            setCurrentPage('full-template-preview');
          }}
        />
        {desktopOnlyModal}
      </>
    );
  }

  if (currentPage === 'full-template-preview' && selectedPreviewTemplate) {
    return (
      <>
        <FullTemplatePreviewPage
          template={selectedPreviewTemplate}
          onBackToGallery={() => setCurrentPage('templates-gallery')}
        />
        {desktopOnlyModal}
      </>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#050505] text-[#F5F5F5] font-sans overflow-hidden relative selection:bg-[#262626] selection:text-white">
      {/* Grain Overlay Matching Page 1 */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

      {/* Silver Particle Wave Video Background Matching Page 1 */}
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

      {/* Dark Ambient Radial Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.85)_100%)]"></div>

      {/* Mobile Notice Bar for Studio Editor */}
      <div className="md:hidden bg-[#0c0d12]/95 border-b border-indigo-500/30 px-4 py-2.5 z-50 flex items-center justify-between gap-2 backdrop-blur-xl text-xs text-slate-200 shadow-xl shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">💻</span>
          <p className="text-[11px] leading-tight">
            <strong>Desktop Studio:</strong> Studio editor is optimized for desktop viewports. View live site previews in the gallery.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('templates-gallery')}
          className="px-2.5 py-1 bg-white text-black text-[10px] font-extrabold rounded-lg shrink-0 shadow"
        >
          Gallery
        </button>
      </div>

      {/* Top Header Toolbar */}
      <div className="relative z-40">
        <HeaderBar
          onToggleCodeSurface={() => setIsCodeSurfaceOpen((prev) => !prev)}
          isCodeSurfaceOpen={isCodeSurfaceOpen}
          onToggleHistoryDrawer={() => setIsHistoryDrawerOpen((prev) => !prev)}
          isHistoryDrawerOpen={isHistoryDrawerOpen}
          onOpenAiProposalsModal={() => setIsAiModalOpen(true)}
          onOpenTemplatesGallery={() => setCurrentPage('templates-gallery')}
          onGoToLanding={() => setCurrentPage('landing')}
        />
      </div>

      {/* Main Studio Editor Workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative z-10">
        {/* Left Layer Tree Sidebar (Desktop Only) */}
        <div className="hidden md:flex">
          <LeftSidebar />
        </div>

        {/* Center Studio Canvas Preview */}
        <CanvasPreview />

        {/* Right Property & Style Inspector (Desktop Only) */}
        <div className="hidden lg:flex">
          <PropertyPanel />
        </div>
      </div>

      {/* Code Editor Surface Panel */}
      <CodeSurface
        isOpen={isCodeSurfaceOpen}
        onClose={() => setIsCodeSurfaceOpen(false)}
      />

      {/* Revision History & Recovery Drawer */}
      <ElementHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
      />

      {/* AI Proposal Review Modal */}
      <ProposalReviewModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
};

export default App;
