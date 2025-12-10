import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray' | 'violet';
  size?: 'sm' | 'md';
};

export function Badge({ children, variant = 'gray', size = 'md' }: BadgeProps) {
  const variants = {
    primary: 'bg-teal-100 text-teal-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
    violet: 'bg-violet-100 text-violet-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
