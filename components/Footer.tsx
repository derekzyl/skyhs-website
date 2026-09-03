import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Emergency Disclaimer Banner */}
      <div className="bg-rose-950/40 border-b border-rose-900/30 px-4 py-2.5 text-center text-xs text-rose-300">
        <span className="font-bold uppercase tracking-wider text-rose-200 mr-2">
          Emergency Notice:
        </span>
        If you are experiencing chest pain, severe shortness of breath, or an acute life-threatening medical emergency, immediately call 911 or go to your nearest emergency room.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">vital_signs</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                SKYLINE <span className="text-secondary-container font-medium">HEALTH</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Continuous medical-grade wrist telemetry integrated with 24/7 board-certified specialist clinical care. Real-time Lead II ECG, continuous pulse oximetry, and instant Epic/Cerner FHIR synchronization.
            </p>
            {/* Certifications row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                HIPAA Compliant
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-sky-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                HITRUST CSF Certified
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-purple-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">integration_instructions</span>
                HL7 FHIR Bridge
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
                <Link href="/#smartwatch" className="hover:text-white transition-colors">
                  VitalsWatch Pro
                </Link>
              </li>
              <li>
                <Link href="/consultancy" className="hover:text-white transition-colors">
                  Instant Telehealth Visit
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Insurance & HMO Coverage
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
                <Link href="/apply" className="hover:text-white transition-colors">
                  Join Specialist Network
                </Link>
              </li>
              <li>
                <Link href="/portal/dashboard" className="hover:text-white transition-colors">
                  Provider Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Clinician Sign In
                </Link>
              </li>
              <li>
                <Link href="/portal/earnings" className="hover:text-white transition-colors">
                  CPT Billing & Payouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Governance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">
              Security & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Privacy Policy (HIPAA)
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Terms of Telehealth Care
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  FDA 510(k) Status
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  BAA Agreement
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Skyline Health Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>AES-256 WebRTC Telemetry</span>
            <span>•</span>
            <span>24/7 Clinical Network Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
