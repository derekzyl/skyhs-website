'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import EcgWaveform from '../../../components/EcgWaveform';

export default function PatientRecordsPage() {
  const [activeTab, setActiveTab] = useState<'vitals' | 'consultations' | 'prescriptions'>('vitals');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const pastEncounters = [
    {
      id: 'enc-101',
      date: 'Oct 24, 2025 • 02:45 PM',
      doctor: 'Dr. Chidi Okafor, MD, FACC',
      specialty: 'Cardiology Lead',
      hospital: 'Cleveland Clinic Heart & Vascular Institute',
      avatar: '/images/avatars/dr_chidi_okafor.jpg',
      reason: 'Asymptomatic Exertional Arrhythmia Trigger (160 BPM)',
      diagnosis: 'Episodic Sinus Tachycardia (ICD-10: R00.0) • Benign Dehydration',
      prescription: 'Metoprolol Succinate 25mg ER Tablet',
      ecgStatus: 'Normal Sinus Rhythm Resolved',
    },
    {
      id: 'enc-102',
      date: 'Sep 12, 2025 • 10:15 AM',
      doctor: 'Dr. Aminat Adeyemi, MD, FWACP',
      specialty: 'Endocrinology',
      hospital: 'Johns Hopkins Medicine',
      avatar: '/images/avatars/dr_aminat_adeyemi.jpg',
      reason: 'Nocturnal SpO2 Desaturation Alert (89% at 03:14 AM)',
      diagnosis: 'Mild Positional Obstructive Hypopnea (ICD-10: G47.33)',
      prescription: 'Nasal Fluticasone Propionate 50mcg Spray',
      ecgStatus: 'Stable Baseline SpO2 98%',
    },
  ];

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Patient Header & Connected Device Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/images/avatars/patient_kelechi.jpg"
                  alt="Kelechi Adeleke"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Kelechi Adeleke</h1>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] font-bold">
                    CARE+ ACTIVE
                  </span>
                </div>
                <div className="text-xs text-sky-200 mt-0.5">
                  MRN #SK-88329 • 42 M • Primary Physician: Dr. Chidi Okafor, MD
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-0.5">
                <div className="text-[10px] text-sky-200 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
                  Synced Watch
                </div>
                <div className="font-bold text-white">VitalsWatch™ Ultra #SK-8832</div>
                <div className="text-[10px] text-slate-300 font-mono">Battery: 84% • Sub-12ms Mesh</div>
              </div>

              <Link
                href="/consultancy"
                className="px-4 py-3 rounded-xl bg-white text-primary text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">video_call</span>
                <span>Start Telehealth Visit</span>
              </Link>
            </div>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">download_done</span>
              <span>Encrypted Clinical Diagnostic PDF generated with official physician digital signature.</span>
            </div>
            <span className="text-[10px] font-mono">SHA-256 Verified</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border-subtle pb-2 overflow-x-auto">
          {[
            { key: 'vitals', label: 'Continuous Telemetry & Sensor Trends', icon: 'ecg_heart' },
            { key: 'consultations', label: 'Past Clinical Encounters & SOAP Notes', icon: 'history_edu' },
            { key: 'prescriptions', label: 'Active e-Prescriptions & Refills', icon: 'medication' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-secondary hover:bg-surface-subtle border border-border-subtle'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── TAB 1: CONTINUOUS VITALS & SENSOR TRENDS ────────────────────────────── */}
        {activeTab === 'vitals' && (
          <div className="space-y-6">
            {/* Live Waveform Strip */}
            <div className="bg-white rounded-2xl border border-border-subtle p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-subtle">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-status-normal live-pulse" />
                    <span>Live Lead II Ambulatory Cardiac Trace</span>
                  </h3>
                  <p className="text-xs text-text-muted">
                    Streaming continuous dry-contact wrist electrode feed via standalone LTE-M radio.
                  </p>
                </div>
                <button
                  onClick={handleDownloadPDF}
                  className="px-3 py-1.5 rounded-lg border border-border-subtle text-xs font-bold text-primary hover:bg-surface-subtle flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                  <span>Export 24h Holter PDF</span>
                </button>
              </div>

              <EcgWaveform height={85} heartRate={72} rhythmText="Lead II • 500Hz Medical Resolution • Sinus Rhythm" />
            </div>

            {/* 4 Longitudinal Vitals Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                <div className="text-xs text-text-muted font-bold flex items-center justify-between">
                  <span>RESTING HEART RATE</span>
                  <span className="material-symbols-outlined text-rose-500">favorite</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-text-primary">
                  64 <span className="text-xs font-normal text-text-muted">BPM avg</span>
                </div>
                <div className="text-[11px] text-status-normal font-semibold flex items-center gap-1">
                  <span>↓ 3 bpm vs last week</span>
                  <span className="text-text-muted font-normal">(Optimal Zone)</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                <div className="text-xs text-text-muted font-bold flex items-center justify-between">
                  <span>BLOOD OXYGEN (SpO2)</span>
                  <span className="material-symbols-outlined text-emerald-500">water_drop</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-emerald-600">
                  98.6%
                </div>
                <div className="text-[11px] text-text-muted">
                  0 nocturnal desaturation events in last 48h
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                <div className="text-xs text-text-muted font-bold flex items-center justify-between">
                  <span>ARTERIAL BLOOD PRESSURE</span>
                  <span className="material-symbols-outlined text-amber-500">blood_pressure</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-text-primary">
                  118/76 <span className="text-xs font-normal text-text-muted">mmHg</span>
                </div>
                <div className="text-[11px] text-status-normal font-semibold">
                  Normotensive • Consistent PTT trend
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                <div className="text-xs text-text-muted font-bold flex items-center justify-between">
                  <span>AUTONOMIC HRV (SDNN)</span>
                  <span className="material-symbols-outlined text-purple-500">monitoring</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-purple-600">
                  58 <span className="text-xs font-normal text-text-muted">ms</span>
                </div>
                <div className="text-[11px] text-text-muted">
                  High parasympathetic vagal recovery
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: PAST ENCOUNTERS & SOAP NOTES ─────────────────────────────────── */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            {pastEncounters.map((enc) => (
              <div
                key={enc.id}
                className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <img
                      src={enc.avatar}
                      alt={enc.doctor}
                      className="w-12 h-12 rounded-xl object-cover border border-border-subtle"
                    />
                    <div>
                      <div className="text-sm font-bold text-text-primary">{enc.doctor}</div>
                      <div className="text-xs text-secondary font-semibold">{enc.specialty}</div>
                      <div className="text-[11px] text-text-muted">{enc.hospital}</div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono font-bold text-text-muted block">{enc.date}</span>
                    <span className="text-[10px] font-mono font-bold bg-blue-50 text-primary px-2 py-0.5 rounded border border-blue-200">
                      ENCOUNTER #{enc.id.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-surface-subtle space-y-1">
                    <span className="text-text-muted font-bold block uppercase text-[10px]">Chief Complaint & Trigger:</span>
                    <div className="text-text-primary font-semibold">{enc.reason}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-subtle space-y-1">
                    <span className="text-text-muted font-bold block uppercase text-[10px]">Verified Clinical Diagnosis:</span>
                    <div className="text-primary font-semibold">{enc.diagnosis}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="material-symbols-outlined text-status-normal text-sm">verified</span>
                    <span>Pushed to Epic MyChart EHR</span>
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download Signed Encounter Record (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 3: ACTIVE E-PRESCRIPTIONS ───────────────────────────────────────── */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div>
                <h3 className="text-base font-bold text-text-primary">Electronic Prescriptions</h3>
                <p className="text-xs text-text-muted">
                  Digitally signed via Surescripts and dispatched to your preferred pharmacy.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                1 Active Medication
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-border-subtle bg-surface-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-text-primary">
                    Metoprolol Succinate 25mg ER Tablet
                  </h4>
                  <div className="text-xs text-text-secondary mt-0.5">
                    Sig: Take 1 tablet by mouth daily in the morning with food.
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-status-normal bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded w-fit">
                  Refills Remaining: 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-border-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Prescribing Provider:</span>
                  <span className="font-bold text-text-primary">Dr. Chidi Okafor, MD (NPI #1892049102)</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">FULFILLMENT PHARMACY</span>
                  <span className="font-bold text-text-primary">Walgreens #4021 (Austin, TX)</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">RX IDENTIFIER</span>
                  <span className="font-mono font-bold text-primary">#RX-99214-77</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-500">qr_code_2</span>
                  Ready for pickup at pharmacy counter
                </span>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-border-subtle hover:bg-slate-100 text-text-primary text-xs font-bold transition-colors"
                >
                  Download Pharmacy Receipt & QR Code
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
