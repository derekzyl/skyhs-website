'use client';

import React, { useState } from 'react';

export default function ClinicianSchedulePage() {
  const [onCallEmergency, setOnCallEmergency] = useState(true);
  const [bufferMinutes, setBufferMinutes] = useState('10');

  const [schedule, setSchedule] = useState([
    { day: 'Monday', enabled: true, start: '09:00 AM', end: '05:00 PM', slots: 12 },
    { day: 'Tuesday', enabled: true, start: '09:00 AM', end: '05:00 PM', slots: 12 },
    { day: 'Wednesday', enabled: true, start: '09:00 AM', end: '01:00 PM', slots: 6 },
    { day: 'Thursday', enabled: true, start: '09:00 AM', end: '05:00 PM', slots: 12 },
    { day: 'Friday', enabled: true, start: '09:00 AM', end: '04:00 PM', slots: 10 },
    { day: 'Saturday', enabled: false, start: '10:00 AM', end: '02:00 PM', slots: 0 },
    { day: 'Sunday', enabled: false, start: '10:00 AM', end: '02:00 PM', slots: 0 },
  ]);

  const toggleDay = (index: number) => {
    const updated = [...schedule];
    updated[index].enabled = !updated[index].enabled;
    setSchedule(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Availability & Telehealth Schedule</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure clinical consultation hours, emergency on-call routing, and inter-visit buffer intervals.
          </p>
        </div>

        <button
          onClick={() => alert('Schedule preferences synchronized.')}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors"
        >
          Save Schedule Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weekly Slot Grid */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400">date_range</span>
            Weekly Recurring Telehealth Hours
          </h3>

          <div className="divide-y divide-slate-800">
            {schedule.map((item, index) => (
              <div
                key={item.day}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 w-36">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => toggleDay(index)}
                    className="w-4 h-4 rounded text-sky-500 accent-sky-500"
                  />
                  <span className={`font-bold ${item.enabled ? 'text-white' : 'text-slate-500'}`}>
                    {item.day}
                  </span>
                </div>

                {item.enabled ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">From</span>
                      <input
                        type="text"
                        defaultValue={item.start}
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center w-24"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">To</span>
                      <input
                        type="text"
                        defaultValue={item.end}
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center w-24"
                      />
                    </div>
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-mono text-[10px] hidden md:inline">
                      {item.slots} slots
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-500 italic">Off duty</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Preferences */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Clinical Flow Settings
            </h4>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Inter-Consultation Buffer Time
              </label>
              <select
                value={bufferMinutes}
                onChange={(e) => setBufferMinutes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              >
                <option value="5">5 Minutes (Back-to-back)</option>
                <option value="10">10 Minutes (Standard SOAP Review)</option>
                <option value="15">15 Minutes (Complex Telemetry)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onCallEmergency}
                  onChange={(e) => setOnCallEmergency(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-500 accent-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Accept Urgent Telemetry Alerts
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    Allow the platform triage system to ring your device if an assigned patient triggers an acute arrhythmia (AFib, SVT over 150 BPM).
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
