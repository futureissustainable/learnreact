'use client';

import { useGameStore } from '@/store/gameStore';
import { calculateDPS } from '@/types/game';
import { Skull } from '@phosphor-icons/react';

export function CombatArea() {
  const hero = useGameStore(s => s.hero);
  const currentMobs = useGameStore(s => s.currentMobs);
  const currentZone = useGameStore(s => s.currentZone);
  const summonBoss = useGameStore(s => s.summonBoss);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);

  const mob = currentMobs[0];
  const dps = calculateDPS(hero.stats);
  const bossAvailable = currentZone?.bossId && !bossesDefeated.includes(currentZone.bossId);

  return (
    <div className={`rounded-xl p-6 bg-gradient-to-br ${currentZone?.background || 'from-slate-800 to-slate-900'}`}>
      {/* Zone Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{currentZone?.emoji}</span>
            {currentZone?.name}
          </h2>
          <p className="text-sm text-white/60">Level {currentZone?.level} Zone</p>
        </div>

        {bossAvailable && (
          <button
            onClick={summonBoss}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          >
            <Skull size={20} />
            Summon Boss
          </button>
        )}
      </div>

      {/* Battle Area */}
      <div className="flex items-center justify-between gap-8">
        {/* Hero */}
        <div className="flex-1">
          <div className="bg-black/30 rounded-xl p-4 backdrop-blur">
            <div className="text-center">
              <div className="text-4xl mb-2">⚔️</div>
              <h3 className="font-bold text-white">{hero.name}</h3>
              <p className="text-sm text-white/60">Level {hero.level}</p>
            </div>

            {/* HP Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400">HP</span>
                <span className="text-white">{Math.floor(hero.stats.hp)} / {hero.stats.maxHp}</span>
              </div>
              <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-200"
                  style={{ width: `${(hero.stats.hp / hero.stats.maxHp) * 100}%` }}
                />
              </div>
            </div>

            {/* Mana Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-400">Mana</span>
                <span className="text-white">{Math.floor(hero.stats.mana)} / {hero.stats.maxMana}</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-200"
                  style={{ width: `${(hero.stats.mana / hero.stats.maxMana) * 100}%` }}
                />
              </div>
            </div>

            {/* DPS */}
            <div className="mt-3 text-center">
              <span className="text-xs text-white/60">DPS: </span>
              <span className="text-sm font-bold text-[#FFD700]">{dps.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* VS */}
        <div className="text-2xl font-bold text-white/40">VS</div>

        {/* Mob */}
        <div className="flex-1">
          {mob ? (
            <div className={`bg-black/30 rounded-xl p-4 backdrop-blur ${mob.isBoss ? 'ring-2 ring-red-500' : ''}`}>
              <div className="text-center">
                <div className="text-4xl mb-2">{mob.emoji}</div>
                <h3 className="font-bold text-white">{mob.name}</h3>
                <p className="text-sm text-white/60">
                  {mob.isBoss ? '💀 BOSS' : `Level ${mob.level}`}
                </p>
              </div>

              {/* HP Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400">HP</span>
                  <span className="text-white">{Math.floor(mob.hp)} / {mob.maxHp}</span>
                </div>
                <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${
                      mob.isBoss
                        ? 'bg-gradient-to-r from-purple-600 to-red-500'
                        : 'bg-gradient-to-r from-orange-600 to-orange-400'
                    }`}
                    style={{ width: `${(mob.hp / mob.maxHp) * 100}%` }}
                  />
                </div>
              </div>

              {/* Rewards */}
              <div className="mt-3 flex justify-center gap-4 text-xs">
                <span className="text-[#FFD700]">+{mob.goldReward} gold</span>
                <span className="text-green-400">+{mob.xpReward} XP</span>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 rounded-xl p-4 backdrop-blur text-center">
              <div className="text-4xl mb-2 opacity-30">?</div>
              <p className="text-white/40">Spawning...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
