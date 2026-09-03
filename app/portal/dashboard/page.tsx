'use client';

import React from 'react';
import Link from 'next/link';
import EcgWaveform from '../../../components/EcgWaveform';
import { MOCK_PATIENT_QUEUE } from '../../../data/mockConsultancyData';

export default function ClinicianDashboardPage() {
  const nextPatient = MOCK_PATIENT_QUEUE[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── TOP DOCTOR GREETING & STATUS MAST ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>ST. JUDE HEART & VASCULAR INSTITUTE • TELECARDIOLOGY SUITE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Good afternoon, Dr. Julian Vance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            You have <span className="text-sky-400 font-bold">1 patient waiting</span> in your clinical video queue with active wrist telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/schedule"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Manage Schedule</span>
          </Link>
          <Link
            href="/portal/consultation/sess-01"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-lg shadow-sky-950 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base live-pulse">videocam</span>
            <span>Launch Virtual Room</span>
          </Link>
        </div>
      </div>

      {/* ── KPI METRICS ROW ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Today's Encounters</span>
            <span className="material-symbols-outlined text-sky-400">event_available</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">8 Scheduled</div>
          <div className="text-[11px] text-emerald-400">3 Completed • 1 Waiting</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Active Wrist Telemetry</span>
            <span className="material-symbols-outlined text-emerald-400">watch</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">24 Streams</div>
          <div className="text-[11px] text-slate-400">Continuous background sync</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Clinical Billings Today</span>
            <span className="material-symbols-outlined text-amber-400">payments</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">$1,120.00</div>
          <div className="text-[11px] text-sky-400 font-mono">CPT 99214 + 99453</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>EHR Synchronization</span>
            <span className="material-symbols-outlined text-purple-400">sync</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-400">100% Synced</div>
          <div className="text-[11px] text-slate-400">Epic HL7 FHIR Bridge Active</div>
        </div>
      </div>

      {/* ── NEXT PATIENT IN QUEUE HERO CARD ──────────────────────────────────────── */}
      <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
              PATIENT IN WAITING ROOM NOW
            </span>
            <span className="text-xs text-slate-400 font-mono">Scheduled for {nextPatient.scheduledTime}</span>
          </div>
          <div className="text-xs font-mono text-sky-400 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
            {nextPatient.mrn} • {nextPatient.cptCode}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Patient Details */}
          <div className="lg:col-span-4 flex items-start gap-4">
            <img
              src={nextPatient.avatarUrl}
              alt={nextPatient.patientName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500/40 shadow-md"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white leading-tight">
                {nextPatient.patientName}
              </h3>
              <div className="text-xs text-slate-400">
                {nextPatient.patientAge} yrs old • Female • Follow-Up
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                <span className="text-sky-400 font-semibold">Chief Complaint:</span> {nextPatient.chiefComplaint}
              </p>
            </div>
          </div>

          {/* Incoming Real-Time Telemetry HUD */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="material-symbols-outlined text-sm">sensors</span>
                Live Skyline VitalsWatch Telemetry
              </span>
              <span className="text-rose-400 font-bold">Mild Tachycardia</span>
            </div>

            {/* Waveform */}
            <EcgWaveform height={75} heartRate={nextPatient.heartRate} rhythmText={nextPatient.ecgRhythm} />

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400">Heart Rate</div>
                <div className="text-sm font-bold font-mono text-rose-400">{nextPatient.heartRate} BPM</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400">SpO2 Sat</div>
                <div className="text-sm font-bold font-mono text-sky-400">{nextPatient.spo2}%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400">Arterial BP</div>
                <div className="text-sm font-bold font-mono text-emerald-400">{nextPatient.bloodPressure}</div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <Link
              href="/portal/consultation/sess-01"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold text-center shadow-lg shadow-sky-950 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">video_camera_front</span>
              <span>Start Virtual Encounter</span>
            </Link>
            <Link
              href="/portal/patients/sess-01"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
              <span>Review Longitudinal Chart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── TODAY'S REMAINING QUEUE TABLE ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-xl">view_list</span>
            <h3 className="text-sm font-bold text-white">Upcoming Patient Consultations Today</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">3 encounters pending</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Chief Complaint</th>
                <th className="py-3 px-4">Wearable Telemetry</th>
                <th className="py-3 px-4">Billing Code</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {MOCK_PATIENT_QUEUE.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                    {p.scheduledTime}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.avatarUrl} alt={p.patientName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-white">{p.patientName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{p.mrn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                    {p.chiefComplaint}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-emerald-400 font-bold">{p.heartRate} BPM</span>
                      <span className="text-[10px] text-slate-500 font-mono">• {p.spo2}% SpO2</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-sky-400">
                    {p.cptCode}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      href={p.id === 'sess-01' ? '/portal/consultation/sess-01' : `/portal/patients/${p.id}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold border border-slate-700 transition-colors"
                    >
                      {p.id === 'sess-01' ? 'Enter Room' : 'View Chart'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
