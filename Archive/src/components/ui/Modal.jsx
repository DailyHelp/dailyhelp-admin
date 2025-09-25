import * as Dialog from '@radix-ui/react-dialog';
import CloseIcon from '@/assets/close-icon.svg';
import React from 'react';

export default function Modal({ open, onOpenChange, title, children }) {
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
          <div className="flex justify-between items-center p-4 border-b border-[#F1F2F4]">
            <Dialog.Title className="text-[16px] px-1 font-bold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="bg-[#F9F9FB] p-3 rounded-lg">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          {/* body */}
          <div className="max-h-[75vh] overflow-auto p-">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
