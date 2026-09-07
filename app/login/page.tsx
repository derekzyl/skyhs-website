'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EcgWaveform from '../../components/EcgWaveform';
import ThemeToggle from '../../components/ThemeToggle';
import { errorMessage, login } from '../../lib/api';

export default function ClinicianLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(identifier.trim(), password);
      router.push('/portal/dashboard');
    } catch (err) {
      setError(errorMessage(err, 'Login failed. Check your email and password.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface-canvas dark:bg-slate-950 text-text-primary dark:text-white font-sans relative">
      {/* Floating Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* ── LEFT SHOWCASE: CLINICAL TELEMETRY MESH ───────────────────────────────── */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-primary-container border-b lg:border-b-0 lg:border-r border-slate-800 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden p-1 shadow-lg">
              <Image
                src="/logo.png"
                alt="Skyline Health"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                SKYLINE <span className="text-secondary-container font-medium">HEALTH</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest block uppercase -mt-0.5">
                Provider Gateway
              </span>
            </div>
          </Link>
        </div>

        {/* Center Live Network Telemetry Preview */}
        <div className="my-12 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
            <span>GLOBAL CLINICAL TELEMETRY MESH ONLINE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            High-Resolution Wrist Telemetry Synchronized to Your Clinical Workflow.
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg font-normal">
            Authenticate to review waiting patient queues, initiate sub-second WebRTC video consultations with live Lead II ECG telemetry, and push electronic prescriptions to pharmacies.
          </p>

          {/* Live Waveform Preview */}
          <div className="pt-2">
            <EcgWaveform height={85} heartRate={72} rhythmText="Live Patient Stream Preview • Lead II Sinus" />
          </div>

          {/* Platform Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-base font-mono font-bold text-white">1,480+</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Active MDs</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-base font-mono font-bold text-emerald-400">342</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Live Visits</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-base font-mono font-bold text-sky-400">18ms</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Sensor Latency</div>
            </div>
          </div>
        </div>

        {/* Security Disclaimers */}
        <div className="relative z-10 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <span>AES-256 TLS 1.3 Encryption</span>
          <span>HIPAA & HITECH Compliant</span>
        </div>
      </div>

      {/* ── RIGHT SIGN-IN FORM ─────────────────────────────────────────────────── */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-md w-full space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary dark:text-sky-400">
              Clinician Authentication
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary dark:text-white mt-1">
              Sign In to Clinician Workspace
            </h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-1">
              Enter your institutional email or MDCN license number to access active patient sessions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary dark:text-slate-300 block mb-1">
                Clinical Email / MDCN License
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  placeholder="e.g. dr.vance@telehealth.org or 1892049102"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-text-secondary dark:text-slate-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[11px] text-primary dark:text-sky-400 hover:underline">
                  Reset Password?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-text-secondary dark:text-slate-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-primary dark:text-sky-400">key</span>
              <span>2FA Authenticator token will be prompted upon institutional SSO handoff.</span>
            </div>

            {error && (
              <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-lg shadow-sky-950/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authorizing Credentials...</span>
              ) : (
                <>
                  <span>Sign In & Open Workspace</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-text-secondary dark:text-slate-400 space-y-2">
            <div>
              Not registered on the network?{' '}
              <Link href="/apply" className="text-primary dark:text-sky-400 hover:underline font-bold">
                Apply for Telehealth Credentialing
              </Link>
            </div>
            <div>
              <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-[11px]">
                ← Return to Public Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
