'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiGet, errorMessage } from '../../../../lib/api';
import type { CareSummary, ConsultationSession } from '../../../../lib/types';

export default function PatientLongitudinalRecordPage() {
  const params = useParams();
  const patientId = (params?.id as string) || '';
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [summaries, setSummaries] = useState<Record<string, CareSummary | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!patientId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await apiGet<ConsultationSession[]>('/api/v1/consultancy/sessions');
        const mine = (all || []).filter((s) => s.patient_id === patientId);
        if (cancelled) return;
        setSessions(mine);
        const map: Record<string, CareSummary | null> = {};
        await Promise.all(
          mine.map(async (s) => {
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
        if (!cancelled) setError(errorMessage(err, 'Failed to load patient record.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const active = useMemo(
    () =>
      sessions.find((s) =>
        ['waiting', 'live', 'in_progress', 'upcoming'].includes(s.status)
      ) || sessions[0],
    [sessions]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Patient record</h1>
          <div className="text-xs text-slate-400 mt-1 font-mono">ID: {patientId || '—'}</div>
          <p className="text-xs text-slate-500 mt-2">
            Encounters and care summaries for this patient from consultancy sessions.
          </p>
        </div>
        {active && (
          <Link
            href={`/portal/consultation/${active.id}`}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">forum</span>
            <span>Open chat session</span>
          </Link>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-500">Loading…</p>}

      {!loading && sessions.length === 0 && (
        <div className="p-10 rounded-2xl border border-slate-800 bg-slate-900 text-center text-sm text-slate-500">
          No consultancy sessions found for this patient.
        </div>
      )}

      <div className="space-y-4">
        {sessions.map((s) => {
          const summary = summaries[s.id];
          return (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-white">
                    {s.specialty || 'Consultation'} · {s.status}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {new Date(s.scheduled_at).toLocaleString()} · {s.duration_minutes} min
                  </div>
                </div>
                <Link
                  href={`/portal/consultation/${s.id}`}
                  className="text-xs text-sky-400 hover:underline"
                >
                  Open chat →
                </Link>
              </div>
              {s.chief_complaint && (
                <p className="text-xs text-slate-300">Complaint: {s.chief_complaint}</p>
              )}
              {summary?.diagnosis || summary?.soap_notes ? (
                <div className="text-xs text-slate-400 space-y-1 border-t border-slate-800 pt-2">
                  {summary.diagnosis && <p>Diagnosis: {summary.diagnosis}</p>}
                  {summary.soap_notes && <p>Notes: {summary.soap_notes}</p>}
                  {summary.prescriptions && <p>Rx: {summary.prescriptions}</p>}
                </div>
              ) : (
                <p className="text-xs text-slate-600">No care summary yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
