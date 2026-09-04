'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hardwareOpen, setHardwareOpen] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50">
      {/* ── TOP ANNOUNCEMENT BAR ────────────────────────────────────────────────── */}
      <div className="bg-primary text-white py-1.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2 border-b border-primary-container shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[10px] text-sky-200">
            FDA Class II Clearance Granted:
          </span>
        </div>
        <span className="hidden sm:inline text-sky-100 text-[11px]">
          Skyline VitalsWatch Ultra includes 1 Year Complimentary 24/7 MD Consultation Access
        </span>
        <span className="bg-primary-container/90 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-sky-400/30 text-white">
          HSA / FSA ELIGIBLE
        </span>
      </div>

      {/* ── MAIN NAVIGATION HEADER ──────────────────────────────────────────────── */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm transition-all duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-1 shadow-md group-hover:scale-105 transition-all">
              <Image
                src="/logo.png"
                alt="Skyline Health Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-primary tracking-tight">
                  SKYLINE <span className="text-secondary font-medium">HEALTH</span>
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-200 hidden xs:inline-block">
                  BIOSENSORS
                </span>
              </div>
              <p className="text-[10px] font-semibold text-text-muted flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-normal" />
                Clinical Grade Wearables
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-text-secondary">
            {/* Hardware Dropdown */}
            <div className="relative">
              <button
                onClick={() => setHardwareOpen(!hardwareOpen)}
                onMouseEnter={() => setHardwareOpen(true)}
                className="text-primary hover:text-secondary py-2 flex items-center gap-1 focus:outline-none"
              >
                <span>Hardware Fleet</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {hardwareOpen && (
                <div
                  onMouseLeave={() => setHardwareOpen(false)}
                  className="absolute left-0 top-full w-64 bg-white border border-border-subtle rounded-xl shadow-2xl p-2.5 z-50 animate-fadeIn"
                >
                  <Link
                    href="/#hardware-lineup"
                    onClick={() => setHardwareOpen(false)}
                    className="block p-2.5 rounded-lg hover:bg-surface-subtle transition-colors"
                  >
                    <div className="font-bold text-xs text-primary flex items-center justify-between">
                      <span>VitalsWatch™ Ultra</span>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        FLAGSHIP
                      </span>
                    </div>
                    <div className="text-[11px] text-text-muted mt-0.5">Grade 5 Titanium • Lead II ECG • $399</div>
                  </Link>

                  <Link
                    href="/#hardware-lineup"
                    onClick={() => setHardwareOpen(false)}
                    className="block p-2.5 rounded-lg hover:bg-surface-subtle transition-colors"
                  >
                    <div className="font-bold text-xs text-text-primary">PulseBand Pro</div>
                    <div className="text-[11px] text-text-muted mt-0.5">Continuous Optical SpO2 • $299</div>
                  </Link>

                  <Link
                    href="/#hardware-lineup"
                    onClick={() => setHardwareOpen(false)}
                    className="block p-2.5 rounded-lg hover:bg-surface-subtle transition-colors"
                  >
                    <div className="font-bold text-xs text-text-primary">Clinical Biosensor Suite</div>
                    <div className="text-[11px] text-text-muted mt-0.5">Watch + Ring + Cellular Base Hub • $699</div>
                  </Link>

                  <div className="mt-1 pt-1 border-t border-border-subtle">
                    <Link
                      href="/smartwatch"
                      onClick={() => setHardwareOpen(false)}
                      className="text-[11px] text-secondary font-bold hover:underline flex items-center gap-1 p-1"
                    >
                      <span>Explore Technical Specs</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#biometric-breakdown"
              className="hover:text-primary transition-colors"
            >
              Continuous Biometrics
            </Link>

            <Link
              href="/consultancy"
              className="text-primary hover:text-secondary transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-status-normal live-pulse" />
              Specialist Network
            </Link>

            <Link
              href="/patient/records"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">clinical_notes</span>
              My Records
            </Link>

            <Link
              href="/portal/dashboard"
              className="hover:text-primary transition-colors flex items-center gap-1 text-slate-600"
            >
              <span className="material-symbols-outlined text-sm text-sky-600">stethoscope</span>
              Clinician Portal
            </Link>
          </nav>

          {/* Trailing Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Cart Link */}
            <Link
              href="/checkout"
              className="relative p-2 text-text-secondary hover:text-primary rounded-lg border border-border-subtle hover:bg-surface-subtle transition-colors flex items-center"
              title="View Cart & Checkout"
              aria-label="View Shopping Cart"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                1
              </span>
            </Link>

            {/* Order Watch CTA */}
            <Link
              href="/checkout"
              className="hidden sm:inline-flex bg-primary hover:bg-primary-container text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-150 items-center gap-1.5 shrink-0"
            >
              <span>Order Watch — $399</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU DRAWER ──────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border-subtle bg-white px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto animate-fadeIn">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-border-subtle">
              <Link
                href="/checkout"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-center text-xs font-bold text-white bg-primary rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                Order Watch ($399)
              </Link>
              <Link
                href="/consultancy"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-center text-xs font-bold text-primary border border-primary/30 rounded-xl flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">video_call</span>
                Consult Doctor
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted px-2 py-1">
                Hardware & Features
              </div>
              <Link
                href="/#hardware-lineup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg text-sm font-semibold text-text-primary hover:bg-surface-subtle"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">watch</span>
                  Skyline VitalsWatch™ Ultra
                </span>
                <span className="text-xs font-bold text-primary font-mono">$399</span>
              </Link>
              <Link
                href="/#biometric-breakdown"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-sm font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-base text-secondary">ecg_heart</span>
                Continuous Biometric Sensors
              </Link>
              <Link
                href="/#clinical-advantage"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-sm font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-base text-emerald-600">health_and_safety</span>
                24/7 Clinical Telehealth Advantage
              </Link>
              <Link
                href="/smartwatch"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-sm font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-base text-slate-500">memory</span>
                Technical Hardware Specifications
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-border-subtle">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted px-2 py-1">
                Patient & Clinician Portals
              </div>
              <Link
                href="/patient/records"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg text-sm font-semibold text-text-primary hover:bg-surface-subtle"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">clinical_notes</span>
                  Patient Health Records & Vitals
                </span>
                <span className="text-[10px] font-bold bg-sky-100 text-primary px-1.5 py-0.5 rounded">
                  NEW
                </span>
              </Link>
              <Link
                href="/portal/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-sm font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-base text-slate-600">space_dashboard</span>
                Clinician Portal Dashboard
              </Link>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-sm font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-base text-secondary">assignment_ind</span>
                Join Roster as Specialist MD
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg text-sm font-semibold text-text-secondary hover:bg-surface-subtle"
              >
                <span className="material-symbols-outlined text-base text-slate-400">login</span>
                Clinician Sign In
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
