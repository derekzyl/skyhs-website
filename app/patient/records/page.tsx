'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import {
  apiGet,
  errorMessage,
  getAccessToken,
} from '../../../lib/api';
import type { AuthUser, CareSummary, ConsultationSession } from '../../../lib/types';

function unwrapMe(raw: unknown): AuthUser | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (obj.data && typeof obj.data === 'object') return obj.data as AuthUser;
  return obj as AuthUser;
}

export default function PatientRecordsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [summaries, setSummaries] = useState<Record<string, CareSummary | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'consultations' | 'summaries'>('consultations');

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [meRaw, sess] = await Promise.all([
          apiGet<unknown>('/api/v1/auth/me').catch(() => null),
          apiGet<ConsultationSession[]>('/api/v1/consultancy/sessions'),
        ]);
        if (cancelled) return;
        setUser(unwrapMe(meRaw));
        const list = Array.isArray(sess) ? sess : [];
        setSessions(list);
        const map: Record<string, CareSummary | null> = {};
        await Promise.all(
          list.map(async (s) => {
            try {
              map[s.id] = await apiGet<CareSummary>(
                `/api/v1/consultancy/sessions/${s.id}/summary`
              );
            } catch {
              map[s.id] = null;
            }
          })
        );
        if (!cancelled) setSummaries(map);
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load records.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-canvas text-slate-500 text-sm">
        Checking session…
      </div>
    );
  }

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(' ') ||
    user?.email ||
    'Patient';

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{displayName}</h1>
              <div className="text-xs text-sky-200 mt-0.5 font-mono">
                {user?.email || 'Signed-in patient'}
              </div>
            </div>
            <Link
              href="/consultancy"
              className="px-4 py-3 rounded-xl bg-white text-primary text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">forum</span>
              <span>Book chat visit</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
          {(['consultations', 'summaries'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold capitalize ${
                activeTab === tab
                  ? 'text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading && <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>}

        {!loading && sessions.length === 0 && (
          <div className="p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-sm text-slate-500 dark:text-slate-400">
            No consultations yet. Book a chat visit to build your record.
          </div>
        )}

        {!loading && activeTab === 'consultations' && (
          <div className="space-y-4">
            {sessions.map((enc) => (
              <div
                key={enc.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {enc.consultant_name || 'Clinician'} · {enc.specialty || 'General'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {new Date(enc.scheduled_at).toLocaleString()} · {enc.status}
                    </div>
                  </div>
                  <Link
                    href={`/waiting-room/${enc.id}`}
                    className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Open session →
                  </Link>
                </div>
                {enc.chief_complaint && (
                  <p className="text-xs text-slate-600 dark:text-slate-300">{enc.chief_complaint}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && activeTab === 'summaries' && (
          <div className="space-y-4">
            {sessions.map((enc) => {
              const summary = summaries[enc.id];
              return (
                <div
                  key={enc.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="font-bold text-slate-900 dark:text-white">
                    {enc.consultant_name || 'Visit'} ·{' '}
                    {new Date(enc.scheduled_at).toLocaleDateString()}
                  </div>
                  {summary?.diagnosis || summary?.soap_notes || summary?.prescriptions ? (
                    <div className="space-y-1 text-slate-700 dark:text-slate-300">
                      {summary.diagnosis && <p>Diagnosis: {summary.diagnosis}</p>}
                      {summary.soap_notes && <p>Notes: {summary.soap_notes}</p>}
                      {summary.prescriptions && <p>Rx: {summary.prescriptions}</p>}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">No care summary posted yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
