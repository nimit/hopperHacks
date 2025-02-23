'use client';
import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VoiceCommandButton from '@/components/VoiceCommandButton';

import { UserProvider } from './context/UserContext';
import { useEffect } from 'react';
import { useUser } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'SpotiFind Rx',
//   description:
//     'Ahoy! Set sail to find and log obstacles or prescriptions, matey!',
//   generator: 'v0.dev',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser } = useUser();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-parchment min-h-screen flex flex-col`}
      >
        <UserProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          {/* <VoiceCommandButton /> */}
        </UserProvider>
      </body>
    </html>
  );
}

import './globals.css';
