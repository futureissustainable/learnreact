'use client';

import { useGameStore } from '@/store/gameStore';
import { ToggleLeft, ToggleRight, Code } from '@phosphor-icons/react';

interface ScriptsPanelProps {
  fullWidth?: boolean;
}

export function ScriptsPanel({ fullWidth }: ScriptsPanelProps) {
  const hero = useGameStore(s => s.hero);
  const toggleScript = useGameStore(s => s.toggleScript);

  return (
    <div className={`bg-[#22223B] rounded-xl p-4 ${fullWidth ? '' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <Code size={20} className="text-[#A855F7]" />
        <h3 className="font-bold text-white">Automation Scripts</h3>
      </div>

      <p className="text-xs text-[#9A8C98] mb-4">
        Scripts run automatically when conditions are met.
        Learn JS concepts to unlock more powerful scripts.
      </p>

      <div className="space-y-3">
        {hero.scripts.map(script => (
          <div
            key={script.id}
            className={`
              rounded-lg p-3 transition-colors
              ${script.enabled ? 'bg-[#4A4E69]/50' : 'bg-[#4A4E69]/20'}
            `}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm">{script.name}</h4>
                <span className="text-xs text-[#9A8C98]">
                  Triggered {script.triggerCount}x
                </span>
              </div>

              <button
                onClick={() => toggleScript(script.id)}
                className="flex-shrink-0"
              >
                {script.enabled ? (
                  <ToggleRight size={28} weight="fill" className="text-green-400" />
                ) : (
                  <ToggleLeft size={28} className="text-[#9A8C98]" />
                )}
              </button>
            </div>

            {/* Code Preview */}
            <pre className="text-xs bg-[#1a1a2e] rounded p-2 overflow-x-auto font-mono text-green-400">
              {script.code}
            </pre>

            {/* Concepts Used */}
            {script.conceptsUsed.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {script.conceptsUsed.map(concept => (
                  <span
                    key={concept}
                    className="text-[10px] px-1.5 py-0.5 bg-[#A855F7]/20 text-[#A855F7] rounded"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {hero.scripts.length === 0 && (
          <p className="text-[#9A8C98] text-center py-4">
            No scripts yet. Learn concepts to unlock scripts.
          </p>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-[#4A4E69]/20 rounded-lg">
        <p className="text-xs text-[#9A8C98]">
          <strong className="text-[#A855F7]">Tip:</strong> Learning JavaScript concepts unlocks new
          script conditions and actions. The more you learn, the more you can automate!
        </p>
      </div>
    </div>
  );
}
