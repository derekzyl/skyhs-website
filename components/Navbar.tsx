'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { apiGet, clearAuthTokens, getAccessToken } from '../lib/api';
import { formatNgn } from '../lib/money';
import { HARDWARE_PRICES } from '../lib/pricing';
import type { AuthUser } from '../lib/types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hardwareOpen, setHardwareOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await apiGet<{ data?: AuthUser } | AuthUser>('/api/v1/auth/me');
        if (cancelled) return;
        const u = (res as { data?: AuthUser })?.data ?? (res as AuthUser);
        if (u && typeof u === 'object' && 'id' in u) {
          setUser(u);
        }
      } catch {
        // Unauthenticated or expired token
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const handleLogout = () => {
    clearAuthTokens();
    setUser(null);
    setUserDropdownOpen(false);
    router.push('/login');
  };

  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email || 'Account'
    : '';

  const isPlatformAdmin = Boolean(
    user?.is_platform_admin ||
    (typeof user?.user_type === 'string' && user.user_type.toLowerCase() === 'admin')
  );

  return (
    <div className="w-full sticky top-0 z-50">
      {/* ── TOP ANNOUNCEMENT BAR ────────────────────────────────────────────────── */}
      <div className="bg-slate-950 text-white py-1.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2 border-b border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[10px] text-sky-400">
            24/7 Telehealth Active in Nigeria:
          </span>
        </div>
        <span className="hidden sm:inline text-slate-300 text-[11px]">
          Lagos · Abuja · Port Harcourt · MDCN-Certified Teleconsultations & Electronic Prescriptions
        </span>
        <span className="bg-primary/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-sky-500/30 text-sky-200">
          PAYSTACK · NGN
        </span>
      </div>

      {/* ── MAIN NAVIGATION HEADER ──────────────────────────────────────────────── */}
      <header className="w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 border border-slate-800 transition-all">
              <Image
                src="/logo.png"
                alt="Skyline Health Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-primary dark:text-sky-400 tracking-tight">
                  SKYLINE <span className="text-secondary dark:text-sky-200 font-semibold">HEALTH</span>
                </span>
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50 hidden xs:inline-block">
                  TELEHEALTH
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Medical Biometrics & MDCN Network
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-700 dark:text-slate-200">
            {/* Hardware Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setHardwareOpen(!hardwareOpen)}
                onMouseEnter={() => setHardwareOpen(true)}
                className="hover:text-primary dark:hover:text-sky-400 py-2 flex items-center gap-1 focus:outline-none transition-colors"
              >
                <span>Hardware Fleet</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {hardwareOpen && (
                <div
                  onMouseLeave={() => setHardwareOpen(false)}
                  className="absolute left-0 top-full w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2.5 z-50 animate-fadeIn"
                >
                  <Link
                    href="/#hardware-lineup"
                    onClick={() => setHardwareOpen(false)}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-bold text-xs text-primary dark:text-sky-400 flex items-center justify-between">
                      <span>VitalsBand™ Ultra</span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                        FLAGSHIP
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Titanium Band · Lead II ECG · {formatNgn(HARDWARE_PRICES.ultra)}
                    </div>
                  </Link>

                  <Link
                    href="/#hardware-lineup"
                    onClick={() => setHardwareOpen(false)}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-bold text-xs text-slate-900 dark:text-white">PulseBand Pro</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Continuous Optical SpO2 · {formatNgn(HARDWARE_PRICES.band)}
                    </div>
                  </Link>

                  <Link
                    href="/#hardware-lineup"
                    onClick={() => setHardwareOpen(false)}
                    className="block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Clinical Biosensor Suite</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Band + Ring + Cellular Base Hub · {formatNgn(HARDWARE_PRICES.suite)}
                    </div>
                  </Link>

                  <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href="/smartwatch"
                      onClick={() => setHardwareOpen(false)}
                      className="text-[11px] text-secondary dark:text-sky-400 font-bold hover:underline flex items-center justify-between p-1"
                    >
                      <span>Explore Technical Specifications</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#biometric-breakdown"
              className="hover:text-primary dark:hover:text-sky-400 transition-colors"
            >
              Continuous Biometrics
            </Link>

            <Link
              href="/consultancy"
              className="hover:text-primary dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
              Specialist Directory
            </Link>

            <Link
              href="/apply"
              className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-sky-600 dark:text-sky-400">verified_user</span>
              Join as Doctor
            </Link>

            {isPlatformAdmin && (
              <Link
                href="/admin"
                className="px-2.5 py-1 rounded-full bg-slate-900 dark:bg-slate-800 text-sky-300 hover:bg-slate-800 text-[11px] font-mono font-bold flex items-center gap-1 border border-slate-700 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-xs text-amber-400">admin_panel_settings</span>
                Admin Console
              </Link>
            )}
          </nav>

          {/* Trailing Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* User Account / Sign In State */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs focus:outline-none transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[120px] truncate">{displayName}</span>
                  <span className="material-symbols-outlined text-xs text-slate-400">expand_more</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn text-xs">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{displayName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</div>
                    </div>

                    <div className="py-1">
                      {isPlatformAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary dark:text-sky-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="material-symbols-outlined text-base text-amber-500">admin_panel_settings</span>
                          <span>Admin Console</span>
                        </Link>
                      )}
                      <Link
                        href="/portal/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-sky-600 dark:text-sky-400">stethoscope</span>
                        <span>Clinician Portal</span>
                      </Link>
                      <Link
                        href="/patient/records"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-slate-500">clinical_notes</span>
                        <span>Patient Records</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-semibold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden xs:inline-flex text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-sky-400 px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Order Band CTA */}
            <Link
              href="/checkout"
              className="bg-primary hover:bg-primary-container text-white text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-150 flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
              <span className="hidden sm:inline">Order Band — {formatNgn(HARDWARE_PRICES.ultra)}</span>
              <span className="sm:hidden">Order</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-primary rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU DRAWER ──────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto animate-fadeIn">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <Link
                href="/checkout"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-center text-xs font-bold text-white bg-primary rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                Order Band
              </Link>
              <Link
                href="/consultancy"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-center text-xs font-bold text-primary dark:text-sky-400 border border-primary/30 dark:border-sky-500/30 rounded-xl flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">video_call</span>
                Find Specialist
              </Link>
            </div>

            <div className="space-y-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Link
                href="/#hardware-lineup"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Hardware Lineup & Sensors
              </Link>
              <Link
                href="/#biometric-breakdown"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Continuous ECG Telemetry
              </Link>
              <Link
                href="/consultancy"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-primary dark:text-sky-400 font-bold"
              >
                Specialist Network (MDCN Verified)
              </Link>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Join Doctor Network
              </Link>
              <Link
                href="/portal/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Clinician Portal
              </Link>
              {isPlatformAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-sky-300 font-mono font-bold"
                >
                  ⚡ Admin Command Center
                </Link>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Interface Appearance</span>
              <ThemeToggle showLabel />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              {user ? (
                <div className="flex items-center justify-between px-2">
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">{displayName}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-2.5 text-center text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Sign In to Portal
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
