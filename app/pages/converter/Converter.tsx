'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/pages/converter/Converter.module.css';
import { convertText } from '@/app/pages/scripts/convertText';
import { availableFonts } from 'tamil-language-tools-and-assets';
import fontFamilyMap from '@/app/pages/assets/fontFamilyMap';

export default function Converter({
  fontFrom,
  fontTo,
}: {
  fontFrom: string;
  fontTo: string;
}) {
  const router = useRouter();

  const [text, setText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const [selectedFontFrom, setSelectedFontFrom] = useState<string>(() => {
    if (fontFrom && !Array.isArray(fontFrom)) return fontFrom;
    return availableFonts[0];
  });
  const [selectedFontTo, setSelectedFontTo] = useState<string>(() => {
    if (fontTo && !Array.isArray(fontTo)) return fontTo;
    return availableFonts[1];
  });

  const handleConvert = () => {
    try {
      const output = convertText(text, selectedFontFrom, selectedFontTo);
      setConvertedText(output);
      setCopySuccess(false);
    } catch (err: unknown) {
      setError(err as Error);
    }
  };

  const handleClear = () => {
    setText('');
    setConvertedText('');
    setCopySuccess(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopySuccess(false);
    }
  };

  const handleSwap = () => {
    const temp = selectedFontFrom;
    setSelectedFontFrom(selectedFontTo);
    setSelectedFontTo(temp);
    router.push(`/f/${selectedFontTo}/t/${temp}`);
    if (text) {
      try {
        const output = convertText(text, selectedFontTo, temp);
        setConvertedText(output);
        setCopySuccess(false);
      } catch (err: unknown) {
        setError(err as Error);
      }
    }
  };

  const handleFontFromChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newFontFrom = event.target.value;
    if (newFontFrom !== selectedFontTo) {
      setSelectedFontFrom(newFontFrom);
      router.push(`/f/${newFontFrom}/t/${selectedFontTo}`);
      if (text) {
        try {
          const output = convertText(text, newFontFrom, selectedFontTo);
          setConvertedText(output);
          setCopySuccess(false);
        } catch (err: unknown) {
          setError(err as Error);
        }
      }
    }
  };

  const handleFontToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontTo = event.target.value;
    if (newFontTo !== selectedFontFrom) {
      setSelectedFontTo(newFontTo);
      router.push(`/f/${selectedFontFrom}/t/${newFontTo}`);
      if (text) {
        try {
          const output = convertText(text, selectedFontFrom, newFontTo);
          setConvertedText(output);
          setCopySuccess(false);
        } catch (err: unknown) {
          setError(err as Error);
        }
      }
    }
  };

  if (
    !availableFonts.includes(selectedFontFrom) ||
    !availableFonts.includes(selectedFontTo)
  ) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorText}>Error: Invalid font selection.</h1>
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
        <h1 className={styles.heading}>Tamil Fonts Converter</h1>
        <h2 className={styles.subheading}>Convert Tamil Fonts Easily</h2>
        <h2 className={styles.subheading}>
          {selectedFontFrom} to {selectedFontTo} Converter
        </h2>
      </div>

      <div className={styles.converter}>
        <div className={styles.fontSelectorWrapper}>
          <div className={styles.fontSelector}>
            <label className={styles.fontLabel} htmlFor="fontFrom">
              From:
            </label>
            <select
              className={styles.fontDropdown}
              value={selectedFontFrom}
              onChange={handleFontFromChange}
              id="fontFrom"
            >
              {availableFonts
                .filter((f: string) => f !== selectedFontTo)
                .map((font: string) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.fontSelector}>
            <label className={styles.fontLabel} htmlFor="fontTo">
              To:
            </label>
            <select
              className={styles.fontDropdown}
              value={selectedFontTo}
              onChange={handleFontToChange}
              id="fontTo"
            >
              {availableFonts
                .filter((f: string) => f !== selectedFontFrom)
                .map((font: string) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.convertButton} onClick={handleConvert}>
            Convert
          </button>
          <button className={styles.clearButton} onClick={handleClear}>
            Clear
          </button>
          <button className={styles.swapButton} onClick={handleSwap}>
            Swap Fonts
          </button>
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            disabled={!convertedText}
          >
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className={styles.textareaWrapper}>
          <textarea
            name="textInput"
            className={styles.input}
            style={{
              fontFamily:
                fontFamilyMap[selectedFontTo as keyof typeof fontFamilyMap] ||
                'Baloo Thambi 2, sans-serif',
            }}
            placeholder="இங்கே உரையை உள்ளிடவும்..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <textarea
            name="textOutput"
            className={styles.output}
            style={{
              fontFamily:
                fontFamilyMap[selectedFontTo as keyof typeof fontFamilyMap] ||
                'Baloo Thambi 2, sans-serif',
            }}
            placeholder="மாற்றப்பட்ட உரை இங்கே தோன்றும்..."
            value={convertedText}
            readOnly
          />
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Tamil Fonts Converter. All rights
          reserved.
        </p>
        <p className={styles.footerText}>
          Developed by{' '}
          <a className={styles.companyLinkFooter} href="https://senkanthal.org">
            Senkanthal.org
          </a>
        </p>
      </div>
    </div>
  );
}
