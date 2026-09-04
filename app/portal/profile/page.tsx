'use client';

import React, { useEffect, useState } from 'react';
import { apiGet, errorMessage } from '../../../lib/api';
import type { AuthUser, Consultant } from '../../../lib/types';

export default function ClinicianProfilePage() {
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">Clinician Profile & Rate Card</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your public specialist listing, board credentials, and telehealth fee structure.
        </p>
      </div>

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading profile…</p>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-sky-500/40">
              <img
                src={profile?.avatar_url || '/images/avatars/dr_chidi_okafor.jpg'}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{displayName}</h2>
                {profile?.status === 'approved' && (
                  <span className="material-symbols-outlined text-sky-400 text-lg">verified</span>
                )}
              </div>
              <div className="text-xs text-sky-400 font-semibold">
                {profile?.title || 'Consultant'}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {profile?.npi_number
                  ? `NPI: ${profile.npi_number}`
                  : user?.email || 'No NPI on file'}
                {profile?.status ? ` • Status: ${profile.status}` : ''}
              </div>
            </div>
          </div>

          {!profile ? (
            <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 rounded-xl px-4 py-3">
              No consultant profile yet. Submit an application from the credentialing portal to
              create one.
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Public Consultation Fee (Per Encounter)
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <span className="text-sm font-bold text-white">$</span>
                  <div className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm">
                    {profile.fee.toFixed(2)}
                  </div>
                  <span className="text-xs text-slate-400">USD</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Professional Biography
                </label>
                <p className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed min-h-[80px]">
                  {profile.bio || 'No biography provided.'}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Specialty & Hospital
                </label>
                <p className="text-xs text-slate-300">
                  {profile.specialty}
                  {profile.sub_specialty ? ` • ${profile.sub_specialty}` : ''}
                  {profile.hospital ? ` • ${profile.hospital}` : ''}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Verified Board Certifications
                </label>
                <div className="space-y-2">
                  {(profile.credentials?.length ? profile.credentials : ['No credentials listed']).map(
                    (c) => (
                      <div
                        key={c}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between"
                      >
                        <span>{c}</span>
                        <span className="text-emerald-400 text-[10px] font-mono font-bold">
                          ON FILE
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            Profile fields are managed through credentialing. Update availability from Schedule.
          </div>
        </div>
      )}
    </div>
  );
}
