'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useMemo } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/store';

const getInitial = (name?: string | null, email?: string | null) => {
  const source = name?.trim() || email?.trim() || '';
  return source ? source.charAt(0).toUpperCase() : '?';
};

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const initial = useMemo(() => getInitial(user?.fullName || user?.firstName, user?.email), [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="rounded-4xl border border-[#D6DBE7] p-1">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-transparent px-1 py-1 text-sm font-semibold text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#121921] text-base font-semibold text-white">
            {initial}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-[#757C91] transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-lg">
          <Button
            variant="secondary"
            className="!border-0 !bg-transparent flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#3B4152] hover:bg-[#F9F9FB]"
            onClick={() => {
              setOpen(false);
              router.push('/adminprofile');
            }}
          >
            <User className="h-4 w-4" />
            Admin profile
          </Button>
          <Button
            variant="secondary"
            className="!border-0 !bg-transparent flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#F0443A] hover:bg-[#FEF6F6]"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
