'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EcgWaveform from '../../components/EcgWaveform';
import { formatNgn } from '../../lib/money';
import { HARDWARE_PRICES } from '../../lib/pricing';

export default function SmartwatchHardwarePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans">
      <Navbar />

      {/* ── HERO BANNER ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-container/30 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>AEROSPACE GRADE 5 TITANIUM • MEDICAL-GRADE ECG SENSOR</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Skyline VitalsWatch Pro
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Continuous medical-grade biometric surveillance on your wrist. Built from surgical titanium with multi-wavelength optical PPG, single-lead ECG electrodes, and built-in 5G eSIM connectivity. Order and ship across Nigeria.
              </p>

              {/* Real-time ECG Waveform */}
              <div className="pt-2 max-w-xl">
                <EcgWaveform height={75} heartRate={74} rhythmText="VitalsWatch Pro Hardware Sensor Stream" />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/checkout"
                  className="px-6 py-3.5 rounded-xl bg-primary-container hover:bg-primary text-white font-bold text-sm shadow-lg shadow-sky-950 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">shopping_cart</span>
                  <span>Order VitalsWatch — {formatNgn(HARDWARE_PRICES.ultra)}</span>
                </Link>
                <Link
                  href="/consultancy"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg text-sky-400">stethoscope</span>
                  <span>Connect With a Specialist</span>
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-mono">
                <span>Paystack checkout in NGN</span>
                <span>•</span>
                <span>Nationwide Nigeria delivery</span>
              </div>
            </div>

            {/* Right Watch Hardware Visualization */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 text-center">
                <div className="relative mx-auto w-52 h-52 rounded-full border-4 border-slate-700 flex items-center justify-center p-4 bg-slate-950 shadow-2xl">
                  {/* Titanium Bezel Accent */}
                  <div className="absolute inset-0 rounded-full border border-sky-500/20" />
                  <div className="space-y-1">
                    <span className="material-symbols-outlined text-4xl text-rose-500 live-pulse">
                      favorite
                    </span>
                    <div className="text-4xl font-extrabold font-mono text-white">74</div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">
                      SINUS RHYTHM • 98% SpO2
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase block">Material</span>
                    <span className="text-xs font-bold text-white">Titanium Gr. 5</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase block">Battery</span>
                    <span className="text-xs font-bold text-emerald-400">7 Days Continuous</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase block">Radio</span>
                    <span className="text-xs font-bold text-sky-400">5G eSIM Built-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SENSOR ARCHITECTURE SECTION ─────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider">
              Biometric Sensor Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Multi-Wavelength Diagnostic Engineering
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              Unlike generic smartwatches that take intermittent snapshots, the Skyline sensor array captures continuous waveform data capable of real-time clinical interpretation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-subtle/50 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">ecg_heart</span>
              </div>
              <h3 className="text-base font-bold text-text-primary">Medical-Grade Single-Lead ECG</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Titanium contact electrodes embedded in the bezel and case back capture 30-second rhythm strips, enabling automatic classification of atrial fibrillation, sinus tachycardia, and bradycardia.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-subtle/50 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">blood_pressure</span>
              </div>
              <h3 className="text-base font-bold text-text-primary">Quad-Wavelength Optical PPG</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Reflective photoplethysmography using infrared, red, green, and amber LEDs continuously samples arterial pulse wave velocity and blood oxygen saturation (SpO2) day and night.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-subtle/50 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">device_hub</span>
              </div>
              <h3 className="text-base font-bold text-text-primary">Direct Doctor Cloud Bridge</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Integrated 5G cellular eSIM transmits anomaly bursts to your attending physician's portal within 18 milliseconds, enabling instant telehealth outreach before emergencies happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS TABLE ───────────────────────────────────────── */}
      <section className="py-16 bg-surface-canvas border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-text-primary">Hardware Technical Specifications</h3>
            <p className="text-xs text-text-secondary">Designed for continuous clinical durability and comfort.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-border-subtle">
                <tr className="hover:bg-surface-subtle/50">
                  <td className="py-3.5 px-6 font-bold text-text-primary w-1/3">Case Material</td>
                  <td className="py-3.5 px-6 text-text-secondary">Aerospace Grade 5 Titanium with brushed DLC finish</td>
                </tr>
                <tr className="hover:bg-surface-subtle/50">
                  <td className="py-3.5 px-6 font-bold text-text-primary">Display</td>
                  <td className="py-3.5 px-6 text-text-secondary">1.43-inch Always-On AMOLED with Sapphire Crystal (1000 nits)</td>
                </tr>
                <tr className="hover:bg-surface-subtle/50">
                  <td className="py-3.5 px-6 font-bold text-text-primary">ECG Sensor</td>
                  <td className="py-3.5 px-6 text-text-secondary">Lead II equivalent Single-Lead with Titanium Bezel Contact</td>
                </tr>
                <tr className="hover:bg-surface-subtle/50">
                  <td className="py-3.5 px-6 font-bold text-text-primary">Connectivity</td>
                  <td className="py-3.5 px-6 text-text-secondary">Standalone 5G eSIM (No smartphone required) + Bluetooth 5.3</td>
                </tr>
                <tr className="hover:bg-surface-subtle/50">
                  <td className="py-3.5 px-6 font-bold text-text-primary">Battery Life</td>
                  <td className="py-3.5 px-6 text-text-secondary">Up to 7 days continuous telemetry recording on a single charge</td>
                </tr>
                <tr className="hover:bg-surface-subtle/50">
                  <td className="py-3.5 px-6 font-bold text-text-primary">Water Resistance</td>
                  <td className="py-3.5 px-6 text-text-secondary">50 Meters (5 ATM) • Shower and swim safe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
