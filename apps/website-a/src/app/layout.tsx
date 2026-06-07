import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import Banner from '@/components/layout/banner';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { StyleGlideProvider } from '@/components/providers/styleglide-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kinto-nextjs-template.vercel.app'),
  title: {
    default: 'Kinto - Modern Next.js Template',
    template: '%s | Kinto',
  },
  description:
    'A warm, editorial Next.js template built with Shadcn/UI, TailwindCSS and TypeScript. Perfect for SaaS landing pages, journals, and premium web applications.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'TailwindCSS',
    'Template',
    'Shadcn/UI',
    'Landing Page',
    'SaaS',
  ],
  authors: [{ name: 'Kinto - Shadcnblocks.com' }],
  creator: 'Kinto - Shadcnblocks.com',
  publisher: 'Kinto',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      {
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kinto-nextjs-template.vercel.app',
    siteName: 'Kinto',
    title: 'Kinto - Modern Next.js Template',
    description:
      'A warm, editorial Next.js template built with Shadcn/UI, TailwindCSS and TypeScript. Perfect for SaaS landing pages, journals, and premium web applications.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kinto - Modern Next.js Template',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinto - Modern Next.js Template',
    description:
      'A warm, editorial Next.js template built with Shadcn/UI, TailwindCSS and TypeScript. Perfect for SaaS landing pages, journals, and premium web applications.',
    images: ['/og-image.jpg'],
    creator: '@shadcnblocks',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const bannerDismissed =
    cookieStore.get('banner-dismissed')?.value === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex min-h-screen flex-col antialiased ${dmSans.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <StyleGlideProvider />

          <Banner
            url="https://www.shadcnblocks.com/template/kinto"
            initialVisible={!bannerDismissed}
          />
          <Navbar initialBannerVisible={!bannerDismissed} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
