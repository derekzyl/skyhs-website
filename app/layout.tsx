import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://skylinehealth.org'),
  title: 'Skyline Health | Medical-Grade Continuous Biometric Telehealth Platform',
  description:
    'Continuous wrist-based biometric telemetry streaming, 24/7 specialist telehealth consultations, real-time Lead II ECG, and institutional EHR integration.',
  keywords: [
    'telehealth',
    'wearable ECG',
    'biometric monitoring',
    'remote patient monitoring',
    'telecardiology',
    'Skyline Health',
    'continuous telemetry',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'Skyline Health | Medical-Grade Continuous Biometric Telehealth Platform',
    description:
      'Continuous wrist-based biometric telemetry streaming, 24/7 specialist telehealth consultations, real-time Lead II ECG, and institutional EHR integration.',
    url: 'https://skylinehealth.org',
    siteName: 'Skyline Health',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skyline Health Continuous Telehealth Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skyline Health | Medical-Grade Continuous Biometric Telehealth Platform',
    description:
      'Continuous wrist-based biometric telemetry streaming, 24/7 specialist telehealth consultations, real-time Lead II ECG, and institutional EHR integration.',
    images: ['/og-image.jpg'],
    creator: '@SkylineHealth',
  },
};

import { ThemeProvider } from '../components/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('skyline-theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=JetBrains+Mono:wght@400;500;600;700&family=Manrope:wght@300..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-canvas text-text-primary antialiased selection:bg-primary-container selection:text-white transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
