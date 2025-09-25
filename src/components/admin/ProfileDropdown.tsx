'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [email, setEmail] = useState('');
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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="border border-[#D6DBE7] rounded-4xl p-[4px] ">
        <button
          onClick={() => setOpen(!open)}
          className="!bg-transparent !border-0 cursor-pointer rounded-full bg-white space-x-1 text-white flex items-center justify-center text-xl font-semibold"
        >
          <span className="w-[32px] h-[32px] rounded-full bg-[#121921] text-white flex items-center justify-center font-bold">
            {getInitial(email)}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[#757C91] transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50">
          <Button
            variant="secondary"
            className="!bg-transparent !border-0 flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm text-gray-700 text-left"
            onClick={() => router.push('/adminprofile')}
          >
            <User className="w-4 h-4" />
            Admin profile
          </Button>
          <Button
            variant="secondary"
            className="!bg-transparent !border-0 flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 w-full text-sm text-left"
            onClick={() => router.push('/auth/login')}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
