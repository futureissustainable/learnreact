'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const variantStyles = {
  primary: 'bg-[#22223B] text-[#F2E9E4] hover:bg-[#4A4E69] disabled:bg-[#9A8C98]',
  secondary: 'bg-transparent text-[#22223B] border-2 border-[#22223B] hover:bg-[#22223B] hover:text-[#F2E9E4]',
  ghost: 'bg-transparent text-[#4A4E69] hover:bg-[#F2E9E4] hover:text-[#22223B]'
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold rounded-lg
        transition-all duration-200 ease-out
        hover:translate-y-[-1px]
        disabled:cursor-not-allowed disabled:opacity-50 disabled:translate-y-0
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
