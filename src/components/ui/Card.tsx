'use client';

import { Rarity } from '@/types/game';

interface CardProps {
  children: React.ReactNode;
  rarity?: Rarity;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const rarityStyles: Record<Rarity, string> = {
  common: 'border-[#9CA3AF]',
  rare: 'border-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.3)]',
  epic: 'border-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.3)]',
  legendary: 'border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.4)]'
};

export function Card({
  children,
  rarity,
  className = '',
  onClick,
  hoverable = false
}: CardProps) {
  const baseStyles = 'bg-white border-2 rounded-xl p-4 transition-all duration-200';
  const hoverStyles = hoverable
    ? 'hover:translate-y-[-2px] hover:shadow-lg cursor-pointer'
    : '';
  const rarityStyle = rarity ? rarityStyles[rarity] : 'border-[#C9ADA7]';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${rarityStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
