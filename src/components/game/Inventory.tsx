'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Item, Rarity } from '@/types/game';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Backpack,
  Scroll,
  Pen,
  Coin,
  Hourglass,
  BookOpen,
  Compass,
  ArrowCounterClockwise,
  MapTrifold,
  Timer,
  Crown,
  MagnifyingGlass,
  Coins,
  HourglassHigh,
  Eye,
  ArrowsClockwise,
  Keyboard,
  Circle
} from '@phosphor-icons/react';

const iconMap: Record<string, React.ReactNode> = {
  Scroll: <Scroll size={24} />,
  Pen: <Pen size={24} />,
  Coin: <Coin size={24} />,
  Hourglass: <Hourglass size={24} />,
  BookOpen: <BookOpen size={24} />,
  Compass: <Compass size={24} />,
  ArrowCounterClockwise: <ArrowCounterClockwise size={24} />,
  MapTrifold: <MapTrifold size={24} />,
  Timer: <Timer size={24} />,
  Crown: <Crown size={24} />,
  MagnifyingGlass: <MagnifyingGlass size={24} />,
  Feather: <Scroll size={24} />,
  Coins: <Coins size={24} />,
  HourglassMedium: <HourglassHigh size={24} />,
  Eye: <Eye size={24} />,
  Infinity: <ArrowsClockwise size={24} />,
  Keyboard: <Keyboard size={24} />,
  Ring: <Circle size={24} />
};

const rarityColors: Record<Rarity, { bg: string; border: string; text: string }> = {
  common: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-600' },
  rare: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-600' },
  epic: { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-600' },
  legendary: { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-600' }
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary'
};

export function Inventory() {
  const inventory = useGameStore((state) => state.character.inventory);
  const equippedItems = useGameStore((state) => state.character.equippedItems);
  const equipItem = useGameStore((state) => state.equipItem);
  const unequipItem = useGameStore((state) => state.unequipItem);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Sort by rarity
  const sortedInventory = [...inventory].sort((a, b) => {
    const rarityOrder: Rarity[] = ['legendary', 'epic', 'rare', 'common'];
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
  });

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Backpack size={28} className="text-[#22223B]" />
          <h2 className="text-xl font-bold text-[#22223B]">Inventory</h2>
          <span className="text-sm text-[#4A4E69]">
            ({inventory.length} items)
          </span>
        </div>

        {/* Equipped Items */}
        {equippedItems.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#4A4E69] uppercase tracking-wide mb-3">
              Equipped
            </h3>
            <div className="flex flex-wrap gap-2">
              {equippedItems.map((item) => (
                <ItemBadge
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  isEquipped
                />
              ))}
            </div>
          </div>
        )}

        {/* All Items */}
        <div>
          <h3 className="text-sm font-semibold text-[#4A4E69] uppercase tracking-wide mb-3">
            All Items
          </h3>
          {sortedInventory.length === 0 ? (
            <p className="text-[#9A8C98] text-center py-8">
              Complete challenges to earn loot!
            </p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {sortedInventory.map((item, idx) => (
                <ItemSlot
                  key={`${item.id}-${idx}`}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Item Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        size="sm"
      >
        {selectedItem && (
          <div className="text-center space-y-4">
            <div
              className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${
                rarityColors[selectedItem.rarity].bg
              } border-2 ${rarityColors[selectedItem.rarity].border}`}
            >
              <span className="text-[#22223B]">
                {iconMap[selectedItem.icon] || <Scroll size={32} />}
              </span>
            </div>

            <div>
              <span
                className={`text-xs font-semibold uppercase ${
                  rarityColors[selectedItem.rarity].text
                }`}
              >
                {rarityLabels[selectedItem.rarity]}
              </span>
              <h3 className="text-xl font-bold text-[#22223B] mt-1">
                {selectedItem.name}
              </h3>
            </div>

            <p className="text-[#4A4E69]">{selectedItem.description}</p>

            <div className="flex gap-3 pt-2">
              {selectedItem.equipped ? (
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    unequipItem(selectedItem.id);
                    setSelectedItem(null);
                  }}
                >
                  Unequip
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  onClick={() => {
                    equipItem(selectedItem.id);
                    setSelectedItem(null);
                  }}
                >
                  Equip
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function ItemSlot({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full aspect-square rounded-lg border-2
        flex items-center justify-center
        transition-all hover:scale-110
        ${rarityColors[item.rarity].bg}
        ${rarityColors[item.rarity].border}
        ${item.equipped ? 'ring-2 ring-[#FFD700] ring-offset-1' : ''}
      `}
    >
      <span className="text-[#22223B]">
        {iconMap[item.icon] || <Scroll size={20} />}
      </span>
    </button>
  );
}

function ItemBadge({
  item,
  onClick,
  isEquipped
}: {
  item: Item;
  onClick: () => void;
  isEquipped?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg border-2
        transition-all hover:scale-105
        ${rarityColors[item.rarity].bg}
        ${rarityColors[item.rarity].border}
      `}
    >
      {iconMap[item.icon] || <Scroll size={16} />}
      <span className="text-sm font-medium text-[#22223B]">{item.name}</span>
    </button>
  );
}
