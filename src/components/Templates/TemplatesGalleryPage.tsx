import React from 'react';
import { ArrowLeft, Eye, Pencil, Sparkles } from 'lucide-react';
import { TRIAL_STARTER_TEMPLATES, StarterTemplate } from '../../data/starterTemplates';
import { useTemplateStore } from '../../state/templateStore';
import { TemplateTreeRenderer } from '../TemplateRenderer/TemplateTreeRenderer';

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
  const { loadStarterTemplate } = useTemplateStore();

  const handleSelectAndEdit = (template: StarterTemplate) => {
    // Deep clone template model & pages to enforce immutable configuration isolation
    const clonedModel = JSON.parse(JSON.stringify(template.templateModel));
    const clonedPages = JSON.parse(JSON.stringify(template.pages));

    loadStarterTemplate({
      templateModel: clonedModel,
      pages: clonedPages,
    });
    onBackToEditor();
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
      <header className="w-full bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#262626] px-6 py-4 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToEditor}
            className="flex items-center gap-2 bg-[#171717] hover:bg-[#242424] border border-[#333333] text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>
          <div className="h-5 w-px bg-[#262626]"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neutral-300" />
            <h1 className="text-sm font-extrabold tracking-wide text-white font-mono">
              VESPER TEMPLATE GALLERY
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onGoToLanding} className="text-xs text-neutral-400 hover:text-white transition-colors">
            Landing Page
          </button>
          <button
            onClick={onBackToEditor}
            className="bg-[#F5F5F5] hover:bg-[#D4D4D4] text-[#050505] font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg border border-white transition-all"
          >
            Open Studio Editor
          </button>
        </div>
      </header>

      {/* Gallery Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 z-10 relative space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-mono font-extrabold tracking-widest text-neutral-300 uppercase bg-[#171717] border border-[#3A3A3A] px-3.5 py-1 rounded-full">
            TRIAL VERSION • 2 PROFESSIONALLY DESIGNED TEMPLATES
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Choose a Template to Start</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Start with one of our professionally designed, fully editable website templates. Select any template to open it in the editor.
          </p>
        </div>

        {/* Trial Templates Grid (Exactly Two Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRIAL_STARTER_TEMPLATES.map((tmpl) => {
            const isDark = tmpl.id === 'apex-ai-workflows';

            return (
              <div
                key={tmpl.id}
                className={`border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all group shadow-2xl backdrop-blur-xl relative overflow-hidden ${
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
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                        isDark ? 'text-slate-400 bg-white/5 border-white/10' : 'text-slate-600 bg-slate-100 border-slate-200'
                      }`}
                    >
                      Full Long-Form Website
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{tmpl.name}</h3>
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
                      elementsMap={tmpl.templateModel.elements}
                      activeViewport="desktop"
                      isEditorMode={false}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectLivePreview(tmpl)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#12131a] hover:bg-[#1c1e2b] text-slate-200 hover:text-white border-white/15'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>👁 Live Full Preview</span>
                  </button>

                  <button
                    onClick={() => handleSelectAndEdit(tmpl)}
                    className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl shadow-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white border-indigo-400/40'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
                    }`}
                  >
                    <Pencil className="w-4 h-4 text-white" />
                    <span>✏️ Edit {tmpl.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
