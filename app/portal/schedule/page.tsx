'use client';

import React, { useEffect, useState } from 'react';
import { apiGet, apiPut, errorMessage } from '../../../lib/api';
import type { AvailabilitySlot } from '../../../lib/types';

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function minutesToLabel(mins: number): string {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function labelToMinutes(label: string): number {
  const m = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return 9 * 60;
  let hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const ampm = (m[3] || '').toUpperCase();
  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  if (!ampm && hour <= 23) return hour * 60 + minute;
  return hour * 60 + minute;
}

type DayRow = {
  day: string;
  weekday: number;
  enabled: boolean;
  start: string;
  end: string;
  slotMinutes: number;
};

function defaultSchedule(): DayRow[] {
  return DAY_NAMES.map((day, weekday) => ({
    day,
    weekday,
    enabled: weekday < 5,
    start: '09:00 AM',
    end: weekday === 2 ? '01:00 PM' : '05:00 PM',
    slotMinutes: 30,
  }));
}

export default function ClinicianSchedulePage() {
  const [onCallEmergency, setOnCallEmergency] = useState(true);
  const [bufferMinutes, setBufferMinutes] = useState('10');
  const [schedule, setSchedule] = useState<DayRow[]>(defaultSchedule());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const slots = await apiGet<AvailabilitySlot[]>(
          '/api/v1/consultancy/consultants/me/availability'
        );
        if (cancelled) return;
        if (Array.isArray(slots) && slots.length > 0) {
          const next = defaultSchedule().map((row) => {
            const match = slots.find((s) => s.weekday === row.weekday && s.is_active);
            if (!match) return { ...row, enabled: false };
            return {
              ...row,
              enabled: true,
              start: minutesToLabel(match.start_minute),
              end: minutesToLabel(match.end_minute),
              slotMinutes: match.slot_minutes || 30,
            };
          });
          setSchedule(next);
        }
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load availability.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleDay = (index: number) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setSchedule(updated);
  };

  const updateField = (index: number, field: 'start' | 'end', value: string) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], [field]: value };
    setSchedule(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const slots = schedule
        .filter((row) => row.enabled)
        .map((row) => ({
          weekday: row.weekday,
          start_minute: labelToMinutes(row.start),
          end_minute: Math.max(labelToMinutes(row.end), labelToMinutes(row.start) + 30),
          slot_minutes: row.slotMinutes || parseInt(bufferMinutes, 10) || 30,
          is_active: true,
        }));
      await apiPut('/api/v1/consultancy/consultants/me/availability', { slots });
      setSuccess('Schedule preferences synchronized.');
    } catch (err) {
      setError(errorMessage(err, 'Failed to save availability.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Availability & Telehealth Schedule</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure clinical consultation hours, emergency on-call routing, and inter-visit buffer intervals.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Schedule Changes'}
        </button>
      </div>

      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-3">
          {success}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs dark:shadow-none">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-600 dark:text-sky-400">date_range</span>
            Weekly Recurring Telehealth Hours
          </h3>

          {loading ? (
            <p className="text-xs text-slate-500 py-6">Loading availability…</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
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
                    <span className={`font-bold ${item.enabled ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.day}
                    </span>
                  </div>

                  {item.enabled ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">From</span>
                        <input
                          type="text"
                          value={item.start}
                          onChange={(e) => updateField(index, 'start', e.target.value)}
                          className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-center w-24 text-xs"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">To</span>
                        <input
                          type="text"
                          value={item.end}
                          onChange={(e) => updateField(index, 'end', e.target.value)}
                          className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-center w-24 text-xs"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 italic">Off duty</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs dark:shadow-none">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Clinical Flow Settings
            </h4>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Inter-Consultation Buffer Time
              </label>
              <select
                value={bufferMinutes}
                onChange={(e) => setBufferMinutes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              >
                <option value="5">5 Minutes (Back-to-back)</option>
                <option value="10">10 Minutes (Standard SOAP Review)</option>
                <option value="15">15 Minutes (Complex Telemetry)</option>
                <option value="30">30 Minutes (Default slot)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onCallEmergency}
                  onChange={(e) => setOnCallEmergency(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-500 accent-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Accept Urgent Telemetry Alerts
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    Allow the platform triage system to ring your device if an assigned patient
                    triggers an acute arrhythmia.
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
