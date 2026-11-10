// CivicAI Lampung - Root Layout
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CivicAI Lampung — Platform Pengaduan Masyarakat Berbasis Web',
  description:
    'Sistem pengaduan masyarakat cerdas terintegrasi Pemerintah Provinsi Lampung dan Universitas Teknokrat Indonesia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between selection:bg-primary-tint selection:text-primary">
        {children}
      </body>
    </html>
  );
}

