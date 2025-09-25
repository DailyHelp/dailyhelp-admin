import React from 'react';
import clsx from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'w-full p-[12px] bg-[#F9F9FB] text-[14px] font-bold text-[#3B4152] rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7] resize-none',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
