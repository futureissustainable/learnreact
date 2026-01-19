'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Lightning, Lock } from '@phosphor-icons/react';

export function AbilitiesBar() {
  const hero = useGameStore(s => s.hero);
  const useAbility = useGameStore(s => s.useAbility);
  const [hoveredAbility, setHoveredAbility] = useState<string | null>(null);

  const unlockedAbilities = hero.abilities.filter(a => a.unlocked);
  const lockedAbilities = hero.abilities.filter(a => !a.unlocked);

  return (
    <div className="bg-[#22223B] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Lightning size={18} weight="fill" className="text-yellow-400" />
          Abilities
        </h3>
        <span className="text-xs text-[#9A8C98]">{unlockedAbilities.length}/{hero.abilities.length} unlocked</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {unlockedAbilities.map(ability => {
          const onCooldown = ability.currentCooldown > 0;
          const noMana = hero.stats.mana < ability.manaCost;
          const disabled = onCooldown || noMana;
          const cooldownPercent = onCooldown ? (ability.currentCooldown / ability.cooldown) * 100 : 0;
          const isHovered = hoveredAbility === ability.id;

          return (
            <div key={ability.id} className="relative group">
              <button
                onClick={() => useAbility(ability.id)}
                disabled={disabled}
                onMouseEnter={() => setHoveredAbility(ability.id)}
                onMouseLeave={() => setHoveredAbility(null)}
                className={`
                  relative w-16 h-16 rounded-xl flex flex-col items-center justify-center
                  transition-all overflow-hidden border-2
                  ${disabled
                    ? 'bg-[#4A4E69]/30 border-[#4A4E69]/50 cursor-not-allowed'
                    : 'bg-gradient-to-br from-[#4A4E69] to-[#3A3E59] border-purple-500/30 hover:border-purple-400 cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20'
                  }
                `}
              >
                {/* Cooldown Overlay - sweep from top */}
                {onCooldown && (
                  <div
                    className="absolute inset-0 bg-black/70 transition-all"
                    style={{
                      clipPath: `polygon(0 0, 100% 0, 100% ${cooldownPercent}%, 0 ${cooldownPercent}%)`
                    }}
                  />
                )}

                {/* Ability Icon */}
                <span className={`text-2xl relative z-10 transition-transform ${!disabled ? 'group-hover:scale-110' : 'opacity-50'}`}>
                  {ability.emoji}
                </span>

                {/* Cooldown Timer */}
                {onCooldown && (
                  <span className="absolute bottom-1 text-xs font-bold text-white/80 z-10">
                    {ability.currentCooldown.toFixed(1)}s
                  </span>
                )}

                {/* No Mana Indicator */}
                {!onCooldown && noMana && (
                  <span className="absolute bottom-0.5 text-[8px] text-red-400 z-10">No Mana</span>
                )}

                {/* Ready glow effect */}
                {!disabled && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#1a1a2e] rounded-lg border border-purple-500/30 shadow-xl z-50 pointer-events-none">
                  <div className="text-sm font-bold text-white">{ability.name}</div>
                  <div className="text-xs text-[#9A8C98] mt-1">{ability.description}</div>
                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/10">
                    <span className="text-xs text-blue-400">💧 {ability.manaCost}</span>
                    <span className="text-xs text-[#9A8C98]">⏱️ {ability.cooldown}s</span>
                  </div>
                  {ability.requiredConcept && (
                    <div className="text-[10px] text-purple-400 mt-1">
                      ✨ From: {ability.requiredConcept}
                    </div>
                  )}
                  {/* Arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a2e] rotate-45 border-r border-b border-purple-500/30" />
                </div>
              )}
            </div>
          );
        })}

        {/* Locked Abilities Preview */}
        {lockedAbilities.slice(0, 3).map(ability => (
          <div
            key={ability.id}
            className="relative w-16 h-16 rounded-xl bg-[#4A4E69]/20 border-2 border-dashed border-[#4A4E69]/40 flex flex-col items-center justify-center cursor-not-allowed"
            title={`${ability.name} - Requires: ${ability.requiredConcept}`}
          >
            <span className="text-2xl opacity-30">{ability.emoji}</span>
            <Lock size={12} className="absolute bottom-1 text-[#9A8C98]/50" />
          </div>
        ))}

        {hero.abilities.length === 0 && (
          <p className="text-[#9A8C98] text-sm">No abilities available</p>
        )}
      </div>

      {/* Mana Bar */}
      <div className="mt-4 p-3 bg-[#4A4E69]/20 rounded-lg">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-blue-400 flex items-center gap-1">
            💧 Mana
          </span>
          <span className="text-xs text-white font-medium">
            {Math.floor(hero.stats.mana)} / {hero.stats.maxMana}
          </span>
        </div>
        <div className="h-2.5 bg-black/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-all duration-200 relative"
            style={{ width: `${(hero.stats.mana / hero.stats.maxMana) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
        <div className="text-right mt-1">
          <span className="text-[10px] text-[#9A8C98]">+{hero.stats.mana >= hero.stats.maxMana ? '0' : '5'}/sec regen</span>
        </div>
      </div>

      {/* Quick Tips */}
      {unlockedAbilities.length < 3 && (
        <div className="mt-3 text-center">
          <span className="text-[10px] text-[#9A8C98]">
            💡 Learn JS concepts to unlock more abilities!
          </span>
        </div>
      )}
    </div>
  );
}
