import React, { useState } from 'react';
import { ArrowLeft, Eye, Pencil, RotateCcw, Sparkles } from 'lucide-react';
import { TRIAL_STARTER_TEMPLATES, StarterTemplate } from '../../data/starterTemplates';
import { useTemplateStore } from '../../state/templateStore';
import { TemplateTreeRenderer } from '../TemplateRenderer/TemplateTreeRenderer';
import { loadPersistedTemplate } from '../../utils/templatePersistence';

interface TemplatesGalleryPageProps {
  onBackToEditor: () => void;
  onGoToLanding: () => void;
  onSelectLivePreview: (template: StarterTemplate) => void;
}

export const TemplatesGalleryPage: React.FC<TemplatesGalleryPageProps> = ({
  onBackToEditor,
  onGoToLanding,
  onSelectLivePreview,
}) => {
  const { selectActiveTemplate, resetCurrentTemplateToSeed } = useTemplateStore();
  const [resetConfirmTemplateId, setResetConfirmTemplateId] = useState<string | null>(null);

  const handleSelectAndEdit = (template: StarterTemplate) => {
    const success = selectActiveTemplate(template.id);
    if (success) {
      onBackToEditor();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-slate-100 font-sans flex flex-col selection:bg-[#2a2a32] selection:text-white relative">
      {/* Background Noise & Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
          type="video/mp4"
        />
      </video>

      {/* Top Gallery Navigation Bar */}
      <header className="w-full bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#262626] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 z-20 relative">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={onBackToEditor}
            className="flex items-center gap-1.5 bg-[#171717] hover:bg-[#242424] border border-[#333333] text-neutral-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <div className="h-4 w-px bg-[#262626] hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-300" />
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wide text-white font-mono">
              VESPER TEMPLATE GALLERY
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button onClick={onGoToLanding} className="text-xs text-neutral-400 hover:text-white transition-colors">
            Landing Page
          </button>
          <button
            onClick={onBackToEditor}
            className="bg-[#F5F5F5] hover:bg-[#D4D4D4] text-[#050505] font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-lg border border-white transition-all"
          >
            Open Studio Editor
          </button>
        </div>
      </header>

      {/* Gallery Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 z-10 relative space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block text-[10px] sm:text-[11px] font-mono font-extrabold tracking-widest text-neutral-300 uppercase bg-[#171717] border border-[#3A3A3A] px-3 py-1 rounded-full">
            TRIAL VERSION • 2 PROFESSIONALLY DESIGNED TEMPLATES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Choose a Template to Start</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Start with one of our professionally designed, fully editable website templates. Select any template to open it in the editor.
          </p>
        </div>

        {/* Trial Templates Grid (Exactly Two Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRIAL_STARTER_TEMPLATES.map((tmpl) => {
            const isDark = tmpl.id === 'apex-ai-workflows';
            const savedModel = loadPersistedTemplate(tmpl.id);
            const displayElements = savedModel ? savedModel.elements : tmpl.templateModel.elements;
            const hasCustomization = Boolean(savedModel);

            return (
              <div
                key={tmpl.id}
                className={`border rounded-2xl p-4 sm:p-6 flex flex-col justify-between space-y-6 transition-all group shadow-2xl backdrop-blur-xl relative overflow-hidden ${
                  isDark
                    ? 'bg-[#070912]/95 border-indigo-500/40 hover:border-indigo-400'
                    : 'bg-[#fafcfb] border-emerald-500/40 hover:border-emerald-500 text-slate-900'
                }`}
              >
                {/* Header Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md border ${
                        isDark
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      {tmpl.badge}
                    </span>
                    {hasCustomization && (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                        SAVED EDITS ACTIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{tmpl.name}</h3>
                    <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {tmpl.description}
                    </p>
                  </div>
                </div>

                {/* Scaled Mini Live Website Preview Container */}
                <div
                  className={`w-full h-72 rounded-xl border overflow-hidden relative ${
                    isDark ? 'bg-[#03050c] border-white/15' : 'bg-[#fafcfb] border-slate-300'
                  }`}
                >
                  <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] pointer-events-none overflow-y-auto">
                    <TemplateTreeRenderer
                      elementsMap={displayElements}
                      activeViewport="desktop"
                      isEditorMode={false}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      const updatedStarter = {
                        ...tmpl,
                        templateModel: savedModel || tmpl.templateModel,
                      };
                      onSelectLivePreview(updatedStarter);
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#12131a] hover:bg-[#1c1e2b] text-slate-200 hover:text-white border-white/15'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>👁 Live Preview</span>
                  </button>

                  <button
                    onClick={() => handleSelectAndEdit(tmpl)}
                    className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl shadow-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#F5F5F5] hover:bg-[#D4D4D4] text-[#050505] border-white'
                        : 'bg-[#171717] hover:bg-[#242424] text-white border-[#3A3A3A]'
                    }`}
                  >
                    <Pencil className={`w-4 h-4 ${isDark ? 'text-[#050505]' : 'text-white'}`} />
                    <span>Edit {tmpl.name}</span>
                  </button>

                  {hasCustomization && (
                    <button
                      onClick={() => setResetConfirmTemplateId(tmpl.id)}
                      title="Reset template to original seed state"
                      className="px-3 py-2.5 text-xs font-semibold rounded-xl border border-red-800/40 bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      {resetConfirmTemplateId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#262626] rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl text-slate-200">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Reset this template to its original design?</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This will remove your saved changes and restore the original template.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setResetConfirmTemplateId(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#171717] hover:bg-[#242424] text-neutral-300 border border-[#333333] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetCurrentTemplateToSeed(resetConfirmTemplateId);
                  setResetConfirmTemplateId(null);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-red-600 hover:bg-red-500 text-white border border-red-500 transition-all cursor-pointer shadow-lg"
              >
                Reset Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
