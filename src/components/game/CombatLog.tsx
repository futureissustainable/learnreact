'use client';

import { useGameStore } from '@/store/gameStore';
import { useRef, useEffect } from 'react';
import { Scroll, Trash } from '@phosphor-icons/react';

const TYPE_ICONS: Record<string, string> = {
  player_attack: '⚔️',
  player_crit: '💥',
  enemy_attack: '🔴',
  ability: '✨',
  heal: '💚',
  loot: '🎁',
  gold: '💰',
  xp: '⭐',
  level_up: '🎉',
  script: '⚡',
  death: '💀',
  buff: '🛡️',
  zone: '🗺️'
};

export function CombatLog() {
  const combatLog = useGameStore(s => s.combatLog);
  const clearLog = useGameStore(s => s.clearLog);
  const killCount = useGameStore(s => s.killCount);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom (newest)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [combatLog]);

  // Show recent entries (last 50)
  const recentLogs = combatLog.slice(-50);

  return (
    <div className="bg-[#22223B] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Scroll size={18} className="text-[#9A8C98]" />
          Combat Log
        </h3>
        <button
          onClick={clearLog}
          className="text-xs text-[#9A8C98] hover:text-white transition-colors flex items-center gap-1"
        >
          <Trash size={12} />
          Clear
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-40 overflow-y-auto space-y-1 text-sm scrollbar-thin scrollbar-thumb-[#4A4E69] scrollbar-track-transparent"
      >
        {recentLogs.length === 0 ? (
          <div className="text-center py-6 space-y-2">
            <p className="text-[#9A8C98]">⚔️ Battle in progress!</p>
            <p className="text-xs text-[#9A8C98]/60">
              Your hero attacks automatically. Watch the HP bars!
            </p>
          </div>
        ) : (
          recentLogs.map(entry => (
            <div
              key={entry.id}
              className="py-1.5 px-2 rounded bg-[#4A4E69]/20 hover:bg-[#4A4E69]/30 transition-colors flex items-center gap-2"
            >
              <span className="text-base">{TYPE_ICONS[entry.type] || '•'}</span>
              <span style={{ color: entry.color || '#9A8C98' }}>
                {entry.message}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Stats footer */}
      {killCount > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#9A8C98]">
          <span>Monsters slain: <span className="text-green-400 font-bold">{killCount}</span></span>
          <span className="text-[#9A8C98]/50">{recentLogs.length} events</span>
        </div>
      )}
    </div>
  );
}
