'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Lightning, Lock, Drop } from '@phosphor-icons/react';
import { TICKS_PER_SECOND } from '@/types/game';

export function AbilitiesBar() {
  const hero = useGameStore(s => s.hero);
  const useAbility = useGameStore(s => s.useAbility);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const unlockedAbilities = hero.abilities.filter(a => a.unlocked);
  const lockedAbilities = hero.abilities.filter(a => !a.unlocked);

  return (
    <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#cdd6f4] flex items-center gap-2">
          <Lightning size={16} className="text-[#f9e2af]" />
          Abilities
        </h3>
        <span className="text-xs text-[#6c7086]">{unlockedAbilities.length}/{hero.abilities.length}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {unlockedAbilities.map(ability => {
          // Tick-based cooldowns
          const currentCooldownTicks = ability.currentCooldownTicks || 0;
          const cooldownTicks = ability.cooldownTicks || 20;
          const onCooldown = currentCooldownTicks > 0;
          const noMana = hero.stats.mana < ability.manaCost;
          const disabled = onCooldown || noMana;
          const cooldownPercent = onCooldown ? (currentCooldownTicks / cooldownTicks) * 100 : 0;
          const cooldownSeconds = currentCooldownTicks / TICKS_PER_SECOND;

          return (
            <div key={ability.id} className="relative">
              <button
                onClick={() => useAbility(ability.id)}
                disabled={disabled}
                onMouseEnter={() => setHoveredId(ability.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  relative w-14 h-14 rounded-lg flex flex-col items-center justify-center
                  border transition-all overflow-hidden
                  ${disabled
                    ? 'bg-[#181825] border-[#313244] opacity-60'
                    : 'bg-[#181825] border-[#45475a] hover:border-[#89b4fa] cursor-pointer'
                  }
                `}
              >
                {/* Cooldown overlay */}
                {onCooldown && (
                  <div
                    className="absolute inset-0 bg-[#11111b]/80"
                    style={{ height: `${cooldownPercent}%` }}
                  />
                )}

                <Lightning size={20} weight="fill" className="text-[#f9e2af] relative z-10" />

                {onCooldown && (
                  <span className="text-[10px] text-[#cdd6f4] relative z-10">
                    {cooldownSeconds.toFixed(1)}s
                  </span>
                )}
              </button>

              {/* Tooltip */}
              {hoveredId === ability.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-[#11111b] rounded-lg border border-[#313244] shadow-lg z-50">
                  <div className="text-sm font-medium text-[#cdd6f4]">{ability.name}</div>
                  <div className="text-xs text-[#6c7086] mt-1">{ability.description}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[#6c7086]">
                    <span className="text-[#89b4fa]">{ability.manaCost} mana</span>
                    <span>{(cooldownTicks / TICKS_PER_SECOND).toFixed(1)}s cd</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Locked abilities */}
        {lockedAbilities.slice(0, 2).map(ability => (
          <div
            key={ability.id}
            className="w-14 h-14 rounded-lg bg-[#181825] border border-dashed border-[#313244] flex items-center justify-center opacity-40"
            title={`Requires: ${ability.requiredConcept}`}
          >
            <Lock size={16} className="text-[#6c7086]" />
          </div>
        ))}
      </div>

      {/* Mana bar */}
      <div className="mt-4 pt-3 border-t border-[#313244]">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[#6c7086] flex items-center gap-1">
            <Drop size={12} className="text-[#89b4fa]" /> Mana
          </span>
          <span className="text-[#a6adc8]">{Math.floor(hero.stats.mana)}/{hero.stats.maxMana}</span>
        </div>
        <div className="h-1.5 bg-[#313244] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#89b4fa] transition-all"
            style={{ width: `${(hero.stats.mana / hero.stats.maxMana) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
