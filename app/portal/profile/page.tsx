'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../components/ThemeProvider';
import { apiGet, errorMessage } from '../../../lib/api';
import { formatNgn } from '../../../lib/money';
import type { AuthUser, Consultant } from '../../../lib/types';

export default function ClinicianProfilePage() {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<Consultant | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [consultant, me] = await Promise.all([
          apiGet<Consultant | null>('/api/v1/consultancy/consultants/me/profile'),
          apiGet<{ data?: AuthUser } | AuthUser>('/api/v1/auth/me').catch(() => null),
        ]);
        if (cancelled) return;
        setProfile(consultant);
        if (me) {
          const u = (me as { data?: AuthUser }).data ?? (me as AuthUser);
          if (u && typeof u === 'object' && 'id' in u) setUser(u);
        }
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load profile.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName =
    profile?.display_name ||
    (user ? `Dr. ${user.first_name || ''} ${user.last_name || ''}`.trim() : null) ||
    'Clinician';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinician Settings & Rate Card</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Your public specialist listing, display theme preferences, and telehealth fee structure.
        </p>
      </div>

      {/* ── INTERFACE & THEME PREFERENCE ────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs dark:shadow-none">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-sky-400">palette</span>
              <span>Interface & Theme Preference</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Choose your clinical workspace appearance. Synchronized across the entire platform.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
            {theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Light Mode Option Card */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 ${
              theme === 'light'
                ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">light_mode</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Clinical Light
                </span>
              </div>
              {theme === 'light' && (
                <span className="material-symbols-outlined text-sky-600 text-xl">check_circle</span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pristine medical white with crisp contrast, optimal for daylight clinic environments.
            </p>
          </button>

          {/* Dark Mode Option Card */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 ${
              theme === 'dark'
                ? 'bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">dark_mode</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Telemetry Dark
                </span>
              </div>
              {theme === 'dark' && (
                <span className="material-symbols-outlined text-sky-400 text-xl">check_circle</span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deep obsidian with illuminated telemetry traces, reduces fatigue during nighttime on-call.
            </p>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading profile…</p>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs dark:shadow-none">
          <div className="flex items-center gap-5 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-sky-500/40 shrink-0">
              <img
                src={profile?.avatar_url || '/images/avatars/dr_chidi_okafor.jpg'}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{displayName}</h2>
                {profile?.status === 'approved' && (
                  <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-lg">verified</span>
                )}
              </div>
              <div className="text-xs text-primary dark:text-sky-400 font-semibold">
                {profile?.title || 'Consultant'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {profile?.npi_number
                  ? `MDCN: ${profile.npi_number}`
                  : user?.email || 'No MDCN license on file'}
                {profile?.status ? ` • Status: ${profile.status}` : ''}
              </div>
            </div>
          </div>

          {!profile ? (
            <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-xl px-4 py-3">
              No consultant profile yet. Submit an application from the credentialing portal to
              create one.
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Public Consultation Fee (Per Encounter)
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <div className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm">
                    {formatNgn(profile.fee)}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">NGN</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Professional Biography
                </label>
                <p className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs leading-relaxed min-h-[80px]">
                  {profile.bio || 'No biography provided.'}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Specialty & Hospital
                </label>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {profile.specialty}
                  {profile.sub_specialty ? ` • ${profile.sub_specialty}` : ''}
                  {profile.hospital ? ` • ${profile.hospital}` : ''}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Verified Board Certifications
                </label>
                <div className="space-y-2">
                  {(profile.credentials?.length ? profile.credentials : ['No credentials listed']).map(
                    (c) => (
                      <div
                        key={c}
                        className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between"
                      >
                        <span>{c}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                          ON FILE
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
            Profile fields are managed through credentialing. Update availability from Schedule.
          </div>
        </div>
      )}
    </div>
  );
}
