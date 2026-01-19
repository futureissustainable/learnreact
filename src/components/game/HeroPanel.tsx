'use client';

import { useGameStore } from '@/store/gameStore';
import { calculateDPS } from '@/types/game';
import { Sword, Shield, Target, Lightning, Heart, Coins, Star } from '@phosphor-icons/react';

export function HeroPanel() {
  const hero = useGameStore(s => s.hero);
  const dps = calculateDPS(hero.stats);
  const xpPercent = (hero.xp / hero.xpToNextLevel) * 100;

  return (
    <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#313244]">
        <div className="w-12 h-12 rounded-lg bg-[#89b4fa]/20 flex items-center justify-center">
          <Sword size={24} className="text-[#89b4fa]" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#cdd6f4]">{hero.name}</h3>
          <span className="text-sm text-[#6c7086]">Level {hero.level}</span>
        </div>
      </div>

      {/* Gold */}
      <div className="flex items-center justify-between mb-4 px-3 py-2 bg-[#181825] rounded-lg">
        <span className="text-sm text-[#6c7086] flex items-center gap-2">
          <Coins size={16} className="text-[#f9e2af]" /> Gold
        </span>
        <span className="font-semibold text-[#f9e2af]">{hero.gold.toLocaleString()}</span>
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[#6c7086] flex items-center gap-1">
            <Star size={12} className="text-[#cba6f7]" /> XP
          </span>
          <span className="text-[#a6adc8]">{hero.xp}/{hero.xpToNextLevel}</span>
        </div>
        <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#cba6f7] transition-all duration-300"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6c7086] flex items-center gap-2">
            <Sword size={14} className="text-[#f38ba8]" /> Attack
          </span>
          <span className="text-[#cdd6f4]">{hero.stats.attack}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6c7086] flex items-center gap-2">
            <Shield size={14} className="text-[#89b4fa]" /> Defense
          </span>
          <span className="text-[#cdd6f4]">{hero.stats.defense}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6c7086] flex items-center gap-2">
            <Target size={14} className="text-[#f9e2af]" /> Crit
          </span>
          <span className="text-[#cdd6f4]">{(hero.stats.critChance * 100).toFixed(0)}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6c7086] flex items-center gap-2">
            <Lightning size={14} className="text-[#a6e3a1]" /> Speed
          </span>
          <span className="text-[#cdd6f4]">{hero.stats.attackSpeed.toFixed(2)}/s</span>
        </div>
        {hero.stats.lifeSteal > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6c7086] flex items-center gap-2">
              <Heart size={14} className="text-[#f38ba8]" /> Lifesteal
            </span>
            <span className="text-[#cdd6f4]">{(hero.stats.lifeSteal * 100).toFixed(0)}%</span>
          </div>
        )}
      </div>

      {/* Equipment */}
      <div className="mt-4 pt-4 border-t border-[#313244]">
        <h4 className="text-xs text-[#6c7086] uppercase tracking-wide mb-2">Equipment</h4>
        <div className="space-y-1">
          {(['weapon', 'armor', 'accessory'] as const).map(slot => {
            const item = hero.equipment[slot];
            return (
              <div
                key={slot}
                className="flex items-center justify-between text-sm py-1.5 px-2 bg-[#181825] rounded"
              >
                <span className="text-[#6c7086] capitalize">{slot}</span>
                <span className={item ? 'text-[#cdd6f4]' : 'text-[#45475a]'}>
                  {item ? item.name : 'Empty'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
