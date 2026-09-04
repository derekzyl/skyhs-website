'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { apiPost, errorMessage } from '../../lib/api';

export default function ClinicianForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiPost('/api/v1/auth/forgot-password', { email: email.trim() }, { auth: false });
      setSubmitted(true);
    } catch (err) {
      setError(errorMessage(err, 'Could not send recovery link.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-white font-sans">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-950">
            <span className="material-symbols-outlined text-2xl">vpn_key</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Reset Clinician Password
          </h1>
          <p className="text-xs text-slate-400">
            Enter your institutional email or 10-digit NPI number to receive a secure recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-emerald-400">
              mark_email_read
            </span>
            <h3 className="text-sm font-bold text-white">Recovery Dispatch Sent</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an active provider account matches <span className="font-bold text-white">{email}</span>, a cryptographic reset token has been dispatched.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Return to Clinician Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Institutional Email or NPI
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. dr.vance@telehealth.org or 1892049102"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-lg shadow-sky-950 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Sending…' : 'Send Recovery Link'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-800 text-xs">
          <Link href="/login" className="text-sky-400 hover:text-sky-300 font-bold">
            ← Back to Clinician Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
