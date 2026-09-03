'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CheckoutPage() {
  const [selectedDevice, setSelectedDevice] = useState<'ultra' | 'band' | 'suite'>('ultra');
  const [selectedFinish, setSelectedFinish] = useState('Titanium Natural');
  const [selectedBand, setSelectedBand] = useState('Silicone Active Loop');
  const [selectedCarrier, setSelectedCarrier] = useState('eSIM Auto-Connect');
  const [carePlusOption, setCarePlusOption] = useState<'concierge' | 'family'>('concierge');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('Michael Hernandez');
  const [email, setEmail] = useState('m.hernandez@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace, Austin, TX 78701');
  const [paymentType, setPaymentType] = useState<'hsa' | 'card'>('hsa');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const devices = {
    ultra: {
      name: 'Skyline VitalsWatch™ Ultra',
      basePrice: 399,
      subtitle: 'Aerospace Grade 5 Titanium • Lead II ECG • Standalone LTE-M',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    },
    band: {
      name: 'Skyline PulseBand Pro',
      basePrice: 299,
      subtitle: 'Slim Screenless Continuous Optical SpO2 & HRV',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
    },
    suite: {
      name: 'Clinical Biosensor Suite',
      basePrice: 699,
      subtitle: 'VitalsWatch Ultra + Sleep Ring + Home Cellular Base Hub',
      image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?w=600&q=80',
    },
  };

  const currentDevice = devices[selectedDevice];
  const bandAddOn = selectedBand === 'Titanium Link Bracelet' ? 79 : selectedBand === 'Woven Sport Loop' ? 29 : 0;
  const familyAddOn = carePlusOption === 'family' ? 30 : 0;
  const totalPrice = currentDevice.basePrice + bandAddOn + familyAddOn;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary font-sans antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Breadcrumb & Masthead */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/#hardware-lineup" className="hover:text-primary">Hardware Fleet</Link>
            <span>/</span>
            <span className="text-primary font-bold">Secure Hardware Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight">
            Configure Your Skyline Biometric Device
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            FDA Class II 510(k) cleared continuous wearable hardware bundled with complimentary 24/7 physician telehealth.
          </p>
        </div>

        {orderConfirmed ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-border-subtle p-6 sm:p-10 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ORDER #SKY-99214 CONFIRMED
              </span>
              <h2 className="text-2xl font-bold text-text-primary">
                Your Skyline VitalsWatch is Preparing to Ship!
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
                A confirmation receipt and tracking code have been dispatched to <span className="font-bold text-text-primary">{email}</span>. Your device will ship via FedEx 2-Day Air.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-subtle border border-border-subtle text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Hardware Item:</span>
                <span className="font-bold text-text-primary">{currentDevice.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Finish & Strap:</span>
                <span className="text-text-primary">{selectedFinish} • {selectedBand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Care+ Membership:</span>
                <span className="font-bold text-emerald-600">1-Year Included Free ($348 Value)</span>
              </div>
              <div className="flex justify-between border-t border-border-subtle pt-2">
                <span className="font-bold text-text-primary">Total Paid:</span>
                <span className="font-mono font-extrabold text-primary">${totalPrice}.00 (HSA/FSA Approved)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/patient/records"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container hover:bg-primary text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">clinical_notes</span>
                <span>Open Patient Vitals Portal</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border-subtle hover:bg-surface-subtle text-text-primary text-xs font-bold transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Product Selection & Configuration Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Device Selection */}
              <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                    <h3 className="text-base font-bold text-text-primary">Select Biometric Device</h3>
                  </div>
                  <span className="text-xs text-status-normal font-mono font-bold">All FDA Cleared</span>
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
                            ? 'border-primary bg-blue-50/50 shadow-md ring-2 ring-primary/20'
                            : 'border-border-subtle hover:border-slate-300 bg-white'
                        }`}
                      >
                        {key === 'ultra' && (
                          <span className="absolute -top-2 right-2 bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            Flagship
                          </span>
                        )}
                        <div className="font-bold text-xs text-text-primary">{dev.name}</div>
                        <div className="text-lg font-extrabold text-primary font-mono mt-1">
                          ${dev.basePrice}
                        </div>
                        <div className="text-[10px] text-text-muted mt-1 line-clamp-2">
                          {dev.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Finish & Customization */}
              <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-border-subtle">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                  <h3 className="text-base font-bold text-text-primary">Case Finish & Strap Architecture</h3>
                </div>

                {/* Case Finish */}
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-2">
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
                            ? 'border-primary bg-primary/5 text-primary font-bold shadow-xs'
                            : 'border-border-subtle hover:bg-surface-subtle'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strap Type */}
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-2">
                    Interchangeable Biometric Strap
                  </label>
                  <div className="space-y-2">
                    {[
                      { name: 'Silicone Active Loop', desc: 'Hypoallergenic fluoroelastomer with sweat channels', price: 'Included' },
                      { name: 'Titanium Link Bracelet', desc: 'CNC-milled Grade 5 butterfly deployment buckle', price: '+$79' },
                      { name: 'Woven Sport Loop', desc: 'Breathable dual-layer nylon with hook-and-loop fastener', price: '+$29' },
                    ].map((strap) => (
                      <div
                        key={strap.name}
                        onClick={() => setSelectedBand(strap.name)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          selectedBand === strap.name
                            ? 'border-primary bg-primary/5 shadow-xs'
                            : 'border-border-subtle hover:bg-surface-subtle'
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
                            <div className="text-xs font-bold text-text-primary">{strap.name}</div>
                            <div className="text-[11px] text-text-muted">{strap.desc}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-primary">{strap.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* eSIM Carrier */}
                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-2">
                    Standalone LTE-M Cellular Telemetry
                  </label>
                  <div className="p-3 bg-surface-subtle rounded-xl border border-border-subtle flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-xl">cell_tower</span>
                      <div>
                        <div className="text-xs font-bold text-text-primary">Global eSIM Standalone Radio</div>
                        <div className="text-[10px] text-text-muted">
                          Connects directly to doctor network without requiring your smartphone nearby.
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Pre-Activated
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping & Payment Form */}
              <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-border-subtle">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                  <h3 className="text-base font-bold text-text-primary">Shipping & HSA/FSA Payment</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border-subtle text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-text-secondary block mb-1">Email (For Telemetry Link)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border-subtle text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-text-secondary block mb-1">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border-subtle text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-text-secondary block mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setPaymentType('hsa')}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        paymentType === 'hsa'
                          ? 'border-primary bg-primary/5 text-primary shadow-xs'
                          : 'border-border-subtle hover:bg-surface-subtle text-text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">health_and_safety</span>
                      <span>HSA / FSA Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentType('card')}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        paymentType === 'card'
                          ? 'border-primary bg-primary/5 text-primary shadow-xs'
                          : 'border-border-subtle hover:bg-surface-subtle text-text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">credit_card</span>
                      <span>Credit / Debit Card</span>
                    </button>
                  </div>

                  <div className="p-3 bg-surface-subtle rounded-xl border border-border-subtle space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-text-secondary">{cardNumber}</span>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        AES-256 Encrypted
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Eligible under IRS Code 213(d) for pre-tax medical expense reimbursement. An itemized medical receipt will be generated automatically.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-xl shadow-blue-900/10 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span className="material-symbols-outlined text-lg">lock</span>
                  <span>Authorize & Place Order — ${totalPrice}.00</span>
                </button>
              </form>
            </div>

            {/* Right 5 Columns: Sticky Order Summary */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-md space-y-4">
                <h3 className="text-base font-bold text-text-primary pb-3 border-b border-border-subtle">
                  Order Summary
                </h3>

                {/* Device Preview Card */}
                <div className="flex items-center gap-4">
                  <img
                    src={currentDevice.image}
                    alt={currentDevice.name}
                    className="w-20 h-20 rounded-xl object-cover border border-border-subtle shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-text-primary">{currentDevice.name}</div>
                    <div className="text-xs text-secondary font-semibold mt-0.5">{selectedFinish}</div>
                    <div className="text-[11px] text-text-muted">{selectedBand}</div>
                    <div className="text-sm font-bold text-primary font-mono mt-1">
                      ${currentDevice.basePrice}.00
                    </div>
                  </div>
                </div>

                {/* Care+ Membership Inclusions */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-primary">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">verified</span>
                      Skyline Care+ Concierge
                    </span>
                    <span className="text-emerald-700 font-mono">FREE (1st Yr)</span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Includes unlimited on-demand 1-tap video consults with board-certified hospital doctors whenever abnormal vitals are recorded ($348 value).
                  </p>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-2 text-xs border-t border-border-subtle pt-3 text-text-secondary">
                  <div className="flex justify-between">
                    <span>Hardware Unit</span>
                    <span className="font-mono font-bold text-text-primary">${currentDevice.basePrice}.00</span>
                  </div>
                  {bandAddOn > 0 && (
                    <div className="flex justify-between">
                      <span>Strap Upgrade ({selectedBand})</span>
                      <span className="font-mono font-bold text-text-primary">+${bandAddOn}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>FedEx 2-Day Express Air</span>
                    <span className="font-mono font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1-Year Care+ Telehealth</span>
                    <span className="font-mono text-text-muted line-through">$348.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border-subtle pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-text-muted block">Total Due Today</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">HSA / FSA Approved</span>
                  </div>
                  <div className="text-2xl font-extrabold text-primary font-mono">
                    ${totalPrice}.00
                  </div>
                </div>
              </div>

              {/* Guarantees Card */}
              <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle space-y-2 text-xs text-text-muted font-medium">
                <div className="flex items-center gap-2 text-text-primary font-semibold">
                  <span className="material-symbols-outlined text-base text-status-normal">verified_user</span>
                  30-Day Clinical Risk-Free Trial
                </div>
                <p className="text-[11px] leading-relaxed">
                  If the Skyline VitalsWatch does not exceed your expectations, return it within 30 days for a full refund with prepaid return shipping.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
