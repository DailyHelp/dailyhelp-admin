import * as Dialog from '@radix-ui/react-dialog';
import CloseIcon from '@/assets/close-icon.svg';
import React from 'react';
import Button from '@/components/ui/Button';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-[#121921CE] z-40" />

        {/* content (centered modal) */}
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2 z-50
            w-full max-w-lg
            -translate-x-1/2 -translate-y-1/2
            bg-white shadow-lg rounded-xl
            overflow-hidden
          "
        >
          {/* header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F2F4]">
            <Dialog.Title className="text-[16px] px-1 font-bold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="icon" className="h-10 w-10 rounded-full border border-[#EAECF5] bg-white">
                <CloseIcon />
              </Button>
            </Dialog.Close>
          </div>

          {/* body */}
          <div className="max-h-[75vh] overflow-auto px-6 py-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
