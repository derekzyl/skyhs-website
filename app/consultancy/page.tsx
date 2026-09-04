'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { apiGet, apiPost, errorMessage, getAccessToken } from '../../lib/api';
import type { Consultant, ConsultationSession, TimeSlot } from '../../lib/types';

function formatSlotLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function ConsultancyDiscoveryPage() {
  const router = useRouter();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [activeBookingDoctor, setActiveBookingDoctor] = useState<Consultant | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedSession, setBookedSession] = useState<ConsultationSession | null>(null);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [dayOffset, setDayOffset] = useState(0);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlotStart, setSelectedSlotStart] = useState<string | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [telemetryConsent, setTelemetryConsent] = useState(true);

  const specialties = ['All', 'Cardiology', 'Endocrinology', 'General Health', 'Neurology', 'Pulmonology'];
  const dayLabels = ['Today', 'Tomorrow', 'In 2 days'];

  const loadConsultants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!getAccessToken()) {
        setError('Sign in to browse specialists and book an encounter.');
        setConsultants([]);
        return;
      }
      const params = new URLSearchParams();
      if (selectedSpecialty !== 'All') params.set('specialty', selectedSpecialty);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      const qs = params.toString();
      const data = await apiGet<Consultant[]>(
        `/api/v1/consultancy/consultants${qs ? `?${qs}` : ''}`
      );
      setConsultants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(errorMessage(err, 'Failed to load consultants.'));
      setConsultants([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedSpecialty]);

  useEffect(() => {
    const t = setTimeout(() => {
      void loadConsultants();
    }, 250);
    return () => clearTimeout(t);
  }, [loadConsultants]);

  useEffect(() => {
    if (!activeBookingDoctor) {
      setSlots([]);
      setSelectedSlotStart(null);
      return;
    }
    let cancelled = false;
    (async () => {
      setSlotsLoading(true);
      setSelectedSlotStart(null);
      try {
        const d = new Date();
        d.setDate(d.getDate() + dayOffset);
        const date = d.toISOString().slice(0, 10);
        const data = await apiGet<TimeSlot[]>(
          `/api/v1/consultancy/consultants/${activeBookingDoctor.id}/slots?date=${date}`
        );
        if (cancelled) return;
        const available = (data || []).filter((s) => s.available);
        setSlots(available);
        setSelectedSlotStart(available[0]?.start || null);
      } catch {
        if (!cancelled) {
          setSlots([]);
          setSelectedSlotStart(null);
        }
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeBookingDoctor, dayOffset]);

  const filteredDoctors = useMemo(() => {
    return consultants.filter((doc) => {
      const matchesAvailable = !availableOnly || doc.is_available_now;
      return matchesAvailable;
    });
  }, [consultants, availableOnly]);

  const handleConfirmBooking = async () => {
    if (!activeBookingDoctor) return;
    if (!getAccessToken()) {
      router.push('/login');
      return;
    }
    if (!selectedSlotStart) {
      setBookingError('Select an available time slot.');
      return;
    }
    setBookingError(null);
    setBookingBusy(true);
    try {
      const session = await apiPost<ConsultationSession>('/api/v1/consultancy/sessions', {
        consultant_id: activeBookingDoctor.id,
        scheduled_at: selectedSlotStart,
        duration_minutes: 30,
        session_type: 'chat',
        chief_complaint: chiefComplaint.trim() || undefined,
        symptoms: [],
      });
      setBookedSession(session);
      setBookingSuccess(true);
    } catch (err) {
      setBookingError(errorMessage(err, 'Booking failed.'));
    } finally {
      setBookingBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary">
      <Navbar />

      <div className="bg-gradient-to-r from-primary via-primary-container to-secondary text-white py-12 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-status-normal live-pulse" />
            <span>24/7 ACTIVE TELEMETRY PHYSICIAN ROSTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Find a Board-Certified Telehealth Specialist
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
            Every specialist in the Skyline network is licensed to review continuous wrist-sensor data in real-time. Schedule an encounter or start an urgent consultation in minutes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-border-subtle p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, hospital or condition..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-subtle bg-surface-subtle/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="md:col-span-4 flex items-center justify-end">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <span className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-status-normal" />
                  Available Now Only
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mr-2">
              Specialties:
            </span>
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedSpecialty === spec
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'bg-surface-subtle text-text-secondary hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-text-secondary">
            Showing <span className="text-primary font-bold">{filteredDoctors.length}</span> verified specialists
          </div>
        </div>

        {error && (
          <p className="mb-4 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            {error}{' '}
            {!getAccessToken() && (
              <a href="/login" className="font-bold underline">
                Sign in
              </a>
            )}
          </p>
        )}

        {loading ? (
          <div className="p-12 text-center text-sm text-text-muted">Loading specialists…</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-border-subtle">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-2">
              person_search
            </span>
            <h3 className="text-base font-bold text-text-primary">No specialists found</h3>
            <p className="text-xs text-text-muted mt-1">
              Try adjusting your specialty filter or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-border-subtle p-6 hover:border-primary/40 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={doc.avatar_url || '/images/avatars/dr_chidi_okafor.jpg'}
                        alt={doc.display_name}
                        className="w-16 h-16 rounded-xl object-cover border border-border-subtle"
                      />
                      {doc.is_available_now && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-status-normal border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-extrabold text-text-primary truncate">
                          {doc.display_name}
                        </h3>
                        <span className="material-symbols-outlined text-primary text-base">
                          verified
                        </span>
                      </div>
                      <div className="text-xs font-bold text-secondary truncate">{doc.title}</div>
                      <div className="text-[11px] text-text-muted truncate">{doc.hospital}</div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {doc.bio}
                  </p>

                  <div className="space-y-1.5 mb-4 pb-4 border-b border-border-subtle">
                    {(doc.credentials?.[0] || doc.specialty) && (
                      <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                        <span className="material-symbols-outlined text-sm text-primary">school</span>
                        <span className="truncate">{doc.credentials?.[0] || doc.specialty}</span>
                      </div>
                    )}
                    {doc.languages?.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                        <span className="material-symbols-outlined text-sm text-secondary">language</span>
                        <span>Languages: {doc.languages.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs mb-4">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <span className="material-symbols-outlined text-sm">star</span>
                      {doc.rating_avg?.toFixed?.(2) ?? doc.rating_avg}
                      <span className="text-text-muted font-normal">({doc.review_count})</span>
                    </div>
                    <div
                      className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                        doc.is_available_now
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {doc.is_available_now
                        ? 'Available Now'
                        : doc.next_available_slot || 'Next slot TBD'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted">Fee</span>
                    <div className="text-lg font-extrabold text-text-primary font-mono">
                      ${doc.fee}
                      <span className="text-xs font-normal text-text-muted"> / visit</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveBookingDoctor(doc);
                      setBookingSuccess(false);
                      setBookedSession(null);
                      setBookingError(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    <span>Book Encounter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {activeBookingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border-subtle relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveBookingDoctor(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {bookingSuccess && bookedSession ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Consultation Confirmed!</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                  Your clinical encounter with{' '}
                  <span className="font-bold">{activeBookingDoctor.display_name}</span> has been
                  reserved.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveBookingDoctor(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border-subtle hover:bg-surface-subtle text-text-primary text-xs font-bold transition-colors"
                  >
                    Close Window
                  </button>
                  <button
                    onClick={() => router.push(`/waiting-room/${bookedSession.id}`)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">meeting_room</span>
                    <span>Enter Virtual Waiting Room</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-border-subtle">
                  <img
                    src={activeBookingDoctor.avatar_url || '/images/avatars/dr_chidi_okafor.jpg'}
                    alt={activeBookingDoctor.display_name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-base font-bold text-text-primary">
                      {activeBookingDoctor.display_name}
                    </h3>
                    <div className="text-xs text-secondary font-semibold">
                      {activeBookingDoctor.title}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Select Encounter Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {dayLabels.map((label, idx) => (
                      <button
                        key={label}
                        onClick={() => setDayOffset(idx)}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                          dayOffset === idx
                            ? 'bg-primary/5 border-primary text-primary font-bold'
                            : 'border-border-subtle hover:bg-surface-subtle'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Available Clinical Windows
                  </label>
                  {slotsLoading && (
                    <p className="text-xs text-text-muted">Loading slots…</p>
                  )}
                  {!slotsLoading && slots.length === 0 && (
                    <p className="text-xs text-text-muted">
                      No open slots for this day. Try another date or ask the clinician to set
                      availability.
                    </p>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() => setSelectedSlotStart(slot.start)}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                          selectedSlotStart === slot.start
                            ? 'bg-primary-container text-white border-primary-container font-bold'
                            : 'border-border-subtle hover:bg-surface-subtle'
                        }`}
                      >
                        {formatSlotLabel(slot.start)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Chief Complaint / Primary Concern
                  </label>
                  <textarea
                    rows={2}
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    placeholder="E.g., Heart palpitations while climbing stairs..."
                    className="w-full p-2.5 rounded-lg border border-border-subtle text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="p-3 bg-surface-subtle rounded-xl border border-border-subtle flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={telemetryConsent}
                    onChange={(e) => setTelemetryConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-primary accent-primary"
                  />
                  <div className="text-[11px] text-text-secondary leading-relaxed">
                    <span className="font-bold text-text-primary block">
                      Bridge Skyline VitalsWatch Telemetry
                    </span>
                    Allow {activeBookingDoctor.display_name} to review my sensor feeds during this
                    visit.
                  </div>
                </div>

                {bookingError && (
                  <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {bookingError}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-border-subtle">
                  <div>
                    <span className="text-[10px] text-text-muted">Total Encounter Fee</span>
                    <div className="text-lg font-bold text-text-primary font-mono">
                      ${activeBookingDoctor.fee.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={bookingBusy || !selectedSlotStart}
                    className="px-6 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-md transition-colors disabled:opacity-60"
                  >
                    {bookingBusy ? 'Reserving…' : 'Confirm & Reserve Slot'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
