'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { apiGet, clearAuthTokens } from '../lib/api';
import type { AuthUser, ConsultationSession } from '../lib/types';

function unwrapMe(raw: unknown): AuthUser | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (obj.data && typeof obj.data === 'object') return obj.data as AuthUser;
  return obj as AuthUser;
}

function clinicianLabel(user: AuthUser | null): string {
  if (!user) return 'Clinician';
  const parts = [user.first_name, user.last_name].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return user.email || 'Clinician';
}

export default function PortalNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOnCall, setIsOnCall] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [queueSession, setQueueSession] = useState<ConsultationSession | null>(null);
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [meRaw, sessions] = await Promise.all([
        apiGet<unknown>('/api/v1/auth/me').catch(() => null),
        apiGet<ConsultationSession[]>('/api/v1/consultancy/sessions').catch(() => []),
      ]);
      if (cancelled) return;
      setUser(unwrapMe(meRaw));
      const queue = (sessions || []).filter((s) =>
        ['waiting', 'live', 'in_progress', 'upcoming'].includes(s.status)
      );
      setQueueCount(queue.length);
      setQueueSession(queue[0] || null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const roomHref = queueSession
    ? `/portal/consultation/${queueSession.id}`
    : '/portal/dashboard';
  const patientHref = queueSession
    ? `/portal/patients/${queueSession.patient_id}`
    : '/portal/dashboard';

  const navItems = useMemo(
    () => [
      { label: 'Overview', href: '/portal/dashboard', icon: 'space_dashboard' },
      {
        label: 'Chat Room',
        href: roomHref,
        icon: 'forum',
        badge: queueCount > 0 ? `${queueCount} active` : undefined,
      },
      { label: 'Schedule', href: '/portal/schedule', icon: 'calendar_clock' },
      { label: 'Patient', href: patientHref, icon: 'ecg_heart' },
      { label: 'Earnings & CPT', href: '/portal/earnings', icon: 'payments' },
      { label: 'My Settings', href: '/portal/profile', icon: 'account_circle' },
    ],
    [roomHref, patientHref, queueCount]
  );

  const logout = () => {
    clearAuthTokens();
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/portal/dashboard" className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center p-1 shadow-md shrink-0">
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
                <span className="text-sm sm:text-base font-bold tracking-tight text-white">
                  SKYLINE <span className="text-secondary-container">HEALTH</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-sky-950 border border-sky-800 text-[9px] sm:text-[10px] font-mono font-bold text-sky-400">
                  MD PORTAL
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/portal/dashboard' && pathname.startsWith(item.href.split('/').slice(0, 3).join('/')));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-sky-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded border border-sky-500/30 font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsOnCall(!isOnCall)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 sm:gap-2 border transition-all ${
              isOnCall
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-950/80 border-amber-500/40 text-amber-400'
            }`}
            title="Toggle Clinical On-Call Availability"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnCall ? 'bg-emerald-400 live-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="hidden sm:inline">
              {isOnCall ? 'On Call (Available)' : 'Busy / In Clinic'}
            </span>
            <span className="sm:hidden">{isOnCall ? 'On Call' : 'Busy'}</span>
          </button>

          {(Boolean(user?.is_platform_admin) || (typeof user?.user_type === 'string' && user.user_type.toLowerCase() === 'admin')) && (
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/20 transition-colors font-bold font-mono"
              title="Switch to Admin Command Center"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">admin_panel_settings</span>
              <span>Admin Console</span>
            </Link>
          )}

          {queueCount > 0 && (
            <Link
              href={roomHref}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs text-sky-300 hover:bg-sky-500/20 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">notifications_active</span>
              <span className="font-bold">{queueCount} In Queue</span>
            </Link>
          )}

          <Link
            href="/portal/profile"
            className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shrink-0 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
              {user?.first_name?.[0] || user?.email?.[0] || 'MD'}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold leading-none text-white">
                {clinicianLabel(user)}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                {user?.email || 'Signed in'}
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle Clinician Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          {queueCount > 0 && (
            <Link
              href={roomHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-sky-400 animate-pulse">
                  notifications_active
                </span>
                <span>{queueCount} session(s) active</span>
              </div>
              <span className="text-[10px] font-mono bg-sky-900 px-2 py-0.5 rounded text-white">
                Open chat →
              </span>
            </Link>
          )}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-sky-400 font-bold border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>Public Website</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
