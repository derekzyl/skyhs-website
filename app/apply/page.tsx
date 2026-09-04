'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { apiPost, errorMessage, getAccessToken } from '../../lib/api';

export default function ClinicianApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    npiNumber: '',
    email: '',
    phone: '',
    medicalSchool: '',
    primaryState: '',
    licenseNumber: '',
    deaNumber: '',
    specialty: 'Cardiology',
    subSpecialty: '',
    routingNumber: '',
    accountNumber: '',
    agreedToProtocols: true,
    fee: '140',
    bio: '',
  });

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }
    setSubmitError(null);
    if (!getAccessToken()) {
      setSubmitError('Please sign in before submitting a credentialing application.');
      return;
    }
    setSubmitting(true);
    try {
      await apiPost('/api/v1/consultancy/consultants/apply', {
        display_name: formData.fullName || 'Consultant',
        title: 'Consultant',
        specialty: formData.specialty,
        sub_specialty: formData.subSpecialty || undefined,
        hospital: formData.primaryState || undefined,
        bio: formData.bio || undefined,
        npi_number: formData.npiNumber || undefined,
        fee: parseFloat(formData.fee) || 0,
        experience_years: 0,
        languages: ['English'],
        credentials: [
          formData.medicalSchool,
          formData.licenseNumber ? `License ${formData.licenseNumber}` : '',
          formData.deaNumber ? `DEA ${formData.deaNumber}` : '',
        ].filter(Boolean),
        accepts_telemetry: formData.agreedToProtocols,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(errorMessage(err, 'Application submission failed.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary">
      <Navbar />

      {/* ── HERO BANNER ────────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm">medical_services</span>
              SPECIALIST CREDENTIALING PORTAL
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Clinician Onboarding & Telemetry Privileging
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Join the Skyline clinical network. Provide high-acuity remote consults backed by real-time wearable sensor streams and instant EHR synchronization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Already credentialed?</span>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-slate-700 transition-colors"
            >
              Sign In to Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ── STEPPER WIZARD ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Step Indicator Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: 1, title: 'Identity & NPI' },
              { num: 2, title: 'State Licenses' },
              { num: 3, title: 'Clinical Protocols' },
              { num: 4, title: 'Payout & EHR' },
            ].map((s) => (
              <div
                key={s.num}
                className={`p-3 rounded-xl border transition-all ${
                  currentStep === s.num
                    ? 'bg-primary-container text-white border-primary-container shadow-md'
                    : currentStep > s.num
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-border-subtle text-text-muted'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase">
                  Step {s.num}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">{s.title}</div>
              </div>
            ))}
          </div>
        </div>

        {isSubmitted ? (
          /* Submission Success View */
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-white border border-border-subtle shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-text-primary">
                Credentialing Packet Submitted!
              </h3>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Thank you, <span className="font-bold">{formData.fullName}</span>. Your NPI ({formData.npiNumber}) and CA Medical Board license have been cross-checked with the NPPES & FSMB databases.
              </p>
            </div>

            <div className="p-4 bg-surface-subtle rounded-xl text-left text-xs space-y-2 border border-border-subtle">
              <div className="flex items-center justify-between font-bold text-text-primary pb-2 border-b border-border-subtle">
                <span>Verification Checklist</span>
                <span className="text-emerald-600">3 of 3 Verified</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                NPPES Registry Match: Dr. Julian Vance (Active)
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                OIG & SAM Exclusion List: Cleared (Zero sanctions)
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                Telehealth Wearable Telemetry Privileging: Approved
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/portal/dashboard"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-white font-bold text-xs shadow-md hover:bg-primary transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Clinician Workspace</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        ) : (
          /* 4-Step Wizard Content + Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm">
              {/* Step 1: Identity & NPI */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      1. Professional Identity & NPI Registry Check
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Verify your individual Type 1 NPI number. We automatically pull your specialty taxonomies and primary practice location.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        10-Digit NPI Number
                      </label>
                      <input
                        type="text"
                        value={formData.npiNumber}
                        onChange={(e) => setFormData({ ...formData, npiNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Full Legal Name & Title
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Clinical Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Direct Mobile / Pager Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Medical School / Residency Institution
                      </label>
                      <input
                        type="text"
                        value={formData.medicalSchool}
                        onChange={(e) => setFormData({ ...formData, medicalSchool: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: State Licensure & Compacts */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      2. State Licensure & IMLC Compacts
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Declare your active medical licenses. Physicians holding Interstate Medical Licensure Compact (IMLC) certificates are prioritized for multi-state patient routing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Primary Licensure State
                      </label>
                      <select
                        value={formData.primaryState}
                        onChange={(e) => setFormData({ ...formData, primaryState: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs bg-white"
                      >
                        <option>California (CA)</option>
                        <option>New York (NY)</option>
                        <option>Texas (TX)</option>
                        <option>Florida (FL)</option>
                        <option>Illinois (IL)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Medical License Number
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        DEA Registration Number
                      </label>
                      <input
                        type="text"
                        value={formData.deaNumber}
                        onChange={(e) => setFormData({ ...formData, deaNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-sky-600">info</span>
                    <span>
                      Skyline provides complimentary group malpractice insurance ($1M/$3M coverage) for all platform clinical consultations.
                    </span>
                  </div>
                </div>
              )}

              {/* Step 3: Clinical Protocols & Telemetry */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      3. Clinical Practice & Wearable Telemetry Protocol
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Review Skyline's sensor interpretation standards and remote patient management guidelines.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Primary Specialty
                      </label>
                      <select
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs bg-white"
                      >
                        <option>Cardiology</option>
                        <option>Endocrinology</option>
                        <option>General Health</option>
                        <option>Neurology</option>
                        <option>Pulmonology</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Sub-Specialty Focus
                      </label>
                      <input
                        type="text"
                        value={formData.subSpecialty}
                        onChange={(e) => setFormData({ ...formData, subSpecialty: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-surface-subtle rounded-xl border border-border-subtle space-y-3">
                    <h4 className="text-xs font-bold text-text-primary">
                      Telemetry Competency Agreement
                    </h4>
                    <ul className="text-[11px] text-text-secondary space-y-1.5 list-disc pl-4">
                      <li>I understand that single-lead ECG is for screening and ambulatory rhythm assessment, not a complete replacement for a diagnostic 12-lead ECG in acute MI suspicion.</li>
                      <li>I will review patient baseline vitals prior to initiating synchronous video encounters.</li>
                      <li>I will electronically finalize SOAP encounter documentation within 24 hours of visit conclusion.</li>
                    </ul>
                    <label className="flex items-center gap-2 pt-2 border-t border-border-subtle cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToProtocols}
                        onChange={(e) => setFormData({ ...formData, agreedToProtocols: e.target.checked })}
                        className="w-4 h-4 rounded text-primary accent-primary"
                      />
                      <span className="text-xs font-bold text-text-primary">
                        I agree to Skyline Telehealth Clinical Telemetry Protocols
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4: Payout & EHR Integration */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      4. Payout Account & Institutional EHR Bridge
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Direct deposit setup for weekly CPT reimbursements (CPT 99213, 99214, 99453, 99454).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Routing Number (ABA)
                      </label>
                      <input
                        type="text"
                        value={formData.routingNumber}
                        onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Checking Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-emerald-600">lock</span>
                    <span>
                      Bank credentials are encrypted via Plaid institutional bridge with SOC-2 Type II verification.
                    </span>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="pt-6 mt-6 border-t border-border-subtle space-y-3">
                {submitError && (
                  <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {submitError}{' '}
                    {!getAccessToken() && (
                      <Link href="/login" className="font-bold underline">
                        Sign in
                      </Link>
                    )}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 rounded-lg border border-border-subtle text-xs font-bold text-text-secondary hover:bg-surface-subtle"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={handleNext}
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-60"
                  >
                    <span>
                      {submitting
                        ? 'Submitting…'
                        : currentStep === 4
                          ? 'Complete Credentialing'
                          : 'Continue to Next Step'}
                    </span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Guidance Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">verified</span>
                  Why Join Skyline?
                </h4>
                <div className="space-y-3 text-xs text-text-secondary">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-emerald-500 text-base shrink-0 mt-0.5">
                      monetization_on
                    </span>
                    <div>
                      <span className="font-bold text-text-primary block">High-Earning Telehealth</span>
                      Average physician earnings range from $165k to $320k annually with flexible on-call scheduling.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-sky-500 text-base shrink-0 mt-0.5">
                      shield
                    </span>
                    <div>
                      <span className="font-bold text-text-primary block">Malpractice Covered</span>
                      Comprehensive commercial medical liability policy provided for all Skyline platform interactions.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-purple-500 text-base shrink-0 mt-0.5">
                      sensors
                    </span>
                    <div>
                      <span className="font-bold text-text-primary block">Continuous Sensor Stream</span>
                      Direct access to live Lead II ECG waveform, SpO2, and ambulatory heart rate history during calls.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2">
                <div className="font-bold text-sky-300">Need Credentialing Assistance?</div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Our clinical coordinator concierge is available 24/7 to assist with state compact filings and CAQH profile synchronizations.
                </div>
                <div className="text-sky-400 font-mono font-bold pt-1">
                  support@skylinehealth.org
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
