import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skyline Health | Medical-Grade Continuous Biometric Telehealth Platform',
  description:
    'Continuous wrist-based biometric telemetry streaming, 24/7 specialist telehealth consultations, real-time Lead II ECG, and institutional EHR integration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=Manrope:wght@300..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-canvas text-text-primary antialiased selection:bg-primary-container selection:text-white">
        {children}
      </body>
    </html>
  );
}
