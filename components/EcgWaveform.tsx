'use client';

import React from 'react';

interface EcgWaveformProps {
  height?: number;
  className?: string;
  heartRate?: number;
  rhythmText?: string;
  showGrid?: boolean;
}

export default function EcgWaveform({
  height = 90,
  className = '',
  heartRate = 78,
  rhythmText = 'Lead II Sinus Rhythm • 25mm/s • 10mm/mV',
  showGrid = true,
}: EcgWaveformProps) {
  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-slate-950 border border-emerald-900/40 ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Background Medical ECG Grid */}
      {showGrid && (
        <div className="absolute inset-0 ecg-grid opacity-35 pointer-events-none" />
      )}

      {/* Top Telemetry Header */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
            {rhythmText}
          </span>
        </div>
        <div className="flex items-baseline gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-emerald-500/20">
          <span className="text-xs font-mono font-bold text-emerald-400">{heartRate}</span>
          <span className="text-[9px] font-mono text-emerald-400/70">BPM</span>
        </div>
      </div>

      {/* Animated SVG Path for Lead II Waveform */}
      <svg
        className="w-full h-full absolute inset-0 pt-3"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
      >
        <path
          d="
            M 0,60 L 50,60 
            C 60,58 65,54 75,54 C 85,54 90,60 100,60 
            L 120,60 L 125,65 L 132,15 L 140,95 L 146,60 L 160,60 
            C 175,60 185,48 200,48 C 215,48 225,60 240,60 
            L 300,60 
            C 310,58 315,54 325,54 C 335,54 340,60 350,60 
            L 370,60 L 375,65 L 382,15 L 390,95 L 396,60 L 410,60 
            C 425,60 435,48 450,48 C 465,48 475,60 490,60 
            L 550,60 
            C 560,58 565,54 575,54 C 585,54 590,60 600,60 
            L 620,60 L 625,65 L 632,15 L 640,95 L 646,60 L 660,60 
            C 675,60 685,48 700,48 C 715,48 725,60 740,60 
            L 800,60 
            C 810,58 815,54 825,54 C 835,54 840,60 850,60 
            L 870,60 L 875,65 L 882,15 L 890,95 L 896,60 L 910,60 
            C 925,60 935,48 950,48 C 965,48 975,60 990,60 
            L 1000,60
          "
          fill="none"
          stroke="#10B981"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-anim-path"
        />
      </svg>
    </div>
  );
}
