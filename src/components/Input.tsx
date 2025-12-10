import { ReactNode } from 'react';

type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  icon?: ReactNode;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
};

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  error,
  disabled = false,
  multiline = false,
  rows = 3,
}: InputProps) {
  const baseStyles = 'w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-100 disabled:cursor-not-allowed';

  const errorStyles = error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '';

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${baseStyles} ${errorStyles} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseStyles} ${errorStyles} ${icon ? 'pl-12' : ''}`}
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
