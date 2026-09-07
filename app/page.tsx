'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatNgn } from '../lib/money';
import { HARDWARE_PRICES } from '../lib/pricing';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'ultra' | 'band' | 'suite'>('ultra');
  const [micMuted, setMicMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: number;
    savings: number;
    band: string;
  }>({
    name: 'Skyline VitalsWatch™ Ultra',
    price: HARDWARE_PRICES.ultra,
    savings: HARDWARE_PRICES.ultraWas - HARDWARE_PRICES.ultra,
    band: 'Titanium Link (Space Gray)',
  });

  const openOrder = (name: string, price: number, savings: number) => {
    setSelectedProduct({
      name,
      price,
      savings,
      band: 'Titanium Link (Space Gray)',
    });
    setOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans antialiased selection:bg-primary-container selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ── 1. HERO SECTION: HARDWARE FIRST + LIVE BIOMETRIC SENSOR BADGES ──────── */}
      <section className="relative bg-gradient-to-b from-white via-surface-canvas to-surface-subtle pt-6 sm:pt-10 pb-16 sm:pb-24 border-b border-border-subtle overflow-hidden">
        {/* Subtle Ambient Dots */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#00355f 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Badge Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-container text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-primary">NEW GENERATION</span>
              <span className="text-blue-300">|</span>
              <span className="truncate max-w-[240px] sm:max-w-none">
                Skyline VitalsWatch™ Ultra & Continuous Biometric Sensor Pod
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-status-normal font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs">verified</span> Medical-Grade Lead II ECG
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content Column (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary leading-[1.14] tracking-tight">
                Clinical-Grade Biometric Smartwatch.{' '}
                <br className="hidden sm:inline" />
                <span className="text-secondary underline decoration-blue-200 underline-offset-8">
                  24/7 Physician-Backed
                </span>{' '}
                Telehealth.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-xl leading-relaxed font-normal">
                Continuous medical-grade ECG, SpO2, blood pressure trends, and core biometric telemetry directly on your wrist — paired with instant 1-tap encrypted video consults with board-certified physicians the second anomalies are detected.
              </p>

              {/* CTA and Pricing Cluster */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/checkout"
                    className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-container text-white text-sm sm:text-base font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all duration-150 text-center"
                  >
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                    <span>Order Watch — {formatNgn(HARDWARE_PRICES.ultra)}</span>
                    <span className="text-xs bg-blue-900/60 px-2 py-0.5 rounded text-blue-200">
                      Save {formatNgn(HARDWARE_PRICES.ultraWas - HARDWARE_PRICES.ultra)}
                    </span>
                  </Link>
                  <Link
                    href="/consultancy"
                    className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 text-center"
                  >
                    <span className="material-symbols-outlined text-xl">video_call</span>
                    <span>Consult Specialist — From ₦15,000</span>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-muted pt-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-status-normal text-sm">check_circle</span>
                    30-Day Risk-Free Trial
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-status-normal text-sm">check_circle</span>
                    Includes 1-Yr Skyline Care+ Telehealth
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-status-normal text-sm">check_circle</span>
                    Paystack · Nationwide NG
                  </span>
                </div>
              </div>

              {/* Live Telemetry Pulse Strip Preview */}
              <div className="pt-3">
                <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-status-critical flex items-center justify-center font-bold shrink-0">
                      <span className="material-symbols-outlined text-2xl animate-pulse">favorite</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-text-muted font-semibold">
                        Active Sensor Stream
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2">
                        <span>72 BPM • Sinus Rhythm</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold">
                          SpO2 99%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Waveform Trace & Latency */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle">
                    <div className="w-24 sm:w-28 h-7 text-status-critical">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 160 40">
                        <path
                          className="ecg-path"
                          d="M0,20 L30,20 L35,8 L40,32 L45,12 L50,24 L55,20 L75,20 L80,10 L85,30 L90,14 L95,20 L160,20"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-50 text-primary px-2 py-0.5 rounded border border-blue-200 shrink-0">
                      12ms Latency
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Product Image Showcase with Live Sensor Badges (6 Cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-gradient-to-br from-slate-100 via-white to-blue-50/40 rounded-3xl p-3 sm:p-6 border border-slate-200 shadow-xl overflow-hidden">
                {/* Image of Watch & Sensor Pod */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80"
                    alt="Sleek modern titanium health smartwatch with OLED display showing real-time ECG rhythm wave, pulse 72 bpm, SpO2 99%"
                    className="w-full h-full object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* Ambient overlay pill */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Continuous Lead II ECG Active</span>
                  </div>
                </div>

                {/* Live Biometric Chip Callout Overlay Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 sm:mt-4">
                  <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-border-subtle shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted uppercase font-bold">
                      Optical Array
                    </div>
                    <div className="text-xs font-bold text-text-primary mt-0.5 truncate">
                      8-Channel PPG
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-status-normal font-semibold">
                      Medical Grade
                    </div>
                  </div>

                  <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-border-subtle shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted uppercase font-bold">
                      Sync Latency
                    </div>
                    <div className="text-xs font-bold text-text-primary mt-0.5 truncate">
                      Sub-12ms
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-secondary font-semibold">
                      Ultra WebRTC
                    </div>
                  </div>

                  <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-border-subtle shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted uppercase font-bold">
                      Regulatory
                    </div>
                    <div className="text-xs font-bold text-text-primary mt-0.5 truncate">
                      Medical-Grade
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-status-normal font-semibold">
                      510(k) Cleared
                    </div>
                  </div>

                  <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-border-subtle shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted uppercase font-bold">
                      Battery Life
                    </div>
                    <div className="text-xs font-bold text-text-primary mt-0.5 truncate">
                      7-Day Run
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-text-muted font-semibold">
                      Fast Inductive
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Trust Badge Bar */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-border-subtle/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-border-subtle shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">verified_user</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary">Clinical Wearable</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted">Cardiac & Oximetry Safety</div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl border border-border-subtle shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-status-normal text-xl sm:text-2xl">monitor_heart</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary">99.4% ECG Accuracy</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted">Multi-Center Trial Validated</div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl border border-border-subtle shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl">timelapse</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary">500,000+ Days</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted">Active Biometric Telemetry</div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl border border-border-subtle shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-xl sm:text-2xl">lock</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary">HIPAA / AES-256</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted">Encrypted Health Vault</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRECISION HARDWARE & SENSOR ENGINEERING DEEP-DIVE ──────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-border-subtle" id="biometric-breakdown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-primary text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">memory</span>
              <span>Micro-Electrochemical Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              Precision Hardware Engineered for Continuous Physiology
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3">
              Consumer wearables guess. Skyline Health measures with medical-grade multi-spectral optical diodes, dry-contact electrodes, and sub-second DSP microcontrollers.
            </p>
          </div>

          {/* Hardware Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Module 1 */}
            <div className="bg-surface-subtle p-6 rounded-2xl border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-5 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">diamond</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  Grade 5 Aerospace Titanium & Sapphire
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  CNC-milled from titanium alloy with sapphire crystal lens capable of withstanding 50m water pressure (5ATM). Hypoallergenic surgical contact chassis eliminates dermal irritation during 24/7 wear.
                </p>
              </div>
              <ul className="text-xs font-semibold space-y-2 text-text-muted border-t border-border-subtle pt-3">
                <li className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-xs">check</span> 5ATM Water Resistance (Shower & Swim)
                </li>
                <li className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-xs">check</span> 42g Featherweight Ergonomics
                </li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-surface-subtle p-6 rounded-2xl border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-status-critical flex items-center justify-center mb-5 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">ecg</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  Dual Dry-Contact Lead I/II ECG Electrodes
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  Built-in bezel crown and backplate gold-plated electrodes record complete medical Lead I and simulated Lead II rhythm waveforms in 30 seconds with immediate atrial fibrillation and PVC screening.
                </p>
              </div>
              <ul className="text-xs font-semibold space-y-2 text-text-muted border-t border-border-subtle pt-3">
                <li className="flex items-center gap-2 text-status-critical">
                  <span className="material-symbols-outlined text-xs">check</span> 500Hz Sampling Resolution
                </li>
                <li className="flex items-center gap-2 text-status-critical">
                  <span className="material-symbols-outlined text-xs">check</span> Exportable Diagnostic PDF to Cardiologist
                </li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="bg-surface-subtle p-6 rounded-2xl border border-border-subtle hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-status-normal flex items-center justify-center mb-5 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">water_drop</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  8-Channel Multi-Spectral PPG & SpO2
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  Employs red, infrared, and green optical wavelength sensors to compute real-time blood oxygen saturation, pulse transit time (PTT) blood pressure approximations, and interstitial glucose trend curves.
                </p>
              </div>
              <ul className="text-xs font-semibold space-y-2 text-text-muted border-t border-border-subtle pt-3">
                <li className="flex items-center gap-2 text-status-normal">
                  <span className="material-symbols-outlined text-xs">check</span> ±1.2% SpO2 Clinical Variance
                </li>
                <li className="flex items-center gap-2 text-status-normal">
                  <span className="material-symbols-outlined text-xs">check</span> Continuous Overnight Hypoxia Alerts
                </li>
              </ul>
            </div>
          </div>

          {/* Real-time Sensor Metric Tiles */}
          <div className="mt-10 p-5 sm:p-6 bg-surface-canvas rounded-2xl border border-border-subtle">
            <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-4">
              Continuous Metric Capabilities Monitored 24 Hours / Day
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs">
                <span className="material-symbols-outlined text-primary text-xl">vital_signs</span>
                <div className="text-xs sm:text-sm font-bold mt-1">HR & HRV Variance</div>
                <div className="text-[11px] text-text-muted mt-0.5">Beat-to-beat SDNN autonomic tracking</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs">
                <span className="material-symbols-outlined text-secondary text-xl">thermostat</span>
                <div className="text-xs sm:text-sm font-bold mt-1">Core Temperature</div>
                <div className="text-[11px] text-text-muted mt-0.5">Sub-surface skin micro-sensor (±0.05°C)</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs">
                <span className="material-symbols-outlined text-amber-500 text-xl">blood_pressure</span>
                <div className="text-xs sm:text-sm font-bold mt-1">Arterial Wave Trend</div>
                <div className="text-[11px] text-text-muted mt-0.5">Continuous pulse transit vascular tone</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs">
                <span className="material-symbols-outlined text-rose-500 text-xl">crisis_alert</span>
                <div className="text-xs sm:text-sm font-bold mt-1">Fall & Crash Detection</div>
                <div className="text-[11px] text-text-muted mt-0.5">High-G 6-axis accelerometer & gyro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE CLINICAL ADVANTAGE: 24/7 SPECIALIST CONSULTATIONS ON DEMAND ────── */}
      <section className="py-14 sm:py-20 bg-surface-subtle border-b border-border-subtle" id="clinical-advantage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-primary text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">video_call</span>
              <span>The Skyline Telehealth Advantage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              Your Watch Detects Anomalies.<br />Our On-Demand Doctors Respond.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3">
              Other smartwatches simply send you scary push notifications. Skyline connects your live wrist biometric stream straight to a board-certified physician in under 90 seconds.
            </p>
          </div>

          {/* Wrist-to-Consultant Flow Simulation Box */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-xl overflow-hidden mb-12">
            <div className="bg-slate-900 text-slate-200 px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-normal opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-status-normal" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  LIVE SYNCHRONIZED TELEHEALTH SESSION
                </span>
                <span className="text-slate-500 hidden sm:inline">|</span>
                <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                  Watch Stream: VitalsWatch Ultra #SK-8832
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                  1-Tap Video Call Active • 12ms Telemetry
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
              {/* Video Stream (Patient View of Doctor) */}
              <div className="lg:col-span-6 bg-slate-950 relative flex flex-col justify-between p-4 min-h-[280px] sm:min-h-[380px] overflow-hidden">
                {callEnded ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center z-10">
                    <span className="material-symbols-outlined text-5xl text-emerald-400 mb-2">
                      check_circle
                    </span>
                    <h4 className="text-lg font-bold">Consultation Concluded</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Dr. Vance has verified your rhythm strip and pushed clinical notes to your patient record.
                    </p>
                    <button
                      onClick={() => setCallEnded(false)}
                      className="mt-4 px-4 py-2 bg-primary-container text-white text-xs font-bold rounded-lg"
                    >
                      Re-open Demo Call
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src="/images/avatars/dr_chidi_okafor.jpg"
                      alt="Dr. Chidi Okafor, MD Cardiologist On Call"
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-status-normal" /> Dr. Chidi Okafor, MD (Cardiologist)
                      </span>
                      <span className="bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-md font-mono">
                        Response: 42s
                      </span>
                    </div>

                    {/* Patient Self-Preview & Controls */}
                    <div className="relative z-10 flex items-end justify-between pt-16">
                      <div className="w-24 sm:w-28 h-18 sm:h-20 rounded-lg bg-slate-800 border border-white/30 overflow-hidden shadow-lg relative">
                        <img
                          src="/images/avatars/patient_kelechi.jpg"
                          alt="Patient Kelechi Adeleke preview"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/70 text-[8px] sm:text-[9px] text-white px-1 rounded font-mono">
                          You (Watch)
                        </span>
                      </div>

                      <div className="bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-slate-700">
                        <button
                          onClick={() => setMicMuted(!micMuted)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            micMuted ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                          }`}
                          title={micMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {micMuted ? 'mic_off' : 'mic'}
                          </span>
                        </button>
                        <button
                          onClick={() => setVideoMuted(!videoMuted)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            videoMuted ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                          }`}
                          title={videoMuted ? 'Turn Camera On' : 'Turn Camera Off'}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {videoMuted ? 'videocam_off' : 'videocam'}
                          </span>
                        </button>
                        <button
                          onClick={() => setCallEnded(true)}
                          className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                          title="End Demonstration Call"
                        >
                          <span className="material-symbols-outlined text-sm">call_end</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Telemetry Received by Clinician in Real Time */}
              <div className="lg:col-span-6 bg-white p-4 sm:p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border-subtle space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">vital_signs</span>
                      <span className="text-xs sm:text-sm font-bold text-text-primary">
                        Watch Biometric Stream
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                      Live Sensor Telemetry Verified
                    </span>
                  </div>

                  {/* Live Rhythm Wave */}
                  <div className="p-3 rounded-xl bg-slate-900 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                        WATCH LEAD II WAVEFORM • 25mm/s
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400">
                        NORMAL SINUS • 72 BPM
                      </span>
                    </div>
                    <div className="h-9 w-full flex items-center">
                      <svg className="w-full h-8 text-emerald-400" fill="none" viewBox="0 0 400 40">
                        <path
                          className="ecg-path"
                          d="M0,20 L40,20 L45,8 L50,32 L55,14 L60,24 L65,20 L120,20 L125,8 L130,32 L135,14 L140,24 L145,20 L200,20 L205,8 L210,32 L215,14 L220,24 L225,20 L280,20 L285,8 L290,32 L295,14 L300,24 L305,20 L360,20 L365,8 L370,32 L375,14 L380,24 L385,20 L400,20"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[9px] sm:text-[10px] text-text-muted font-bold">PULSE</div>
                      <div className="text-base sm:text-lg font-bold text-text-primary font-mono">
                        72 <span className="text-[10px] font-normal">bpm</span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[9px] sm:text-[10px] text-text-muted font-bold">SpO2</div>
                      <div className="text-base sm:text-lg font-bold text-text-primary font-mono">
                        99 <span className="text-[10px] font-normal">%</span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="text-[9px] sm:text-[10px] text-text-muted font-bold">BODY TEMP</div>
                      <div className="text-base sm:text-lg font-bold text-text-primary font-mono">
                        36.8 <span className="text-[10px] font-normal">°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">medical_information</span>
                      Physician Impression & Triage Plan
                    </div>
                    <p className="text-text-secondary text-[11px] sm:text-xs leading-relaxed">
                      &quot;Arrhythmia warning triggered on watch at 14:02 resolved into clean sinus rhythm. ECG reveals normal PR interval. No urgent ED visit required. Refill dispatched to patient pharmacy.&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="text-[11px] text-text-muted">
                    Encrypted via Surescripts & Epic FHIR
                  </div>
                  <Link
                    href="/patient/records"
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container text-white text-xs font-bold px-3 py-2 rounded-lg text-center transition-colors"
                  >
                    View Care Summary Record
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Care+ Membership Add-On Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-border-subtle flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                  Standard Included
                </div>
                <h4 className="text-xl font-bold text-primary">Skyline Telemetry Basic</h4>
                <div className="text-2xl font-extrabold text-text-primary mt-2">
                  Free <span className="text-xs font-normal text-text-muted">with watch</span>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Full continuous biometric monitoring, PDF health report exports, abnormal heart rhythm notifications.
                </p>
                <ul className="text-xs space-y-2 mt-4 text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Continuous 24/7 ECG & SpO2 logs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Export reports for your own physician
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full py-2.5 rounded-lg border border-border-subtle text-xs font-bold text-text-primary text-center hover:bg-surface-subtle transition-colors block"
              >
                Included by Default
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-primary shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 right-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  Bundled Care Add-On
                </div>
                <h4 className="text-xl font-bold text-primary">Skyline Care+ Concierge</h4>
                <div className="text-2xl font-extrabold text-text-primary mt-2">
                  {formatNgn(45_000)} <span className="text-xs font-normal text-text-muted">/ month (1st year free with watch)</span>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  24/7 on-demand 1-tap video consults with board-certified US doctors, instant prescription routing, and rapid cardiac triage.
                </p>
                <ul className="text-xs space-y-2 mt-4 text-text-secondary">
                  <li className="flex items-center gap-2 font-semibold text-primary">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Unlimited on-demand video visits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    &lt; 90-second average clinician pickup
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    e-Prescribe to 65,000+ pharmacies
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-xs font-bold text-white text-center shadow-md transition-colors block"
              >
                Claim With Watch Bundle
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-subtle flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                  Family & Chronic Care
                </div>
                <h4 className="text-xl font-bold text-primary">Skyline Care+ Family</h4>
                <div className="text-2xl font-extrabold text-text-primary mt-2">
                  {formatNgn(89_000)} <span className="text-xs font-normal text-text-muted">/ month for up to 4 watches</span>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Shared family dashboard, senior fall escalation, remote caregiver alerts, and pediatric/geriatric specialist access.
                </p>
                <ul className="text-xs space-y-2 mt-4 text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Multi-device guardian alert network
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Dedicated primary care doctor pair
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full py-2.5 rounded-lg border border-border-subtle text-xs font-bold text-text-primary text-center hover:bg-surface-subtle transition-colors block"
              >
                Select Family Plan
              </Link>
            </div>
          </div>

          {/* Secondary Clinician Recruiting Banner */}
          <div className="mt-8 bg-white rounded-xl p-4 sm:p-5 border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">stethoscope</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-text-primary">
                  Are you a Board-Certified Physician or Medical Specialist?
                </div>
                <div className="text-[11px] sm:text-xs text-text-muted">
                  Join our on-demand clinical telemetry network. Rapid MDCN license verification and malpractice coverage included.
                </div>
              </div>
            </div>
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-surface-subtle hover:bg-slate-200 text-primary border border-border-subtle text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
            >
              <span>Apply to Clinician Roster</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. HARDWARE LINEUP & COMPARISON MATRIX ────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white" id="hardware-lineup">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Choose Your Device
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight mt-1">
              Skyline Health Biometric Fleet
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3">
              Engineered for hospital-grade precision. Backed by the world’s most advanced on-demand physician network.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Product 1: PulseBand Pro */}
            <div className="bg-surface-canvas rounded-2xl border border-border-subtle p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-video bg-slate-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="material-symbols-outlined text-6xl text-slate-400">watch</span>
                  <span className="absolute top-2 left-2 bg-slate-800 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    SLIM PROFILE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Skyline PulseBand Pro</h3>
                <p className="text-xs text-text-muted mt-1">
                  Lightweight screenless biometric band for screen-free athletes and sleep tracking.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary font-mono">{formatNgn(HARDWARE_PRICES.band)}</span>
                  <span className="text-xs text-text-muted line-through">{formatNgn(529_000)}</span>
                </div>
                <ul className="text-xs space-y-2 mt-6 text-text-secondary border-t border-border-subtle pt-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    14-Day Battery Life
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Continuous Optical SpO2 & HRV
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Skin Temperature Micro-Sensor
                  </li>
                  <li className="flex items-center gap-2 text-text-muted">
                    <span className="material-symbols-outlined text-slate-300 text-sm">close</span>
                    Dry-Contact ECG Bezel (Ultra Only)
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout?device=pulseband"
                className="mt-8 w-full bg-white hover:bg-slate-100 text-primary border border-border-subtle text-xs font-bold py-3 rounded-xl text-center shadow-xs transition-colors block"
              >
                Order PulseBand — {formatNgn(HARDWARE_PRICES.band)}
              </Link>
            </div>

            {/* Product 2: VitalsWatch Ultra (HERO) */}
            <div className="bg-white rounded-2xl border-2 border-primary p-6 flex flex-col justify-between shadow-xl relative lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">star</span> Flagship Clinical Device
              </div>
              <div>
                <div className="aspect-video bg-blue-50/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-blue-100">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                    alt="Flagship Skyline VitalsWatch Ultra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Skyline VitalsWatch™ Ultra</h3>
                <p className="text-xs text-text-muted mt-1">
                  Titanium smartwatch with live OLED ECG screen, speaker/mic, and standalone cellular telemetry.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary font-mono">{formatNgn(HARDWARE_PRICES.ultra)}</span>
                  <span className="text-xs text-text-muted line-through">{formatNgn(HARDWARE_PRICES.ultraWas)}</span>
                  <span className="text-[11px] font-mono text-status-normal font-semibold">
                    1 Yr Care+ Inc.
                  </span>
                </div>
                <ul className="text-xs space-y-2 mt-6 text-text-secondary border-t border-border-subtle pt-4">
                  <li className="flex items-center gap-2 font-semibold text-primary">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Grade 5 Titanium + Sapphire Screen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    30-Sec Medical-Grade Lead II ECG
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    7-Day Continuous Battery Life
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Standalone LTE-M Emergency Call
                  </li>
                  <li className="flex items-center gap-2 text-status-normal font-semibold">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    1-Year Free 24/7 Doctor Consults ({formatNgn(HARDWARE_PRICES.carePlusYear)} value)
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout?device=ultra"
                className="mt-8 w-full bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold py-3.5 rounded-xl text-center shadow-md transition-colors block"
              >
                Order VitalsWatch Ultra — {formatNgn(HARDWARE_PRICES.ultra)}
              </Link>
            </div>

            {/* Product 3: Clinical Biosensor Suite */}
            <div className="bg-surface-canvas rounded-2xl border border-border-subtle p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-video bg-slate-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="material-symbols-outlined text-6xl text-slate-400">hub</span>
                  <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    HOSPITAL RPM BUNDLE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Clinical Biosensor Suite</h3>
                <p className="text-xs text-text-muted mt-1">
                  Complete diagnostic ecosystem: Watch Ultra + Biosensor Ring + Home Cellular Base Hub.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary font-mono">{formatNgn(HARDWARE_PRICES.suite)}</span>
                  <span className="text-xs text-text-muted line-through">{formatNgn(1_249_000)}</span>
                </div>
                <ul className="text-xs space-y-2 mt-6 text-text-secondary border-t border-border-subtle pt-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Includes Watch + Continuous Sleep Ring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Continuous Nocturnal SpO2 Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Cellular Hub for Zero-WiFi Elder Care
                  </li>
                  <li className="flex items-center gap-2 text-primary font-semibold">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    CPT 99453 / 99454 Insurance Covered
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout?device=suite"
                className="mt-8 w-full bg-white hover:bg-slate-100 text-primary border border-border-subtle text-xs font-bold py-3 rounded-xl text-center shadow-xs transition-colors block"
              >
                Order Complete Suite — {formatNgn(HARDWARE_PRICES.suite)}
              </Link>
            </div>
          </div>

          {/* Technical Hardware Specification Matrix */}
          <div className="mt-14 sm:mt-16 bg-surface-canvas rounded-2xl border border-border-subtle overflow-hidden" id="specs">
            <div className="p-4 sm:p-5 bg-white border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-text-primary">
                Technical Hardware Specification Matrix
              </h4>
              <span className="text-xs text-text-muted font-mono">
                All devices include medical-grade continuous telemetry software
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead className="bg-surface-subtle text-text-secondary uppercase tracking-wider border-b border-border-subtle text-[11px] font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Hardware Feature</th>
                    <th className="py-3.5 px-4">PulseBand Pro ({formatNgn(HARDWARE_PRICES.band)})</th>
                    <th className="py-3.5 px-4 text-primary">VitalsWatch™ Ultra ({formatNgn(HARDWARE_PRICES.ultra)})</th>
                    <th className="py-3.5 px-4">Biosensor Suite ({formatNgn(HARDWARE_PRICES.suite)})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Bezel & Glass</td>
                    <td className="py-3 px-4 text-text-secondary">Anodized Aluminum / Polymer</td>
                    <td className="py-3 px-4 font-bold text-primary">Grade 5 Titanium + Sapphire</td>
                    <td className="py-3 px-4 text-text-secondary">Titanium + Ceramic Pod</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">ECG Capability</td>
                    <td className="py-3 px-4 text-text-secondary">No (PPG Pulse Only)</td>
                    <td className="py-3 px-4 font-bold text-status-normal">Dry-Contact Lead I & II (500Hz)</td>
                    <td className="py-3 px-4 font-bold text-status-normal">Dual Lead I/II + Continuous Vector</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Battery Life</td>
                    <td className="py-3 px-4 text-text-secondary">14 Days</td>
                    <td className="py-3 px-4 font-bold text-primary">7 Days Continuous (OLED Always-On)</td>
                    <td className="py-3 px-4 text-text-secondary">7 Days Watch / 10 Days Ring</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">LTE-M Standalone Cellular</td>
                    <td className="py-3 px-4 text-text-muted">Requires Phone BT</td>
                    <td className="py-3 px-4 font-bold text-status-normal">Included (No Phone Required)</td>
                    <td className="py-3 px-4 font-bold text-status-normal">Included + LTE Standalone Base Hub</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Doctor Telehealth Integration</td>
                    <td className="py-3 px-4 text-text-secondary">Pay-per-visit ({formatNgn(75_000)})</td>
                    <td className="py-3 px-4 font-bold text-status-normal">1-Year Unlimited 24/7 MD Access</td>
                    <td className="py-3 px-4 font-bold text-status-normal">2-Years Concierge Clinical Coverage</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Water Rating</td>
                    <td className="py-3 px-4 text-text-secondary">5ATM (50 meters)</td>
                    <td className="py-3 px-4 text-text-secondary">5ATM (50 meters)</td>
                    <td className="py-3 px-4 text-text-secondary">5ATM (50 meters)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VERIFIED LIVES IMPACTED & CLINICIAN ENDORSEMENTS ────────────────────── */}
      <section className="py-14 sm:py-20 bg-surface-subtle border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Verified Lives Impacted
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight mt-1">
              Patient Stories & Physician Backing
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3">
              See how continuous wrist telemetry paired with sub-90s doctor consults catches arrhythmias early and prevents hospital readmissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg">star</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                  &quot;At 2 AM in Victoria Island, my Skyline Watch vibrated with an asymptomatic 160 bpm rhythm alert. I tapped the 1-tap call, and Dr. Okafor reviewed my live ECG right on his screen. He guided me through a vagal maneuver and dispatched emergency medication before things escalated. This platform saved my life.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle">
                <img
                  src="/images/avatars/patient_kelechi.jpg"
                  alt="Kelechi Adeleke patient portrait"
                  className="w-11 h-11 rounded-full object-cover border border-border-subtle"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Kelechi Adeleke</div>
                  <div className="text-[11px] text-text-muted">Verified VitalsWatch™ Ultra Owner • Ikoyi, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg">star</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                  &quot;The 500Hz sampling resolution on the Skyline dry electrodes gives me clinical tracings identical to a hospital rhythm strip. When patients in Abuja or Port Harcourt trigger an encounter, I review Lead II ECG with complete diagnostic confidence and send digital prescriptions directly.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle">
                <img
                  src="/images/avatars/dr_chidi_okafor.jpg"
                  alt="Dr. Chidi Okafor Cardiologist"
                  className="w-11 h-11 rounded-full object-cover border border-border-subtle"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Dr. Chinedu Okafor, MBBS, FWACP</div>
                  <div className="text-[11px] text-text-muted">Consultant Cardiologist, LUTH Idi-Araba, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg">star</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                  &quot;Standard consumer smartwatches take SpO2 snapshots every 30 minutes. Skyline’s continuous plethysmography tracks nocturnal desaturations with hospital-grade accuracy, letting us optimize chronic respiratory therapy across Nigeria without costly sleep labs.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle">
                <img
                  src="/images/avatars/dr_folake_bello.jpg"
                  alt="Dr. Folake Bello Senior Physician"
                  className="w-11 h-11 rounded-full object-cover border border-border-subtle"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Dr. Amina Bello, MBBS, FMCP</div>
                  <div className="text-[11px] text-text-muted">Chief Consultant, National Hospital Abuja</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. HIGH-CONVERTING PURCHASE CTA BANNER ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-primary text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="bg-primary-container px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-200 border border-blue-400/30">
            Limited Spring Production Batch • Free Worldwide Express Shipping
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Wear the Future of Preventive Medicine.
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Order today to lock in your {formatNgn(HARDWARE_PRICES.ultra)} introductory price and receive a complimentary 1-year Skyline Care+ Telemedicine membership ({formatNgn(HARDWARE_PRICES.carePlusYear)} value included free).
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/checkout"
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-primary text-sm sm:text-base font-bold px-8 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              <span>Order VitalsWatch™ Ultra — {formatNgn(HARDWARE_PRICES.ultra)}</span>
            </Link>
            <a
              href="#specs"
              className="w-full sm:w-auto bg-primary-container hover:bg-blue-800 text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl border border-blue-400/30 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">tune</span>
              <span>Compare All Models</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-blue-300 pt-3 font-mono">
            <span>✓ 30-Day Money-Back Guarantee</span>
            <span>✓ Paystack secure checkout</span>
            <span>✓ 2-Year Hardware Warranty</span>
          </div>
        </div>
      </section>

      {/* ── 7. COMPREHENSIVE HARDWARE & MEDICAL COMPLIANCE FOOTER ──────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-12 sm:py-16 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Row: Compliance Badges Cluster */}
          <div className="pb-8 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs sm:text-sm font-bold uppercase text-white tracking-wider mb-1.5">
                Institutional Regulatory Standards & Clearance
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Skyline Health biometric wearables and telemetry software operate under strict US Medical-Grade medical device clearance and HIPAA compliance standards.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-amber-400">medication</span>
                Medical-Grade Continuous Monitoring
              </span>
              <span className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-status-normal">lock</span>
                HIPAA & SOC 2 Type II
              </span>
              <span className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary-container">water_drop</span>
                5ATM Water Resistant
              </span>
            </div>
          </div>

          {/* Middle Row: Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Col 1: Brand & Emergency */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">watch</span>
                </div>
                <span className="text-base font-bold">Skyline Health</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                The world&apos;s premier medical-grade wearable ecosystem connecting continuous biometric hardware with instantaneous, board-certified physician care.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => alert('Emergency SOS Protocol triggered. Connecting local 911 dispatcher with current GPS coordinates and live telemetry stream.')}
                  className="inline-flex items-center gap-2 text-xs font-bold bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800 px-3 py-2 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-status-critical">warning</span>
                  Emergency SOS & Automatic Fall Dispatch
                </button>
              </div>
            </div>

            {/* Col 2: Hardware Products */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase text-white tracking-wider">Hardware</h5>
              <ul className="space-y-2 text-xs">
                <li><a className="hover:text-white transition-colors" href="#hardware-lineup">Skyline VitalsWatch™ Ultra</a></li>
                <li><a className="hover:text-white transition-colors" href="#hardware-lineup">Skyline PulseBand Pro</a></li>
                <li><a className="hover:text-white transition-colors" href="#hardware-lineup">Continuous Biosensor Ring</a></li>
                <li><Link className="hover:text-white transition-colors" href="/smartwatch">Hardware Tech Specs</Link></li>
                <li><Link className="hover:text-white transition-colors" href="/checkout">Order Accessories</Link></li>
              </ul>
            </div>

            {/* Col 3: Clinical Care */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase text-white tracking-wider">Clinical Services</h5>
              <ul className="space-y-2 text-xs">
                <li><Link className="hover:text-white transition-colors" href="/consultancy">Specialist Directory</Link></li>
                <li><a className="hover:text-white transition-colors" href="#clinical-advantage">Skyline Care+ Concierge</a></li>
                <li><Link className="hover:text-white transition-colors" href="/patient/records">Patient Health Records</Link></li>
                <li><Link className="hover:text-white transition-colors" href="/consultancy">Find a Specialist</Link></li>
                <li><a className="hover:text-white transition-colors" href="#specs">Paystack & Naira pricing</a></li>
              </ul>
            </div>

            {/* Col 4: For Clinicians & Developers */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase text-white tracking-wider">Clinicians & Admin</h5>
              <ul className="space-y-2 text-xs">
                <li><Link className="hover:text-white transition-colors" href="/apply">Join Doctor Network</Link></li>
                <li><Link className="hover:text-white transition-colors" href="/login">Clinician Sign In</Link></li>
                <li><Link className="hover:text-white transition-colors" href="/portal/dashboard">Physician Dashboard</Link></li>
                <li><a className="hover:text-white transition-colors" href="http://localhost:3001" target="_blank" rel="noreferrer">Hospital Command Console</a></li>
                <li><Link className="hover:text-white transition-colors" href="/portal/earnings">CPT Billing Guides</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Row: Copyright & Legal Disclaimers */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2025 Skyline Health Hardware Inc. All rights reserved. US Patents 9,842,109 & 11,209,481.
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="hover:text-white cursor-pointer">Terms of Sale</span>
              <span className="hover:text-white cursor-pointer">Medical Disclaimer</span>
              <span className="hover:text-white cursor-pointer">HIPAA Compliance</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
