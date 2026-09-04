'use client';

import React, { useState } from 'react';

export default function ClinicianProfilePage() {
  const [fee, setFee] = useState('140');
  const [bio, setBio] = useState(
    'Board-certified in Clinical Cardiac Electrophysiology and Cardiovascular Disease. Pioneers wearable telemetry integration for sub-second arrhythmia detection and proactive atrial fibrillation intervention.'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">Clinician Profile & Rate Card</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your public specialist listing, board credentials, and telehealth fee structure.
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-sky-500/40">
            <img
              src="/images/avatars/dr_chidi_okafor.jpg"
              alt="Dr. Chidi Okafor"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Dr. Chidi Okafor, MD, FACC</h2>
              <span className="material-symbols-outlined text-sky-400 text-lg">verified</span>
            </div>
            <div className="text-xs text-sky-400 font-semibold">Chief of Telecardiology</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">NPI: 1892049102 • CA License #A149021</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Public Consultation Fee (Per 20-Min Encounter)
            </label>
            <div className="flex items-center gap-2 max-w-xs">
              <span className="text-sm font-bold text-white">$</span>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm"
              />
              <span className="text-xs text-slate-400">USD</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Professional Biography
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Verified Board Certifications
            </label>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>ABIM Board Certified in Cardiovascular Disease</span>
                <span className="text-emerald-400 text-[10px] font-mono font-bold">VERIFIED</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>Fellow of the Heart Rhythm Society (FHRS)</span>
                <span className="text-emerald-400 text-[10px] font-mono font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => alert('Profile and fee preferences updated successfully.')}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors"
          >
            Save Profile Updates
          </button>
        </div>
      </div>
    </div>
  );
}
