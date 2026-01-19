'use client';

import { useEffect, useState, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';

interface FloatingNumber {
  id: string;
  value: string;
  x: number;
  y: number;
  type: 'damage' | 'crit' | 'heal' | 'xp' | 'gold' | 'miss';
  side: 'left' | 'right';
}

const TYPE_STYLES = {
  damage: 'text-white font-bold',
  crit: 'text-yellow-400 font-black text-xl scale-125',
  heal: 'text-green-400 font-bold',
  xp: 'text-purple-400 font-medium',
  gold: 'text-amber-400 font-medium',
  miss: 'text-gray-400 italic',
};

export function FloatingText() {
  const [numbers, setNumbers] = useState<FloatingNumber[]>([]);
  const combatLog = useGameStore(s => s.combatLog);
  const [lastLogLength, setLastLogLength] = useState(0);

  // Process new combat log entries
  useEffect(() => {
    if (combatLog.length <= lastLogLength) {
      setLastLogLength(combatLog.length);
      return;
    }

    const newEntries = combatLog.slice(lastLogLength);
    setLastLogLength(combatLog.length);

    newEntries.forEach((entry, idx) => {
      let type: FloatingNumber['type'] = 'damage';
      let value = '';
      let side: 'left' | 'right' = 'right';

      switch (entry.type) {
        case 'player_attack':
          type = 'damage';
          value = `-${entry.value}`;
          side = 'right';
          break;
        case 'player_crit':
          type = 'crit';
          value = `💥 ${entry.value}!`;
          side = 'right';
          break;
        case 'enemy_attack':
          type = 'damage';
          value = `-${entry.value}`;
          side = 'left';
          break;
        case 'heal':
          type = 'heal';
          value = `+${entry.value}`;
          side = 'left';
          break;
        case 'xp':
          type = 'xp';
          value = `+${entry.value} XP`;
          side = 'right';
          break;
        case 'gold':
          type = 'gold';
          value = `+${entry.value} 💰`;
          side = 'right';
          break;
        default:
          return; // Don't show floating text for other types
      }

      const newNumber: FloatingNumber = {
        id: `${Date.now()}-${idx}-${Math.random()}`,
        value,
        x: 30 + Math.random() * 40, // 30-70% of container width
        y: 20 + Math.random() * 30, // 20-50% from top
        type,
        side,
      };

      setNumbers(prev => [...prev, newNumber]);

      // Remove after animation
      setTimeout(() => {
        setNumbers(prev => prev.filter(n => n.id !== newNumber.id));
      }, 1500);
    });
  }, [combatLog, lastLogLength]);

  if (numbers.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {numbers.map(num => (
        <div
          key={num.id}
          className={`absolute animate-float-up ${TYPE_STYLES[num.type]}`}
          style={{
            left: num.side === 'left' ? `${num.x / 2}%` : 'auto',
            right: num.side === 'right' ? `${num.x / 2}%` : 'auto',
            top: `${num.y}%`,
          }}
        >
          {num.value}
        </div>
      ))}
    </div>
  );
}
