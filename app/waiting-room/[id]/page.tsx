'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import EcgWaveform from '../../../components/EcgWaveform';

export default function PatientWebWaitingRoomPage() {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const [doctorJoined, setDoctorJoined] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setDoctorJoined(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans">
      <Navbar />

      <div className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
              <span>TELEHEALTH WAITING ROOM • WEBRTC SECURED</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Virtual Pre-Call Diagnostic & Sensor Check
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Encounter with <span className="text-white font-bold">Dr. Julian Vance, MD</span> (Cardiology)
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="text-slate-400 text-[10px] uppercase">Estimated Wait</div>
            <div className="text-base font-bold text-sky-400">
              {doctorJoined ? 'Doctor is ready!' : `~00:${countdown.toString().padStart(2, '0')}`}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Doctor Status Banner */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            doctorJoined
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img
                src="/images/avatars/dr_chidi_okafor.jpg"
                alt="Dr. Chidi Okafor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-white block">Dr. Chidi Okafor, MD</span>
              <span className="text-[11px] text-slate-400">
                {doctorJoined
                  ? 'Doctor has entered the session. Click below to join!'
                  : 'Reviewing your past 24-hour ambulatory ECG baseline...'}
              </span>
            </div>
          </div>

          {doctorJoined && (
            <Link
              href="/portal/consultation/sess-01"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">videocam</span>
              <span>Admit to Encounter Now</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Video Preview & Controls */}
          <div className="md:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-base">videocam</span>
              Self Camera & Audio Check
            </h3>

            {/* Video Box */}
            <div className="relative h-60 rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
              {cameraEnabled ? (
                <img
                  src="/images/avatars/patient_zainab.jpg"
                  alt="Patient Self View"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-slate-500 space-y-1">
                  <span className="material-symbols-outlined text-4xl">videocam_off</span>
                  <div className="text-xs">Camera is disabled</div>
                </div>
              )}

              <div className="absolute top-3 left-3 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                1080p WebRTC
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`p-2.5 rounded-full border transition-all ${
                    micEnabled
                      ? 'bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700'
                      : 'bg-rose-900/90 border-rose-600 text-rose-300'
                  }`}
                  title="Toggle Microphone"
                >
                  <span className="material-symbols-outlined text-lg">
                    {micEnabled ? 'mic' : 'mic_off'}
                  </span>
                </button>

                <button
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className={`p-2.5 rounded-full border transition-all ${
                    cameraEnabled
                      ? 'bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700'
                      : 'bg-rose-900/90 border-rose-600 text-rose-300'
                  }`}
                  title="Toggle Camera"
                >
                  <span className="material-symbols-outlined text-lg">
                    {cameraEnabled ? 'videocam' : 'videocam_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center font-mono">
              Microphone status: {micEnabled ? 'Active (Input levels normal)' : 'Muted'}
            </div>
          </div>

          {/* Right: Watch Sensor Bridge Diagnostic */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-base">watch</span>
                  VitalsWatch Live Bridge
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-400 font-mono text-[10px] font-bold">
                  CONNECTED
                </span>
              </div>

              {/* Waveform */}
              <EcgWaveform height={70} heartRate={104} rhythmText="Real-time Lead II trace" />

              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase block">Heart Rate</span>
                  <span className="text-sm font-bold text-rose-400">104 BPM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase block">SpO2 Level</span>
                  <span className="text-sm font-bold text-sky-400">98% Sat</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-white font-bold">Telemetry Bridge Ready</div>
                <div>Your continuous sensor feed will sync automatically when doctor admits you.</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
