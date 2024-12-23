import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DeFi Dashboard',
  description: 'Real-time analytics for DeFi protocols',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
