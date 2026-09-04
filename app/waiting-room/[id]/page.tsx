'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import EcgWaveform from '../../../components/EcgWaveform';
import { apiGet, apiPost, errorMessage, getAccessToken } from '../../../lib/api';
import type { ConsultationSession } from '../../../lib/types';

export default function PatientWebWaitingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = (params?.id as string) || '';

  const [session, setSession] = useState<ConsultationSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    if (!sessionId) return;
    if (!getAccessToken()) return;
    let cancelled = false;

    const poll = async () => {
      try {
        const sess = await apiGet<ConsultationSession>(
          `/api/v1/consultancy/sessions/${sessionId}`
        );
        if (cancelled) return;
        setSession(sess);
        setError(null);

        if (sess.status === 'upcoming') {
          await apiPost(`/api/v1/consultancy/sessions/${sessionId}/waiting`).catch(
            () => null
          );
        }

        if (sess.status === 'live' || sess.status === 'in_progress') {
          router.replace(`/portal/consultation/${sessionId}`);
        }
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load session.'));
      }
    };

    void poll();
    const id = setInterval(() => {
      void poll();
    }, 4000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [sessionId, router]);

  const ready = session?.status === 'live';
  const doctorName = session?.consultant_name || 'Your clinician';

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans">
      <Navbar />

      <div className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
              <span>TELEHEALTH WAITING ROOM</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Virtual Pre-Call Diagnostic & Sensor Check
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Encounter with <span className="text-white font-bold">{doctorName}</span>
              {session?.specialty ? ` (${session.specialty})` : ''}
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="text-slate-400 text-[10px] uppercase">Session Status</div>
            <div className="text-base font-bold text-sky-400 uppercase">
              {session?.status || 'loading…'}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {error && (
          <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            {error}{' '}
            {!getAccessToken() && (
              <Link href="/login" className="font-bold underline">
                Sign in
              </Link>
            )}
          </p>
        )}

        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            ready
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img
                src={session?.consultant_avatar || '/images/avatars/dr_chidi_okafor.jpg'}
                alt={doctorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-white block">{doctorName}</span>
              <span className="text-[11px] text-slate-400">
                {ready
                  ? 'Clinician has started the session. Join the chat now.'
                  : 'Waiting for clinician to start the encounter…'}
              </span>
            </div>
          </div>

          {ready && (
            <Link
              href={`/portal/consultation/${sessionId}`}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Join Consultation Chat</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-base">videocam</span>
              Self Camera & Audio Check
            </h3>

            <div className="relative h-60 rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
              {cameraEnabled ? (
                <div className="text-center text-slate-400 space-y-1">
                  <span className="material-symbols-outlined text-4xl">videocam</span>
                  <div className="text-xs">Camera preview (local check only)</div>
                </div>
              ) : (
                <div className="text-center text-slate-500 space-y-1">
                  <span className="material-symbols-outlined text-4xl">videocam_off</span>
                  <div className="text-xs">Camera is disabled</div>
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`p-2.5 rounded-full border transition-all ${
                    micEnabled
                      ? 'bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700'
                      : 'bg-rose-900/90 border-rose-600 text-rose-300'
                  }`}
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
                >
                  <span className="material-symbols-outlined text-lg">
                    {cameraEnabled ? 'videocam' : 'videocam_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center font-mono">
              Microphone status: {micEnabled ? 'Active' : 'Muted'}
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-base">watch</span>
                  VitalsWatch Live Bridge
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-400 font-mono text-[10px] font-bold">
                  READY
                </span>
              </div>

              <EcgWaveform height={70} heartRate={72} rhythmText="Sensor check preview" />

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-white font-bold">Polling session status</div>
                <div>
                  You will be redirected to the consultation chat when the clinician starts the
                  encounter.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
