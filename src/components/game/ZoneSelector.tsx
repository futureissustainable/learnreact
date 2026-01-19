'use client';

import { useGameStore } from '@/store/gameStore';
import { Lock, CheckCircle } from '@phosphor-icons/react';

export function ZoneSelector() {
  const zones = useGameStore(s => s.zones);
  const currentZone = useGameStore(s => s.currentZone);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);
  const hero = useGameStore(s => s.hero);
  const changeZone = useGameStore(s => s.changeZone);

  return (
    <div className="bg-[#22223B] rounded-xl p-4">
      <h3 className="font-bold text-white mb-3">Zones</h3>

      <div className="space-y-2">
        {zones.map(zone => {
          const isActive = currentZone?.id === zone.id;
          const bossKilled = zone.bossId ? bossesDefeated.includes(zone.bossId) : false;
          const meetsLevel = !zone.requiredLevel || hero.level >= zone.requiredLevel;

          return (
            <button
              key={zone.id}
              onClick={() => zone.unlocked && changeZone(zone.id)}
              disabled={!zone.unlocked}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all
                ${isActive
                  ? 'bg-gradient-to-r ' + zone.background + ' ring-2 ring-white/30'
                  : zone.unlocked
                    ? 'bg-[#4A4E69]/50 hover:bg-[#4A4E69]'
                    : 'bg-[#4A4E69]/20 cursor-not-allowed'
                }
              `}
            >
              <span className="text-2xl">{zone.emoji}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium truncate ${zone.unlocked ? 'text-white' : 'text-[#9A8C98]'}`}>
                    {zone.name}
                  </span>
                  {bossKilled && <CheckCircle size={14} className="text-green-400" weight="fill" />}
                </div>
                <span className="text-xs text-white/60">Lv. {zone.level}</span>
              </div>

              {!zone.unlocked && (
                <div className="flex items-center gap-1 text-[#9A8C98]">
                  <Lock size={16} />
                  <span className="text-xs">
                    {!meetsLevel ? `Lv.${zone.requiredLevel}` : 'Boss'}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
