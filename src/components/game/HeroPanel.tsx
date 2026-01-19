'use client';

import { useGameStore } from '@/store/gameStore';
import { calculateDPS } from '@/types/game';

export function HeroPanel() {
  const hero = useGameStore(s => s.hero);
  const dps = calculateDPS(hero.stats);
  const xpPercent = (hero.xp / hero.xpToNextLevel) * 100;

  const stats = [
    { label: 'Attack', value: hero.stats.attack, color: 'text-red-400' },
    { label: 'Defense', value: hero.stats.defense, color: 'text-blue-400' },
    { label: 'Crit %', value: `${(hero.stats.critChance * 100).toFixed(0)}%`, color: 'text-yellow-400' },
    { label: 'Crit DMG', value: `${(hero.stats.critDamage * 100).toFixed(0)}%`, color: 'text-orange-400' },
    { label: 'Atk Spd', value: hero.stats.attackSpeed.toFixed(2), color: 'text-green-400' },
    { label: 'Lifesteal', value: `${(hero.stats.lifeSteal * 100).toFixed(0)}%`, color: 'text-pink-400' },
  ];

  return (
    <div className="bg-[#22223B] rounded-xl p-4">
      <div className="text-center mb-4">
        <div className="text-3xl mb-1">⚔️</div>
        <h3 className="font-bold text-white text-lg">{hero.name}</h3>
        <p className="text-sm text-[#9A8C98]">Level {hero.level}</p>
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#9A8C98]">Experience</span>
          <span className="text-white">{hero.xp} / {hero.xpToNextLevel}</span>
        </div>
        <div className="h-2 bg-[#4A4E69] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* DPS */}
      <div className="text-center py-3 bg-[#4A4E69] rounded-lg mb-4">
        <span className="text-xs text-[#9A8C98] block">Damage Per Second</span>
        <span className="text-2xl font-bold text-[#FFD700]">{dps.toFixed(1)}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map(stat => (
          <div key={stat.label} className="bg-[#4A4E69]/50 rounded-lg p-2 text-center">
            <span className="text-xs text-[#9A8C98] block">{stat.label}</span>
            <span className={`font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Equipment */}
      <div className="mt-4">
        <h4 className="text-xs text-[#9A8C98] uppercase tracking-wide mb-2">Equipment</h4>
        <div className="space-y-1">
          {(['weapon', 'armor', 'accessory'] as const).map(slot => {
            const item = hero.equipment[slot];
            return (
              <div key={slot} className="flex items-center justify-between bg-[#4A4E69]/30 rounded px-2 py-1">
                <span className="text-xs text-[#9A8C98] capitalize">{slot}</span>
                {item ? (
                  <span className="text-xs text-white">{item.emoji} {item.name}</span>
                ) : (
                  <span className="text-xs text-[#9A8C98]/50">Empty</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
