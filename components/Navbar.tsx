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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Fetch authenticated user
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

  // Auto-close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Scroll lock and ESC key listener for Side Drawer
  useEffect(() => {
    if (!drawerOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  const handleLogout = () => {
    clearAuthTokens();
    setUser(null);
    setDrawerOpen(false);
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
    <div className="w-full sticky top-0 z-40">
      {/* ── TOP SLIM ANNOUNCEMENT BAR ───────────────────────────────────────────── */}
      <div className="bg-slate-950 text-white py-1 px-4 text-xs border-b border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wider uppercase text-[10px] text-sky-400">
              24/7 MDCN Telehealth Active:
            </span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              Continuous Telemetry & Instant Consultations across Nigeria
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block bg-primary/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-sky-500/30 text-sky-200">
              PAYSTACK · NGN
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="text-[11px] font-bold text-sky-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore Platform</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── CLEAN STREAMLINED APP BAR ───────────────────────────────────────────── */}
      <header className="w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 border border-slate-800 transition-all">
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
                  VITALSBAND™
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Continuous Medical Telemetry
              </p>
            </div>
          </Link>

          {/* Minimal Center Links (Clean & Spacious) */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Link
              href="/#hardware-lineup"
              className="hover:text-primary dark:hover:text-sky-400 transition-colors"
            >
              VitalsBand™ Fleet
            </Link>
            <Link
              href="/consultancy"
              className="hover:text-primary dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
              Specialist Directory
            </Link>
            <Link
              href="/smartwatch"
              className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors"
            >
              Tech Specs
            </Link>
          </nav>

          {/* Right Controls: Order CTA, Theme Toggle, and Side Drawer Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Order Band CTA */}
            <Link
              href="/checkout"
              className="bg-primary hover:bg-primary-container text-white text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-150 flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
              <span className="hidden sm:inline">Order Band — {formatNgn(HARDWARE_PRICES.ultra)}</span>
              <span className="sm:hidden">Order</span>
            </Link>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* SIDE DRAWER TRIGGER BUTTON */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-sky-500/50 bg-slate-50/80 dark:bg-slate-900/80 hover:bg-primary/5 dark:hover:bg-sky-500/10 text-slate-800 dark:text-slate-100 transition-all duration-150 cursor-pointer shadow-xs group"
              aria-label="Open Navigation Menu Drawer"
            >
              {user ? (
                <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-emerald-500/50">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="flex flex-col gap-1 w-4">
                  <span className="h-0.5 w-full bg-slate-700 dark:bg-slate-200 rounded-full group-hover:bg-primary dark:group-hover:bg-sky-400 transition-colors" />
                  <span className="h-0.5 w-3/4 bg-slate-700 dark:bg-slate-200 rounded-full group-hover:w-full group-hover:bg-primary dark:group-hover:bg-sky-400 transition-all" />
                  <span className="h-0.5 w-full bg-slate-700 dark:bg-slate-200 rounded-full group-hover:bg-primary dark:group-hover:bg-sky-400 transition-colors" />
                </div>
              )}
              <span className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-sky-400">
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── SIDE DRAWER BACKDROP OVERLAY ────────────────────────────────────────── */}
      <div
        role="presentation"
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── SIDE DRAWER PANEL ───────────────────────────────────────────────────── */}
      <aside
        aria-label="Skyline Platform Navigation"
        aria-hidden={!drawerOpen}
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[460px] max-w-[95vw] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out transform ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center p-1 border border-slate-800">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm text-primary dark:text-sky-400 tracking-tight">
                SKYLINE <span className="text-secondary dark:text-sky-200 font-semibold">HEALTH</span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Clinical Telehealth & Biometrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* User Account / Sign In Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-900 dark:to-slate-800/60 border border-slate-200 dark:border-slate-800">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-xs ring-2 ring-emerald-500/50 shrink-0">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {displayName}
                      </p>
                      {isPlatformAdmin && (
                        <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-700">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/80 dark:border-slate-700/60">
                  <Link
                    href="/portal/dashboard"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm text-sky-500">stethoscope</span>
                    <span>Clinician Portal</span>
                  </Link>

                  <Link
                    href="/patient/records"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm text-emerald-500">clinical_notes</span>
                    <span>EHR Records</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {isPlatformAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setDrawerOpen(false)}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                      Admin Command Console
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline ml-auto flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Patient & Clinician Portal
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Sign in to view live ECG streams & consults
                  </p>
                </div>
                <Link
                  href="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="bg-primary hover:bg-primary-container text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors shrink-0"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Section 1: Hardware Fleet & Wearables */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                Hardware Fleet & Wearables
              </span>
              <Link
                href="/smartwatch"
                onClick={() => setDrawerOpen(false)}
                className="text-[11px] font-bold text-secondary dark:text-sky-400 hover:underline flex items-center gap-0.5"
              >
                <span>Tech Specs</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>

            <div className="space-y-2">
              <Link
                href="/#hardware-lineup"
                onClick={() => setDrawerOpen(false)}
                className="block p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-sky-500/40 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
                    Skyline VitalsBand™ Ultra
                  </span>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                    FLAGSHIP · {formatNgn(HARDWARE_PRICES.ultra)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Aerospace Titanium Curved Band · Continuous Lead II ECG · 7-Day Battery
                </p>
              </Link>

              <Link
                href="/#hardware-lineup"
                onClick={() => setDrawerOpen(false)}
                className="block p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-sky-500/40 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all">
                    Skyline PulseBand Pro
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                    {formatNgn(HARDWARE_PRICES.band)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Screenless Daily Band · Continuous Optical SpO2 & HRV Tracking
                </p>
              </Link>

              <Link
                href="/#hardware-lineup"
                onClick={() => setDrawerOpen(false)}
                className="block p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-sky-500/40 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all">
                    Clinical Biosensor Suite
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                    {formatNgn(HARDWARE_PRICES.suite)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  VitalsBand + Sleep Tracking Ring + Home Cellular Base Hub
                </p>
              </Link>
            </div>
          </div>

          {/* Section 2: Clinical Care & Telehealth */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Clinical Care & Telehealth
            </span>

            <div className="space-y-1.5">
              <Link
                href="/consultancy"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">medical_services</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400">
                      Specialist Directory
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    MDCN-certified Cardiologists, GPs, & Neurologists across Nigeria
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">
                  chevron_right
                </span>
              </Link>

              <Link
                href="/#biometric-breakdown"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">ecg</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400">
                    Continuous ECG Telemetry
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Real-time arrhythmia detection & vital alerts
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">
                  chevron_right
                </span>
              </Link>

              <Link
                href="/patient/records"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">clinical_notes</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400">
                    Patient EHR Records
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Digital prescriptions, lab orders, and historical trends
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>

          {/* Section 3: Healthcare Professionals & Infrastructure */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Healthcare Professionals & Network
            </span>

            <div className="space-y-1.5">
              <Link
                href="/apply"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400">
                    Join as Doctor / Specialist
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    MDCN physician onboarding, licensing & tele-consult hours
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">
                  chevron_right
                </span>
              </Link>

              <Link
                href="/portal/dashboard"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">stethoscope</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400">
                    Clinician Portal Dashboard
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Active tele-encounter queue and real-time patient ECG HUD
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Checkout CTA Card in Drawer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-md">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-200">
                  Ready for Medical Telemetry?
                </p>
                <p className="text-sm font-extrabold mt-0.5">
                  Order Skyline VitalsBand™
                </p>
              </div>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="bg-white hover:bg-slate-100 text-primary text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 shrink-0"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer: Theme & Compliance Info */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Appearance
            </span>
            <ThemeToggle showLabel />
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
            <span>MDCN Verified Platform</span>
            <span>Paystack 256-Bit SSL</span>
            <span>24/7 Clinical Support</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
