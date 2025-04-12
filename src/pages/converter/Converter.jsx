import style from "./Converter.module.css";
import { convertText } from "../../scripts/convertText";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import availableFonts from "../../assets/availableFonts";
import fontFamilyMap from "../../assets/fontFamilyMap";
import "../../assets/fonts/fonts.css";

function Converter() {
  const [error, setError] = useState(null);
  const { fontFrom, fontTo } = useParams();
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // Track copy status
  const navigate = useNavigate();

  const handleConvert = () => {
    try {
      const output = convertText(text, fontFrom, fontTo);
      setConvertedText(output);
      setCopySuccess(false); // Reset copy status
    } catch (error) {
      setError(error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopySuccess(false);
    }
  };

  const handleSwap = () => {
    // Swap fontFrom and fontTo in the URL using /f/:fontTo/t/:fontFrom
    navigate(`/f/${fontTo}/t/${fontFrom}`);
    // Re-convert if text exists
    if (text) {
      try {
        const output = convertText(text, fontTo, fontFrom);
        setConvertedText(output);
        setCopySuccess(false);
      } catch (error) {
        setError(error);
      }
    }
  };

  if (!availableFonts.includes(fontFrom) || !availableFonts.includes(fontTo)) {
    const error = new Error("Invalid font selection. Please select valid fonts.");
    return (
      <div className={style.errorContainer}>
        <h1 className={style.errorText}>Error: {error.message}</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.errorContainer}>
        <h1 className={style.errorText}>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.heading}>Tamil Fonts Converter</h1>
        <h2 className={style.subheading}>Convert Tamil Fonts Easily</h2>
        {fontFrom && fontTo ? (
          <h2 className={style.subheading}>
            {`${fontFrom}`} to {`${fontTo}`} Converter
          </h2>
        ) : (
          <h2 className={style.subheading}>Select Fonts to Convert</h2>
        )}
      </div>
      <div className={style.converter}>
        <div className={style.buttonWrapper}>
          <button className={style.convertButton} onClick={handleConvert}>
            Convert
          </button>
          <button className={style.swapButton} onClick={handleSwap}>
            Swap Fonts
          </button>
          <button
            className={style.copyButton}
            onClick={handleCopy}
            disabled={!convertedText} // Disable if no text
          >
            {copySuccess ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <div className={style.textareaWrapper}>
          <textarea
            className={style.input}
            style={{
              fontFamily:
                fontFamilyMap[fontFrom.toLowerCase()] || '"Inter", sans-serif',
            }}
            placeholder="இங்கே உரையை உள்ளிடவும்..." // Tamil: "Enter text here..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
          <textarea
            className={style.output}
            style={{
              fontFamily:
                fontFamilyMap[fontTo.toLowerCase()] || '"Inter", sans-serif',
            }}
            placeholder="மாற்றப்பட்ட உரை இங்கே தோன்றும்..." // Tamil: "Converted text will appear here..."
            value={convertedText}
            readOnly
          ></textarea>
        </div>
      </div>
      <div className={style.footer}>
        <p className={style.footerText}>
          © {new Date().getFullYear()} Tamil Fonts Converter. All rights
          reserved.
        </p>
        <p className={style.footerText}>
          Developed by{" "}
          <a className={style.companyLinkFooter} href="https://senkanthal.org">
            Senkanthal.org
          </a>
        </p>
      </div>
    </div>
  );
}

export default Converter;