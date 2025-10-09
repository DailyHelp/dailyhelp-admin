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
    'inline-flex items-center justify-center rounded-xl text-sm font-semibold',
    'transition-colors duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#017441] ring-offset-white',
    'disabled:cursor-not-allowed',
  ].join(' ');
  const variants: Record<ButtonVariant, string> = {
    primary:
      'p-[11px] bg-[#017441] text-white hover:bg-[#016437] active:bg-[#015c3a] disabled:bg-[#E5EAE7] disabled:text-[#A9AFC2] disabled:hover:bg-[#E5EAE7] disabled:active:bg-[#E5EAE7]',
    secondary:
      'p-[11px] bg-[#F1F2F4] text-[#3B4152] border border-[#F1F2F4] hover:bg-[#E9EAEE] disabled:bg-[#F1F2F4] disabled:text-[#B2B8C9]',
    danger:
      'p-[11px] bg-[#FEF6F6] text-[#F0443A] hover:bg-[#fdecec] disabled:bg-[#FEF6F6] disabled:text-[#F5A09A]',
    icon: 'p-3 bg-[#F1F2F4] rounded-xl hover:bg-[#E9EAEE] disabled:bg-[#F1F2F4]',
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
