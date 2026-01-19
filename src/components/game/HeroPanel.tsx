'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { calculateDPS } from '@/types/game';
import { Coins, Star, TrendUp } from '@phosphor-icons/react';

export function HeroPanel() {
  const hero = useGameStore(s => s.hero);
  const totalPlayTime = useGameStore(s => s.totalPlayTime);
  const [prevLevel, setPrevLevel] = useState(hero.level);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const dps = calculateDPS(hero.stats);
  const xpPercent = (hero.xp / hero.xpToNextLevel) * 100;

  // Level up animation
  useEffect(() => {
    if (hero.level > prevLevel) {
      setIsLevelingUp(true);
      setTimeout(() => setIsLevelingUp(false), 2000);
      setPrevLevel(hero.level);
    }
  }, [hero.level, prevLevel]);

  // Format play time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const stats = [
    { label: 'Attack', value: hero.stats.attack, color: 'text-red-400', icon: '⚔️' },
    { label: 'Defense', value: hero.stats.defense, color: 'text-blue-400', icon: '🛡️' },
    { label: 'Crit %', value: `${(hero.stats.critChance * 100).toFixed(0)}%`, color: 'text-yellow-400', icon: '💥' },
    { label: 'Crit DMG', value: `${(hero.stats.critDamage * 100).toFixed(0)}%`, color: 'text-orange-400', icon: '🔥' },
    { label: 'Atk Spd', value: hero.stats.attackSpeed.toFixed(2), color: 'text-green-400', icon: '⚡' },
    { label: 'Lifesteal', value: `${(hero.stats.lifeSteal * 100).toFixed(0)}%`, color: 'text-pink-400', icon: '💗' },
  ];

  return (
    <div className={`bg-[#22223B] rounded-xl p-4 transition-all duration-500 ${isLevelingUp ? 'animate-level-up ring-2 ring-[#FFD700]' : ''}`}>
      {/* Hero Avatar & Name */}
      <div className="text-center mb-4">
        <div className={`text-4xl mb-2 ${isLevelingUp ? 'animate-bounce' : 'animate-float'}`}>
          ⚔️
        </div>
        <h3 className="font-bold text-white text-lg">{hero.name}</h3>
        <div className="flex items-center justify-center gap-2">
          <Star size={16} weight="fill" className="text-[#FFD700]" />
          <span className={`font-bold ${isLevelingUp ? 'text-[#FFD700] text-lg' : 'text-[#9A8C98]'}`}>
            Level {hero.level}
          </span>
          {isLevelingUp && <span className="text-xs text-green-400 animate-pulse">LEVEL UP!</span>}
        </div>
      </div>

      {/* Gold Display */}
      <div className="flex items-center justify-center gap-2 mb-4 py-2 px-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 rounded-lg border border-amber-500/30">
        <Coins size={20} weight="fill" className="text-[#FFD700]" />
        <span className="text-xl font-bold text-[#FFD700]">{hero.gold.toLocaleString()}</span>
        <span className="text-xs text-amber-400/60">gold</span>
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-purple-400 flex items-center gap-1">
            <TrendUp size={12} /> Experience
          </span>
          <span className="text-white">{hero.xp.toLocaleString()} / {hero.xpToNextLevel.toLocaleString()}</span>
        </div>
        <div className="h-3 bg-[#4A4E69] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 transition-all duration-300 relative"
            style={{ width: `${xpPercent}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
        <div className="text-right mt-1">
          <span className="text-[10px] text-[#9A8C98]">{Math.floor(xpPercent)}% to next level</span>
        </div>
      </div>

      {/* DPS Display */}
      <div className="text-center py-3 bg-gradient-to-r from-[#4A4E69]/80 to-[#4A4E69]/40 rounded-lg mb-4 border border-white/5">
        <span className="text-xs text-[#9A8C98] block mb-1">⚡ Damage Per Second</span>
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          {dps.toFixed(1)}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-[#4A4E69]/30 rounded-lg p-2 text-center hover:bg-[#4A4E69]/50 transition-colors">
            <span className="text-xs block mb-0.5">{stat.icon}</span>
            <span className="text-[10px] text-[#9A8C98] block">{stat.label}</span>
            <span className={`font-bold text-sm ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Equipment Slots */}
      <div>
        <h4 className="text-xs text-[#9A8C98] uppercase tracking-wide mb-2 flex items-center gap-1">
          🎒 Equipment
        </h4>
        <div className="space-y-1.5">
          {(['weapon', 'armor', 'accessory'] as const).map(slot => {
            const item = hero.equipment[slot];
            const slotIcons = { weapon: '⚔️', armor: '🛡️', accessory: '💍' };

            return (
              <div
                key={slot}
                className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all ${
                  item
                    ? 'bg-[#4A4E69]/50 border border-white/10'
                    : 'bg-[#4A4E69]/20 border border-dashed border-white/10'
                }`}
              >
                <span className="text-sm">{slotIcons[slot]}</span>
                {item ? (
                  <span className="text-sm text-white truncate flex-1 ml-2">
                    {item.emoji} {item.name}
                  </span>
                ) : (
                  <span className="text-xs text-[#9A8C98]/50 ml-2 capitalize">Empty {slot}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Play Time */}
      <div className="mt-4 text-center">
        <span className="text-[10px] text-[#9A8C98]/60">
          ⏱️ Play time: {formatTime(totalPlayTime)}
        </span>
      </div>
    </div>
  );
}
