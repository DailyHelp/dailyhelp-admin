'use client';
import { usePathname } from 'next/navigation';
import ProfileDropdown from '@/components/admin/ProfileDropdown';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/adminprofile': 'Admin profile',
  '/users': 'Users',
  '/users/[id]': 'Users Profile',
  '/providers': 'Service providers',
  '/providers/[id]': 'Service providers profile',
  '/jobs': 'Jobs',
  '/disputes': 'Disputes',
  '/reports': 'Reports',
  '/feedback': 'Feedback',
  '/team-members': 'Team members',
  '/settings': 'Settings',
};

// helper function to resolve dynamic routes
function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  // handle dynamic routes
  if (pathname.startsWith('/users/')) {
    return pageTitles['/users/[id]'];
  }

  // fallback if no match
  return 'Untitled Page';
}

export default function Navbar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div>
      <nav className="flex border-b border-[#F1F2F4] justify-between items-center bg-white shadow px-4 py-3">
        <h1 className="text-lg font-semibold text-[#121921]">{title}</h1>
        <ProfileDropdown />
      </nav>
    </div>
  );
}
