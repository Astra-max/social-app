'use client';

import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';



function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  showIcon?: boolean;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
}

export function Toggle({
  checked,
  onChange,
  className,
  size = 'md',
  disabled = false,
  label,
  labelPosition = 'right',
  activeColor = '#14afa7',
  inactiveColor = '#2a2a2a',
  thumbColor = '#ffffff',
  showIcon = false,
  iconOn,
  iconOff,
}: ToggleProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const sizeClasses = {
    sm: {
      toggle: 'h-5 w-10',
      thumb: 'h-4 w-4',
      translate: 'translate-x-[20px]',
      gap: 'gap-2',
      text: 'text-sm',
      icon: 'w-2.5 h-2.5',
    },
    md: {
      toggle: 'h-7 w-12',
      thumb: 'h-6 w-6',
      translate: 'translate-x-[22px]',
      gap: 'gap-3',
      text: 'text-base',
      icon: 'w-3.5 h-3.5',
    },
    lg: {
      toggle: 'h-9 w-16',
      thumb: 'h-8 w-8',
      translate: 'translate-x-[28px]',
      gap: 'gap-4',
      text: 'text-lg',
      icon: 'w-4.5 h-4.5',
    },
  };

  // Default icons if showIcon is true and no custom icons provided
  const defaultIconOn = iconOn || (
    <svg
      className={cn(sizeClasses[size].icon, 'text-yellow-500')}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const defaultIconOff = iconOff || (
    <svg
      className={cn(sizeClasses[size].icon, 'text-gray-700 dark:text-gray-300')}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        clipRule="evenodd"
      />
    </svg>
  );

  const toggleElement = (
    <button
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      disabled={disabled}
      className={cn(
        'relative cursor-pointer rounded-full transition-colors duration-300 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14afa7] dark:focus:ring-offset-gray-900',
        disabled && 'opacity-50 cursor-not-allowed active:scale-100',
        sizeClasses[size].toggle,
        checked ? 'bg-[#14afa7] dark:bg-[#14afa7]' : 'bg-[#2a2a2a] dark:bg-[#3a3a3a]',
        className
      )}
      style={{
        backgroundColor: checked ? activeColor : inactiveColor,
      }}
    >
      <span
        className={cn(
          'absolute top-0.5 rounded-full bg-white shadow-md transition-transform duration-300 ease-out',
          'flex items-center justify-center',
          sizeClasses[size].thumb,
          checked ? sizeClasses[size].translate : 'translate-x-0.5'
        )}
        style={{ backgroundColor: thumbColor }}
      >
        {showIcon && (checked ? defaultIconOn : defaultIconOff)}
      </span>
    </button>
  );

  if (!label) {
    return toggleElement;
  }

  return (
    <div className={cn('flex items-center', sizeClasses[size].gap, 'select-none')}>
      <label
        className={cn(
          'cursor-pointer font-medium text-gray-400 order-1 pr-3',
          sizeClasses[size].text,
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {label}
      </label>
      
      {/* Toggle second (right side) */}
      <div className="order-2">
        {toggleElement}
      </div>
    </div>
  );
}

export default Toggle;