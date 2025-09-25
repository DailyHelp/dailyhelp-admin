// layout.js (Server Component)
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import LayoutWithConditionalUI from './layout/LayoutWithConditionalUI'; // 👈 move logic here
import { Toaster } from 'sonner';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'DailyHelp Admin',
  description: 'Manage DailyHelp platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWithConditionalUI>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#017441',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                width: '15rem',
              },
            }}
          />
        </LayoutWithConditionalUI>
      </body>
    </html>
  );
}
