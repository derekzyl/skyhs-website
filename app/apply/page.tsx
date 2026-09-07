'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { apiPost, errorMessage, getAccessToken, login } from '../../lib/api';
import { isValidNgPhone } from '../../lib/phone';

export default function ClinicianApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    councilType: 'MDCN',
    registrationNumber: '',
    email: '',
    phone: '',
    password: '',
    medicalSchool: '',
    graduationYear: '',
    primaryState: 'Lagos',
    currentHospital: '',
    specialty: 'General Practice',
    subSpecialty: '',
    agreedToProtocols: true,
    fee: '5000',
    bio: '',
  });

  const handleNext = async () => {
    if (currentStep === 1 && formData.phone && !isValidNgPhone(formData.phone)) {
      setSubmitError('Enter a valid Nigerian mobile number (+234… or 0XXXXXXXXXX).');
      return;
    }
    setSubmitError(null);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    
    try {
      if (!getAccessToken()) {
        if (!formData.password || formData.password.length < 8) {
          throw new Error('Please provide a valid password (min 8 characters) to create your account.');
        }
        if (!formData.email) {
          throw new Error('Please provide an email address to create your account.');
        }

        const names = (formData.fullName || '').trim().split(' ');
        const first_name = names[0] || 'Consultant';
        const last_name = names.slice(1).join(' ') || 'Unknown';
        
        // Register the user
        await apiPost('/api/v1/auth/register', {
          first_name,
          last_name,
          email: formData.email,
          password: formData.password,
          user_type: 'consultant',
          phone: formData.phone,
          privacy_policy_accepted: formData.agreedToProtocols
        }, { auth: false });
        
        // Log them in to get the access token
        await login(formData.email, formData.password);
      }

      await apiPost('/api/v1/consultancy/consultants/apply', {
        display_name: formData.fullName || 'Consultant',
        title: 'Consultant',
        specialty: formData.specialty,
        sub_specialty: formData.subSpecialty || undefined,
        hospital: formData.currentHospital || formData.primaryState || undefined,
        bio: formData.bio || undefined,
        npi_number: formData.registrationNumber || undefined,
        fee: parseFloat(formData.fee) || 0,
        experience_years: formData.graduationYear ? (new Date().getFullYear() - parseInt(formData.graduationYear)) : 0,
        languages: ['English'],
        credentials: [
          formData.councilType ? `Council: ${formData.councilType}` : '',
          formData.medicalSchool ? `Institution: ${formData.medicalSchool}` : '',
          formData.graduationYear ? `Class of ${formData.graduationYear}` : '',
          formData.primaryState ? `State: ${formData.primaryState}` : '',
        ].filter(Boolean),
        accepts_telemetry: formData.agreedToProtocols,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message && !err.status ? err.message : errorMessage(err, 'Application submission failed.'));
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
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { num: 1, title: 'Identity & Council' },
              { num: 2, title: 'Qualifications' },
              { num: 3, title: 'Clinical Protocols' },
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
                Thank you, <span className="font-bold">{formData.fullName}</span>. Your {formData.councilType} registration ({formData.registrationNumber}) has been submitted for Skyline verification.
              </p>
            </div>

            <div className="p-4 bg-surface-subtle rounded-xl text-left text-xs space-y-2 border border-border-subtle">
              <div className="flex items-center justify-between font-bold text-text-primary pb-2 border-b border-border-subtle">
                <span>Verification Checklist</span>
                <span className="text-emerald-600">3 of 3 Verified</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                Council Register Match: Verified
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                Disciplinary Committee Clearance: Cleared (Zero sanctions)
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
              {/* Step 1: Identity & Council */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      1. Professional Identity & Council Registration
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Enter your professional council details (e.g., MDCN, PCN) for verification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Council Type
                      </label>
                      <select
                        value={formData.councilType}
                        onChange={(e) => setFormData({ ...formData, councilType: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs bg-white"
                      >
                        <option value="MDCN">MDCN (Medical & Dental)</option>
                        <option value="PCN">PCN (Pharmacy)</option>
                        <option value="NMCN">NMCN (Nursing & Midwifery)</option>
                        <option value="MRTB">MRTB (Medical Rehab)</option>
                        <option value="ODTRBN">ODTRBN (Optometrists & Dispensing Opticians)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Registration / Folio Number
                      </label>
                      <input
                        type="text"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
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
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. dr.name@hospital.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-xs text-text-primary transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wide">
                        Account Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required={!getAccessToken()}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-xs text-text-primary transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wide">
                        Mobile Phone (+234)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 801 234 5678"
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Qualifications & Current Practice */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      2. Qualifications & Current Practice
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Provide details about your training and current place of practice.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Primary State of Practice
                      </label>
                      <select
                        value={formData.primaryState}
                        onChange={(e) => setFormData({ ...formData, primaryState: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs bg-white"
                      >
                        <option>Lagos</option>
                        <option>FCT Abuja</option>
                        <option>Rivers</option>
                        <option>Kano</option>
                        <option>Oyo</option>
                        <option>Enugu</option>
                        <option>Edo</option>
                        <option>Kaduna</option>
                        <option>Delta</option>
                        <option>Ogun</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Current Hospital / Place of Work
                      </label>
                      <input
                        type="text"
                        value={formData.currentHospital}
                        onChange={(e) => setFormData({ ...formData, currentHospital: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Medical School / Training Institution
                      </label>
                      <input
                        type="text"
                        value={formData.medicalSchool}
                        onChange={(e) => setFormData({ ...formData, medicalSchool: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary block mb-1">
                        Year of Graduation
                      </label>
                      <input
                        type="text"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                        placeholder="YYYY"
                        maxLength={4}
                        className="w-full p-2.5 rounded-lg border border-border-subtle text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-sky-600">info</span>
                    <span>
                      Skyline provides complimentary group medical liability cover for all platform clinical consultations.
                    </span>
                  </div>
                </div>
              )}

              {/* Step 3: Clinical Protocols & Telemetry */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      3. Clinical Specialty & Protocols
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Review Skyline's remote patient management guidelines and specify your specialty.
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
                        <option>General Practice</option>
                        <option>Cardiology</option>
                        <option>Endocrinology</option>
                        <option>Pediatrics</option>
                        <option>Obstetrics & Gynecology</option>
                        <option>Internal Medicine</option>
                        <option>Neurology</option>
                        <option>Pharmacy</option>
                        <option>Nursing</option>
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
                      Telehealth Competency Agreement
                    </h4>
                    <ul className="text-[11px] text-text-secondary space-y-1.5 list-disc pl-4">
                      <li>I will review patient baseline vitals prior to initiating synchronous video encounters.</li>
                      <li>I understand that single-lead ECG is for screening and ambulatory rhythm assessment, not a complete replacement for a diagnostic 12-lead ECG in acute MI suspicion.</li>
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
                        I agree to Skyline Telehealth Clinical Protocols
                      </span>
                    </label>
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
                        : currentStep === 3
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
                      Average consultant earnings range from ₦5M to ₦15M annually with flexible on-call scheduling.
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
                  Our clinical coordinator concierge is available 24/7 to assist with council verification and profile setup.
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
