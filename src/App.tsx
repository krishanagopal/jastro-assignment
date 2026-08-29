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

  if (currentPage === 'landing') {
    return (
      <VesperLandingPage
        onGoToEditor={() => setCurrentPage('editor')}
      />
    );
  }

  if (currentPage === 'templates-gallery') {
    return (
      <TemplatesGalleryPage
        onBackToEditor={() => setCurrentPage('editor')}
        onGoToLanding={() => setCurrentPage('landing')}
        onSelectLivePreview={(tmpl) => {
          setSelectedPreviewTemplate(tmpl);
          setCurrentPage('full-template-preview');
        }}
      />
    );
  }

  if (currentPage === 'full-template-preview' && selectedPreviewTemplate) {
    return (
      <FullTemplatePreviewPage
        template={selectedPreviewTemplate}
        onBackToGallery={() => setCurrentPage('templates-gallery')}
      />
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
        {/* Left Layer Tree Sidebar */}
        <LeftSidebar />

        {/* Center Studio Canvas Preview */}
        <CanvasPreview />

        {/* Right Property & Style Inspector */}
        <PropertyPanel />
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
