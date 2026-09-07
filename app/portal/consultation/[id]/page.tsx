'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiGet, apiPost, apiPut, errorMessage, getAccessToken } from '../../../../lib/api';
import type { AuthUser, CareSummary, ChatMessage, ConsultationSession } from '../../../../lib/types';

export default function VirtualConsultationRoomPage() {
  const params = useParams();
  const sessionId = (params?.id as string) || '';

  const [session, setSession] = useState<ConsultationSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [me, setMe] = useState<AuthUser | null>(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [soapNotes, setSoapNotes] = useState('');
  const [prescriptions, setPrescriptions] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [savingSummary, setSavingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryMsg, setSummaryMsg] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    if (!sessionId) return;
    const msgs = await apiGet<ChatMessage[]>(
      `/api/v1/consultancy/sessions/${sessionId}/messages`
    );
    setMessages(Array.isArray(msgs) ? msgs : []);
  }, [sessionId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!sessionId) return;
      setLoading(true);
      setError(null);
      try {
        const [sess, summary, user] = await Promise.all([
          apiGet<ConsultationSession>(`/api/v1/consultancy/sessions/${sessionId}`),
          apiGet<CareSummary | null>(
            `/api/v1/consultancy/sessions/${sessionId}/summary`
          ).catch(() => null),
          apiGet<{ data?: AuthUser } | AuthUser>('/api/v1/auth/me').catch(() => null),
        ]);
        if (cancelled) return;
        setSession(sess);
        if (summary) {
          setDiagnosis(summary.diagnosis || '');
          setSoapNotes(summary.soap_notes || '');
          setPrescriptions(summary.prescriptions || '');
          setFollowUp(summary.follow_up || '');
        }
        if (user) {
          const u = (user as { data?: AuthUser }).data ?? (user as AuthUser);
          if (u && typeof u === 'object' && 'id' in u) setMe(u);
        }
        await loadMessages();
        // Mark live if consultant opens room
        if (sess.status === 'waiting' || sess.status === 'upcoming') {
          await apiPost(`/api/v1/consultancy/sessions/${sessionId}/start`).catch(() => null);
        }
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load consultation.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId, loadMessages]);

  useEffect(() => {
    if (!sessionId) return;
    const id = setInterval(() => {
      void loadMessages().catch(() => undefined);
    }, 4000);
    return () => clearInterval(id);
  }, [sessionId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const body = draft.trim();
    if (!body || !sessionId) return;
    setSending(true);
    setError(null);
    try {
      const msg = await apiPost<ChatMessage>(
        `/api/v1/consultancy/sessions/${sessionId}/messages`,
        { body }
      );
      setMessages((prev) => [...prev, msg]);
      setDraft('');
    } catch (err) {
      setError(errorMessage(err, 'Failed to send message.'));
    } finally {
      setSending(false);
    }
  };

  const saveSummary = async () => {
    if (!sessionId) return;
    setSavingSummary(true);
    setSummaryMsg(null);
    setError(null);
    try {
      await apiPut(`/api/v1/consultancy/sessions/${sessionId}/summary`, {
        diagnosis: diagnosis || undefined,
        soap_notes: soapNotes || undefined,
        prescriptions: prescriptions || undefined,
        follow_up: followUp || undefined,
      });
      setSummaryMsg('Care summary saved.');
    } catch (err) {
      setError(errorMessage(err, 'Failed to save care summary.'));
    } finally {
      setSavingSummary(false);
    }
  };

  const myId = me?.id;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Chat panel (replaces fake video UI) */}
      <div className="lg:w-7/12 flex flex-col p-4 sm:p-6 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 live-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                {session?.status || 'loading'} • Chat Encounter
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Session {sessionId.slice(0, 12)}…
              {session?.chief_complaint ? ` • ${session.chief_complaint}` : ''}
            </div>
          </div>
          <Link
            href="/portal/dashboard"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Leave
          </Link>
        </div>

        {error && (
          <p className="mb-3 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex-1 min-h-[320px] rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 overflow-y-auto space-y-3">
          {loading ? (
            <p className="text-xs text-slate-500 text-center py-12">Loading chat…</p>
          ) : messages.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-12">
              No messages yet. Start the clinical conversation.
            </p>
          ) : (
            messages.map((m) => {
              const mine = myId && m.sender_id === myId;
              return (
                <div
                  key={m.id}
                  className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                      mine
                        ? 'bg-primary-container text-white'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.body}</div>
                    <div className="text-[10px] opacity-60 font-mono mt-1">
                      {new Date(m.sent_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        <div className="pt-4 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void sendMessage();
              }
            }}
            placeholder={
              getAccessToken() ? 'Type a clinical message…' : 'Sign in to chat'
            }
            className="flex-1 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
          />
          <button
            onClick={sendMessage}
            disabled={sending || !draft.trim()}
            className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold disabled:opacity-50"
          >
            {sending ? '…' : 'Send'}
          </button>
        </div>
      </div>

      {/* Care summary / SOAP */}
      <div className="lg:w-5/12 flex flex-col p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 space-y-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Care Summary</h3>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Save diagnosis, SOAP notes, prescriptions, and follow-up
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 block mb-1">
              Diagnosis
            </label>
            <textarea
              rows={2}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
              SOAP Notes
            </label>
            <textarea
              rows={5}
              value={soapNotes}
              onChange={(e) => setSoapNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">
              Prescriptions
            </label>
            <textarea
              rows={2}
              value={prescriptions}
              onChange={(e) => setPrescriptions(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-purple-600 dark:text-purple-400 block mb-1">
              Follow-up
            </label>
            <textarea
              rows={2}
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {summaryMsg && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-3 py-2">
            {summaryMsg}
          </p>
        )}

        <button
          onClick={saveSummary}
          disabled={savingSummary}
          className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-60"
        >
          {savingSummary ? 'Saving…' : 'Save Care Summary'}
        </button>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Chat + care summary</span>
          <Link href="/portal/dashboard" className="text-sky-600 dark:text-sky-400 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
