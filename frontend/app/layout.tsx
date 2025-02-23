import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VoiceCommandButton from '@/components/VoiceCommandButton';

import { UserProvider } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpotiFind Rx',
  description:
    'Ahoy! Set sail to find and log obstacles or prescriptions, matey!',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-parchment min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <VoiceCommandButton />
      </body>
    </html>
  );
}

import './globals.css';
