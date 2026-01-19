'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Equipment, RARITY_COLORS } from '@/types/game';
import { Trash, Sword, Shield, Star, Backpack, X } from '@phosphor-icons/react';

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
    weapon: <Sword size={20} className="text-[#f38ba8]" />,
    armor: <Shield size={20} className="text-[#89b4fa]" />,
    accessory: <Star size={20} className="text-[#f9e2af]" />
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Equipped Items */}
      <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244]">
        <h3 className="font-semibold text-[#cdd6f4] mb-4">Equipped</h3>

        <div className="space-y-2">
          {(['weapon', 'armor', 'accessory'] as const).map(slot => {
            const item = hero.equipment[slot];
            return (
              <div
                key={slot}
                className="bg-[#181825] rounded-lg p-3 border border-[#313244]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#313244] flex items-center justify-center">
                    {slotIcons[slot]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#6c7086] capitalize">{slot}</p>
                    {item ? (
                      <p className="font-medium text-sm truncate" style={{ color: RARITY_COLORS[item.rarity] }}>
                        {item.name}
                      </p>
                    ) : (
                      <p className="text-[#6c7086] text-sm">Empty</p>
                    )}
                  </div>

                  {item && (
                    <button
                      onClick={() => unequipSlot(slot)}
                      className="text-xs text-[#6c7086] hover:text-[#cdd6f4] transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="bg-[#1e1e2e] rounded-xl p-4 border border-[#313244] lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#cdd6f4] flex items-center gap-2">
            <Backpack size={16} className="text-[#6c7086]" />
            Inventory
          </h3>
          <span className="text-sm text-[#6c7086]">{inventory.length}/50</span>
        </div>

        {sortedInventory.length === 0 ? (
          <p className="text-[#6c7086] text-center py-8 text-sm">
            Kill monsters to find loot
          </p>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {sortedInventory.map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedItem(item)}
                className="aspect-square rounded-lg flex items-center justify-center bg-[#181825] hover:bg-[#313244] transition-colors border"
                style={{
                  borderColor: RARITY_COLORS[item.rarity],
                }}
                title={item.name}
              >
                {item.type === 'weapon' && <Sword size={20} style={{ color: RARITY_COLORS[item.rarity] }} />}
                {item.type === 'armor' && <Shield size={20} style={{ color: RARITY_COLORS[item.rarity] }} />}
                {item.type === 'accessory' && <Star size={20} style={{ color: RARITY_COLORS[item.rarity] }} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-[#11111b]/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-[#1e1e2e] rounded-xl p-5 max-w-sm w-full border border-[#313244]" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${RARITY_COLORS[selectedItem.rarity]}20` }}
                >
                  {selectedItem.type === 'weapon' && <Sword size={24} style={{ color: RARITY_COLORS[selectedItem.rarity] }} />}
                  {selectedItem.type === 'armor' && <Shield size={24} style={{ color: RARITY_COLORS[selectedItem.rarity] }} />}
                  {selectedItem.type === 'accessory' && <Star size={24} style={{ color: RARITY_COLORS[selectedItem.rarity] }} />}
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: RARITY_COLORS[selectedItem.rarity] }}>
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-[#6c7086] capitalize">{selectedItem.type} - Lv.{selectedItem.level}</p>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-[#6c7086] hover:text-[#cdd6f4]">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-[#a6adc8] mb-4">{selectedItem.description}</p>

            {/* Stats */}
            <div className="bg-[#181825] rounded-lg p-3 mb-4 border border-[#313244]">
              <p className="text-xs text-[#6c7086] mb-2">Stats</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedItem.stats).map(([stat, value]) => (
                  <div key={stat} className="text-sm">
                    <span className="text-[#6c7086]">{stat}: </span>
                    <span className="text-[#a6e3a1]">+{value}</span>
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
                className="flex-1 py-2 bg-[#a6e3a1] text-[#1e1e2e] rounded-lg font-medium text-sm hover:bg-[#a6e3a1]/90 transition-colors"
              >
                Equip
              </button>
              <button
                onClick={() => {
                  sellItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 bg-[#313244] text-[#f38ba8] rounded-lg hover:bg-[#f38ba8] hover:text-[#1e1e2e] transition-colors"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
