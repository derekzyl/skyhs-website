'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MOCK_CONSULTANTS, MockConsultant } from '../../data/mockConsultancyData';

export default function ConsultancyDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [activeBookingDoctor, setActiveBookingDoctor] = useState<MockConsultant | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Booking Modal State
  const [bookingDate, setBookingDate] = useState('Today, Oct 24');
  const [bookingSlot, setBookingSlot] = useState('02:45 PM');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [telemetryConsent, setTelemetryConsent] = useState(true);

  const specialties = ['All', 'Cardiology', 'Endocrinology', 'General Health', 'Neurology', 'Pulmonology'];

  const filteredDoctors = MOCK_CONSULTANTS.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesAvailable = !availableOnly || doc.isAvailableNow;
    return matchesSearch && matchesSpecialty && matchesAvailable;
  });

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary">
      <Navbar />

      {/* ── HEADER BANNER ────────────────────────────────────────────────────────── */}
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
            Every specialist in the Skyline network is licensed to review continuous wrist-sensor data in real-time. Schedule an encounter or start an urgent video consultation in minutes.
          </p>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-border-subtle p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, hospital or condition (e.g. Tachycardia)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-subtle bg-surface-subtle/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            {/* Instant Toggle */}
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

          {/* Specialty Filter Chips */}
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

      {/* ── DOCTORS DIRECTORY LIST ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-text-secondary">
            Showing <span className="text-primary font-bold">{filteredDoctors.length}</span> verified specialists
          </div>
          <div className="text-xs text-text-muted flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">tune</span>
            Sorted by telemetry responsiveness & rating
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
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

                  <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {doc.bio}
                  </p>

                  {/* Credentials / Languages */}
                  <div className="space-y-1.5 mb-4 pb-4 border-b border-border-subtle">
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                      <span className="material-symbols-outlined text-sm text-primary">school</span>
                      <span className="truncate">{doc.credentials[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                      <span className="material-symbols-outlined text-sm text-secondary">language</span>
                      <span>Languages: {doc.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Availability badge */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <span className="material-symbols-outlined text-sm">star</span>
                      {doc.rating}
                      <span className="text-text-muted font-normal">({doc.reviewCount})</span>
                    </div>
                    <div
                      className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                        doc.isAvailableNow
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {doc.isAvailableNow ? 'Available Now' : doc.nextSlot}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
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

      {/* ── INTERACTIVE BOOKING MODAL ──────────────────────────────────────────────── */}
      {activeBookingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border-subtle relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveBookingDoctor(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  Consultation Confirmed!
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                  Your clinical encounter with <span className="font-bold">{activeBookingDoctor.name}</span> has been confirmed for <span className="font-bold">{bookingDate} at {bookingSlot}</span>.
                </p>
                <div className="p-3 bg-surface-subtle rounded-xl text-left text-xs space-y-1">
                  <div className="font-bold text-text-primary">Telemetry Sync Active:</div>
                  <div className="text-text-muted">
                    Your Skyline VitalsWatch continuous sensor stream will automatically bridge into the virtual room upon entry.
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveBookingDoctor(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border-subtle hover:bg-surface-subtle text-text-primary text-xs font-bold transition-colors"
                  >
                    Close Window
                  </button>
                  <a
                    href="/waiting-room/sess-01"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">meeting_room</span>
                    <span>Enter Virtual Waiting Room</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-border-subtle">
                  <img
                    src={activeBookingDoctor.avatarUrl}
                    alt={activeBookingDoctor.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-base font-bold text-text-primary">
                      {activeBookingDoctor.name}
                    </h3>
                    <div className="text-xs text-secondary font-semibold">
                      {activeBookingDoctor.title}
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Select Encounter Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Today, Oct 24', 'Tomorrow, Oct 25', 'Sat, Oct 26'].map((date) => (
                      <button
                        key={date}
                        onClick={() => setBookingDate(date)}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                          bookingDate === date
                            ? 'bg-primary/5 border-primary text-primary font-bold'
                            : 'border-border-subtle hover:bg-surface-subtle'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Available Clinical Windows
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['02:45 PM', '03:15 PM', '04:30 PM', '05:00 PM', '06:15 PM'].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBookingSlot(slot)}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                          bookingSlot === slot
                            ? 'bg-primary-container text-white border-primary-container font-bold'
                            : 'border-border-subtle hover:bg-surface-subtle'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chief Complaint */}
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Chief Complaint / Primary Concern
                  </label>
                  <textarea
                    rows={2}
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    placeholder="E.g., Heart palpitations while climbing stairs, shortness of breath, or medication side effects..."
                    className="w-full p-2.5 rounded-lg border border-border-subtle text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Telemetry Consent Checkbox */}
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
                    Allow {activeBookingDoctor.name} to stream my real-time Lead II ECG, continuous pulse rate, and SpO2 sensor feeds during this video visit.
                  </div>
                </div>

                {/* Fee & Confirmation Button */}
                <div className="pt-2 flex items-center justify-between border-t border-border-subtle">
                  <div>
                    <span className="text-[10px] text-text-muted">Total Encouter Fee</span>
                    <div className="text-lg font-bold text-text-primary font-mono">
                      ${activeBookingDoctor.fee}.00
                    </div>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-6 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Confirm & Reserve Slot
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
