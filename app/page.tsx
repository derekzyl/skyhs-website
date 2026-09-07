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
    name: 'Skyline VitalsBand™ Ultra',
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
      <section className="relative bg-gradient-to-b from-white via-surface-canvas to-surface-subtle dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 pt-6 sm:pt-10 pb-16 sm:pb-24 border-b border-border-subtle dark:border-slate-800 overflow-hidden transition-colors duration-200">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800 text-primary-container dark:text-sky-300 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-primary dark:text-sky-400">SCREENLESS CLINICAL BAND</span>
              <span className="text-blue-300 dark:text-sky-700">|</span>
              <span className="truncate max-w-[240px] sm:max-w-none">
                Designed to Complement Your Watch • Never Replace It
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-status-normal font-semibold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs">verified</span> Medical-Grade Lead II ECG
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content Column (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary dark:text-white leading-[1.14] tracking-tight">
                Clinical Telemetry on Your Wrist.{' '}
                <br className="hidden sm:inline" />
                <span className="text-secondary dark:text-sky-400 underline decoration-blue-200 dark:decoration-sky-800 underline-offset-8">
                  Keep Your Favorite Watch.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-text-secondary dark:text-slate-300 max-w-xl leading-relaxed font-normal">
                Never dispose of your Rolex, Omega, or mechanical timepiece. Skyline is a screenless, featherweight biometric band with continuous medical-grade ECG, SpO2, and 24/7 on-demand doctor access that wears invisibly on your other wrist.
              </p>

              {/* CTA and Pricing Cluster */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/checkout"
                    className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-container text-white text-sm sm:text-base font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all duration-150 text-center"
                  >
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                    <span>Order Band — {formatNgn(HARDWARE_PRICES.ultra)}</span>
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

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-muted dark:text-slate-400 pt-1">
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
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-status-critical flex items-center justify-center font-bold shrink-0">
                      <span className="material-symbols-outlined text-2xl animate-pulse">favorite</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-text-muted dark:text-slate-400 font-semibold">
                        Active Sensor Stream
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-text-primary dark:text-white flex items-center gap-2">
                        <span>72 BPM • Sinus Rhythm</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                          SpO2 99%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Waveform Trace & Latency */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle dark:border-slate-800">
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
                    <span className="text-[10px] font-mono font-bold bg-blue-50 dark:bg-sky-950/80 text-primary dark:text-sky-300 px-2 py-0.5 rounded border border-blue-200 dark:border-sky-800 shrink-0">
                      12ms Latency
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Product Image Showcase with Live Sensor Badges (6 Cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-gradient-to-br from-slate-100 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 rounded-3xl p-3 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Image of Skyline VitalsBand */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                  <img
                    src="/images/devices/sky_vitalsband_hero.png"
                    alt="Sleek modern titanium Skyline VitalsBand screenless health band worn on wrist showing subtle status LED and continuous clinical sensor telemetry"
                    className="w-full h-full object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* Ambient overlay pill */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Continuous Lead II ECG Active</span>
                  </div>
                  {/* Dual-wrist concept badge */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-200 px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 hidden sm:flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-sky-400">watch</span>
                    <span>Pair With Any Watch</span>
                  </div>
                </div>

                {/* Live Biometric Chip Callout Overlay Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 sm:mt-4">
                  <div className="bg-white dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-xl border border-border-subtle dark:border-slate-700/60 shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 uppercase font-bold">
                      Optical Array
                    </div>
                    <div className="text-xs font-bold text-text-primary dark:text-white mt-0.5 truncate">
                      8-Channel PPG
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-status-normal font-semibold">
                      Medical Grade
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-xl border border-border-subtle dark:border-slate-700/60 shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 uppercase font-bold">
                      Sync Latency
                    </div>
                    <div className="text-xs font-bold text-text-primary dark:text-white mt-0.5 truncate">
                      Sub-12ms
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-secondary dark:text-sky-400 font-semibold">
                      Ultra WebRTC
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-xl border border-border-subtle dark:border-slate-700/60 shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 uppercase font-bold">
                      Design Form
                    </div>
                    <div className="text-xs font-bold text-text-primary dark:text-white mt-0.5 truncate">
                      Screenless Band
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-status-normal font-semibold">
                      Zero Distraction
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-xl border border-border-subtle dark:border-slate-700/60 shadow-xs">
                    <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 uppercase font-bold">
                      Battery Life
                    </div>
                    <div className="text-xs font-bold text-text-primary dark:text-white mt-0.5 truncate">
                      7–14 Days
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-text-muted dark:text-slate-400 font-semibold">
                      Fast Inductive
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Trust Badge Bar */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-border-subtle/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-border-subtle dark:border-slate-800 shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 text-xl sm:text-2xl">verified_user</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">Clinical Wearable</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted dark:text-slate-400">Cardiac & Oximetry Safety</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-border-subtle dark:border-slate-800 shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-status-normal text-xl sm:text-2xl">monitor_heart</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">99.4% ECG Accuracy</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted dark:text-slate-400">Multi-Center Trial Validated</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-border-subtle dark:border-slate-800 shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-secondary dark:text-sky-400 text-xl sm:text-2xl">timelapse</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">500,000+ Days</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted dark:text-slate-400">Active Biometric Telemetry</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-border-subtle dark:border-slate-800 shadow-xs flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-primary-container dark:text-sky-300 text-xl sm:text-2xl">lock</span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">HIPAA / AES-256</div>
                <div className="text-[10px] sm:text-[11px] text-text-muted dark:text-slate-400">Encrypted Health Vault</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1.5 DUAL-WRIST PHILOSOPHY: WHY A BAND, NOT A WATCH ───────────────────── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-subtle via-white to-surface-canvas dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-b border-border-subtle dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-sky-950/70 text-primary dark:text-sky-300 text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">watch</span>
              <span>The Dual-Wrist Philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Why a Wearable Band, Not a Smartwatch?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary dark:text-slate-300 mt-3 leading-relaxed">
              You shouldn&apos;t have to abandon your Rolex, Omega, or heirloom mechanical watch just to get continuous medical-grade cardiac telemetry. Skyline is intentionally engineered as an ultra-slim, screenless band that complements your timepiece.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column: Dual-Wrist Lifestyle Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl group">
                <img
                  src="/images/devices/sky_vitalsband_dual_wrist.png"
                  alt="Professional wearing a traditional luxury watch on one wrist and the discreet screenless Skyline VitalsBand health band on the other wrist"
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      The Dual-Wrist Standard
                    </span>
                    <span className="text-[11px] text-slate-400">Left: Timepiece • Right: VitalsBand</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                    &quot;Your luxury watch tells the time. Skyline watches over your life.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Content Column: 4 Key Advantages */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-sky-950/80 text-primary dark:text-sky-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">watch</span>
                </div>
                <h3 className="text-sm font-bold text-text-primary dark:text-white">
                  Keep Your Favorite Watch
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
                  Never retire your luxury mechanical timepiece, vintage heirloom, or daily driver. Wear Skyline on your opposite wrist or under your cuff with zero clash.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">notifications_off</span>
                </div>
                <h3 className="text-sm font-bold text-text-primary dark:text-white">
                  Zero Screen Fatigue
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
                  No redundant social media pings, distracting popups, or battery-draining displays. Skyline silently monitors your cardiac rhythm in the background.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">battery_charging_full</span>
                </div>
                <h3 className="text-sm font-bold text-text-primary dark:text-white">
                  7 to 14-Day Battery Life
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
                  Smartwatches die within 24 hours because screens devour power. Skyline’s screenless architecture lasts up to two weeks on a single charge.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-border-subtle dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-status-critical flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">ecg_heart</span>
                </div>
                <h3 className="text-sm font-bold text-text-primary dark:text-white">
                  Hospital-Grade Sensor Fit
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
                  Bulky watches shift around and lose arterial contact. Skyline’s contoured ergonomic titanium pod hugs the wrist for continuous, clinical-grade precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRECISION HARDWARE & SENSOR ENGINEERING DEEP-DIVE ──────────────────── */}
      <section className="py-14 sm:py-20 bg-white dark:bg-slate-950 border-b border-border-subtle dark:border-slate-800 transition-colors duration-200" id="biometric-breakdown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-sky-950/70 text-primary dark:text-sky-300 text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">memory</span>
              <span>Micro-Electrochemical Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Precision Hardware Engineered for Continuous Physiology
            </h2>
            <p className="text-sm sm:text-base text-text-secondary dark:text-slate-300 mt-3">
              Consumer wearables guess. Skyline Health measures with medical-grade multi-spectral optical diodes, dry-contact electrodes, and sub-second DSP microcontrollers.
            </p>
          </div>

          {/* Hardware Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Module 1 */}
            <div className="bg-surface-subtle dark:bg-slate-900/90 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 hover:border-primary/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-sky-950/80 text-primary dark:text-sky-400 flex items-center justify-center mb-5 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">diamond</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                  Grade 5 Aerospace Titanium & Sapphire
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed mb-4">
                  CNC-milled from titanium alloy with sapphire crystal lens capable of withstanding 50m water pressure (5ATM). Hypoallergenic surgical contact chassis eliminates dermal irritation during 24/7 wear.
                </p>
              </div>
              <ul className="text-xs font-semibold space-y-2 text-text-muted dark:text-slate-400 border-t border-border-subtle dark:border-slate-800 pt-3">
                <li className="flex items-center gap-2 text-primary dark:text-sky-400">
                  <span className="material-symbols-outlined text-xs">check</span> 5ATM Water Resistance (Shower & Swim)
                </li>
                <li className="flex items-center gap-2 text-primary dark:text-sky-400">
                  <span className="material-symbols-outlined text-xs">check</span> 42g Featherweight Ergonomics
                </li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-surface-subtle dark:bg-slate-900/90 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 hover:border-primary/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-status-critical flex items-center justify-center mb-5 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">ecg</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                  Dual Dry-Contact Lead I/II ECG Electrodes
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed mb-4">
                  Built-in bezel crown and backplate gold-plated electrodes record complete medical Lead I and simulated Lead II rhythm waveforms in 30 seconds with immediate atrial fibrillation and PVC screening.
                </p>
              </div>
              <ul className="text-xs font-semibold space-y-2 text-text-muted dark:text-slate-400 border-t border-border-subtle dark:border-slate-800 pt-3">
                <li className="flex items-center gap-2 text-status-critical">
                  <span className="material-symbols-outlined text-xs">check</span> 500Hz Sampling Resolution
                </li>
                <li className="flex items-center gap-2 text-status-critical">
                  <span className="material-symbols-outlined text-xs">check</span> Exportable Diagnostic PDF to Cardiologist
                </li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="bg-surface-subtle dark:bg-slate-900/90 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 hover:border-primary/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-status-normal flex items-center justify-center mb-5 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">water_drop</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                  8-Channel Multi-Spectral PPG & SpO2
                </h3>
                <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed mb-4">
                  Employs red, infrared, and green optical wavelength sensors to compute real-time blood oxygen saturation, pulse transit time (PTT) blood pressure approximations, and interstitial glucose trend curves.
                </p>
              </div>
              <ul className="text-xs font-semibold space-y-2 text-text-muted dark:text-slate-400 border-t border-border-subtle dark:border-slate-800 pt-3">
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
          <div className="mt-10 p-5 sm:p-6 bg-surface-canvas dark:bg-slate-900/50 rounded-2xl border border-border-subtle dark:border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-slate-400 mb-4">
              Continuous Metric Capabilities Monitored 24 Hours / Day
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-border-subtle dark:border-slate-700 shadow-xs">
                <span className="material-symbols-outlined text-primary dark:text-sky-400 text-xl">vital_signs</span>
                <div className="text-xs sm:text-sm font-bold mt-1 text-text-primary dark:text-white">HR & HRV Variance</div>
                <div className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">Beat-to-beat SDNN autonomic tracking</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-border-subtle dark:border-slate-700 shadow-xs">
                <span className="material-symbols-outlined text-secondary dark:text-sky-400 text-xl">thermostat</span>
                <div className="text-xs sm:text-sm font-bold mt-1 text-text-primary dark:text-white">Core Temperature</div>
                <div className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">Sub-surface skin micro-sensor (±0.05°C)</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-border-subtle dark:border-slate-700 shadow-xs">
                <span className="material-symbols-outlined text-amber-500 text-xl">blood_pressure</span>
                <div className="text-xs sm:text-sm font-bold mt-1 text-text-primary dark:text-white">Arterial Wave Trend</div>
                <div className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">Continuous pulse transit vascular tone</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-border-subtle dark:border-slate-700 shadow-xs">
                <span className="material-symbols-outlined text-rose-500 text-xl">crisis_alert</span>
                <div className="text-xs sm:text-sm font-bold mt-1 text-text-primary dark:text-white">Fall & Crash Detection</div>
                <div className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">High-G 6-axis accelerometer & gyro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE CLINICAL ADVANTAGE: 24/7 SPECIALIST CONSULTATIONS ON DEMAND ────── */}
      <section className="py-14 sm:py-20 bg-surface-subtle dark:bg-slate-900/40 border-b border-border-subtle dark:border-slate-800 transition-colors duration-200" id="clinical-advantage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-sky-950/70 text-primary dark:text-sky-300 text-xs font-semibold mb-3">
              <span className="material-symbols-outlined text-sm">video_call</span>
              <span>The Skyline Telehealth Advantage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Your Band Detects Anomalies.<br />Our On-Demand Doctors Respond.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary dark:text-slate-300 mt-3">
              Other fitness bands simply count steps and smartwatches send scary alerts. Skyline connects your live wrist biometric stream straight to a board-certified physician in under 90 seconds.
            </p>
          </div>

          {/* Wrist-to-Consultant Flow Simulation Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 shadow-xl overflow-hidden mb-12">
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
                  Band Stream: VitalsBand Ultra #SK-8832
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
                      Reset Demo Session
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src="/images/avatars/dr_folake_bello.jpg"
                      alt="Dr. Vance board certified physician on video"
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60 pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white">
                        <div className="text-xs font-bold">Dr. Evelyn Vance, MD, FACC</div>
                        <div className="text-[10px] text-emerald-400 font-mono">
                          Board-Certified Cardiologist • On-Call
                        </div>
                      </div>
                      <span className="bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold animate-pulse">
                        REC • 02:44
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center justify-center gap-3 pt-4">
                      <button
                        onClick={() => setMicMuted(!micMuted)}
                        className={`p-3 rounded-full ${
                          micMuted ? 'bg-red-600' : 'bg-slate-800/80 hover:bg-slate-700'
                        } text-white backdrop-blur-md transition-colors`}
                        title={micMuted ? 'Unmute microphone' : 'Mute microphone'}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {micMuted ? 'mic_off' : 'mic'}
                        </span>
                      </button>
                      <button
                        onClick={() => setVideoMuted(!videoMuted)}
                        className={`p-3 rounded-full ${
                          videoMuted ? 'bg-red-600' : 'bg-slate-800/80 hover:bg-slate-700'
                        } text-white backdrop-blur-md transition-colors`}
                        title={videoMuted ? 'Turn on camera' : 'Turn off camera'}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {videoMuted ? 'videocam_off' : 'videocam'}
                        </span>
                      </button>
                      <button
                        onClick={() => setCallEnded(true)}
                        className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-colors"
                        title="End encounter"
                      >
                        <span className="material-symbols-outlined text-xl">call_end</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Telemetry Received by Clinician in Real Time */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-4 sm:p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border-subtle dark:border-slate-800 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary dark:text-sky-400 text-xl">vital_signs</span>
                      <span className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">
                        Band Biometric Stream
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                      Live Sensor Telemetry Verified
                    </span>
                  </div>

                  {/* Live Rhythm Wave */}
                  <div className="p-3 rounded-xl bg-slate-900 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                        BAND LEAD II WAVEFORM • 25mm/s
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
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 font-bold">PULSE</div>
                      <div className="text-base sm:text-lg font-bold text-text-primary dark:text-white font-mono">
                        72 <span className="text-[10px] font-normal">bpm</span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 font-bold">SpO2</div>
                      <div className="text-base sm:text-lg font-bold text-text-primary dark:text-white font-mono">
                        99 <span className="text-[10px] font-normal">%</span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <div className="text-[9px] sm:text-[10px] text-text-muted dark:text-slate-400 font-bold">BODY TEMP</div>
                      <div className="text-base sm:text-lg font-bold text-text-primary dark:text-white font-mono">
                        36.8 <span className="text-[10px] font-normal">°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-800 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-primary dark:text-sky-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">medical_information</span>
                      Physician Impression & Triage Plan
                    </div>
                    <p className="text-text-secondary dark:text-slate-300 text-[11px] sm:text-xs leading-relaxed">
                      &quot;Arrhythmia warning triggered on band at 14:02 resolved into clean sinus rhythm. ECG reveals normal PR interval. No urgent ED visit required. Refill dispatched to patient pharmacy.&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-subtle dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="text-[11px] text-text-muted dark:text-slate-400">
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
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-slate-400 mb-1">
                  Standard Included
                </div>
                <h4 className="text-xl font-bold text-primary dark:text-white">Skyline Telemetry Basic</h4>
                <div className="text-2xl font-extrabold text-text-primary dark:text-white mt-2">
                  Free <span className="text-xs font-normal text-text-muted dark:text-slate-400">with band</span>
                </div>
                <p className="text-xs text-text-secondary dark:text-slate-300 mt-2">
                  Full continuous biometric monitoring, PDF health report exports, abnormal heart rhythm notifications.
                </p>
                <ul className="text-xs space-y-2 mt-4 text-text-secondary dark:text-slate-300">
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
                className="mt-6 w-full py-2.5 rounded-lg border border-border-subtle dark:border-slate-700 text-xs font-bold text-text-primary dark:text-white text-center hover:bg-surface-subtle dark:hover:bg-slate-800 transition-colors block"
              >
                Included by Default
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-primary dark:border-sky-500 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 right-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-secondary dark:text-sky-400 mb-1">
                  Bundled Care Add-On
                </div>
                <h4 className="text-xl font-bold text-primary dark:text-white">Skyline Care+ Concierge</h4>
                <div className="text-2xl font-extrabold text-text-primary dark:text-white mt-2">
                  {formatNgn(45_000)} <span className="text-xs font-normal text-text-muted dark:text-slate-400">/ month (1st year free with band)</span>
                </div>
                <p className="text-xs text-text-secondary dark:text-slate-300 mt-2">
                  24/7 on-demand 1-tap video consults with board-certified US doctors, instant prescription routing, and rapid cardiac triage.
                </p>
                <ul className="text-xs space-y-2 mt-4 text-text-secondary dark:text-slate-300">
                  <li className="flex items-center gap-2 font-semibold text-primary dark:text-sky-400">
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
                Claim With Band Bundle
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-slate-400 mb-1">
                  Family & Chronic Care
                </div>
                <h4 className="text-xl font-bold text-primary dark:text-white">Skyline Care+ Family</h4>
                <div className="text-2xl font-extrabold text-text-primary dark:text-white mt-2">
                  {formatNgn(89_000)} <span className="text-xs font-normal text-text-muted dark:text-slate-400">/ month for up to 4 bands</span>
                </div>
                <p className="text-xs text-text-secondary dark:text-slate-300 mt-2">
                  Shared family dashboard, senior fall escalation, remote caregiver alerts, and pediatric/geriatric specialist access.
                </p>
                <ul className="text-xs space-y-2 mt-4 text-text-secondary dark:text-slate-300">
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
                className="mt-6 w-full py-2.5 rounded-lg border border-border-subtle dark:border-slate-700 text-xs font-bold text-text-primary dark:text-white text-center hover:bg-surface-subtle dark:hover:bg-slate-800 transition-colors block"
              >
                Select Family Plan
              </Link>
            </div>
          </div>

          {/* Secondary Clinician Recruiting Banner */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-border-subtle dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-sky-950/80 text-primary dark:text-sky-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">stethoscope</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">
                  Are you a Board-Certified Physician or Medical Specialist?
                </div>
                <div className="text-[11px] sm:text-xs text-text-muted dark:text-slate-400">
                  Join our on-demand clinical telemetry network. Rapid MDCN license verification and malpractice coverage included.
                </div>
              </div>
            </div>
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-surface-subtle dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-primary dark:text-sky-300 border border-border-subtle dark:border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
            >
              <span>Apply to Clinician Roster</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. HARDWARE LINEUP & COMPARISON MATRIX ────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white dark:bg-slate-950 border-b border-border-subtle dark:border-slate-800 transition-colors duration-200" id="hardware-lineup">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary dark:text-sky-400">
              Choose Your Device
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight mt-1">
              Skyline Health Biometric Fleet
            </h2>
            <p className="text-sm sm:text-base text-text-secondary dark:text-slate-300 mt-3">
              Engineered for hospital-grade precision. Backed by the world’s most advanced on-demand physician network.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Product 1: PulseBand Pro */}
            <div className="bg-surface-canvas dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-video bg-slate-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-border-subtle dark:border-slate-800">
                  <img
                    src="/images/devices/sky_pulseband_pro.png"
                    alt="Skyline PulseBand Pro screenless health tracker band"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
                    SLIM SCREENLESS
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Skyline PulseBand Pro</h3>
                <p className="text-xs text-text-muted mt-1">
                  Lightweight screenless biometric band for screen-free athletes and continuous sleep tracking.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary dark:text-blue-400 font-mono">{formatNgn(HARDWARE_PRICES.band)}</span>
                  <span className="text-xs text-text-muted line-through">{formatNgn(529_000)}</span>
                </div>
                <ul className="text-xs space-y-2 mt-6 text-text-secondary border-t border-border-subtle dark:border-slate-800 pt-4">
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
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-sm">close</span>
                    Dry-Contact ECG Bezel (Ultra Only)
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout?device=pulseband"
                className="mt-8 w-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-primary dark:text-blue-400 border border-border-subtle dark:border-slate-700 text-xs font-bold py-3 rounded-xl text-center shadow-xs transition-colors block"
              >
                Order PulseBand — {formatNgn(HARDWARE_PRICES.band)}
              </Link>
            </div>

            {/* Product 2: VitalsBand Ultra (HERO) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-primary dark:border-blue-500 p-6 flex flex-col justify-between shadow-xl relative lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary dark:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">star</span> Flagship Clinical Band
              </div>
              <div>
                <div className="aspect-video bg-slate-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-blue-100 dark:border-blue-900/50">
                  <img
                    src="/images/devices/sky_vitalsband_ultra.png"
                    alt="Flagship Skyline VitalsBand Ultra with aerospace titanium core and woven strap"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                    TITANIUM • LEAD II ECG
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Skyline VitalsBand™ Ultra</h3>
                <p className="text-xs text-text-muted mt-1">
                  Aerospace Grade 5 Titanium screenless biometric band with dry-contact Lead II ECG electrodes, 8-channel optical PPG, and standalone cellular telemetry.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary dark:text-blue-400 font-mono">{formatNgn(HARDWARE_PRICES.ultra)}</span>
                  <span className="text-xs text-text-muted line-through">{formatNgn(HARDWARE_PRICES.ultraWas)}</span>
                  <span className="text-[11px] font-mono text-status-normal font-semibold">
                    1 Yr Care+ Inc.
                  </span>
                </div>
                <ul className="text-xs space-y-2 mt-6 text-text-secondary border-t border-border-subtle dark:border-slate-800 pt-4">
                  <li className="flex items-center gap-2 font-semibold text-primary dark:text-blue-400">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Grade 5 Titanium Chassis + Micro-LED
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    30-Sec Medical-Grade Lead II ECG
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    7–14 Day Continuous Battery Life
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Standalone LTE-M Telehealth Link
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
                Order VitalsBand Ultra — {formatNgn(HARDWARE_PRICES.ultra)}
              </Link>
            </div>

            {/* Product 3: Clinical Biosensor Suite */}
            <div className="bg-surface-canvas dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-video bg-slate-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-border-subtle dark:border-slate-800">
                  <img
                    src="/images/devices/sky_biosensor_suite.png"
                    alt="Clinical Biosensor Suite with VitalsBand, sleep ring, and cellular base hub"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    HOSPITAL RPM BUNDLE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Clinical Biosensor Suite</h3>
                <p className="text-xs text-text-muted mt-1">
                  Complete diagnostic ecosystem: VitalsBand Ultra + Biosensor Ring + Home Cellular Base Hub.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary dark:text-blue-400 font-mono">{formatNgn(HARDWARE_PRICES.suite)}</span>
                  <span className="text-xs text-text-muted line-through">{formatNgn(1_249_000)}</span>
                </div>
                <ul className="text-xs space-y-2 mt-6 text-text-secondary border-t border-border-subtle dark:border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Includes VitalsBand + Continuous Sleep Ring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Continuous Nocturnal SpO2 Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    Cellular Hub for Zero-WiFi Elder Care
                  </li>
                  <li className="flex items-center gap-2 text-primary dark:text-blue-400 font-semibold">
                    <span className="material-symbols-outlined text-status-normal text-sm">check</span>
                    CPT 99453 / 99454 Insurance Covered
                  </li>
                </ul>
              </div>
              <Link
                href="/checkout?device=suite"
                className="mt-8 w-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-primary dark:text-blue-400 border border-border-subtle dark:border-slate-700 text-xs font-bold py-3 rounded-xl text-center shadow-xs transition-colors block"
              >
                Order Complete Suite — {formatNgn(HARDWARE_PRICES.suite)}
              </Link>
            </div>
          </div>

          {/* Technical Hardware Specification Matrix */}
          <div className="mt-14 sm:mt-16 bg-surface-canvas dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 overflow-hidden" id="specs">
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-border-subtle dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-text-primary">
                Technical Hardware Specification Matrix
              </h4>
              <span className="text-xs text-text-muted font-mono">
                All devices include medical-grade continuous telemetry software
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead className="bg-surface-subtle dark:bg-slate-800/60 text-text-secondary uppercase tracking-wider border-b border-border-subtle dark:border-slate-800 text-[11px] font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Hardware Feature</th>
                    <th className="py-3.5 px-4">PulseBand Pro ({formatNgn(HARDWARE_PRICES.band)})</th>
                    <th className="py-3.5 px-4 text-primary dark:text-blue-400">VitalsBand™ Ultra ({formatNgn(HARDWARE_PRICES.ultra)})</th>
                    <th className="py-3.5 px-4">Biosensor Suite ({formatNgn(HARDWARE_PRICES.suite)})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle dark:divide-slate-800">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Form Factor & Materials</td>
                    <td className="py-3 px-4 text-text-secondary">Matte Antimicrobial Silicone</td>
                    <td className="py-3 px-4 font-bold text-primary dark:text-blue-400">Grade 5 Titanium + Woven Loop</td>
                    <td className="py-3 px-4 text-text-secondary">Titanium Band + Titanium Ring</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Display Interface</td>
                    <td className="py-3 px-4 text-text-secondary">Screenless (Status Micro-LED)</td>
                    <td className="py-3 px-4 font-bold text-primary dark:text-blue-400">Screenless (Clinical Micro-LED)</td>
                    <td className="py-3 px-4 text-text-secondary">Screenless Multi-Sensor Pods</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">ECG Capability</td>
                    <td className="py-3 px-4 text-text-secondary">No (PPG Pulse Only)</td>
                    <td className="py-3 px-4 font-bold text-status-normal">Dry-Contact Lead I & II (500Hz)</td>
                    <td className="py-3 px-4 font-bold text-status-normal">Dual Lead I/II + Continuous Vector</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-text-primary">Battery Life</td>
                    <td className="py-3 px-4 text-text-secondary">14 Days Continuous</td>
                    <td className="py-3 px-4 font-bold text-primary dark:text-blue-400">7–14 Days Continuous</td>
                    <td className="py-3 px-4 text-text-secondary">7–14 Days Band / 10 Days Ring</td>
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
      <section className="py-14 sm:py-20 bg-surface-subtle dark:bg-slate-950 border-y border-border-subtle dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Verified Lives Impacted
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight mt-1">
              Patient Stories & Physician Backing
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3">
              See how continuous wrist telemetry paired with sub-90s doctor consults catches arrhythmias early and prevents hospital readmissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg">star</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                  &quot;At 2 AM in Victoria Island, my Skyline Band vibrated with an asymptomatic 160 bpm rhythm alert. I tapped the 1-tap call, and Dr. Okafor reviewed my live ECG right on his screen. He guided me through a vagal maneuver and dispatched emergency medication before things escalated. This platform saved my life.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle dark:border-slate-800">
                <img
                  src="/images/avatars/patient_kelechi.jpg"
                  alt="Kelechi Adeleke patient portrait"
                  className="w-11 h-11 rounded-full object-cover border border-border-subtle dark:border-slate-700"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Kelechi Adeleke</div>
                  <div className="text-[11px] text-text-muted">Verified VitalsBand™ Ultra Owner • Ikoyi, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 shadow-sm flex flex-col justify-between">
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
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle dark:border-slate-800">
                <img
                  src="/images/avatars/dr_chidi_okafor.jpg"
                  alt="Dr. Chidi Okafor Cardiologist"
                  className="w-11 h-11 rounded-full object-cover border border-border-subtle dark:border-slate-700"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Dr. Chinedu Okafor, MBBS, FWACP</div>
                  <div className="text-[11px] text-text-muted">Consultant Cardiologist, LUTH Idi-Araba, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border-subtle dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg">star</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                  &quot;Standard consumer smartwatches take SpO2 snapshots every 30 minutes. Skyline’s continuous band tracks nocturnal desaturations with hospital-grade accuracy, letting us optimize chronic respiratory therapy across Nigeria without costly sleep labs.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border-subtle dark:border-slate-800">
                <img
                  src="/images/avatars/dr_folake_bello.jpg"
                  alt="Dr. Folake Bello Senior Physician"
                  className="w-11 h-11 rounded-full object-cover border border-border-subtle dark:border-slate-700"
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
              <span>Order VitalsBand™ Ultra — {formatNgn(HARDWARE_PRICES.ultra)}</span>
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
      <Footer />
    </div>
  );
}
