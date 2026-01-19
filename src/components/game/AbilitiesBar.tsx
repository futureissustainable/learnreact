'use client';

import { useGameStore } from '@/store/gameStore';

export function AbilitiesBar() {
  const hero = useGameStore(s => s.hero);
  const useAbility = useGameStore(s => s.useAbility);

  return (
    <div className="bg-[#22223B] rounded-xl p-4">
      <h3 className="font-bold text-white mb-3">Abilities</h3>

      <div className="flex flex-wrap gap-2">
        {hero.abilities.map(ability => {
          const onCooldown = ability.currentCooldown > 0;
          const noMana = hero.stats.mana < ability.manaCost;
          const disabled = onCooldown || noMana;
          const cooldownPercent = onCooldown ? (ability.currentCooldown / ability.cooldown) * 100 : 0;

          return (
            <button
              key={ability.id}
              onClick={() => useAbility(ability.id)}
              disabled={disabled}
              className={`
                relative w-16 h-16 rounded-lg flex flex-col items-center justify-center
                transition-all overflow-hidden
                ${disabled
                  ? 'bg-[#4A4E69]/50 cursor-not-allowed'
                  : 'bg-[#4A4E69] hover:bg-[#5A5E79] cursor-pointer hover:scale-105'
                }
              `}
              title={`${ability.name}\n${ability.description}\nMana: ${ability.manaCost}`}
            >
              {/* Cooldown Overlay */}
              {onCooldown && (
                <div
                  className="absolute inset-0 bg-black/60 transition-all"
                  style={{
                    height: `${cooldownPercent}%`,
                    bottom: 0,
                    top: 'auto'
                  }}
                />
              )}

              <span className="text-2xl relative z-10">{ability.emoji}</span>

              {onCooldown && (
                <span className="text-xs font-bold text-white relative z-10">
                  {ability.currentCooldown.toFixed(1)}s
                </span>
              )}

              {!onCooldown && noMana && (
                <span className="text-[8px] text-red-400 relative z-10">No Mana</span>
              )}
            </button>
          );
        })}

        {hero.abilities.length === 0 && (
          <p className="text-[#9A8C98] text-sm">No abilities unlocked</p>
        )}
      </div>

      {/* Mana display */}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="text-blue-400">Mana:</span>
        <div className="flex-1 h-2 bg-[#4A4E69] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${(hero.stats.mana / hero.stats.maxMana) * 100}%` }}
          />
        </div>
        <span className="text-white text-xs">{Math.floor(hero.stats.mana)}/{hero.stats.maxMana}</span>
      </div>
    </div>
  );
}
