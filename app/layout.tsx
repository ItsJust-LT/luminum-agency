import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Luminum Agency | Leading Web Development Agency in South Africa',
  description: 'Premier web development and digital solutions agency in South Africa. We create exceptional digital experiences for businesses across Africa.',
  keywords: 'web development, South Africa, digital agency, web design, Cape Town, Johannesburg, ecommerce, mobile apps',
  authors: [{ name: 'Luminum Agency' }],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://luminumagency.co.za',
    title: 'Luminum Agency | Leading Web Development Agency in South Africa',
    description: 'Premier web development and digital solutions agency in South Africa. We create exceptional digital experiences for businesses across Africa.',
    siteName: 'Luminum Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luminum Agency | Leading Web Development Agency in South Africa',
    description: 'Premier web development and digital solutions agency in South Africa. We create exceptional digital experiences for businesses across Africa.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-10">

            </div>
            <Navbar />
            <main className="relative">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}