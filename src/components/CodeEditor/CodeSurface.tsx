import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, Code, RefreshCw, X } from 'lucide-react';
import { useTemplateStore } from '../../state/templateStore';

interface CodeSurfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeSurface: React.FC<CodeSurfaceProps> = ({ isOpen, onClose }) => {
  const {
    canonicalTemplate,
    selectedElementIds,
    activeEditScope,
    executeCommand,
  } = useTemplateStore();

  const targetId = selectedElementIds.length > 0 ? selectedElementIds[0] : null;
  const targetElement = targetId ? canonicalTemplate.elements[targetId] : null;

  // Local draft code state (SEPARATE from canonical state)
  const [draftCode, setDraftCode] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Sync draft code whenever canonical template or target selection changes
  useEffect(() => {
    if (targetElement) {
      const scopeData =
        activeEditScope === 'all'
          ? targetElement.baseProperties
          : targetElement.viewportOverrides[activeEditScope] || {};
      setDraftCode(JSON.stringify(scopeData, null, 2));
    } else {
      setDraftCode(JSON.stringify(canonicalTemplate.elements, null, 2));
    }
    setParseError(null);
    setAppliedSuccess(false);
  }, [canonicalTemplate, targetId, activeEditScope, isOpen]);

  if (!isOpen) return null;

  const handleApplyChanges = () => {
    setParseError(null);
    setAppliedSuccess(false);

    try {
      const parsedJSON = JSON.parse(draftCode);

      if (targetId && targetElement) {
        // Apply edit for single targeted element properties
        const success = executeCommand({
          source: 'code',
          targetIds: [targetId],
          viewportScope: activeEditScope,
          changes: {
            [targetId]: parsedJSON,
          },
        });

        if (success) {
          setAppliedSuccess(true);
          setTimeout(() => setAppliedSuccess(false), 2500);
        } else {
          setParseError('Validation Error: Edit command was rejected by validation pipeline.');
        }
      } else {
        // Apply full template elements edit
        let hasErrors = false;
        for (const elemId of Object.keys(parsedJSON)) {
          const patch = parsedJSON[elemId];
          const scopePatch = activeEditScope === 'all' ? patch.baseProperties || patch : patch;

          const success = executeCommand({
            source: 'code',
            targetIds: [elemId],
            viewportScope: activeEditScope,
            changes: {
              [elemId]: scopePatch,
            },
          });

          if (!success) hasErrors = true;
        }

        if (!hasErrors) {
          setAppliedSuccess(true);
          setTimeout(() => setAppliedSuccess(false), 2500);
        } else {
          setParseError('Validation Error: One or more element code updates failed validation.');
        }
      }
    } catch (err: any) {
      // NON-DESTRUCTIVE ERROR BOUNDARY
      setParseError(`JSON Syntax Error: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] z-50 glass-panel border-l border-slate-700/80 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-200">
      {/* Code Panel Header */}
      <div className="p-4 border-b border-slate-700/80 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm">
            Code Editor{' '}
            <span className="text-xs font-mono text-purple-300 ml-1">
              ({targetElement ? targetElement.label : 'Full Template'})
            </span>
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Scope Badge */}
      <div className="bg-slate-900/60 px-4 py-2 text-xs text-slate-400 flex items-center justify-between border-b border-slate-800">
        <span>Editing Scope:</span>
        <span className="font-mono font-bold text-purple-300 uppercase">
          {activeEditScope.toUpperCase()}
        </span>
      </div>

      {/* Error Alert Banner */}
      {parseError && (
        <div className="m-3 p-3 bg-red-950/90 border border-red-700 text-red-200 text-xs rounded-xl flex items-start gap-2 animate-in fade-in">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block font-bold">Invalid Code Edit</strong>
            <span>{parseError}</span>
            <p className="mt-1 text-[10px] text-red-300/80 italic">
              Canonical template state remains active and intact.
            </p>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {appliedSuccess && (
        <div className="m-3 p-2.5 bg-emerald-950/90 border border-emerald-700 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Valid code edit committed to canonical state successfully!</span>
        </div>
      )}

      {/* Textarea Code Surface (Draft State) */}
      <div className="flex-1 p-3 bg-slate-950 font-mono text-xs text-blue-200 overflow-hidden flex flex-col">
        <textarea
          value={draftCode}
          onChange={(e) => setDraftCode(e.target.value)}
          className="w-full h-full bg-transparent border-0 resize-none focus:outline-none font-mono text-xs leading-relaxed text-purple-200"
          spellCheck={false}
        />
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-700/80 bg-slate-900/90 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            if (targetElement) {
              const scopeData =
                activeEditScope === 'all'
                  ? targetElement.baseProperties
                  : targetElement.viewportOverrides[activeEditScope] || {};
              setDraftCode(JSON.stringify(scopeData, null, 2));
            } else {
              setDraftCode(JSON.stringify(canonicalTemplate.elements, null, 2));
            }
            setParseError(null);
          }}
          className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700 hover:bg-slate-700 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Draft</span>
        </button>

        <button
          onClick={handleApplyChanges}
          className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs rounded-lg shadow flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Apply Edits</span>
        </button>
      </div>
    </div>
  );
};
