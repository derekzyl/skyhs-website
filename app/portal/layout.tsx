'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PortalNavbar from '../../components/PortalNavbar';
import { getAccessToken } from '../../lib/api';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-200">
        Checking session…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      <PortalNavbar />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
