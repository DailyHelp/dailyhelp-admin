'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/app/layout/Sidebar';
import Navbar from '@/app/layout/Navbar';
import { useAuthStore } from '@/features/auth/store';

export default function LayoutWithConditionalUI({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const accessToken = useAuthStore((state) => state.accessToken);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const finishedHydrating = useAuthStore.persist?.hasHydrated?.() ?? true;
    if (finishedHydrating) {
      setHasHydrated(true);
      return;
    }

    const unsub = useAuthStore.persist?.onFinishHydration?.(() => setHasHydrated(true));
    return () => {
      unsub?.();
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (accessToken && isAuthPage) {
      router.replace('/dashboard');
    }

    if (!accessToken && !isAuthPage) {
      router.replace('/auth/login');
    }
  }, [accessToken, hasHydrated, isAuthPage, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {hasHydrated && accessToken ? children : (
            <div className="h-full w-full animate-pulse space-y-4 bg-[#F9F9FB] p-8">
              <div className="h-10 w-48 rounded-xl bg-white" />
              <div className="h-48 rounded-2xl bg-white" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-40 rounded-2xl bg-white" />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
