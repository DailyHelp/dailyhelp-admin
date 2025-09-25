import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const base = [
    'rounded-xl text-sm font-bold',
    'transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#017441] ring-offset-white',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' ');
  const variants: Record<ButtonVariant, string> = {
    primary: 'p-[11px] bg-[#017441] text-white hover:brightness-95 active:brightness-90',
    secondary: 'p-[11px] bg-[#F1F2F4] text-[#3B4152] border border-[#F1F2F4] hover:bg-[#E9EAEE]',
    danger: 'p-[11px] bg-[#FEF6F6] text-[#F0443A] hover:bg-[#fdecec]',
    icon: 'p-3 bg-[#F1F2F4] rounded-xl hover:bg-[#E9EAEE]',
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      aria-disabled={props.disabled ? true : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
