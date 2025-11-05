'use client';
import ErrorPage from '@/app/pages/errors/ErrorPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorPage
          errorHeading="500 – Something went wrong"
          errorDescription={error.message}
        >
          <button onClick={() => reset()}>Try again</button>
        </ErrorPage>
      </body>
    </html>
  );
}
