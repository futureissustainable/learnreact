'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import {
  Star,
  Skull,
  Trophy,
  Lightning,
  Sword,
  X
} from '@phosphor-icons/react';

interface Notification {
  id: string;
  type: 'level_up' | 'boss_kill' | 'concept_learned' | 'zone_unlock' | 'loot';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastLevel, setLastLevel] = useState<number | null>(null);
  const [lastBossCount, setLastBossCount] = useState<number | null>(null);
  const [lastConceptCount, setLastConceptCount] = useState<number | null>(null);

  const hero = useGameStore(s => s.hero);
  const bossesDefeated = useGameStore(s => s.bossesDefeated);
  const concepts = useGameStore(s => s.concepts);
  const combatLog = useGameStore(s => s.combatLog);

  // Track level ups
  useEffect(() => {
    if (lastLevel === null) {
      setLastLevel(hero.level);
      return;
    }

    if (hero.level > lastLevel) {
      addNotification({
        type: 'level_up',
        title: `Level ${hero.level}!`,
        subtitle: 'Your power grows stronger',
        icon: <Star size={32} weight="fill" className="text-yellow-400" />,
        color: 'from-yellow-500/20 to-amber-500/20',
      });
      setLastLevel(hero.level);
    }
  }, [hero.level, lastLevel]);

  // Track boss kills
  useEffect(() => {
    if (lastBossCount === null) {
      setLastBossCount(bossesDefeated.length);
      return;
    }

    if (bossesDefeated.length > lastBossCount) {
      const lastBoss = bossesDefeated[bossesDefeated.length - 1];
      addNotification({
        type: 'boss_kill',
        title: 'Boss Defeated!',
        subtitle: `${lastBoss} has fallen`,
        icon: <Skull size={32} weight="fill" className="text-red-400" />,
        color: 'from-red-500/20 to-purple-500/20',
      });
      setLastBossCount(bossesDefeated.length);
    }
  }, [bossesDefeated, lastBossCount]);

  // Track concept learning
  useEffect(() => {
    const learnedCount = concepts.filter(c => c.learned).length;

    if (lastConceptCount === null) {
      setLastConceptCount(learnedCount);
      return;
    }

    if (learnedCount > lastConceptCount) {
      const newConcept = concepts.find(
        c => c.learned && !concepts.slice(0, lastConceptCount).includes(c)
      );
      if (newConcept) {
        addNotification({
          type: 'concept_learned',
          title: `Learned: ${newConcept.name}`,
          subtitle: newConcept.unlocksAbilities.length > 0
            ? `Unlocked new ability!`
            : 'New stat bonuses applied',
          icon: <Lightning size={32} weight="fill" className="text-purple-400" />,
          color: 'from-purple-500/20 to-cyan-500/20',
        });
      }
      setLastConceptCount(learnedCount);
    }
  }, [concepts, lastConceptCount]);

  // Track legendary loot (from combat log)
  useEffect(() => {
    const recentLog = combatLog[combatLog.length - 1];
    if (recentLog?.type === 'loot' && recentLog.message.includes('legendary')) {
      addNotification({
        type: 'loot',
        title: 'Legendary Drop!',
        subtitle: recentLog.message,
        icon: <Sword size={32} weight="fill" className="text-orange-400" />,
        color: 'from-orange-500/20 to-yellow-500/20',
      });
    }
  }, [combatLog]);

  const addNotification = (notif: Omit<Notification, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setNotifications(prev => [...prev, { ...notif, id }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 w-80">
      {notifications.map((notif, idx) => (
        <div
          key={notif.id}
          className={`
            bg-gradient-to-r ${notif.color}
            backdrop-blur-lg rounded-xl p-4 border border-white/20
            shadow-lg animate-slide-in-right
          `}
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{notif.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white">{notif.title}</h4>
              {notif.subtitle && (
                <p className="text-sm text-white/70 truncate">{notif.subtitle}</p>
              )}
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
