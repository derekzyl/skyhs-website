'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiPost, errorMessage } from '../../../lib/api';
import { formatNgn } from '../../../lib/money';
import type { ConsultationSession } from '../../../lib/types';

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'live' | 'scheduled' | 'completed' | 'disputed'>('all');
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const data = await apiGet<ConsultationSession[]>('/api/v1/consultancy/admin/sessions');
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSessions();
  }, []);

  const handlePayout = async (sessionId: string) => {
    setActionBusyId(sessionId);
    setToastMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/sessions/${sessionId}/payout`);
      setToastMessage(`Payout recorded for session #${sessionId.slice(0, 8)}`);
      await loadSessions();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Failed to disburse payout.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleDispute = async (sessionId: string) => {
    setActionBusyId(sessionId);
    setToastMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/sessions/${sessionId}/dispute`, {
        notes: 'Admin review requested for encounter telemetry compliance',
      });
      setToastMessage(`Dispute flagged for session #${sessionId.slice(0, 8)}`);
      await loadSessions();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Failed to flag dispute.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleResolveDispute = async (sessionId: string) => {
    setActionBusyId(sessionId);
    setToastMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/sessions/${sessionId}/resolve-dispute`);
      setToastMessage(`Dispute resolved for session #${sessionId.slice(0, 8)}`);
      await loadSessions();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Failed to resolve dispute.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const filtered = sessions.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'disputed') return Boolean(s.dispute_status);
    return s.status.toLowerCase() === filter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── HEADER ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary dark:text-sky-400">
            <Link href="/admin" className="hover:underline">Admin</Link>
            <span>/</span>
            <span>TELEHEALTH SESSIONS & TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary dark:text-white mt-1">
            Clinical Encounters Monitor
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-1">
            Real-time tracking of physician video encounters, telemetry compliance, disputes, and payouts.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSessions}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-text-secondary dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          <span>Refresh Encounters</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-700 text-xs text-sky-900 dark:text-sky-300 flex items-center justify-between shadow-xs">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── FILTER TABS ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-border-subtle dark:border-slate-800 w-fit">
        {(['all', 'live', 'scheduled', 'completed', 'disputed'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
              filter === tab
                ? 'bg-primary text-white shadow-xs'
                : 'text-text-muted dark:text-slate-400 hover:text-text-primary dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── SESSIONS TABLE ─────────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 overflow-hidden shadow-xs dark:shadow-none">
        {loading ? (
          <div className="py-16 text-center text-xs text-text-muted dark:text-slate-400">Loading tele-encounters…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-600">event_busy</span>
            <p className="text-xs text-text-muted dark:text-slate-400">No sessions match the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle dark:border-slate-800 text-[11px] font-mono uppercase text-text-muted dark:text-slate-500">
                  <th className="pb-3 font-semibold">Encounter ID</th>
                  <th className="pb-3 font-semibold">Clinician</th>
                  <th className="pb-3 font-semibold">Scheduled Date/Time</th>
                  <th className="pb-3 font-semibold">Chief Complaint</th>
                  <th className="pb-3 font-semibold">Fee (NGN)</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Payout</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle dark:divide-slate-800/60 font-medium">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 font-mono text-text-secondary dark:text-slate-300">
                      #{s.id.slice(0, 8)}
                    </td>
                    <td className="py-4 font-bold text-text-primary dark:text-white">
                      {s.consultant_name || 'Assigned Clinician'}
                    </td>
                    <td className="py-4 font-mono text-text-muted dark:text-slate-400">
                      {new Date(s.scheduled_at).toLocaleDateString()} {new Date(s.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-4 text-text-secondary dark:text-slate-300 max-w-xs truncate">
                      {s.chief_complaint || 'General telemetry check'}
                    </td>
                    <td className="py-4 font-mono text-text-primary dark:text-slate-200 font-bold">
                      {formatNgn(s.fee)}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          s.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : s.status === 'live'
                            ? 'bg-sky-500/10 text-primary dark:text-sky-400 border border-sky-500/30 live-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 text-text-secondary dark:text-slate-300'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          s.payout_status === 'paid'
                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {s.payout_status === 'paid' ? 'Disbursed' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {s.status === 'completed' && s.payout_status !== 'paid' && (
                          <button
                            type="button"
                            disabled={actionBusyId === s.id}
                            onClick={() => handlePayout(s.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-[11px] font-bold disabled:opacity-50"
                          >
                            {actionBusyId === s.id ? '…' : 'Disburse Payout'}
                          </button>
                        )}
                        {!s.dispute_status ? (
                          <button
                            type="button"
                            disabled={actionBusyId === s.id}
                            onClick={() => handleDispute(s.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-text-secondary dark:text-slate-400 text-[11px] font-bold"
                          >
                            Flag Dispute
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={actionBusyId === s.id}
                            onClick={() => handleResolveDispute(s.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold"
                          >
                            Resolve Dispute
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
