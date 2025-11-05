'use client';
import { Metadata } from 'next';
import ErrorPage from '@/app/pages/errors/ErrorPage';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <ErrorPage
          errorHeading="404 - Page Not Found"
          errorDescription="This page does not exist."
        />
      </body>
    </html>
  );
}
