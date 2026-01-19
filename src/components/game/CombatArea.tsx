'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { calculateDPS } from '@/types/game';
import { Skull, Lightning, Sword } from '@phosphor-icons/react';
import { FloatingText } from './FloatingText';

export function CombatArea() {
  const hero = useGameStore(s => s.hero);
  const currentMobs = useGameStore(s => s.currentMobs);
  const currentZone = useGameStore(s => s.currentZone);
  const summonBoss = useGameStore(s => s.summonBoss);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);
  const killCount = useGameStore(s => s.killCount);
  const sessionKills = useGameStore(s => s.sessionKills);

  const [heroShake, setHeroShake] = useState(false);
  const [mobShake, setMobShake] = useState(false);
  const [bossIntro, setBossIntro] = useState(false);

  const mob = currentMobs[0];
  const dps = calculateDPS(hero.stats);
  const bossAvailable = currentZone?.bossId && !bossesDefeated.includes(currentZone.bossId);

  // Animate when mob takes damage
  useEffect(() => {
    if (mob) {
      setMobShake(true);
      const timer = setTimeout(() => setMobShake(false), 200);
      return () => clearTimeout(timer);
    }
  }, [mob?.hp]);

  // Animate when hero takes damage
  useEffect(() => {
    setHeroShake(true);
    const timer = setTimeout(() => setHeroShake(false), 200);
    return () => clearTimeout(timer);
  }, [hero.stats.hp]);

  // Boss intro animation
  useEffect(() => {
    if (mob?.isBoss) {
      setBossIntro(true);
      const timer = setTimeout(() => setBossIntro(false), 600);
      return () => clearTimeout(timer);
    }
  }, [mob?.id]);

  const handleSummonBoss = () => {
    summonBoss();
  };

  return (
    <div className={`relative rounded-xl p-6 bg-gradient-to-br ${currentZone?.background || 'from-slate-800 to-slate-900'} overflow-hidden`}>
      {/* Floating damage numbers */}
      <FloatingText />

      {/* Zone Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">{currentZone?.emoji}</span>
            {currentZone?.name}
          </h2>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>Zone Level {currentZone?.level}</span>
            <span>•</span>
            <span className="text-green-400">⚔️ {sessionKills} kills this session</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Kill counter */}
          <div className="text-right">
            <span className="text-xs text-white/40 block">Total Kills</span>
            <span className="text-lg font-bold text-white">{killCount.toLocaleString()}</span>
          </div>

          {/* Boss button */}
          {bossAvailable && (
            <button
              onClick={handleSummonBoss}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 rounded-lg font-bold transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              <Skull size={20} weight="fill" />
              SUMMON BOSS
            </button>
          )}
        </div>
      </div>

      {/* Battle Area */}
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {/* Hero */}
        <div className={`flex-1 max-w-xs transition-transform ${heroShake ? 'animate-attack-flash' : ''}`}>
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur border border-white/10">
            <div className="text-center">
              <div className="text-5xl mb-2 animate-float">⚔️</div>
              <h3 className="font-bold text-white text-lg">{hero.name}</h3>
              <p className="text-sm text-[#FFD700]">Level {hero.level} Hero</p>
            </div>

            {/* HP Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400 font-medium">❤️ HP</span>
                <span className="text-white">{Math.floor(hero.stats.hp)} / {hero.stats.maxHp}</span>
              </div>
              <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-red-900/50">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-200 relative"
                  style={{ width: `${(hero.stats.hp / hero.stats.maxHp) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Mana Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-400 font-medium">💧 Mana</span>
                <span className="text-white">{Math.floor(hero.stats.mana)} / {hero.stats.maxMana}</span>
              </div>
              <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-blue-900/50">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-all duration-200 relative"
                  style={{ width: `${(hero.stats.mana / hero.stats.maxMana) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* DPS Display */}
            <div className="mt-4 text-center py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg border border-amber-500/30">
              <span className="text-xs text-amber-400/80 block">⚡ DPS</span>
              <span className="text-xl font-black text-[#FFD700]">{dps.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* VS Indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-black/40 border-2 border-white/20 flex items-center justify-center">
            <Sword size={28} weight="fill" className="text-white/60" />
          </div>
          <span className="text-xs text-white/40 font-bold">VS</span>
        </div>

        {/* Mob */}
        <div className={`flex-1 max-w-xs transition-transform ${mobShake ? 'animate-crit-shake' : ''} ${bossIntro ? 'animate-boss-entrance' : ''}`}>
          {mob ? (
            <div className={`
              bg-black/40 rounded-xl p-4 backdrop-blur border
              ${mob.isBoss
                ? 'border-red-500 shadow-lg shadow-red-500/30'
                : 'border-white/10'
              }
            `}>
              <div className="text-center">
                <div className={`text-5xl mb-2 ${mob.isBoss ? 'animate-pulse-glow' : ''}`}>
                  {mob.emoji}
                </div>
                <h3 className={`font-bold text-lg ${mob.isBoss ? 'text-red-400' : 'text-white'}`}>
                  {mob.name}
                </h3>
                <p className="text-sm text-white/60">
                  {mob.isBoss ? (
                    <span className="text-red-400 font-bold flex items-center justify-center gap-1">
                      <Skull size={14} weight="fill" /> ZONE BOSS
                    </span>
                  ) : (
                    `Level ${mob.level}`
                  )}
                </p>
              </div>

              {/* HP Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-400 font-medium">❤️ HP</span>
                  <span className="text-white">{Math.floor(mob.hp).toLocaleString()} / {mob.maxHp.toLocaleString()}</span>
                </div>
                <div className={`h-4 bg-black/50 rounded-full overflow-hidden border ${mob.isBoss ? 'border-red-500/50' : 'border-orange-900/50'}`}>
                  <div
                    className={`h-full transition-all duration-200 relative ${
                      mob.isBoss
                        ? 'bg-gradient-to-r from-red-600 via-purple-500 to-red-600'
                        : 'bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500'
                    }`}
                    style={{ width: `${(mob.hp / mob.maxHp) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Rewards Preview */}
              <div className="mt-4 flex justify-center gap-4 py-2 bg-black/30 rounded-lg">
                <div className="text-center">
                  <span className="text-[#FFD700] font-bold">+{mob.goldReward}</span>
                  <span className="text-xs text-white/40 block">Gold</span>
                </div>
                <div className="text-center">
                  <span className="text-purple-400 font-bold">+{mob.xpReward}</span>
                  <span className="text-xs text-white/40 block">XP</span>
                </div>
              </div>

              {/* Boss special warning */}
              {mob.isBoss && (
                <div className="mt-3 text-center">
                  <span className="text-xs text-red-400/80 flex items-center justify-center gap-1">
                    <Lightning size={12} weight="fill" />
                    Defeat to unlock next zone!
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-black/40 rounded-xl p-4 backdrop-blur border border-white/10 text-center">
              <div className="text-5xl mb-2 opacity-30 animate-pulse">❓</div>
              <p className="text-white/40 font-medium">Spawning enemy...</p>
              <div className="mt-4 flex justify-center">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Getting Started Guide for new players */}
      {killCount < 5 && (
        <div className="mt-6 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
          <h4 className="text-cyan-400 font-bold mb-2 text-sm">🎮 How Combat Works</h4>
          <ul className="text-xs text-white/70 space-y-1">
            <li>• <span className="text-green-400">Auto-Attack:</span> Your hero attacks automatically based on Attack Speed</li>
            <li>• <span className="text-blue-400">Abilities:</span> Click ability buttons to use special attacks (costs Mana)</li>
            <li>• <span className="text-purple-400">Scripts:</span> Enable automation scripts in the Scripts panel to auto-use abilities</li>
            <li>• <span className="text-yellow-400">Progress:</span> Kill monsters → Earn XP & Gold → Level Up → Get Stronger!</li>
          </ul>
        </div>
      )}
    </div>
  );
}
