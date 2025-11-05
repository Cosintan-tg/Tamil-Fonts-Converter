import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tamil Fonts Converter',
    short_name: 'Tamil Fonts Converter',
    description:
      'Tamil Fonts Converter is a web application that allows users to easily convert Tamil text between various fonts and encodings.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f7fa',
    theme_color: '#f5f7fa',
    icons: [
      {
        src: 'https://senkanthal.org/favicon/android-chrome-72x72.webp',
        sizes: '72x72',
        type: 'image/webp',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-144x144.webp',
        sizes: '144x144',
        type: 'image/webp',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-192x192.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-512x512.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://senkanthal.org/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'https://senkanthal.org/favicon/logo-symbol-icon.svg',
        type: 'image/svg+xml',
      },
    ],
  };
}
