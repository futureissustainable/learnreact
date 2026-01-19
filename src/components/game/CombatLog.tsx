'use client';

import { useGameStore } from '@/store/gameStore';
import { useRef, useEffect } from 'react';
import { List, Trash } from '@phosphor-icons/react';

export function CombatLog() {
  const combatLog = useGameStore(s => s.combatLog);
  const clearLog = useGameStore(s => s.clearLog);
  const killCount = useGameStore(s => s.killCount);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [combatLog]);

  const recentLogs = combatLog.slice(-30);

  return (
    <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#cdd6f4] flex items-center gap-2">
          <List size={16} className="text-[#6c7086]" />
          Log
        </h3>
        <button
          onClick={clearLog}
          className="text-[#6c7086] hover:text-[#cdd6f4] transition-colors"
        >
          <Trash size={14} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-32 overflow-y-auto space-y-1 text-xs"
      >
        {recentLogs.length === 0 ? (
          <p className="text-[#6c7086] text-center py-4">Combat started...</p>
        ) : (
          recentLogs.map(entry => (
            <div
              key={entry.id}
              className="py-1 px-2 rounded bg-[#181825] text-[#a6adc8]"
            >
              {entry.message}
            </div>
          ))
        )}
      </div>

      {killCount > 0 && (
        <div className="mt-3 pt-3 border-t border-[#313244] text-xs text-[#6c7086]">
          Total kills: <span className="text-[#a6e3a1]">{killCount}</span>
        </div>
      )}
    </div>
  );
}
