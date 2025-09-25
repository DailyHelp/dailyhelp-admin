'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/app/layout/Sidebar';
import Navbar from '@/app/layout/Navbar';

export default function LayoutWithConditionalUI({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
