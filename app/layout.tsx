import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Tamil Fonts Converter',
    template: '%s | Tamil Fonts Converter',
  },
  description:
    'Tamil Fonts Converter is a web application that allows users to easily convert Tamil text between various fonts and encodings.',
  applicationName: 'Tamil Fonts Converter',
  keywords: [
    'Tamil Fonts Converter',
    'Tamil Font Converter',
    'Tamil Text Converter',
    'Font Conversion',
    'Tamil Fonts',
    'Unicode Tamil',
    'Tamil Typing',
    'Online Tamil Converter',
    'Tamil Language Tools',
    'Tamil Text Encoding',
    'Tamil Font Tools',
    'Tamil Unicode Converter',
    'Tamil Font Encoder',
    'Tamil Text Tools',
    'Tamil Language Converter',
    'Tamil Font Utility',
    'Tamil Script Converter',
    'Tamil Font Translator',
  ],
  authors: [{ name: 'Senkanthal', url: 'https://senkanthal.org' }],
  creator: 'Senkanthal',
  publisher: 'Senkanthal',

  openGraph: {
    title: 'Tamil Fonts Converter',
    description:
      'Tamil Fonts Converter is a web application that allows users to easily convert Tamil text between various fonts and encodings.',
    url: 'https://tfc.senkanthal.org',
    siteName: 'Tamil Fonts Converter',
    images: [
      {
        url: 'https://tfc.senkanthal.org/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Tamil Fonts Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tamil Fonts Converter',
    description:
      'Tamil Fonts Converter is a web application that allows users to easily convert Tamil text between various fonts and encodings.',
    images: ['https://tfc.senkanthal.org/images/og.png'],
    creator: '@sivothayan',
  },

  alternates: {
    canonical: 'https://tfc.senkanthal.org',
    languages: {
      'en-US': 'https://tfc.senkanthal.org',
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  appleWebApp: {
    capable: true,
    title: 'Tamil Fonts Converter',
    startupImage: '/favicon/apple-touch-icon.png',
    statusBarStyle: 'default',
  },

  manifest: '/manifest.webmanifest',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-42x42.png',
        sizes: '42x42',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-16x16.webp',
        sizes: '16x16',
        type: 'image/webp',
      },
      {
        url: '/favicon/favicon-32x32.webp',
        sizes: '32x32',
        type: 'image/webp',
      },
      {
        url: '/favicon/favicon-42x42.webp',
        sizes: '42x42',
        type: 'image/webp',
      },
      {
        url: '/favicon/favicon-48x48.webp',
        sizes: '48x48',
        type: 'image/webp',
      },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon-57x57.png',
        sizes: '57x57',
      },
      {
        url: '/favicon/apple-touch-icon-60x60.png',
        sizes: '60x60',
      },
      {
        url: '/favicon/android-chrome-72x72.png',
        sizes: '72x72',
      },
      {
        url: '/favicon/apple-touch-icon-76x76.png',
        sizes: '76x76',
      },
      {
        url: '/favicon/apple-touch-icon-114x114.png',
        sizes: '114x114',
      },
      {
        url: '/favicon/apple-touch-icon-120x120.png',
        sizes: '120x120',
      },
      {
        url: '/favicon/android-chrome-144x144.png',
        sizes: '144x144',
      },
      {
        url: '/favicon/apple-touch-icon-152x152.png',
        sizes: '152x152',
      },
      {
        url: '/favicon/apple-touch-icon-167x167.png',
        sizes: '167x167',
      },
      {
        url: '/favicon/apple-touch-icon-180x180.png',
        sizes: '180x180',
      },
      {
        url: '/favicon/apple-touch-icon-1024x1024.png',
        sizes: '1024x1024',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/logo-symbol-icon.svg',
        color: '#6364FF',
      },
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>{children}</body>
    </html>
  );
}
