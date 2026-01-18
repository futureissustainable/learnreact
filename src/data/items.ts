import { Item } from '@/types/game';

export const ALL_ITEMS: Item[] = [
  // Common Items
  {
    id: 'scroll-of-clarity',
    name: 'Scroll of Clarity',
    description: 'Reveals hints for the current challenge',
    rarity: 'common',
    icon: 'Scroll',
    effect: { type: 'hint_reveal', value: 1 }
  },
  {
    id: 'copper-quill',
    name: 'Copper Quill',
    description: '+5% XP from challenges',
    rarity: 'common',
    icon: 'Pen',
    effect: { type: 'xp_boost', value: 0.05 }
  },
  {
    id: 'lucky-coin',
    name: 'Lucky Coin',
    description: '+10% gold from challenges',
    rarity: 'common',
    icon: 'Coin',
    effect: { type: 'gold_boost', value: 0.1 }
  },
  {
    id: 'hourglass-shard',
    name: 'Hourglass Shard',
    description: 'Extends timed challenges by 30 seconds',
    rarity: 'common',
    icon: 'Hourglass',
    effect: { type: 'time_extend', value: 30 }
  },

  // Rare Items
  {
    id: 'tome-of-knowledge',
    name: 'Tome of Knowledge',
    description: '+15% XP from all challenges',
    rarity: 'rare',
    icon: 'BookOpen',
    effect: { type: 'xp_boost', value: 0.15 }
  },
  {
    id: 'silver-compass',
    name: 'Silver Compass',
    description: 'Reveals 2 hints per challenge',
    rarity: 'rare',
    icon: 'Compass',
    effect: { type: 'hint_reveal', value: 2 }
  },
  {
    id: 'retry-amulet',
    name: 'Retry Amulet',
    description: 'Grants one retry on failed challenges',
    rarity: 'rare',
    icon: 'ArrowCounterClockwise',
    effect: { type: 'second_chance', value: 1 }
  },
  {
    id: 'treasure-map',
    name: 'Treasure Map',
    description: '+25% gold from all challenges',
    rarity: 'rare',
    icon: 'MapTrifold',
    effect: { type: 'gold_boost', value: 0.25 }
  },
  {
    id: 'temporal-lens',
    name: 'Temporal Lens',
    description: 'Extends timed challenges by 60 seconds',
    rarity: 'rare',
    icon: 'Timer',
    effect: { type: 'time_extend', value: 60 }
  },

  // Epic Items
  {
    id: 'syntax-crown',
    name: 'Syntax Crown',
    description: '+25% XP from all challenges',
    rarity: 'epic',
    icon: 'Crown',
    effect: { type: 'xp_boost', value: 0.25 }
  },
  {
    id: 'debug-monocle',
    name: 'Debug Monocle',
    description: 'Reveals all hints and highlights errors',
    rarity: 'epic',
    icon: 'MagnifyingGlass',
    effect: { type: 'hint_reveal', value: 3 }
  },
  {
    id: 'phoenix-feather',
    name: 'Phoenix Feather',
    description: 'Grants 2 retries on failed challenges',
    rarity: 'epic',
    icon: 'Feather',
    effect: { type: 'second_chance', value: 2 }
  },
  {
    id: 'merchants-blessing',
    name: "Merchant's Blessing",
    description: '+50% gold from all challenges',
    rarity: 'epic',
    icon: 'Coins',
    effect: { type: 'gold_boost', value: 0.5 }
  },
  {
    id: 'time-warp-crystal',
    name: 'Time Warp Crystal',
    description: 'Doubles time for all timed challenges',
    rarity: 'epic',
    icon: 'HourglassMedium',
    effect: { type: 'time_extend', value: 120 }
  },

  // Legendary Items
  {
    id: 'ancient-algorithm',
    name: 'Ancient Algorithm',
    description: '+50% XP from all challenges',
    rarity: 'legendary',
    icon: 'Scroll',
    effect: { type: 'xp_boost', value: 0.5 }
  },
  {
    id: 'omniscient-orb',
    name: 'Omniscient Orb',
    description: 'Shows correct answers after 2 attempts',
    rarity: 'legendary',
    icon: 'Eye',
    effect: { type: 'hint_reveal', value: 999 }
  },
  {
    id: 'infinity-loop',
    name: 'Infinity Loop',
    description: 'Unlimited retries on failed challenges',
    rarity: 'legendary',
    icon: 'Infinity',
    effect: { type: 'second_chance', value: 999 }
  },
  {
    id: 'midas-keyboard',
    name: 'Midas Keyboard',
    description: 'Double gold from all challenges',
    rarity: 'legendary',
    icon: 'Keyboard',
    effect: { type: 'gold_boost', value: 1.0 }
  },
  {
    id: 'temporal-mastery-ring',
    name: 'Temporal Mastery Ring',
    description: 'Removes time limits from all challenges',
    rarity: 'legendary',
    icon: 'Ring',
    effect: { type: 'time_extend', value: 9999 }
  }
];

export const getItemById = (id: string): Item | undefined => {
  return ALL_ITEMS.find(item => item.id === id);
};

export const getRandomItemByRarity = (rarity: string): Item => {
  const items = ALL_ITEMS.filter(item => item.rarity === rarity);
  return items[Math.floor(Math.random() * items.length)];
};

export const rollForItem = (): Item | null => {
  const roll = Math.random();

  if (roll < 0.03) {
    return getRandomItemByRarity('legendary');
  } else if (roll < 0.15) {
    return getRandomItemByRarity('epic');
  } else if (roll < 0.40) {
    return getRandomItemByRarity('rare');
  } else if (roll < 0.70) {
    return getRandomItemByRarity('common');
  }

  return null; // No drop
};
