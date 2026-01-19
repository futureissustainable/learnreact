'use client';

import { useGameStore } from '@/store/gameStore';
import { Lock, CheckCircle, MapPin } from '@phosphor-icons/react';

export function ZoneSelector() {
  const zones = useGameStore(s => s.zones);
  const currentZone = useGameStore(s => s.currentZone);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);
  const hero = useGameStore(s => s.hero);
  const changeZone = useGameStore(s => s.changeZone);

  return (
    <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
      <h3 className="font-semibold text-[#cdd6f4] flex items-center gap-2 mb-3">
        <MapPin size={16} className="text-[#89b4fa]" />
        Zones
      </h3>

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
                  ? 'bg-[#313244] ring-1 ring-[#89b4fa]'
                  : zone.unlocked
                    ? 'bg-[#181825] hover:bg-[#313244]'
                    : 'bg-[#181825]/50 cursor-not-allowed opacity-50'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center text-sm
                ${isActive ? 'bg-[#89b4fa]/20 text-[#89b4fa]' : 'bg-[#313244] text-[#6c7086]'}
              `}>
                {zone.level}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium truncate text-sm ${zone.unlocked ? 'text-[#cdd6f4]' : 'text-[#6c7086]'}`}>
                    {zone.name}
                  </span>
                  {bossKilled && <CheckCircle size={14} className="text-[#a6e3a1]" weight="fill" />}
                </div>
              </div>

              {!zone.unlocked && (
                <div className="flex items-center gap-1 text-[#6c7086]">
                  <Lock size={14} />
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
