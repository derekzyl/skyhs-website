import React from 'react';
import PortalNavbar from '../../components/PortalNavbar';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased font-sans">
      <PortalNavbar />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
