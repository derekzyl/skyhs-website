'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EcgWaveform from '../components/EcgWaveform';
import { MOCK_CONSULTANTS } from '../data/mockConsultancyData';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'Cardiology' | 'Endocrinology' | 'General Health' | 'Neurology'>('all');

  const filteredConsultants = activeTab === 'all'
    ? MOCK_CONSULTANTS
    : MOCK_CONSULTANTS.filter((c) => c.specialty === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary">
      <Navbar />

      {/* ── 1. HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-surface to-surface-canvas">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-status-normal live-pulse" />
                <span>FDA-CLEARED BIOMETRIC TELEMETRY & 24/7 SPECIALIST NETWORK</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.12]">
                Continuous Wrist Telemetry Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-container">
                  Instant Specialist Care.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
                Skyline Health synchronizes continuous medical-grade wearable sensors with top hospital specialists. When your watch detects abnormal arrhythmia or hypoxia, your cardiologist sees it in real-time during your virtual encounter.
              </p>

              {/* Live Mini ECG Strip */}
              <div className="pt-2 max-w-xl">
                <EcgWaveform height={75} heartRate={76} rhythmText="Live VitalsWatch Sensor Stream • Lead II" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/consultancy"
                  className="px-6 py-3.5 rounded-xl bg-primary-container hover:bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                    video_camera_front
                  </span>
                  Consult a Specialist Now
                </Link>
                <Link
                  href="/#smartwatch"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-surface-subtle text-text-primary font-bold text-sm border border-border-subtle shadow-sm transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg text-secondary">
                    watch
                  </span>
                  Explore VitalsWatch Pro
                </Link>
              </div>

              {/* Clinical Trust Badges */}
              <div className="pt-6 border-t border-border-subtle flex flex-wrap items-center gap-6 text-xs text-text-muted font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-500 text-base">verified</span>
                  Board-Certified MDs Only
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sky-500 text-base">lock</span>
                  HIPAA & HITRUST Certified
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-purple-500 text-base">sync</span>
                  Epic & Cerner HL7 FHIR
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border border-border-subtle bg-slate-900 text-white">
                {/* Watch & Telehealth Video Encounter Simulation */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
                    alt="Dr. Julian Vance conducting virtual visit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/60" />
                  
                  {/* Encounter Status Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-[11px] font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
                      <span className="text-emerald-400 font-bold">LIVE TELEHEALTH ENCOUNTER</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-slate-300">
                      AES-256 WebRTC
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Dr. Julian Vance, MD</div>
                      <div className="text-[11px] text-sky-300">St. Jude Heart Institute</div>
                    </div>
                    <div className="w-14 h-18 rounded-lg overflow-hidden border-2 border-white/60 shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"
                        alt="Patient"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Telemetry HUD at Bottom of Card */}
                <div className="p-4 bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="material-symbols-outlined text-sm">watch</span>
                      Skyline VitalsWatch Pro Live Link
                    </span>
                    <span className="text-slate-500">Latency: 18ms</span>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Pulse</div>
                      <div className="text-base font-bold font-mono text-rose-400">104 <span className="text-[9px]">BPM</span></div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] uppercase font-mono text-slate-400">SpO2</div>
                      <div className="text-base font-bold font-mono text-sky-400">98%</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] uppercase font-mono text-slate-400">BP</div>
                      <div className="text-base font-bold font-mono text-emerald-400">124/82</div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Continuous Sinus rhythm streaming to doctor</span>
                    <Link
                      href="/consultancy"
                      className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                    >
                      Book Visit <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DEDICATED TELEHEALTH & SPECIALIST NETWORK SECTION ───────────────────── */}
      <section id="specialists" className="py-20 bg-white border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase">
              24/7 Virtual Clinical Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Connect With Leading Sub-Specialists Who See Your Vitals in Real-Time
            </h2>
            <p className="text-text-secondary text-base">
              No more guessing or describing your symptoms. Our physicians analyze continuous Lead II ECG rhythm strips and arterial blood oxygen saturation while talking to you.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {(['all', 'Cardiology', 'Endocrinology', 'General Health', 'Neurology'] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      activeTab === tab
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-surface-subtle text-text-secondary hover:bg-slate-200'
                    }`}
                  >
                    {tab === 'all' ? 'All Specialties' : tab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsultants.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl border border-border-subtle bg-white hover:border-primary/40 hover:shadow-xl transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-16 h-16 rounded-xl object-cover border border-border-subtle"
                      />
                      {doc.isAvailableNow && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-status-normal border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-extrabold text-text-primary truncate">
                          {doc.name}
                        </h3>
                        <span className="material-symbols-outlined text-primary text-base">
                          verified
                        </span>
                      </div>
                      <div className="text-xs font-bold text-secondary truncate">{doc.title}</div>
                      <div className="text-[11px] text-text-muted truncate">{doc.hospital}</div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4">
                    {doc.bio}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-text-muted mb-4 pb-4 border-b border-border-subtle">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <span className="material-symbols-outlined text-sm">star</span>
                      {doc.rating}
                      <span className="text-text-muted font-normal">({doc.reviewCount})</span>
                    </div>
                    <span>•</span>
                    <div>{doc.experienceYears} yrs exp</div>
                    <span>•</span>
                    <div className="text-status-normal font-semibold">
                      {doc.isAvailableNow ? 'Available Today' : doc.nextSlot}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-text-muted">Consultation Fee</span>
                    <div className="text-lg font-extrabold text-text-primary font-mono">
                      ${doc.fee}
                      <span className="text-xs font-normal text-text-muted"> / visit</span>
                    </div>
                  </div>
                  <Link
                    href={`/consultancy?doctor=${doc.id}`}
                    className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
                  >
                    <span>Book Encounter</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/consultancy"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-container"
            >
              <span>Explore Complete Specialist Directory (120+ Physicians)</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. SMARTWATCH HARDWARE & SENSOR SUITE ──────────────────────────────────── */}
      <section id="smartwatch" className="py-20 bg-surface-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Watch Spec Presentation */}
            <div className="space-y-6">
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-mono font-bold tracking-wider uppercase">
                Hardware & Sensor Diagnostic Hub
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
                Skyline VitalsWatch Pro: Medical Sensor Precision on Your Wrist
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                Engineered with clinical-grade accuracy to capture biometric anomalies before they escalate. Designed for continuous 24/7 telemetry with 7-day battery life and seamless cellular/Bluetooth sync.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <span className="material-symbols-outlined text-2xl">ecg_heart</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Lead II Single-Lead ECG</h4>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      Titanium bezel electrodes record 30-second rhythm strips capable of classifying sinus tachycardia, bradycardia, and AFib.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-600">
                    <span className="material-symbols-outlined text-2xl">blood_pressure</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Continuous Blood Oxygen (SpO2)</h4>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      Quad-wavelength reflective optical sensors monitor nocturnal oxygen dips and respiratory fluctuations in real-time.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600">
                    <span className="material-symbols-outlined text-2xl">device_hub</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Direct Doctor Bridge</h4>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      Instantly grant your doctor access to live sensor streams during your video consultation with end-to-end cryptographic encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smartwatch Image & Telemetry Visualization */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 live-pulse" />
                    <span className="text-xs font-mono font-bold text-emerald-400">VITALS-WATCH SENSOR ACTIVE</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Firmware v2.4.1</span>
                </div>

                <div className="py-6 flex justify-center">
                  <div className="relative w-48 h-48 rounded-full border-4 border-emerald-500/30 flex items-center justify-center p-4 bg-slate-900 shadow-inner">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-3xl text-rose-500 live-pulse">favorite</span>
                      <div className="text-3xl font-extrabold font-mono text-white mt-1">78</div>
                      <div className="text-[10px] font-mono text-slate-400">BPM • RESTING SINUS</div>
                    </div>
                  </div>
                </div>

                <EcgWaveform height={80} heartRate={78} rhythmText="Real-time Lead II trace" />

                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400">Battery Status</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">89% • 5 Days Left</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400">Cellular / BLE Link</div>
                    <div className="text-sm font-bold font-mono text-sky-400">5G High-Priority</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CLINICIAN ONBOARDING BANNER ────────────────────────────────────────── */}
      <section className="py-16 bg-primary-container text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold">
                PHYSICIAN CREDENTIALING OPEN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Are You a Licensed Specialist? Join the Skyline Clinical Network.
              </h2>
              <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                Provide remote telehealth consultations with direct biometric sensor telemetry feeds. High CPT code reimbursement (99214 + 99453), malpractice coverage, and flexible on-call scheduling.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/apply"
                className="px-6 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg"
              >
                Apply as Specialist (4 Steps)
              </Link>
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 font-bold text-sm transition-colors"
              >
                Clinician Portal Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
