'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiPost, errorMessage } from '../../../lib/api';
import { formatNgn } from '../../../lib/money';
import type { Consultant } from '../../../lib/types';

export default function AdminConsultantsPage() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'suspended'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Consultant | null>(null);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadConsultants = async () => {
    setLoading(true);
    try {
      const data = await apiGet<Consultant[]>('/api/v1/consultancy/admin/consultants');
      setConsultants(Array.isArray(data) ? data : []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadConsultants();
  }, []);

  const handleApprove = async (id: string, name: string) => {
    setActionBusyId(id);
    setToastMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/consultants/${id}/approve`);
      setToastMessage(`Dr. ${name} has been approved.`);
      await loadConsultants();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Failed to approve consultant.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const handleSuspend = async (id: string, name: string) => {
    setActionBusyId(id);
    setToastMessage(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/consultants/${id}/suspend`);
      setToastMessage(`Dr. ${name} suspended from clinical tele-triage.`);
      await loadConsultants();
    } catch (err) {
      setToastMessage(errorMessage(err, 'Failed to suspend consultant.'));
    } finally {
      setActionBusyId(null);
    }
  };

  const filtered = consultants.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      c.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.hospital || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.npi_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── HEADER ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
            <Link href="/admin" className="hover:underline">Admin</Link>
            <span>/</span>
            <span>CLINICIAN CREDENTIALS ROSTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Doctor Network & MDCN Approvals
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review applicant qualifications, verify council licenses, and manage clinical privileging.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadConsultants}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Refresh Roster"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            <span>Refresh</span>
          </button>
        </div>
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

      {/* ── FILTER & SEARCH CONTROLS ───────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            {(['all', 'pending', 'approved', 'suspended'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  statusFilter === tab
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, MDCN folio, specialty..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* ── DOCTORS TABLE ──────────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400">Loading clinician records…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-slate-600">person_off</span>
            <p className="text-xs text-slate-400">No clinicians match the selected filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                  <th className="pb-3 font-semibold">Clinician</th>
                  <th className="pb-3 font-semibold">MDCN Folio</th>
                  <th className="pb-3 font-semibold">Specialty & Institution</th>
                  <th className="pb-3 font-semibold">Fee (30m)</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                          {doc.display_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{doc.display_name}</div>
                          <div className="text-[11px] text-slate-400">{doc.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-slate-300">
                      {doc.npi_number ? (
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px]">
                          {doc.npi_number}
                        </span>
                      ) : (
                        <span className="text-slate-600 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="text-white font-semibold">{doc.specialty}</div>
                      <div className="text-[11px] text-slate-400">{doc.hospital || 'Private Specialist'}</div>
                    </td>
                    <td className="py-4 font-mono text-emerald-400 font-bold">
                      {formatNgn(doc.fee)}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          doc.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : doc.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedDoctor(doc)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-colors"
                        >
                          Details
                        </button>
                        {doc.status !== 'approved' && (
                          <button
                            type="button"
                            disabled={actionBusyId === doc.id}
                            onClick={() => handleApprove(doc.id, doc.display_name)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors disabled:opacity-50"
                          >
                            {actionBusyId === doc.id ? '…' : 'Approve'}
                          </button>
                        )}
                        {doc.status !== 'suspended' && (
                          <button
                            type="button"
                            disabled={actionBusyId === doc.id}
                            onClick={() => handleSuspend(doc.id, doc.display_name)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-[11px] font-bold transition-colors disabled:opacity-50"
                          >
                            Suspend
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

      {/* ── DETAIL MODAL ───────────────────────────────────────────────────────── */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-800 p-6 space-y-5 animate-fadeIn text-xs">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">{selectedDoctor.display_name}</h3>
                <p className="text-slate-400">{selectedDoctor.title} · {selectedDoctor.specialty}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-slate-300">
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">MDCN Registration</span>
                <span className="font-mono text-sky-400 font-bold">{selectedDoctor.npi_number || 'Pending'}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">Hospital Affiliation</span>
                <span>{selectedDoctor.hospital || 'Not provided'}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">Credentials & Degrees</span>
                <span>{selectedDoctor.credentials?.join(', ') || 'MBBS'}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">Professional Bio</span>
                <p className="mt-1 leading-relaxed text-slate-400">{selectedDoctor.bio || 'No bio entered.'}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">Telemetry Privileges</span>
                <span className="text-emerald-400 font-semibold">Continuous Wrist Telemetry & Lead II ECG Enabled</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
