'use client';

import React from 'react';

export default function ClinicianEarningsPage() {
  const payouts = [
    { id: 'TX-94021', date: 'Oct 20, 2026', encounters: 24, gross: '$3,360.00', status: 'Paid', method: 'Chase Checking ••••4819' },
    { id: 'TX-93819', date: 'Oct 13, 2026', encounters: 28, gross: '$3,920.00', status: 'Paid', method: 'Chase Checking ••••4819' },
    { id: 'TX-93502', date: 'Oct 06, 2026', encounters: 32, gross: '$4,480.00', status: 'Paid', method: 'Chase Checking ••••4819' },
    { id: 'TX-93110', date: 'Sep 29, 2026', encounters: 26, gross: '$3,640.00', status: 'Paid', method: 'Chase Checking ••••4819' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Earnings & CPT Reimbursements</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Weekly direct deposit disbursements, CPT telemetry billings, and year-to-date statements.
          </p>
        </div>

        <button
          onClick={() => alert('1099-MISC tax packet downloaded.')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-bold text-sky-400 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Download 1099 Statement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Current Month Billings</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">$18,420.00</div>
          <div className="text-xs text-slate-400">110 completed virtual encounters</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Next Disbursement</div>
          <div className="text-3xl font-extrabold font-mono text-white">$2,100.00</div>
          <div className="text-xs text-sky-400 font-mono">Disbursing Friday via ACH</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Year-To-Date (2026)</div>
          <div className="text-3xl font-extrabold font-mono text-purple-400">$174,800.00</div>
          <div className="text-xs text-slate-400">1,248 total patient hours</div>
        </div>
      </div>

      {/* CPT Codes Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Reimbursement Volume by CPT Billing Code</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-mono font-bold text-sky-400">CPT 99214</div>
            <div className="text-slate-300 font-semibold">High Complexity Telehealth (20-29 min)</div>
            <div className="text-slate-500">$140.00 avg / visit • 90 visits</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-mono font-bold text-emerald-400">CPT 99453</div>
            <div className="text-slate-300 font-semibold">Wearable Sensor Onboarding & Privileging</div>
            <div className="text-slate-500">$65.00 avg / patient • 48 patients</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-mono font-bold text-purple-400">CPT 99454</div>
            <div className="text-slate-300 font-semibold">Monthly Continuous Sensor Transmission (30d)</div>
            <div className="text-slate-500">$55.00 avg / patient • 50 patients</div>
          </div>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Weekly Payout Ledger</h3>
          <span className="text-xs font-mono text-slate-400">ACH Direct Deposit</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Encounters</th>
              <th className="py-3 px-4">Disbursement Gross</th>
              <th className="py-3 px-4">Destination</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {payouts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-sky-400">{p.id}</td>
                <td className="py-3.5 px-4">{p.date}</td>
                <td className="py-3.5 px-4">{p.encounters} visits</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{p.gross}</td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{p.method}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold text-[10px]">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
