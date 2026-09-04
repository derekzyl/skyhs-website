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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-sm">
        Checking session…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased font-sans">
      <PortalNavbar />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
