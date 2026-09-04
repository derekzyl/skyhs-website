'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isOnCall, setIsOnCall] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/portal/dashboard', icon: 'space_dashboard' },
    { label: 'Virtual Room', href: '/portal/consultation/sess-01', icon: 'videocam', badge: '1 Waiting' },
    { label: 'Schedule', href: '/portal/schedule', icon: 'calendar_clock' },
    { label: 'Patient Telemetry', href: '/portal/patients/sess-01', icon: 'ecg_heart' },
    { label: 'Earnings & CPT', href: '/portal/earnings', icon: 'payments' },
    { label: 'My Settings', href: '/portal/profile', icon: 'account_circle' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand & Portal Badge */}
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

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
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

        {/* Right: Telehealth Queue, On-Call Status & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* On-call switch */}
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
            <span className="hidden sm:inline">{isOnCall ? 'On Call (Available)' : 'Busy / In Clinic'}</span>
            <span className="sm:hidden">{isOnCall ? 'On Call' : 'Busy'}</span>
          </button>

          {/* Active Queue pill */}
          <Link
            href="/portal/consultation/sess-01"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs text-sky-300 hover:bg-sky-500/20 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            <span className="font-bold">1 In Queue</span>
          </Link>

          {/* Clinician Profile */}
          <Link
            href="/portal/profile"
            className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shrink-0">
              <img
                src="/images/avatars/dr_chidi_okafor.jpg"
                alt="Dr. Chidi Okafor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold leading-none text-white">Dr. Chidi Okafor</div>
              <div className="text-[10px] text-slate-400 leading-tight">Cardiology Lead</div>
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
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

      {/* ── MOBILE MENU DRAWER ──────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          {/* Active queue alert banner on mobile */}
          <Link
            href="/portal/consultation/sess-01"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-sky-400 animate-pulse">
                notifications_active
              </span>
              <span>1 Patient In Queue (Eleanor Vance)</span>
            </div>
            <span className="text-[10px] font-mono bg-sky-900 px-2 py-0.5 rounded text-white">
              Launch Room →
            </span>
          </Link>

          {/* Navigation Links List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
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
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
