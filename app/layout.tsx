import type { Metadata } from 'next';
import './globals.css';
import Providers from './Provider';

export const metadata: Metadata = {
  title: 'Hotel Kampala | Golden Tulip',
  description: '...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className=''>
        <Providers
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
