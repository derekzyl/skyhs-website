'use client';

import React, { useEffect, useState } from 'react';
import { apiGet, errorMessage } from '../../../lib/api';
import { formatNgn } from '../../../lib/money';
import type { EarningsSummary } from '../../../lib/types';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

export default function ClinicianEarningsPage() {
  const [earnings, setEarnings] = useState<EarningsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet<EarningsSummary>('/api/v1/consultancy/earnings/me');
        if (!cancelled) setEarnings(data);
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load earnings.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sessions = earnings?.sessions ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Earnings & CPT Reimbursements</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Paid encounter fees, pending payouts, and session ledger.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Total Earned</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {loading ? '…' : formatNgn(earnings?.total_earned ?? 0)}
          </div>
          <div className="text-xs text-slate-400">
            {sessions.length} paid / confirmed sessions
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Pending Payout</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {loading ? '…' : formatNgn(earnings?.pending_payout ?? 0)}
          </div>
          <div className="text-xs text-sky-400 font-mono">Awaiting admin disbursement</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Paid Out</div>
          <div className="text-3xl font-extrabold font-mono text-purple-400">
            {loading ? '…' : formatNgn(earnings?.paid_out ?? 0)}
          </div>
          <div className="text-xs text-slate-400">Already disbursed</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Session Payout Ledger</h3>
          <span className="text-xs font-mono text-slate-400">Paid encounters</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Session ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Fee</th>
              <th className="py-3 px-4 text-right">Payout Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-slate-500">
                  Loading earnings…
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-slate-500">
                  No paid sessions yet.
                </td>
              </tr>
            ) : (
              sessions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                    {p.id.slice(0, 12)}…
                  </td>
                  <td className="py-3.5 px-4">{formatDate(p.scheduled_at)}</td>
                  <td className="py-3.5 px-4 font-mono">{p.payment_status}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {formatNgn(p.fee)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold text-[10px] uppercase">
                      {p.payout_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
