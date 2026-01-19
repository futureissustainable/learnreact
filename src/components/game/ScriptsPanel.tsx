'use client';

import { useGameStore } from '@/store/gameStore';
import { ToggleLeft, ToggleRight, Code, Lightning } from '@phosphor-icons/react';

interface ScriptsPanelProps {
  fullWidth?: boolean;
}

export function ScriptsPanel({ fullWidth }: ScriptsPanelProps) {
  const hero = useGameStore(s => s.hero);
  const toggleScript = useGameStore(s => s.toggleScript);

  return (
    <div className={`bg-[#1e1e2e] rounded-xl p-4 border border-[#313244] ${fullWidth ? '' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <Code size={16} className="text-[#cba6f7]" />
        <h3 className="font-semibold text-[#cdd6f4]">Scripts</h3>
      </div>

      <p className="text-xs text-[#6c7086] mb-4">
        Toggle scripts to automate combat actions.
      </p>

      <div className="space-y-3">
        {hero.scripts.map(script => (
          <div
            key={script.id}
            className={`
              rounded-lg p-3 transition-colors border
              ${script.enabled
                ? 'bg-[#181825] border-[#cba6f7]/30'
                : 'bg-[#181825] border-[#313244]'}
            `}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-[#cdd6f4] text-sm">{script.name}</h4>
                <span className="text-xs text-[#6c7086]">
                  Triggered {script.triggerCount}x
                </span>
              </div>

              <button
                onClick={() => toggleScript(script.id)}
                className="flex-shrink-0"
              >
                {script.enabled ? (
                  <ToggleRight size={28} weight="fill" className="text-[#a6e3a1]" />
                ) : (
                  <ToggleLeft size={28} className="text-[#6c7086]" />
                )}
              </button>
            </div>

            {/* Code Preview */}
            <pre className="text-xs bg-[#11111b] rounded p-2 overflow-x-auto font-mono text-[#a6e3a1] border border-[#313244]">
              {script.code}
            </pre>

            {/* Concepts Used */}
            {script.conceptsUsed.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {script.conceptsUsed.map(concept => (
                  <span
                    key={concept}
                    className="text-[10px] px-1.5 py-0.5 bg-[#cba6f7]/20 text-[#cba6f7] rounded"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {hero.scripts.length === 0 && (
          <p className="text-[#6c7086] text-center py-4 text-sm">
            No scripts yet. Learn concepts to unlock.
          </p>
        )}
      </div>

      {/* Tip */}
      <div className="mt-4 p-3 bg-[#181825] rounded-lg border border-[#313244]">
        <p className="text-xs text-[#6c7086]">
          <Lightning size={12} className="inline text-[#cba6f7] mr-1" />
          Learning JS concepts unlocks new scripts.
        </p>
      </div>
    </div>
  );
}
