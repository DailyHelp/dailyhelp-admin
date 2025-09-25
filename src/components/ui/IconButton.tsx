import React from 'react';
import Button, { ButtonProps } from './Button';

type IconButtonProps = Omit<ButtonProps, 'variant'> & { 'aria-label'?: string };

export const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button variant="icon" className={className} {...props}>
      {children}
    </Button>
  );
};

export default IconButton;
