import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: ReactNode;
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 font-medium';
  
  const variants = {
    primary: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-gray-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
