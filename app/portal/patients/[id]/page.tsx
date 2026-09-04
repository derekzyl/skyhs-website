'use client';

import React from 'react';
import Link from 'next/link';
import EcgWaveform from '../../../../components/EcgWaveform';

export default function PatientLongitudinalRecordPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── TOP PATIENT BANNER ───────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src="/images/avatars/patient_zainab.jpg"
            alt="Zainab Balogun"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Zainab Balogun</h1>
              <span className="px-2.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-400 font-mono text-xs font-bold">
                MRN #SK-94021
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3 font-mono">
              <span>DOB: 04/12/1962 (64y)</span>
              <span>•</span>
              <span>Female</span>
              <span>•</span>
              <span>Primary Insurance: Medicare Advantage / Aetna</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Skyline VitalsWatch Pro Linked</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/consultation/sess-01"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">video_call</span>
            <span>Join Active Encounter</span>
          </Link>
        </div>
      </div>

      {/* ── CURRENT SENSOR HUD ───────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">sensors</span>
            Live Telemetry Continuous Stream (Lead II)
          </h3>
          <span className="text-xs font-mono text-slate-400">Streamed via VitalsWatch Cellular eSIM</span>
        </div>
        <EcgWaveform height={85} heartRate={104} rhythmText="Zainab Balogun • Continuous Rhythm" />
      </div>

      {/* ── 30-DAY RESTING HR & BIOMETRIC TRENDS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">30-Day Resting Heart Rate Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ambulatory baseline monitored continuously during sleep and resting states.
              </p>
            </div>
            <div className="text-right font-mono">
              <div className="text-sm font-bold text-emerald-400">74 BPM Avg</div>
              <div className="text-[10px] text-slate-500">Range: 68 - 82 BPM</div>
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="h-44 w-full bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradTrend" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,70 Q 50,60 100,65 T 200,55 T 300,75 T 400,50 T 500,60 L 500,120 L 0,120 Z"
                fill="url(#gradTrend)"
              />
              <path
                d="M 0,70 Q 50,60 100,65 T 200,55 T 300,75 T 400,50 T 500,60"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Anomaly Event Log */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Recent Watch Biometric Anomaly Flags
            </h4>
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden text-xs">
              <div className="p-3.5 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div>
                    <span className="font-bold text-white">Exertional Tachycardia Spike</span>
                    <div className="text-[11px] text-slate-400">Peak 134 BPM while climbing stairs (4 min duration)</div>
                  </div>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">Oct 23, 14:15</span>
              </div>

              <div className="p-3.5 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div>
                    <span className="font-bold text-white">Nocturnal Pulse Oximetry Dip</span>
                    <div className="text-[11px] text-slate-400">SpO2 dropped to 91% (2 min duration during REM sleep)</div>
                  </div>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">Oct 18, 03:22</span>
              </div>

              <div className="p-3.5 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <span className="font-bold text-white">Routine Single-Lead ECG Check</span>
                    <div className="text-[11px] text-slate-400">Normal Sinus Rhythm • No ST-T deviations</div>
                  </div>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">Oct 11, 09:10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prior Consultation Notes & Rx History */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Prior Telehealth Encounters
            </h4>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Cardiology Routine Consult</span>
                <span className="text-[10px] font-mono text-slate-400">Sept 28, 2026</span>
              </div>
              <div className="text-[11px] text-slate-400">Provider: Dr. Chidi Okafor, MD</div>
              <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                Prescribed baseline ambulatory ECG monitoring. Advised patient to hydrate and record symptom logs upon exertion.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold">Pushed to Epic MyChart</span>
                <span className="text-sky-400 cursor-pointer hover:underline">View PDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
