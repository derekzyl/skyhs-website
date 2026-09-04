'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EcgWaveform from '../../../../components/EcgWaveform';

export default function VirtualConsultationRoomPage() {
  const [activeTab, setActiveTab] = useState<'soap' | 'scribe' | 'rx'>('soap');
  const [isFinalized, setIsFinalized] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  // SOAP State
  const [subjective, setSubjective] = useState(
    'Patient presents with recurrent episodes of exertional palpitations and lightheadedness when climbing stairs over the past 5 days. Denies syncope, angina, or orthopnea.'
  );
  const [objective, setObjective] = useState(
    'Skyline VitalsWatch Pro live telemetry: Resting heart rate 78 BPM, peak exertional rate 134 BPM. Lead II ECG shows episodic sinus tachycardia with normal PR and QTc intervals. SpO2 98% on room air. BP 124/82 mmHg.'
  );
  const [assessment, setAssessment] = useState(
    '1. Episodic Sinus Tachycardia (ICD-10: R00.0) - Exertional / Dehydration etiology\n2. Essential Hypertension (ICD-10: I10) - Well-controlled on telemetry'
  );
  const [plan, setPlan] = useState(
    '1. Prescribe Metoprolol Succinate 25 mg oral once daily.\n2. Continue 7-day continuous ambulatory cardiac telemetry via Skyline VitalsWatch Pro.\n3. Return for virtual telemetry review in 14 days.'
  );

  const [medication, setMedication] = useState('Metoprolol Succinate 25mg ER Tablet');
  const [instructions, setInstructions] = useState('Take 1 tablet by mouth daily in the morning with food.');
  const [pharmacy, setPharmacy] = useState('Walgreens Pharmacy #4021 (750 S Rampart Blvd)');
  const [rxSent, setRxSent] = useState(false);

  const handlePushToEpic = () => {
    setIsFinalized(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-slate-950 text-slate-100 font-sans">
      {/* ── LEFT: DUAL-STREAM VIDEO & REAL-TIME TELEMETRY ──────────────────────────── */}
      <div className="lg:w-7/12 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden bg-slate-900 border-r border-slate-800">
        {/* Top Encrypted Mast */}
        <div className="flex items-center justify-between z-10 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 live-pulse" />
            <div>
              <span className="text-xs font-mono font-bold text-white">
                CALL IN PROGRESS • 06:42
              </span>
              <div className="text-[10px] text-slate-400 font-mono">
                AES-256 WebRTC • 1080p 60fps • HIPAA Compliant
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-sky-950 border border-sky-800 text-[11px] font-mono text-sky-400">
              AI Scribe Recording
            </span>
          </div>
        </div>

        {/* Remote Patient Stream Area */}
        <div className="relative flex-1 min-h-[360px] sm:min-h-[460px] rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex items-center justify-center">
          <img
            src="/images/avatars/patient_zainab.jpg"
            alt="Patient Zainab Balogun"
            className="w-full h-full object-cover"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Top Patient Label */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <span className="font-bold text-white">Zainab Balogun</span>
              <span className="text-slate-400 text-[11px] ml-2">38 F • MRN #SK-94021</span>
            </div>
          </div>

          {/* Doctor Self-View PiP */}
          <div className="absolute top-4 right-4 w-28 sm:w-36 h-36 sm:h-44 rounded-xl overflow-hidden border-2 border-sky-500/50 shadow-2xl bg-slate-900 z-10">
            {cameraOff ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-950">
                <span className="material-symbols-outlined text-2xl">videocam_off</span>
                <span className="text-[10px] mt-1">Camera Off</span>
              </div>
            ) : (
              <img
                src="/images/avatars/dr_chidi_okafor.jpg"
                alt="Dr. Chidi Okafor"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">
              You (Dr. Okafor)
            </div>
          </div>

          {/* Live Biometric Telemetry Floating HUD at bottom of Video */}
          <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
            <div className="bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-900/40 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="material-symbols-outlined text-sm">watch</span>
                  <span>Patient Wrist Sensor Live Stream (Lead II)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Wrist Temp: 36.8°C • Battery: 88%
                </div>
              </div>

              {/* Waveform */}
              <EcgWaveform height={65} heartRate={104} rhythmText="Lead II • Mild Tachycardia" />

              {/* 3 Metric cards */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="py-1.5 px-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Heart Rate</div>
                  <div className="text-sm font-mono font-bold text-rose-400">104 BPM</div>
                </div>
                <div className="py-1.5 px-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Oxygen Sat</div>
                  <div className="text-sm font-mono font-bold text-sky-400">98% SpO2</div>
                </div>
                <div className="py-1.5 px-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Blood Pressure</div>
                  <div className="text-sm font-mono font-bold text-emerald-400">124/82 mmHg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In-Call Controls Toolbar */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setMicMuted(!micMuted)}
            className={`p-3 rounded-xl border transition-all ${
              micMuted
                ? 'bg-rose-950 border-rose-600 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
            title="Toggle Mic"
          >
            <span className="material-symbols-outlined text-xl">
              {micMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            onClick={() => setCameraOff(!cameraOff)}
            className={`p-3 rounded-xl border transition-all ${
              cameraOff
                ? 'bg-rose-950 border-rose-600 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
            title="Toggle Camera"
          >
            <span className="material-symbols-outlined text-xl">
              {cameraOff ? 'videocam_off' : 'videocam'}
            </span>
          </button>

          <button
            className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700"
            title="Share Screen"
          >
            <span className="material-symbols-outlined text-xl">screen_share</span>
          </button>

          <Link
            href="/portal/dashboard"
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-950 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">call_end</span>
            <span>Leave Encounter</span>
          </Link>
        </div>
      </div>

      {/* ── RIGHT: CLINICAL DOCUMENTATION & EHR PUSH ───────────────────────────────── */}
      <div className="lg:w-5/12 flex flex-col justify-between p-4 sm:p-6 bg-slate-950">
        <div className="space-y-4">
          {/* Patient Top Metadata */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Eleanor Vance-Kovacs</h3>
              <div className="text-[11px] text-slate-400 font-mono">
                DOB: 04/12/1962 (64y) • MRN: #SK-94021 • CPT: 99214 + 99453
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
              HL7 BRIDGE READY
            </span>
          </div>

          {/* Navigation Tabs (SOAP, AI Scribe, E-Prescriptions) */}
          <div className="flex border-b border-slate-800">
            {[
              { key: 'soap', label: 'SOAP Note', icon: 'description' },
              { key: 'scribe', label: 'AI Medical Scribe', icon: 'auto_awesome' },
              { key: 'rx', label: 'E-Prescription', icon: 'medication' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: SOAP NOTE */}
          {activeTab === 'soap' && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono uppercase font-bold text-sky-400 block mb-1">
                  Subjective (S)
                </label>
                <textarea
                  rows={2}
                  value={subjective}
                  onChange={(e) => setSubjective(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase font-bold text-emerald-400 block mb-1">
                  Objective (O) - Telemetry Findings
                </label>
                <textarea
                  rows={3}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase font-bold text-amber-400 block mb-1">
                  Assessment (A) - ICD-10
                </label>
                <textarea
                  rows={2}
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase font-bold text-purple-400 block mb-1">
                  Plan (P)
                </label>
                <textarea
                  rows={2}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: AI MEDICAL SCRIBE */}
          {activeTab === 'scribe' && (
            <div className="space-y-3">
              <div className="p-3 bg-sky-950/40 rounded-xl border border-sky-900/40 text-xs text-sky-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">mic</span>
                  <span>Listening to conversation (Clinical Speech Model v4)</span>
                </div>
                <button
                  onClick={() => setActiveTab('soap')}
                  className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-[10px] font-bold"
                >
                  Import to SOAP
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2.5 max-h-[320px] overflow-y-auto font-mono text-[11px]">
                <p className="text-slate-400">
                  <span className="text-sky-400 font-bold">[09:42:10] Dr. Vance:</span> Hello Eleanor, looking at your Skyline VitalsWatch telemetry strip right now. How are you feeling today?
                </p>
                <p className="text-slate-300">
                  <span className="text-amber-400 font-bold">[09:42:35] Eleanor:</span> Hi Doctor. I noticed that yesterday while carrying groceries upstairs, my watch alerted me my heart rate hit 134.
                </p>
                <p className="text-slate-400">
                  <span className="text-sky-400 font-bold">[09:43:02] Dr. Vance:</span> Yes, I have that exact telemetry window pulled up. Your rhythm shows standard P-waves with sinus tachycardia, no AFib or ventricular runs.
                </p>
                <p className="text-emerald-400 font-semibold pt-2 border-t border-slate-800">
                  ★ AI Extraction: Chief complaint identified as exertional palpitations. Normal baseline ST segment. Recommend initiating low-dose beta blocker.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: E-PRESCRIPTIONS */}
          {activeTab === 'rx' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Medication & Dosage
                </label>
                <input
                  type="text"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Sig / Instructions
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Preferred Pharmacy
                </label>
                <input
                  type="text"
                  value={pharmacy}
                  onChange={(e) => setPharmacy(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setRxSent(true)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    rxSent
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {rxSent ? 'check_circle' : 'send'}
                  </span>
                  <span>{rxSent ? 'Prescription E-Transmitted to Walgreens' : 'Transmit Rx via Surescripts'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── FINALIZATION & EPIC PUSH FOOTER ───────────────────────────────────────── */}
        <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
          {isFinalized ? (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 text-center space-y-1">
              <div className="font-bold flex items-center justify-center gap-1.5 text-emerald-400">
                <span className="material-symbols-outlined text-base">verified</span>
                Encounter Finalized & Pushed to Epic MyChart!
              </div>
              <div className="text-[11px] text-emerald-400/80">
                HL7 FHIR DocumentReference #FHIR-94021 created. Patient can view clinical summary in Skyline mobile app.
              </div>
            </div>
          ) : (
            <button
              onClick={handlePushToEpic}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">sync_saved_locally</span>
              <span>Finalize Encounter & Push to Epic/MyChart</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Provider: Dr. Julian Vance (NPI: 1892049102)</span>
            <Link href="/portal/dashboard" className="text-sky-400 hover:text-sky-300">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
