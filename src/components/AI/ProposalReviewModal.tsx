import React from 'react';
import { AlertCircle, Check, CheckCircle2, Sparkles, X, XCircle } from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';

interface ProposalReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalReviewModal: React.FC<ProposalReviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    pendingProposals,
    acceptProposal,
    rejectProposal,
    canonicalTemplate,
  } = useTemplateStore();

  if (!isOpen || pendingProposals.length === 0) return null;

  const pendingCount = pendingProposals.filter((p) => p.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">AI Proposal Review</h3>
              <p className="text-xs text-slate-400">
                Review proposed edits before applying. Accept or reject each element independently.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Proposals List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {pendingProposals.map((proposal) => {
            const element = canonicalTemplate.elements[proposal.elementId];
            const label = element ? element.label : proposal.elementId;

            return (
              <div
                key={proposal.id}
                className={`p-4 rounded-xl border transition-all flex flex-col gap-3 ${
                  proposal.status === 'accepted'
                    ? 'bg-emerald-950/40 border-emerald-700/60'
                    : proposal.status === 'rejected'
                    ? 'bg-red-950/30 border-red-800/40 opacity-60'
                    : proposal.status === 'invalid'
                    ? 'bg-amber-950/40 border-amber-700/60'
                    : 'bg-slate-800/60 border-slate-700'
                }`}
              >
                {/* Proposal Title & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-200">{label}</span>
                    <span className="text-[10px] font-extrabold uppercase bg-purple-950 text-purple-300 border border-purple-700/60 px-2 py-0.5 rounded">
                      SCOPE: {proposal.viewportScope.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {proposal.status === 'accepted' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Accepted
                      </span>
                    )}
                    {proposal.status === 'rejected' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-950/80 px-2.5 py-1 rounded-md border border-red-700">
                        <XCircle className="w-3.5 h-3.5" />
                        Rejected
                      </span>
                    )}
                    {proposal.status === 'invalid' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-700">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Invalid Proposal
                      </span>
                    )}

                    {proposal.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => rejectProposal(proposal.id)}
                          className="px-3 py-1 bg-slate-700 hover:bg-red-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                        <button
                          onClick={() => acceptProposal(proposal.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Validation Errors for Invalid proposals */}
                {proposal.status === 'invalid' && proposal.validationErrors && (
                  <div className="p-2.5 bg-amber-950/80 border border-amber-700/60 rounded-lg text-amber-200 text-xs">
                    {proposal.validationErrors.join(' | ')}
                  </div>
                )}

                {/* Side-by-Side Diff */}
                {proposal.status !== 'invalid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Before */}
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700/60">
                      <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                        Current State
                      </span>
                      <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto">
                        {JSON.stringify(proposal.beforeProperties, null, 2)}
                      </pre>
                    </div>

                    {/* Proposed Patch */}
                    <div className="p-3 bg-purple-950/40 rounded-lg border border-purple-700/50">
                      <span className="block text-[10px] font-bold uppercase text-purple-300 mb-1">
                        Proposed Scope Patch
                      </span>
                      <pre className="font-mono text-[11px] text-purple-200 overflow-x-auto">
                        {JSON.stringify(proposal.proposedPatch, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {pendingCount} pending proposal(s) remaining.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
