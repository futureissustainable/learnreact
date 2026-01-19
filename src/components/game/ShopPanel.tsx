'use client';

import { useGameStore } from '@/store/gameStore';
import { SHOP_ITEMS, getShopItemPrice } from '@/data/gameData';
import { Storefront, Coin, Sword, Shield, Star } from '@phosphor-icons/react';
import { RARITY_COLORS } from '@/types/game';

export function ShopPanel() {
  const gold = useGameStore(s => s.hero.gold);
  const heroLevel = useGameStore(s => s.hero.level);
  const buyItem = useGameStore(s => s.buyItem);

  // Filter items player can use (within level range)
  const availableItems = SHOP_ITEMS.filter(item => item.level <= heroLevel + 3);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return <Sword size={16} className="text-[#f38ba8]" />;
      case 'armor': return <Shield size={16} className="text-[#89b4fa]" />;
      case 'accessory': return <Star size={16} className="text-[#f9e2af]" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#1e1e2e] rounded-xl p-5 border border-[#313244]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f9e2af]/20 flex items-center justify-center">
              <Storefront size={24} className="text-[#f9e2af]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#cdd6f4]">Shop</h2>
              <p className="text-sm text-[#6c7086]">Buy equipment with gold</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#181825] rounded-lg border border-[#313244]">
            <Coin size={20} weight="fill" className="text-[#f9e2af]" />
            <span className="font-semibold text-[#f9e2af]">{gold}</span>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableItems.map(item => {
          const price = getShopItemPrice(item);
          const canAfford = gold >= price;
          const rarityColor = RARITY_COLORS[item.rarity];

          return (
            <div
              key={item.id}
              className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244] hover:border-[#45475a] transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${rarityColor}20` }}
                >
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#cdd6f4] truncate">{item.name}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span style={{ color: rarityColor }}>{item.rarity}</span>
                    <span className="text-[#6c7086]">Lv.{item.level}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#6c7086] mb-3">{item.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-1 mb-3">
                {Object.entries(item.stats).map(([stat, value]) => (
                  <span
                    key={stat}
                    className="text-xs px-2 py-0.5 bg-[#181825] rounded text-[#a6e3a1]"
                  >
                    +{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value} {stat}
                  </span>
                ))}
              </div>

              {/* Buy Button */}
              <button
                onClick={() => buyItem(item, price)}
                disabled={!canAfford}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  canAfford
                    ? 'bg-[#a6e3a1]/20 text-[#a6e3a1] hover:bg-[#a6e3a1]/30'
                    : 'bg-[#313244] text-[#6c7086] cursor-not-allowed'
                }`}
              >
                <Coin size={14} weight="fill" />
                {price} Gold
              </button>
            </div>
          );
        })}
      </div>

      {availableItems.length === 0 && (
        <div className="bg-[#1e1e2e] rounded-xl p-8 border border-[#313244] text-center">
          <p className="text-[#6c7086]">Level up to unlock more items!</p>
        </div>
      )}

      {/* Tip */}
      <div className="bg-[#181825] rounded-lg p-4 border border-[#313244]">
        <p className="text-xs text-[#6c7086]">
          <span className="text-[#f9e2af]">Tip:</span> Defeat enemies and sell loot drops to earn gold.
          Better equipment helps you defeat stronger enemies!
        </p>
      </div>
    </div>
  );
}
