import * as Dialog from '@radix-ui/react-dialog';
import CloseIcon from '@/assets/close-icon.svg';
import React from 'react';
import Button from '@/components/ui/Button';

export interface SlideOverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function SlideOverModal({
  open,
  onOpenChange,
  title,
  children,
}: SlideOverModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#121921AD] z-40" />

        <Dialog.Content
          className="
            fixed top-0 right-0 z-50
            w-full max-w-xl h-full
            bg-white shadow-lg
            transform animate-slideIn
            overflow-auto rounded-l-xl
          "
        >
          <div className="flex justify-between items-center px-6 py-5 border-b border-[#F1F2F4]">
            <Dialog.Title className="text-[16px] font-bold ">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="secondary" className="p-3">
                <CloseIcon className="" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="h-[91.5%] overflow-auto">
            <div className="px-6 py-6">{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
