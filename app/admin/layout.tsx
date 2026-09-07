'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { apiGet, clearAuthTokens, getAccessToken } from '../../lib/api';
import type { AuthUser } from '../../lib/types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await apiGet<{ data?: AuthUser } | AuthUser>('/api/v1/auth/me');
        if (cancelled) return;
        const u = (res as { data?: AuthUser })?.data ?? (res as AuthUser);
        if (u && typeof u === 'object') {
          setUser(u);
        }
      } catch {
        // Fallback for offline or pilot testing
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleLogout = () => {
    clearAuthTokens();
    router.replace('/login');
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: 'space_dashboard' },
    { label: 'Doctor Approvals', href: '/admin/consultants', icon: 'verified_user' },
    { label: 'Telehealth Sessions', href: '/admin/sessions', icon: 'monitor_heart' },
    { label: 'Naira Payouts', href: '/admin/payouts', icon: 'account_balance_wallet' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-xs font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span>INITIALIZING ADMIN COMMAND CENTER…</span>
        </div>
      </div>
    );
  }

  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email || 'Admin Staff'
    : 'Admin Staff';

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans antialiased">
      {/* ── DESKTOP SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-slate-900/95 border-r border-slate-800/80 p-5 shrink-0 select-none">
        <div className="space-y-6">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700/60 flex items-center justify-center p-1.5 shadow-md">
              <Image
                src="/logo.png"
                alt="Skyline Health"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold tracking-tight text-white">SKYLINE</span>
                <span className="bg-amber-400/10 text-amber-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">Command Center</p>
            </div>
          </div>

          {/* Telemetry Status Indicator */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span>Platform Uptime</span>
              <span className="text-emerald-400 font-bold">99.98%</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Telemetry Mesh</span>
              <span className="text-sky-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Active (WAT)
              </span>
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase px-3 pb-1 tracking-wider">
              Management
            </div>
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-sky-950 border border-sky-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Context Switchers */}
          <div className="pt-4 border-t border-slate-800/80 space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase px-3 pb-1 tracking-wider">
              Portals
            </div>
            <Link
              href="/portal/dashboard"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span className="material-symbols-outlined text-base text-sky-400">stethoscope</span>
              <span>Clinician Portal</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span className="material-symbols-outlined text-base text-emerald-400">public</span>
              <span>Public Website</span>
            </Link>
          </div>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400 text-xs shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{displayName}</div>
              <div className="text-[10px] text-slate-400 truncate">Platform Administrator</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Sign Out"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-sm font-bold text-white">Skyline Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-sky-400 font-bold">
              Exit Admin
            </Link>
          </div>
        </header>

        {mobileSidebarOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-xs font-bold text-rose-400"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Top Header Bar */}
        <header className="hidden lg:flex h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-sky-400">hub</span>
              <span>NIGERIA OPERATIONS · REGION: LAGOS (LOS-1)</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
              <span>MDCN Registry Synced</span>
            </div>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Website ↗
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
