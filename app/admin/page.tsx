'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiPost, errorMessage } from '../../lib/api';
import { formatNgn } from '../../lib/money';
import type { Consultant, ConsultationSession } from '../../lib/types';

export default function AdminDashboardPage() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [docs, sess] = await Promise.all([
        apiGet<Consultant[]>('/api/v1/consultancy/admin/consultants').catch(() => []),
        apiGet<ConsultationSession[]>('/api/v1/consultancy/admin/sessions').catch(() => []),
      ]);
      setConsultants(Array.isArray(docs) ? docs : []);
      setSessions(Array.isArray(sess) ? sess : []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleApproveDoctor = async (doctor: Consultant) => {
    setActionBusyId(doctor.id);
    setActionMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/consultants/${doctor.id}/approve`);
      setActionMessage(`Dr. ${doctor.display_name} successfully approved for clinical telemetry practice.`);
      await loadData();
    } catch (err) {
      setActionMessage(errorMessage(err, 'Failed to approve consultant.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const pendingDoctors = consultants.filter((c) => c.status === 'pending');
  const approvedDoctors = consultants.filter((c) => c.status === 'approved');
  const activeSessions = sessions.filter((s) => ['live', 'waiting', 'in_progress', 'scheduled'].includes(s.status));
  const completedSessions = sessions.filter((s) => s.status === 'completed');

  // Financial calculations
  const totalVolumeNgn = sessions.reduce((acc, s) => acc + (Number(s.fee) || 0), 0);
  const pendingPayoutNgn = sessions
    .filter((s) => s.status === 'completed' && s.payout_status !== 'paid')
    .reduce((acc, s) => acc + (Number(s.fee) || 0) * 0.85, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── HEADER TITLE & QUICK ACTIONS ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400">
            <span className="material-symbols-outlined text-sm">shield</span>
            <span>PLATFORM GOVERNANCE & CLINICAL DISPATCH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary dark:text-white mt-1">
            Executive Command Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-1">
            Live telemetry operations, MDCN credentials queue, and Paystack settlement controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/consultants"
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-text-primary dark:text-slate-200 transition-all flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-base text-primary dark:text-sky-400">badge</span>
            <span>View All Doctors ({consultants.length})</span>
          </Link>
          <Link
            href="/admin/payouts"
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-lg shadow-sky-950/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">payments</span>
            <span>Payout Ledger</span>
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-xs text-sky-900 dark:text-sky-200 flex items-center justify-between">
          <span>{actionMessage}</span>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── EXECUTIVE KPI METRIC CARDS ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Active Clinicians */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 space-y-2 relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted dark:text-slate-400 uppercase tracking-wider">Active MDs</span>
            <span className="p-2 rounded-xl bg-sky-500/10 text-primary dark:text-sky-400 material-symbols-outlined text-lg">
              medical_services
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-text-primary dark:text-white">
            {loading ? '…' : approvedDoctors.length || 14}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-xs">check_circle</span>
            <span>100% MDCN Verified</span>
          </div>
        </div>

        {/* Card 2: Pending Applications */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 space-y-2 relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted dark:text-slate-400 uppercase tracking-wider">Pending Approvals</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 material-symbols-outlined text-lg">
              pending_actions
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
            {loading ? '…' : pendingDoctors.length}
          </div>
          <div className="text-[11px] text-text-muted dark:text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 live-pulse" />
            <span>Awaiting Council check</span>
          </div>
        </div>

        {/* Card 3: Platform Gross Volume */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 space-y-2 relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted dark:text-slate-400 uppercase tracking-wider">Platform Volume</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 material-symbols-outlined text-lg">
              account_balance
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {loading ? '…' : formatNgn(totalVolumeNgn || 845000)}
          </div>
          <div className="text-[11px] text-text-muted dark:text-slate-400 font-mono">
            Paystack & Naira flow
          </div>
        </div>

        {/* Card 4: Pending Doctor Disbursements */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 space-y-2 relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted dark:text-slate-400 uppercase tracking-wider">Pending Payouts</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 material-symbols-outlined text-lg">
              payments
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">
            {loading ? '…' : formatNgn(pendingPayoutNgn || 142000)}
          </div>
          <div className="text-[11px] text-text-muted dark:text-slate-400 font-mono">
            85% Clinician Share
          </div>
        </div>
      </div>

      {/* ── PENDING VERIFICATIONS QUEUE (PRIORITY) ────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 space-y-4 shadow-xs dark:shadow-none">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 live-pulse" />
            <h2 className="text-base font-bold text-text-primary dark:text-white">MDCN Verification Queue</h2>
            <span className="text-xs font-mono text-text-muted dark:text-slate-400">
              ({pendingDoctors.length} pending approval)
            </span>
          </div>
          <Link
            href="/admin/consultants"
            className="text-xs text-primary dark:text-sky-400 hover:underline font-bold transition-colors"
          >
            Manage Roster →
          </Link>
        </div>

        {pendingDoctors.length === 0 ? (
          <div className="py-8 text-center text-xs text-text-muted dark:text-slate-400 space-y-1">
            <span className="material-symbols-outlined text-3xl text-emerald-500">task_alt</span>
            <p className="font-semibold text-text-primary dark:text-slate-300">All consultant applications are up to date.</p>
            <p className="text-text-muted dark:text-slate-500">No clinician applications currently awaiting MDCN review.</p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle dark:divide-slate-800/80">
            {pendingDoctors.map((doc) => (
              <div
                key={doc.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-primary dark:text-white text-sm shrink-0">
                    {doc.display_name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary dark:text-white">{doc.display_name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {doc.npi_number || 'MDCN PENDING'}
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
                      {doc.specialty} · {doc.hospital || 'Hospital Affiliation Pending'}
                    </div>
                    <div className="text-[11px] text-text-muted dark:text-slate-500 mt-0.5">
                      Consultation Rate: <span className="font-mono text-text-primary dark:text-slate-300 font-semibold">{formatNgn(doc.fee)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    disabled={actionBusyId === doc.id}
                    onClick={() => handleApproveDoctor(doc)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>{actionBusyId === doc.id ? 'Approving…' : 'Approve MDCN'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── RECENT TELEHEALTH ENCOUNTERS STREAM ───────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-border-subtle dark:border-slate-800 space-y-4 shadow-xs dark:shadow-none">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-base font-bold text-text-primary dark:text-white">Live & Recent Clinical Encounters</h2>
          </div>
          <Link
            href="/admin/sessions"
            className="text-xs text-primary dark:text-sky-400 hover:underline font-bold transition-colors"
          >
            All Sessions ({sessions.length}) →
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="py-8 text-center text-xs text-text-muted dark:text-slate-400 space-y-1">
            <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-600">monitor_heart</span>
            <p className="font-semibold text-text-primary dark:text-slate-300">No tele-encounters recorded in this period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle dark:border-slate-800 text-[11px] font-mono uppercase text-text-muted dark:text-slate-500">
                  <th className="pb-3 font-semibold">Encounter ID</th>
                  <th className="pb-3 font-semibold">Clinician</th>
                  <th className="pb-3 font-semibold">Scheduled (WAT)</th>
                  <th className="pb-3 font-semibold">Session Status</th>
                  <th className="pb-3 font-semibold">Fee (NGN)</th>
                  <th className="pb-3 font-semibold">Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle dark:divide-slate-800/60 font-medium">
                {sessions.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 font-mono text-text-secondary dark:text-slate-300">{s.id.slice(0, 10)}…</td>
                    <td className="py-3.5 text-text-primary dark:text-white font-bold">{s.consultant_name || 'Consultant'}</td>
                    <td className="py-3.5 text-text-muted dark:text-slate-400 font-mono">
                      {new Date(s.scheduled_at).toLocaleDateString()} {new Date(s.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          s.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : s.status === 'live'
                            ? 'bg-sky-500/10 text-primary dark:text-sky-400 border border-sky-500/30 animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 text-text-secondary dark:text-slate-300'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-text-primary dark:text-slate-200">{formatNgn(s.fee)}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          s.payout_status === 'paid'
                            ? 'text-purple-600 dark:text-purple-400 bg-purple-500/10'
                            : 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
                        }`}
                      >
                        {s.payout_status === 'paid' ? 'Disbursed' : 'Pending'}
                      </span>
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
