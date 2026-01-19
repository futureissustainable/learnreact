'use client';

import { useGameStore } from '@/store/gameStore';
import { useRef, useEffect } from 'react';

export function CombatLog() {
  const combatLog = useGameStore(s => s.combatLog);
  const clearLog = useGameStore(s => s.clearLog);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [combatLog]);

  return (
    <div className="bg-[#22223B] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-white">Combat Log</h3>
        <button
          onClick={clearLog}
          className="text-xs text-[#9A8C98] hover:text-white transition-colors"
        >
          Clear
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-48 overflow-y-auto space-y-1 text-sm font-mono scrollbar-thin scrollbar-thumb-[#4A4E69] scrollbar-track-transparent"
      >
        {combatLog.length === 0 ? (
          <p className="text-[#9A8C98]/50 text-center py-8">No combat yet...</p>
        ) : (
          combatLog.map(entry => (
            <div
              key={entry.id}
              className="py-1 px-2 rounded bg-[#4A4E69]/20 hover:bg-[#4A4E69]/40 transition-colors"
              style={{ color: entry.color || '#9A8C98' }}
            >
              {entry.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
