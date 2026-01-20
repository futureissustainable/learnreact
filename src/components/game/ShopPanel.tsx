'use client';

import { useGameStore } from '@/store/gameStore';
import { SHOP_ITEMS, getShopItemPrice } from '@/data/gameData';
import { Storefront, Coin, Sword, Shield, Star, Lock, CheckCircle, Code } from '@phosphor-icons/react';
import { RARITY_COLORS, ScriptFeature } from '@/types/game';

export function ShopPanel() {
  const gold = useGameStore(s => s.hero.gold);
  const heroLevel = useGameStore(s => s.hero.level);
  const inventory = useGameStore(s => s.inventory);
  const hero = useGameStore(s => s.hero);
  const buyItem = useGameStore(s => s.buyItem);

  // Get all owned features
  const getOwnedFeatures = (): Set<ScriptFeature> => {
    const features = new Set<ScriptFeature>();
    inventory.forEach(item => {
      if (item.unlocks) features.add(item.unlocks);
    });
    if (hero.equipment.weapon?.unlocks) features.add(hero.equipment.weapon.unlocks);
    if (hero.equipment.armor?.unlocks) features.add(hero.equipment.armor.unlocks);
    if (hero.equipment.accessory?.unlocks) features.add(hero.equipment.accessory.unlocks);
    return features;
  };

  const ownedFeatures = getOwnedFeatures();

  // Sort items: unlocks first, then by price
  const sortedItems = [...SHOP_ITEMS].sort((a, b) => {
    // Items that unlock features come first
    if (a.unlocks && !b.unlocks) return -1;
    if (!a.unlocks && b.unlocks) return 1;
    // Then by price
    return getShopItemPrice(a) - getShopItemPrice(b);
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return <Sword size={16} className="text-[#f38ba8]" />;
      case 'armor': return <Shield size={16} className="text-[#89b4fa]" />;
      case 'accessory': return <Star size={16} className="text-[#f9e2af]" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#313244]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f9e2af]/20 flex items-center justify-center">
              <Storefront size={24} className="text-[#f9e2af]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#cdd6f4]">Shop</h2>
              <p className="text-sm text-[#6c7086]">Buy items to unlock script features!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#181825] rounded-lg border border-[#313244]">
            <Coin size={20} weight="fill" className="text-[#f9e2af]" />
            <span className="font-semibold text-[#f9e2af]">{gold}</span>
          </div>
        </div>
      </div>

      {/* Unlock Items Section */}
      <div>
        <h3 className="text-sm font-medium text-[#cba6f7] mb-3 flex items-center gap-2">
          <Code size={14} />
          Items That Unlock Script Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sortedItems.filter(item => item.unlocks).map(item => {
            const price = getShopItemPrice(item);
            const canAfford = gold >= price;
            const alreadyOwned = ownedFeatures.has(item.unlocks!);
            const rarityColor = RARITY_COLORS[item.rarity];

            return (
              <div
                key={item.id}
                className={`bg-[#1e1e2e] rounded-xl p-4 border transition-colors ${
                  alreadyOwned
                    ? 'border-[#a6e3a1]/30 opacity-60'
                    : 'border-[#cba6f7]/30 hover:border-[#cba6f7]/50'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${rarityColor}20` }}
                  >
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-[#cdd6f4]">{item.name}</h4>
                      {alreadyOwned && (
                        <CheckCircle size={14} weight="fill" className="text-[#a6e3a1]" />
                      )}
                    </div>
                    <span className="text-xs" style={{ color: rarityColor }}>{item.rarity}</span>
                  </div>
                </div>

                {/* What it unlocks - THE KEY INFO */}
                <div className="mb-3 p-2 bg-[#cba6f7]/10 rounded-lg border border-[#cba6f7]/20">
                  <p className="text-xs text-[#cba6f7] font-medium">
                    <Lock size={10} className="inline mr-1" />
                    {item.unlocksDescription}
                  </p>
                </div>

                <p className="text-xs text-[#6c7086] mb-2">{item.description}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <span
                      key={stat}
                      className="text-[10px] px-1.5 py-0.5 bg-[#181825] rounded text-[#a6e3a1]"
                    >
                      +{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value} {stat}
                    </span>
                  ))}
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => buyItem(item, price)}
                  disabled={!canAfford || alreadyOwned}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    alreadyOwned
                      ? 'bg-[#a6e3a1]/20 text-[#a6e3a1] cursor-default'
                      : canAfford
                        ? 'bg-[#cba6f7] text-[#1e1e2e] hover:bg-[#cba6f7]/80'
                        : 'bg-[#313244] text-[#6c7086] cursor-not-allowed'
                  }`}
                >
                  {alreadyOwned ? (
                    <>
                      <CheckCircle size={14} weight="fill" />
                      Owned
                    </>
                  ) : (
                    <>
                      <Coin size={14} weight="fill" />
                      {price} Gold
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stat Items Section */}
      <div>
        <h3 className="text-sm font-medium text-[#6c7086] mb-3 flex items-center gap-2">
          <Sword size={14} />
          Stat Upgrades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedItems.filter(item => !item.unlocks).map(item => {
            const price = getShopItemPrice(item);
            const canAfford = gold >= price;
            const rarityColor = RARITY_COLORS[item.rarity];

            return (
              <div
                key={item.id}
                className="bg-[#1e1e2e] rounded-xl p-3 border border-[#313244] hover:border-[#45475a] transition-colors"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${rarityColor}20` }}
                  >
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#cdd6f4] text-sm">{item.name}</h4>
                    <span className="text-[10px]" style={{ color: rarityColor }}>{item.rarity}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <span
                      key={stat}
                      className="text-[10px] px-1.5 py-0.5 bg-[#181825] rounded text-[#a6e3a1]"
                    >
                      +{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value} {stat}
                    </span>
                  ))}
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => buyItem(item, price)}
                  disabled={!canAfford}
                  className={`w-full flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                    canAfford
                      ? 'bg-[#a6e3a1]/20 text-[#a6e3a1] hover:bg-[#a6e3a1]/30'
                      : 'bg-[#313244] text-[#6c7086] cursor-not-allowed'
                  }`}
                >
                  <Coin size={12} weight="fill" />
                  {price}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-[#181825] rounded-lg p-4 border border-[#313244]">
        <p className="text-xs text-[#6c7086]">
          <span className="text-[#cba6f7]">Tip:</span> Items that unlock script features let you write smarter automation.
          Start with <span className="text-[#f9e2af]">Conditional Blade</span> to use <code className="text-[#a6e3a1]">if</code> statements!
        </p>
      </div>
    </div>
  );
}
