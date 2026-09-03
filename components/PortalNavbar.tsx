'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isOnCall, setIsOnCall] = useState(true);

  const navItems = [
    { label: 'Overview', href: '/portal/dashboard', icon: 'space_dashboard' },
    { label: 'Virtual Room', href: '/portal/consultation/sess-01', icon: 'videocam' },
    { label: 'Schedule', href: '/portal/schedule', icon: 'calendar_clock' },
    { label: 'Patient Telemetry', href: '/portal/patients/sess-01', icon: 'ecg_heart' },
    { label: 'Earnings & CPT', href: '/portal/earnings', icon: 'payments' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Portal Badge */}
        <div className="flex items-center gap-6">
          <Link href="/portal/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xl">vital_signs</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  SKYLINE <span className="text-secondary-container">HEALTH</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-[10px] font-mono font-bold text-sky-400">
                  MD PORTAL
                </span>
              </div>
            </div>
          </Link>

          {/* Nav Links */}
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
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Telehealth Queue, On-Call Status & Profile */}
        <div className="flex items-center gap-3">
          {/* On-call switch */}
          <button
            onClick={() => setIsOnCall(!isOnCall)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
              isOnCall
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-950/80 border-amber-500/40 text-amber-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnCall ? 'bg-emerald-400 live-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{isOnCall ? 'On Call (Available)' : 'Busy / In Clinic'}</span>
          </button>

          {/* Active Queue pill */}
          <Link
            href="/portal/consultation/sess-01"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs text-sky-300 hover:bg-sky-500/20 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            <span className="font-bold">1 Patient In Queue</span>
          </Link>

          {/* Clinician Profile */}
          <Link
            href="/portal/profile"
            className="flex items-center gap-2.5 pl-2 border-l border-slate-800 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80"
                alt="Dr. Julian Vance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold leading-none text-white">Dr. Julian Vance</div>
              <div className="text-[10px] text-slate-400 leading-tight">Cardiology Lead</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
