'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'gold' | 'green' | 'blue' | 'purple';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  gold: 'bg-[#FFD700]',
  green: 'bg-[#4ADE80]',
  blue: 'bg-[#60A5FA]',
  purple: 'bg-[#A855F7]'
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3'
};

export function ProgressBar({
  value,
  max,
  color = 'gold',
  showLabel = false,
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className={`w-full bg-[#C9ADA7] rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-[#4A4E69] mt-1 text-right">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
