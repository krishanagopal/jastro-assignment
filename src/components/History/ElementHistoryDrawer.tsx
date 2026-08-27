import React from 'react';
import { Clock, History, RotateCcw, Sparkles, User, X } from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';

interface ElementHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ElementHistoryDrawer: React.FC<ElementHistoryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    historyLog,
    restoreRevision,
    canonicalTemplate,
    selectedElementIds,
  } = useTemplateStore();

  if (!isOpen) return null;

  const targetId = selectedElementIds.length > 0 ? selectedElementIds[0] : null;

  // Filter history entries: if an element is selected, show history for that element; otherwise show all
  const filteredHistory = targetId
    ? historyLog.filter((entry) => entry.elementId === targetId)
    : historyLog;

  const sortedHistory = [...filteredHistory].reverse();

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] z-50 glass-panel border-l border-slate-700/80 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/80 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="font-bold text-sm">Revision History</h3>
            <p className="text-[11px] text-slate-400">
              {targetId
                ? `Showing history for selected element (${canonicalTemplate.elements[targetId]?.label})`
                : 'Showing full page edit history'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* History Entries List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {sortedHistory.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
            <Clock className="w-8 h-8 text-slate-600 mb-1" />
            <p className="font-semibold text-slate-300">No Revisions Logged Yet</p>
            <p>Make a manual edit or accept an AI proposal to create recoverable history entries.</p>
          </div>
        ) : (
          sortedHistory.map((entry) => {
            const element = canonicalTemplate.elements[entry.elementId];
            const label = element ? element.label : entry.elementId;

            return (
              <div
                key={entry.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/70 hover:border-slate-600 transition-all flex flex-col gap-2.5"
              >
                {/* Entry Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-200">{label}</span>
                    <span className="text-[9px] font-extrabold uppercase bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-1.5 py-0.5 rounded">
                      {entry.viewportScope.toUpperCase()} SCOPE
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    Rev #{entry.revision}
                  </span>
                </div>

                {/* Description & Action Type */}
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    {entry.actionType === 'ai_accepted' ? (
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    ) : entry.actionType === 'restore' ? (
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    <span className="text-[11px]">{entry.description}</span>
                  </div>

                  <span className="text-[10px] text-slate-500">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {/* Scope State Snapshot Preview */}
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400">
                  <div className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">
                    Previous Scope State:
                  </div>
                  <pre className="overflow-x-auto">
                    {JSON.stringify(entry.previousState, null, 2)}
                  </pre>
                </div>

                {/* Surgical Restore Button */}
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => {
                      const success = restoreRevision(entry);
                      if (success) {
                        alert(`Successfully restored ${label} (${entry.viewportScope.toUpperCase()} scope) to Revision #${entry.revision}.`);
                      }
                    }}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore This Scope State</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
