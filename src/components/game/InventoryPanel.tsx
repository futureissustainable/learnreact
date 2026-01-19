'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Equipment, RARITY_COLORS } from '@/types/game';
import { Trash, Sword, Shield, Circle } from '@phosphor-icons/react';

export function InventoryPanel() {
  const inventory = useGameStore(s => s.inventory);
  const hero = useGameStore(s => s.hero);
  const equipItem = useGameStore(s => s.equipItem);
  const sellItem = useGameStore(s => s.sellItem);
  const unequipSlot = useGameStore(s => s.unequipSlot);
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);

  const sortedInventory = [...inventory].sort((a, b) => {
    const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
  });

  const slotIcons = {
    weapon: <Sword size={24} />,
    armor: <Shield size={24} />,
    accessory: <Circle size={24} />
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Equipped Items */}
      <div className="bg-[#22223B] rounded-xl p-4">
        <h3 className="font-bold text-white mb-4">Equipped</h3>

        <div className="space-y-3">
          {(['weapon', 'armor', 'accessory'] as const).map(slot => {
            const item = hero.equipment[slot];
            return (
              <div
                key={slot}
                className="bg-[#4A4E69]/30 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#4A4E69] flex items-center justify-center text-[#9A8C98]">
                    {item ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      slotIcons[slot]
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#9A8C98] capitalize">{slot}</p>
                    {item ? (
                      <>
                        <p className="font-medium text-white truncate" style={{ color: RARITY_COLORS[item.rarity] }}>
                          {item.name}
                        </p>
                        <p className="text-xs text-[#9A8C98]">Lv. {item.level}</p>
                      </>
                    ) : (
                      <p className="text-[#9A8C98]">Empty</p>
                    )}
                  </div>

                  {item && (
                    <button
                      onClick={() => unequipSlot(slot)}
                      className="p-2 text-[#9A8C98] hover:text-white transition-colors"
                    >
                      Unequip
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="bg-[#22223B] rounded-xl p-4 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">Inventory</h3>
          <span className="text-sm text-[#9A8C98]">{inventory.length}/50</span>
        </div>

        {sortedInventory.length === 0 ? (
          <p className="text-[#9A8C98] text-center py-8">
            Kill monsters to find loot!
          </p>
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
            {sortedInventory.map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedItem(item)}
                className="aspect-square rounded-lg flex items-center justify-center text-2xl bg-[#4A4E69]/30 hover:bg-[#4A4E69] transition-colors border-2"
                style={{
                  borderColor: RARITY_COLORS[item.rarity],
                  boxShadow: `0 0 8px ${RARITY_COLORS[item.rarity]}40`
                }}
                title={item.name}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-[#22223B] rounded-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <span className="text-4xl">{selectedItem.emoji}</span>
              <h3 className="text-xl font-bold mt-2" style={{ color: RARITY_COLORS[selectedItem.rarity] }}>
                {selectedItem.name}
              </h3>
              <p className="text-sm text-[#9A8C98] capitalize">{selectedItem.type} - Lv. {selectedItem.level}</p>
              <p className="text-xs mt-1" style={{ color: RARITY_COLORS[selectedItem.rarity] }}>
                {selectedItem.rarity.toUpperCase()}
              </p>
            </div>

            <p className="text-sm text-[#C9ADA7] mb-4">{selectedItem.description}</p>

            {/* Stats */}
            <div className="bg-[#4A4E69]/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-[#9A8C98] mb-2">Stats:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedItem.stats).map(([stat, value]) => (
                  <div key={stat} className="text-sm">
                    <span className="text-[#9A8C98]">{stat}: </span>
                    <span className="text-green-400">+{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  equipItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                Equip
              </button>
              <button
                onClick={() => {
                  sellItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 bg-[#4A4E69] hover:bg-red-600 rounded-lg transition-colors"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
