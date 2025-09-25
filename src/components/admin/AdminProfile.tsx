'use client';
import { useEffect, useState } from 'react';
import MailIcon from '@/assets/admin-mail-icon.svg';
import LockIcon from '@/assets/admin-pw-icon.svg';
import RoleIcon from '@/assets/role-icon.svg';
import UpdatePasswordModal from './UpdatePasswordModal';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Button from '@/components/ui/Button';

export default function AdminProfile() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const getInitial = (email: string) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  function capitalizeFirstLetter(email: string) {
    if (!email) return '';
    return email.charAt(0).toUpperCase() + email.slice(1);
  }

  const name = capitalizeFirstLetter(email);

  return (
    <div className="min-h-screen flex bg-[#F9F9FB] ">
      <div
        className="bg-white border border-[#F1F2F4] shadow-md space-y-4
      rounded-2xl p-[48px] w-[560px] h-[560px] max-w-lg text-center h-full mx-auto mt-32"
      >
        <div
          className="mx-auto w-16 h-16 rounded-full bg-[#121921]
         text-white flex items-center justify-center text-lg font-bold"
        >
          {getInitial(email)}
        </div>

        <h2 className="text-[#121921] text-2xl font-bold">{name.split('@')[0]}</h2>

        <div className="flex justify-center items-center mt-3 gap-2">
          <span>
            <MailIcon className="w-5 h-" />
          </span>
          <p className="text-sm text-[#3B4152] ">{email}</p>
        </div>
        <div className="flex justify-center items-center mt-3 gap-2">
          <span>
            <RoleIcon className="w-5 h-5" />
          </span>
          <p className="text-sm text-[#3B4152] ">Customer support</p>
        </div>

        <Button
          variant="secondary"
          className="mb-6 px-4 py-1 rounded-lg border border-[#D6DBE7] text-[#017441] text-sm font-semibold hover:bg-green-200 transition"
          onClick={() => setOpen(true)}
        >
          <LockIcon className="inline w-5 h-5" />
          Update password
        </Button>

        <SlideOverModal open={open} onOpenChange={setOpen} title="Update password">
          <UpdatePasswordModal onSuccess={() => setOpen(false)} />
        </SlideOverModal>
      </div>
    </div>
  );
}
