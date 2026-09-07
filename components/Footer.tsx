import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Emergency Disclaimer Banner */}
      <div className="bg-rose-950/40 border-b border-rose-900/30 px-4 py-2.5 text-center text-xs text-rose-300">
        <span className="font-bold uppercase tracking-wider text-rose-200 mr-2">
          Emergency Notice:
        </span>
        If you are experiencing chest pain, severe shortness of breath, or an acute life-threatening medical emergency, immediately call <strong>112</strong> (Nigeria Toll-Free) or Lagos LASAMBUS <strong>767</strong>, or proceed to your nearest emergency facility. Telehealth is not a replacement for immediate emergency triage.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden p-1.5 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Skyline Health Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                SKYLINE <span className="text-sky-400 font-medium">HEALTH</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Continuous medical-grade wrist biometric telemetry integrated with 24/7 board-certified Nigerian specialists and international consultants. Real-time Lead II ECG, continuous optical SpO2, and encrypted e-Prescription synchronization.
            </p>
            {/* Certifications row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                MDCN Compliant
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-sky-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                NDPR Data Privacy
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-purple-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">payments</span>
                Paystack PCI-DSS L1
              </span>
            </div>
          </div>

          {/* Patients Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">
              For Patients
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/consultancy" className="hover:text-white transition-colors">
                  Find a Specialist
                </Link>
              </li>
              <li>
                <Link href="/#hardware-lineup" className="hover:text-white transition-colors">
                  VitalsBand™ Ultra
                </Link>
              </li>
              <li>
                <Link href="/consultancy" className="hover:text-white transition-colors">
                  Instant Telehealth Visit
                </Link>
              </li>
              <li>
                <Link href="/patient/records" className="hover:text-white transition-colors">
                  Electronic Health Records
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Order Hardware & Sensors
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinicians Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">
              For Clinicians
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/apply" className="hover:text-white transition-colors text-sky-400 font-semibold">
                  Join Specialist Network
                </Link>
              </li>
              <li>
                <Link href="/portal/dashboard" className="hover:text-white transition-colors">
                  Clinician Workspace
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Clinician Sign In
                </Link>
              </li>
              <li>
                <Link href="/portal/schedule" className="hover:text-white transition-colors">
                  Availability & Slots
                </Link>
              </li>
              <li>
                <Link href="/portal/earnings" className="hover:text-white transition-colors">
                  Direct Naira Payouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Governance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">
              Governance & Admin
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/admin" className="text-amber-400/90 hover:text-amber-300 font-mono font-semibold transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">admin_panel_settings</span>
                  Admin Command Console
                </Link>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  NDPR Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Telehealth Clinical Standards
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  MDCN Credentialing Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Paystack Escrow Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Skyline Health Technologies Ltd. Lagos · Abuja · Port Harcourt. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-emerald-400 flex items-center gap-1 font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
              WebRTC Encrypted Telemetry Active
            </span>
            <span>·</span>
            <span>PCI-DSS Secured via Paystack</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
