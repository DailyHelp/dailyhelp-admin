import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={clsx('p-4 bg-[#F9F9FB] rounded-xl', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
