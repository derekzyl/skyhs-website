'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { apiPost, getAccessToken } from '../../lib/api';
import { formatNgn } from '../../lib/money';
import { HARDWARE_PRICES } from '../../lib/pricing';

const NG_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedDevice, setSelectedDevice] = useState<'ultra' | 'band' | 'suite'>('ultra');
  const [selectedFinish, setSelectedFinish] = useState('Titanium Natural');
  const [selectedBand, setSelectedBand] = useState('Silicone Active Loop');
  const [carePlusOption] = useState<'concierge' | 'family'>('concierge');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const devices = {
    ultra: {
      name: 'Skyline VitalsBand™ Ultra',
      basePrice: HARDWARE_PRICES.ultra,
      subtitle: 'Aerospace Grade 5 Titanium • Lead II ECG • Standalone LTE-M',
      image: '/images/devices/sky_vitalsband_ultra.png',
      sku: 'vitalsband-ultra',
    },
    band: {
      name: 'Skyline PulseBand Pro',
      basePrice: HARDWARE_PRICES.band,
      subtitle: 'Slim Screenless Continuous Optical SpO2 & HRV',
      image: '/images/devices/sky_pulseband_pro.png',
      sku: 'pulseband-pro',
    },
    suite: {
      name: 'Clinical Biosensor Suite',
      basePrice: HARDWARE_PRICES.suite,
      subtitle: 'VitalsBand Ultra + Sleep Ring + Home Cellular Base Hub',
      image: '/images/devices/sky_biosensor_suite.png',
      sku: 'biosensor-suite',
    },
  };

  const currentDevice = devices[selectedDevice];
  const bandAddOn =
    selectedBand === 'Titanium Link Bracelet'
      ? HARDWARE_PRICES.strapTitanium
      : selectedBand === 'Woven Sport Loop'
        ? HARDWARE_PRICES.strapWoven
        : 0;
  const familyAddOn = carePlusOption === 'family' ? 45_000 : 0;
  const totalPrice = currentDevice.basePrice + bandAddOn + familyAddOn;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!getAccessToken()) {
      router.push(`/login?next=${encodeURIComponent('/checkout')}`);
      return;
    }

    setSubmitting(true);
    try {
      const payRaw = await apiPost<Record<string, unknown>>('/api/v1/payments/initialize', {
        amount: totalPrice,
        currency: 'NGN',
        description: `Skyline hardware: ${currentDevice.name}`,
        metadata: {
          product: 'vitalswatch',
          sku: currentDevice.sku,
          device: selectedDevice,
          finish: selectedFinish,
          band: selectedBand,
          shipping: {
            full_name: fullName,
            email,
            phone,
            street,
            city,
            state,
            lga,
            postal_code: postalCode,
            country: 'NG',
          },
        },
      });
      const nested =
        payRaw?.data && typeof payRaw.data === 'object'
          ? (payRaw.data as Record<string, unknown>)
          : null;
      const authUrl =
        (typeof payRaw?.authorization_url === 'string' && payRaw.authorization_url) ||
        (typeof nested?.authorization_url === 'string' && nested.authorization_url) ||
        (typeof payRaw?.redirect_url === 'string' && payRaw.redirect_url) ||
        (typeof nested?.redirect_url === 'string' && nested.redirect_url) ||
        null;
      if (authUrl) {
        window.location.href = authUrl;
        return;
      }
      setError(
        'Payment could not be started. Confirm Paystack keys are configured, then try again.',
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Payment initialization failed. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-primary dark:hover:text-sky-400">Home</Link>
            <span>/</span>
            <Link href="/#hardware-lineup" className="hover:text-primary dark:hover:text-sky-400">Hardware Fleet</Link>
            <span>/</span>
            <span className="text-primary dark:text-sky-400 font-bold">Secure Hardware Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Configure Your Skyline Biometric Device
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-slate-300">
            Medical-grade continuous wearable hardware with complimentary Care+ telehealth for Nigeria.
            Pay securely with Paystack (NGN).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                  <h3 className="text-base font-bold text-text-primary dark:text-white">Select Biometric Device</h3>
                </div>
                <span className="text-xs text-status-normal font-mono font-bold">Ships across Nigeria</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['ultra', 'band', 'suite'] as const).map((key) => {
                  const dev = devices[key];
                  const isSelected = selectedDevice === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setSelectedDevice(key)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-primary dark:border-sky-400 bg-blue-50/50 dark:bg-sky-950/40 shadow-md ring-2 ring-primary/20 dark:ring-sky-400/20'
                          : 'border-border-subtle dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/60'
                      }`}
                    >
                      {key === 'ultra' && (
                        <span className="absolute -top-2 right-2 bg-primary dark:bg-sky-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          Flagship
                        </span>
                      )}
                      <div className="font-bold text-xs text-text-primary dark:text-white">{dev.name}</div>
                      <div className="text-lg font-extrabold text-primary dark:text-sky-400 font-mono mt-1">
                        {formatNgn(dev.basePrice)}
                      </div>
                      <div className="text-[10px] text-text-muted dark:text-slate-400 mt-1 line-clamp-2">
                        {dev.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border-subtle dark:border-slate-800">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                <h3 className="text-base font-bold text-text-primary dark:text-white">Case Finish & Strap Architecture</h3>
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-2">
                  Aerospace Titanium Case Finish
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Titanium Natural', 'Space Black DLC', 'Starlight Ceramic'].map((finish) => (
                    <button
                      type="button"
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                        selectedFinish === finish
                          ? 'border-primary dark:border-sky-400 bg-primary/5 dark:bg-sky-950/60 text-primary dark:text-sky-300 font-bold shadow-xs'
                          : 'border-border-subtle dark:border-slate-700 hover:bg-surface-subtle dark:hover:bg-slate-800 text-text-secondary dark:text-slate-300'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-2">
                  Interchangeable Biometric Strap
                </label>
                <div className="space-y-2">
                  {[
                    { name: 'Silicone Active Loop', desc: 'Hypoallergenic fluoroelastomer with sweat channels', price: 'Included' },
                    {
                      name: 'Titanium Link Bracelet',
                      desc: 'CNC-milled Grade 5 butterfly deployment buckle',
                      price: `+${formatNgn(HARDWARE_PRICES.strapTitanium)}`,
                    },
                    {
                      name: 'Woven Sport Loop',
                      desc: 'Breathable dual-layer nylon with hook-and-loop fastener',
                      price: `+${formatNgn(HARDWARE_PRICES.strapWoven)}`,
                    },
                  ].map((strap) => (
                    <div
                      key={strap.name}
                      onClick={() => setSelectedBand(strap.name)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedBand === strap.name
                          ? 'border-primary dark:border-sky-400 bg-primary/5 dark:bg-sky-950/60 shadow-xs'
                          : 'border-border-subtle dark:border-slate-700 hover:bg-surface-subtle dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={selectedBand === strap.name}
                          onChange={() => setSelectedBand(strap.name)}
                          className="accent-primary"
                        />
                        <div>
                          <div className="text-xs font-bold text-text-primary dark:text-white">{strap.name}</div>
                          <div className="text-[11px] text-text-muted dark:text-slate-400">{strap.desc}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary dark:text-sky-400">{strap.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-2">
                  Standalone LTE-M Cellular Telemetry
                </label>
                <div className="p-3 bg-surface-subtle dark:bg-slate-800/60 rounded-xl border border-border-subtle dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary dark:text-sky-400 text-xl">cell_tower</span>
                    <div>
                      <div className="text-xs font-bold text-text-primary dark:text-white">Global eSIM Standalone Radio</div>
                      <div className="text-[10px] text-text-muted dark:text-slate-400">
                        Connects directly to doctor network without requiring your smartphone nearby.
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                    Pre-Activated
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="bg-white dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border-subtle dark:border-slate-800">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                <h3 className="text-base font-bold text-text-primary dark:text-white">Delivery in Nigeria</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ada Okafor"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">Phone (+234)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">State</label>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 text-xs focus:outline-none focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {NG_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="12 Admiralty Way, Lekki Phase 1"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lagos"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">LGA</label>
                  <input
                    type="text"
                    required
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    placeholder="Eti-Osa"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary dark:text-slate-300 block mb-1">Postal Code (optional)</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="100001"
                    className="w-full p-2.5 rounded-lg border border-border-subtle dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-300 leading-relaxed">
                  {error}
                </div>
              )}

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                You will be redirected to Paystack to complete payment in Nigerian Naira.
                Sign in is required so we can attach the order to your account.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-60 text-white font-bold text-sm shadow-xl shadow-blue-900/10 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span className="material-symbols-outlined text-lg">shopping_cart_checkout</span>
                <span>{submitting ? 'Starting Paystack…' : `Pay ${formatNgn(totalPrice)} with Paystack`}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border-subtle dark:border-slate-800 p-5 sm:p-6 shadow-md space-y-4">
              <h3 className="text-base font-bold text-text-primary dark:text-white pb-3 border-b border-border-subtle dark:border-slate-800">
                Order Summary
              </h3>

              <div className="flex items-center gap-4">
                <img
                  src={currentDevice.image}
                  alt={currentDevice.name}
                  className="w-20 h-20 rounded-xl object-cover border border-border-subtle dark:border-slate-800 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-text-primary dark:text-white">{currentDevice.name}</div>
                  <div className="text-xs text-secondary dark:text-sky-400 font-semibold mt-0.5">{selectedFinish}</div>
                  <div className="text-[11px] text-text-muted dark:text-slate-400">{selectedBand}</div>
                  <div className="text-sm font-bold text-primary dark:text-sky-400 font-mono mt-1">
                    {formatNgn(currentDevice.basePrice)}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-800/60 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-primary dark:text-sky-300">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">verified</span>
                    Skyline Care+ Concierge
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono">FREE (1st Yr)</span>
                </div>
                <p className="text-[11px] text-text-secondary dark:text-slate-300 leading-relaxed">
                  Includes unlimited on-demand consults with licensed clinicians whenever abnormal vitals are recorded ({formatNgn(HARDWARE_PRICES.carePlusYear)} value).
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-border-subtle dark:border-slate-800 pt-3 text-text-secondary dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Hardware Unit</span>
                  <span className="font-mono font-bold text-text-primary dark:text-white">{formatNgn(currentDevice.basePrice)}</span>
                </div>
                {bandAddOn > 0 && (
                  <div className="flex justify-between">
                    <span>Strap Upgrade ({selectedBand})</span>
                    <span className="font-mono font-bold text-text-primary dark:text-white">+{formatNgn(bandAddOn)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide courier (Nigeria)</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>1-Year Care+ Telehealth</span>
                  <span className="font-mono text-text-muted dark:text-slate-500 line-through">{formatNgn(HARDWARE_PRICES.carePlusYear)}</span>
                </div>
              </div>

              <div className="border-t border-border-subtle dark:border-slate-800 pt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-text-muted dark:text-slate-400 block">Configured Total</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Pay with Paystack (NGN)</span>
                </div>
                <div className="text-2xl font-extrabold text-primary dark:text-sky-400 font-mono">
                  {formatNgn(totalPrice)}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle dark:bg-slate-900/60 border border-border-subtle dark:border-slate-800 space-y-2 text-xs text-text-muted dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2 text-text-primary dark:text-white font-semibold">
                <span className="material-symbols-outlined text-base text-status-normal">verified_user</span>
                30-Day Clinical Risk-Free Trial
              </div>
              <p className="text-[11px] leading-relaxed">
                If the Skyline VitalsBand does not exceed your expectations, return it within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
