'use client';
import styles from '@/app/pages/home/Home.module.css';
import { availableFonts } from 'tamil-language-tools-and-assets';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ConverterDetail {
  id?: string | number;
  converterName: string;
  name: string;
  description?: string;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [converterDetails, setConverterDetails] = useState<ConverterDetail[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const converterDetailsArray = availableFonts.map((font, index) => ({
          id: index + 1,
          converterName: font,
          name: font,
        }));
        setConverterDetails(converterDetailsArray);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h1 className={styles.loadingText}>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorText}>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Welcome to the Tamil Fonts Converter</h1>
        <h2 className={styles.subHeading}>
          Convert your Tamil text easily and quickly!
        </h2>
      </div>

      <div className={styles.converterContainer}>
        {converterDetails.map((converter) => (
          <div
            key={converter.id || converter.converterName}
            className={styles.converterCard}
            onClick={() => router.push(`/font/${converter.converterName}`)}
          >
            <h3 className={styles.converterName}>{converter.name} Converter</h3>
            <p className={styles.converterDescription}>
              Convert from/to {converter.name} font encoding.
            </p>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Tamil Fonts Converter. All rights
          reserved.
        </p>
        <p className={styles.footerText}>
          Developed by{' '}
          <a
            className={styles.companyLinkFooter}
            href="https://senkanthal.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Senkanthal.org
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
