'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiPost, errorMessage } from '../../../lib/api';
import { formatNgn } from '../../../lib/money';
import type { ConsultationSession } from '../../../lib/types';

export default function AdminPayoutsPage() {
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [batchBusy, setBatchBusy] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
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
    void loadData();
  }, []);

  const completed = sessions.filter((s) => s.status === 'completed');
  const pendingPayouts = completed.filter((s) => s.payout_status !== 'paid');
  const paidPayouts = completed.filter((s) => s.payout_status === 'paid');

  const totalCompletedGross = completed.reduce((acc, s) => acc + (Number(s.fee) || 0), 0);
  const platformFee = totalCompletedGross * 0.15; // 15% platform fee
  const clinicianNetTotal = totalCompletedGross * 0.85; // 85% to doctors
  const pendingDisbursementNgn = pendingPayouts.reduce((acc, s) => acc + (Number(s.fee) || 0) * 0.85, 0);
  const disbursedTotalNgn = paidPayouts.reduce((acc, s) => acc + (Number(s.fee) || 0) * 0.85, 0);

  const handleDisburseSingle = async (session: ConsultationSession) => {
    setActionBusyId(session.id);
    setToastMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/sessions/${session.id}/payout`);
      setToastMessage(`Disbursed payout for session #${session.id.slice(0, 8)}`);
      await loadData();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Disbursement failed.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleBatchDisburse = async () => {
    if (pendingPayouts.length === 0) return;
    setBatchBusy(true);
    setToastMessage(null);
    try {
      for (const s of pendingPayouts) {
        await apiPost(`/api/v1/consultancy/admin/sessions/${s.id}/payout`).catch(() => null);
      }
      setToastMessage(`Batch disbursement processed for ${pendingPayouts.length} encounters.`);
      await loadData();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Batch disbursement encountered an error.'));
    } finally {
      setBatchBusy(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── HEADER ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <Link href="/admin" className="hover:underline">Admin</Link>
            <span>/</span>
            <span>SETTLEMENTS & PAYOUT LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Doctor Disbursements & Financial Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automatic Nigerian bank settlement breakdown (85% clinician share / 15% platform fee).
          </p>
        </div>

        {pendingPayouts.length > 0 && (
          <button
            type="button"
            disabled={batchBusy}
            onClick={handleBatchDisburse}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-purple-950"
          >
            <span className="material-symbols-outlined text-base">payments</span>
            <span>{batchBusy ? 'Processing Batch…' : `Disburse All Pending (${formatNgn(pendingDisbursementNgn)})`}</span>
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs text-sky-300 flex items-center justify-between">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── FINANCIAL KPI WIDGETS ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Gross Encounters</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {formatNgn(totalCompletedGross)}
          </div>
          <div className="text-[11px] text-slate-400">{completed.length} completed sessions</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Platform Fee (15%)</div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">
            {formatNgn(platformFee)}
          </div>
          <div className="text-[11px] text-slate-400">Network infrastructure revenue</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Pending Payouts (85%)</div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">
            {formatNgn(pendingDisbursementNgn)}
          </div>
          <div className="text-[11px] text-amber-400/80 font-mono">
            {pendingPayouts.length} doctors awaiting payout
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Disbursed to Doctors</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {formatNgn(disbursedTotalNgn)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Settled via NUBAN Transfer</div>
        </div>
      </div>

      {/* ── PENDING DISBURSEMENTS TABLE ────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 live-pulse" />
            <h2 className="text-base font-bold text-white">Pending Doctor Disbursements</h2>
            <span className="text-xs font-mono text-slate-400">
              ({pendingPayouts.length} queue entries)
            </span>
          </div>
        </div>

        {pendingPayouts.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 space-y-1">
            <span className="material-symbols-outlined text-3xl text-emerald-500">done_all</span>
            <p className="font-semibold text-slate-300">All completed encounters have been disbursed.</p>
            <p className="text-slate-500">No pending balances in the clinician settlement queue.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                  <th className="pb-3 font-semibold">Encounter</th>
                  <th className="pb-3 font-semibold">Doctor</th>
                  <th className="pb-3 font-semibold">Date Completed</th>
                  <th className="pb-3 font-semibold">Patient Fee</th>
                  <th className="pb-3 font-semibold">Platform Cut (15%)</th>
                  <th className="pb-3 font-semibold">Net Payout (85%)</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {pendingPayouts.map((s) => {
                  const fee = Number(s.fee) || 0;
                  const cut = fee * 0.15;
                  const net = fee * 0.85;

                  return (
                    <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 font-mono text-slate-300">#{s.id.slice(0, 8)}</td>
                      <td className="py-4 text-white font-bold">{s.consultant_name || 'Consultant'}</td>
                      <td className="py-4 font-mono text-slate-400">
                        {new Date(s.scheduled_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 font-mono text-slate-300">{formatNgn(fee)}</td>
                      <td className="py-4 font-mono text-slate-500">{formatNgn(cut)}</td>
                      <td className="py-4 font-mono text-emerald-400 font-bold">{formatNgn(net)}</td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          disabled={actionBusyId === s.id}
                          onClick={() => handleDisburseSingle(s)}
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-[11px] font-bold disabled:opacity-50 transition-colors"
                        >
                          {actionBusyId === s.id ? 'Settling…' : 'Mark Disbursed'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
