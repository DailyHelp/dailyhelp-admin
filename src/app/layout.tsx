// layout.js (Server Component)
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import LayoutWithConditionalUI from './layout/LayoutWithConditionalUI'; // 👈 move logic here
import { Toaster } from 'sonner';
import React from 'react';
import { ReactQueryProvider } from '@/providers/react-query-provider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'DailyHelp Admin',
  description: 'Manage DailyHelp platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <LayoutWithConditionalUI>
            {children}
            <Toaster
              position="top-right"
              richColors
              expand
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#017441',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  minWidth: '15rem',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
                },
              }}
            />
          </LayoutWithConditionalUI>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
