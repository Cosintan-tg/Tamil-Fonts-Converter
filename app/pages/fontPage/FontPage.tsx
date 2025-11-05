'use client';
import { useRouter } from 'next/navigation';
import styles from '@/app/pages/fontPage/FontPage.module.css';
import { availableFonts } from 'tamil-language-tools-and-assets';

const FontPage = ({ fontName }: { fontName: string }) => {
  const router = useRouter();

  if (!fontName || !availableFonts.includes(fontName)) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorText}>
          Error: Invalid font &quot;{fontName}&quot;. Please select a valid
          font.
        </h1>
      </div>
    );
  }

  const handleConversionClick = (fontFrom: string, fontTo: string) => {
    router.push(`/f/${fontFrom}/t/${fontTo}`);
  };

  const displayFontName = fontName.charAt(0).toUpperCase() + fontName.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{displayFontName} Font Converters</h1>
        <h2 className={styles.subheading}>
          Convert Tamil Text To or From {displayFontName}
        </h2>
        <p className={styles.description}>
          Easily convert Tamil text involving the {displayFontName} font
          encoding. Choose a conversion pair below to start.
        </p>
      </div>

      <div className={styles.conversionLists}>
        <div className={styles.listContainer}>
          <h3 className={styles.listHeading}>
            {displayFontName} to Other Fonts
          </h3>
          <div className={styles.conversionGrid}>
            {availableFonts
              .filter((font: string) => font !== fontName)
              .map((fontTo: string) => (
                <button
                  key={`${fontName}-to-${fontTo}`}
                  className={styles.conversionBox}
                  onClick={() => handleConversionClick(fontName, fontTo)}
                >
                  {displayFontName} to{' '}
                  {fontTo.charAt(0).toUpperCase() + fontTo.slice(1)} Converter
                </button>
              ))}
          </div>
        </div>

        <div className={styles.listContainer}>
          <h3 className={styles.listHeading}>
            Other Fonts to {displayFontName}
          </h3>
          <div className={styles.conversionGrid}>
            {availableFonts
              .filter((font: string) => font !== fontName)
              .map((fontFrom: string) => (
                <button
                  key={`${fontFrom}-to-${fontName}`}
                  className={styles.conversionBox}
                  onClick={() => handleConversionClick(fontFrom, fontName)}
                >
                  {fontFrom.charAt(0).toUpperCase() + fontFrom.slice(1)} to{' '}
                  {displayFontName} Converter
                </button>
              ))}
          </div>
        </div>
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

export default FontPage;
