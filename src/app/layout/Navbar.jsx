'use client';

import { usePathname } from 'next/navigation';
import ProfileDropdown from '@/components/ProfileDropdown';

const pageTitles = {
  '/dashboard': 'Dashboard',
  'users': 'Users',
  '/service-providers': 'Service-providers',
  '/jobs': 'Jobs',
  '/disputes': 'Disputes',
  '/report': 'Report',
  '/feedback': 'Feedback',
  '/team-members': 'Team-members',
  '/settings': 'Settings',
  // Add all your routes and titles here
};

export default function Navbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname];

  return (
    <div>
      <nav className="flex border-b border-[#F1F2F4] justify-between items-center bg-white shadow px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <ProfileDropdown />
      </nav>
    </div>
    
  );
}
