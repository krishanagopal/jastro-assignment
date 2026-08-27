import React, { useState } from 'react';
import { ProposalReviewModal } from './components/AI/ProposalReviewModal';
import { CanvasPreview } from './components/Canvas/CanvasPreview';
import { CodeSurface } from './components/CodeEditor/CodeSurface';
import { ElementHistoryDrawer } from './components/History/ElementHistoryDrawer';
import { PropertyPanel } from './components/Inspector/PropertyPanel';
import { HeaderBar } from './components/Shell/HeaderBar';

export const App: React.FC = () => {
  const [isCodeSurfaceOpen, setIsCodeSurfaceOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Top Header Navigation Bar */}
      <HeaderBar
        onToggleCodeSurface={() => setIsCodeSurfaceOpen((prev) => !prev)}
        isCodeSurfaceOpen={isCodeSurfaceOpen}
        onToggleHistoryDrawer={() => setIsHistoryDrawerOpen((prev) => !prev)}
        isHistoryDrawerOpen={isHistoryDrawerOpen}
        onOpenAiProposalsModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Canvas Visual Preview */}
        <CanvasPreview />

        {/* Property Inspector Panel */}
        <PropertyPanel />
      </main>

      {/* Code Surface Side Panel */}
      <CodeSurface
        isOpen={isCodeSurfaceOpen}
        onClose={() => setIsCodeSurfaceOpen(false)}
      />

      {/* Revision History Drawer */}
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
