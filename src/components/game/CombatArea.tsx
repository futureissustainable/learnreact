'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { calculateDPS } from '@/types/game';
import { Skull, Lightning, Sword, Heart, Drop, Shield, Crosshair, Play, Pause } from '@phosphor-icons/react';

export function CombatArea() {
  const hero = useGameStore(s => s.hero);
  const currentMobs = useGameStore(s => s.currentMobs);
  const currentZone = useGameStore(s => s.currentZone);
  const summonBoss = useGameStore(s => s.summonBoss);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);
  const killCount = useGameStore(s => s.killCount);
  const sessionKills = useGameStore(s => s.sessionKills);
  const isAutoBattling = useGameStore(s => s.isAutoBattling);
  const startAutoBattle = useGameStore(s => s.startAutoBattle);
  const stopAutoBattle = useGameStore(s => s.stopAutoBattle);
  const spawnMob = useGameStore(s => s.spawnMob);

  const [mobShake, setMobShake] = useState(false);
  const [lastMobHp, setLastMobHp] = useState<number | null>(null);

  const mob = currentMobs[0];
  const dps = calculateDPS(hero.stats);
  const bossAvailable = currentZone?.bossId && !bossesDefeated.includes(currentZone.bossId);

  // Ensure a mob spawns if none exist
  useEffect(() => {
    if (isAutoBattling && currentMobs.length === 0) {
      const timer = setTimeout(() => spawnMob(), 500);
      return () => clearTimeout(timer);
    }
  }, [isAutoBattling, currentMobs.length, spawnMob]);

  // Track mob HP changes for shake animation
  useEffect(() => {
    if (mob && lastMobHp !== null && mob.hp < lastMobHp) {
      setMobShake(true);
      const timer = setTimeout(() => setMobShake(false), 150);
      return () => clearTimeout(timer);
    }
    setLastMobHp(mob?.hp ?? null);
  }, [mob?.hp, lastMobHp]);

  return (
    <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#313244]">
      {/* Zone Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#313244]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => isAutoBattling ? stopAutoBattle() : startAutoBattle()}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isAutoBattling
                ? 'bg-[#a6e3a1]/20 text-[#a6e3a1]'
                : 'bg-[#f9e2af]/20 text-[#f9e2af]'
            }`}
          >
            {isAutoBattling ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
          </button>
          <div>
            <h2 className="text-lg font-semibold text-[#cdd6f4]">{currentZone?.name}</h2>
            <span className="text-sm text-[#6c7086]">
              {isAutoBattling ? 'Fighting' : 'Paused'} • Lv.{currentZone?.level} • {sessionKills} kills
            </span>
          </div>
        </div>

        {bossAvailable && (
          <button
            onClick={summonBoss}
            className="flex items-center gap-2 px-4 py-2 bg-[#f38ba8] hover:bg-[#eba0ac] text-[#1e1e2e] rounded-lg font-medium text-sm transition-colors"
          >
            <Skull size={16} weight="fill" />
            Boss
          </button>
        )}
      </div>

      {/* Battle Area */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* Hero */}
        <div className="bg-[#181825] rounded-lg p-4 border border-[#313244]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#89b4fa]/20 flex items-center justify-center">
              <Sword size={20} className="text-[#89b4fa]" />
            </div>
            <div>
              <h3 className="font-medium text-[#cdd6f4]">{hero.name}</h3>
              <span className="text-xs text-[#6c7086]">Level {hero.level}</span>
            </div>
          </div>

          {/* HP */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#6c7086] flex items-center gap-1">
                <Heart size={12} weight="fill" className="text-[#f38ba8]" /> HP
              </span>
              <span className="text-[#cdd6f4]">{Math.floor(hero.stats.hp)}/{hero.stats.maxHp}</span>
            </div>
            <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f38ba8] transition-all duration-200"
                style={{ width: `${(hero.stats.hp / hero.stats.maxHp) * 100}%` }}
              />
            </div>
          </div>

          {/* Mana */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#6c7086] flex items-center gap-1">
                <Drop size={12} weight="fill" className="text-[#89b4fa]" /> Mana
              </span>
              <span className="text-[#cdd6f4]">{Math.floor(hero.stats.mana)}/{hero.stats.maxMana}</span>
            </div>
            <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#89b4fa] transition-all duration-200"
                style={{ width: `${(hero.stats.mana / hero.stats.maxMana) * 100}%` }}
              />
            </div>
          </div>

          {/* DPS */}
          <div className="flex items-center justify-between text-sm bg-[#1e1e2e] rounded px-3 py-2">
            <span className="text-[#6c7086]">DPS</span>
            <span className="font-semibold text-[#f9e2af]">{dps.toFixed(1)}</span>
          </div>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center gap-1">
          <Crosshair size={24} className="text-[#6c7086]" />
          <span className="text-xs text-[#6c7086]">VS</span>
        </div>

        {/* Mob */}
        <div className={`bg-[#181825] rounded-lg p-4 border transition-transform ${
          mob?.isBoss ? 'border-[#f38ba8]' : 'border-[#313244]'
        } ${mobShake ? 'translate-x-1' : ''}`}>
          {mob ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  mob.isBoss ? 'bg-[#f38ba8]/20' : 'bg-[#a6e3a1]/20'
                }`}>
                  {mob.isBoss ? (
                    <Skull size={20} className="text-[#f38ba8]" />
                  ) : (
                    <Shield size={20} className="text-[#a6e3a1]" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-[#cdd6f4]">{mob.name}</h3>
                  <span className="text-xs text-[#6c7086]">
                    {mob.isBoss ? 'Zone Boss' : `Level ${mob.level}`}
                  </span>
                </div>
              </div>

              {/* Mob HP */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#6c7086]">HP</span>
                  <span className="text-[#cdd6f4]">{Math.floor(mob.hp).toLocaleString()}/{mob.maxHp.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${mob.isBoss ? 'bg-[#f38ba8]' : 'bg-[#fab387]'}`}
                    style={{ width: `${(mob.hp / mob.maxHp) * 100}%` }}
                  />
                </div>
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-between text-xs text-[#6c7086] bg-[#1e1e2e] rounded px-3 py-2">
                <span>+{mob.xpReward} XP</span>
                <span>+{mob.goldReward} Gold</span>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-8 h-8 border-2 border-[#313244] border-t-[#6c7086] rounded-full animate-spin mx-auto mb-2" />
              <span className="text-sm text-[#6c7086]">Spawning...</span>
            </div>
          )}
        </div>
      </div>

      {/* New Player Guide */}
      {killCount < 5 && (
        <div className="mt-5 pt-4 border-t border-[#313244] text-xs text-[#6c7086]">
          <p><Lightning size={12} weight="fill" className="inline text-[#f9e2af]" /> Auto-attacking • Use abilities below • Enable scripts in Scripts tab</p>
        </div>
      )}
    </div>
  );
}
