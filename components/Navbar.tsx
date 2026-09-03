'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-white/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">vital_signs</span>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-primary flex items-center gap-1">
              SKYLINE <span className="text-secondary font-medium">HEALTH</span>
            </span>
            <span className="text-[10px] font-semibold text-text-muted tracking-widest block -mt-1 uppercase">
              Clinical Telemetry
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/smartwatch"
            className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
          >
            VitalsWatch Pro
          </Link>
          <Link
            href="/consultancy"
            className="text-sm font-semibold text-primary flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-status-normal live-pulse" />
            Specialist Network
          </Link>
          <Link
            href="/portal/dashboard"
            className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
          >
            Clinician Portal
          </Link>
          <Link
            href="/apply"
            className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
          >
            Join as Specialist
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-bold text-primary hover:bg-surface-subtle rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/consultancy"
            className="px-4 py-2 text-sm font-bold text-white bg-primary-container hover:bg-primary rounded-lg shadow-sm shadow-primary/25 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">video_call</span>
            Consult Doctor
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-primary"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            href="/smartwatch"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-semibold text-text-secondary"
          >
            VitalsWatch Pro
          </Link>
          <Link
            href="/consultancy"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-semibold text-primary"
          >
            Live Specialist Network
          </Link>
          <Link
            href="/portal/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-semibold text-text-secondary"
          >
            Clinician Portal
          </Link>
          <Link
            href="/apply"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-semibold text-text-secondary"
          >
            Join as Specialist
          </Link>
          <div className="pt-3 border-t border-border-subtle flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-primary border border-primary/30 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              href="/consultancy"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-primary-container rounded-lg"
            >
              Consult Doctor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
