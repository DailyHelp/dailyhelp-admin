'use client';

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
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[#121921AD]" />

        <Dialog.Content className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl overflow-hidden rounded-l-3xl bg-[#F4F5FA] shadow-lg">
          <div className="flex items-center justify-between border-b border-[#EAECF5] bg-[#F4F5FA] px-8 py-6">
            <Dialog.Title className="text-lg font-semibold text-[#121921]">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="icon" className="h-10 w-10 rounded-full border border-[#EAECF5] bg-white">
                <CloseIcon />
              </Button>
            </Dialog.Close>
          </div>

          <div className="h-[calc(100%-88px)] overflow-y-auto bg-white px-8 py-8">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
