'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import EcgWaveform from '../../../components/EcgWaveform';
import { apiGet, errorMessage } from '../../../lib/api';
import { formatNgn } from '../../../lib/money';
import type { AuthUser, ConsultationSession } from '../../../lib/types';

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

export default function ClinicianDashboardPage() {
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [sess, me] = await Promise.all([
          apiGet<ConsultationSession[]>('/api/v1/consultancy/sessions'),
          apiGet<{ data?: AuthUser } | AuthUser>('/api/v1/auth/me').catch(() => null),
        ]);
        if (cancelled) return;
        setSessions(Array.isArray(sess) ? sess : []);
        if (me) {
          const u = (me as { data?: AuthUser }).data ?? (me as AuthUser);
          if (u && typeof u === 'object' && 'id' in u) setUser(u);
        }
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load sessions.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const waiting = useMemo(
    () => sessions.filter((s) => s.status === 'waiting' || s.status === 'live'),
    [sessions]
  );
  const upcoming = useMemo(
    () =>
      sessions.filter((s) =>
        ['upcoming', 'waiting', 'live', 'scheduled'].includes(s.status)
      ),
    [sessions]
  );
  const nextPatient = waiting[0] || upcoming[0] || null;
  const displayName = user
    ? `Dr. ${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'Clinician'
    : 'Clinician';

  const completedToday = sessions.filter((s) => s.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>CLINICIAN WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Good day, {displayName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            You have{' '}
            <span className="text-sky-600 dark:text-sky-400 font-bold">
              {waiting.length} patient{waiting.length === 1 ? '' : 's'} waiting
            </span>{' '}
            in your clinical queue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/schedule"
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Manage Schedule</span>
          </Link>
          {nextPatient && (
            <Link
              href={`/portal/consultation/${nextPatient.id}`}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-sky-950/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base live-pulse">chat</span>
              <span>Open Chat Room</span>
            </Link>
          )}
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs dark:shadow-none">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Today&apos;s Encounters</span>
            <span className="material-symbols-outlined text-sky-500 dark:text-sky-400">event_available</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
            {loading ? '…' : `${sessions.length} Total`}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {completedToday} Completed • {waiting.length} Waiting
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs dark:shadow-none">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Live / Waiting</span>
            <span className="material-symbols-outlined text-emerald-500 dark:text-emerald-400">sensors</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {waiting.length}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Active queue</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs dark:shadow-none">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Fees (sessions)</span>
            <span className="material-symbols-outlined text-amber-500 dark:text-amber-400">payments</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
            {formatNgn(sessions.reduce((sum, s) => sum + (s.fee || 0), 0))}
          </div>
          <div className="text-[11px] text-sky-600 dark:text-sky-400 font-mono">Listed encounter fees</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs dark:shadow-none">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Upcoming</span>
            <span className="material-symbols-outlined text-purple-500 dark:text-purple-400">schedule</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-600 dark:text-purple-400">
            {upcoming.length}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Scheduled + active</div>
        </div>
      </div>

      {nextPatient ? (
        <div className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-gradient-to-r from-sky-50/70 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/40 p-6 shadow-md dark:shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 live-pulse" />
                {nextPatient.status === 'waiting' || nextPatient.status === 'live'
                  ? 'PATIENT IN QUEUE'
                  : 'NEXT SCHEDULED'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Scheduled for {formatTime(nextPatient.scheduled_at)}
              </span>
            </div>
            <div className="text-xs font-mono text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-200 dark:border-sky-800">
              {nextPatient.status.toUpperCase()} • {formatNgn(nextPatient.fee)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Session {nextPatient.id.slice(0, 8)}…
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Patient ID: {nextPatient.patient_id.slice(0, 8)}…
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                <span className="text-sky-600 dark:text-sky-400 font-semibold">Chief Complaint:</span>{' '}
                {nextPatient.chief_complaint || 'Not provided'}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-sm">sensors</span>
                Chat encounter ready
              </div>
              <EcgWaveform height={75} heartRate={72} rhythmText="Telemetry bridge optional" />
            </div>

            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <Link
                href={`/portal/consultation/${nextPatient.id}`}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>Start Chat Encounter</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-8 text-center text-sm text-slate-500 dark:text-slate-400 shadow-xs">
            No sessions in your queue yet.
          </div>
        )
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-xs dark:shadow-sm">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-500 dark:text-sky-400 text-xl">view_list</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Your Consultations</h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {upcoming.length} active / upcoming
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Session</th>
                <th className="py-3 px-4">Chief Complaint</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-slate-500">
                    Loading sessions…
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-slate-500">
                    No sessions found.
                  </td>
                </tr>
              ) : (
                sessions.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {formatTime(p.scheduled_at)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-sky-600 dark:text-sky-400">{p.id.slice(0, 10)}…</td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-600 dark:text-slate-300">
                      {p.chief_complaint || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                      {p.status}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-900 dark:text-white font-semibold">
                      {formatNgn(p.fee)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/portal/consultation/${p.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 font-bold border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        Open Chat
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
