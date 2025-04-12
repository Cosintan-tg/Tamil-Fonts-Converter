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
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  // State for dropdown selections
  const [selectedFontFrom, setSelectedFontFrom] = useState(fontFrom || availableFonts[0]);
  const [selectedFontTo, setSelectedFontTo] = useState(fontTo || availableFonts[1]);

  const handleConvert = () => {
    try {
      const output = convertText(text, selectedFontFrom, selectedFontTo);
      setConvertedText(output);
      setCopySuccess(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleClear = () => {
    setText("");
    setConvertedText("");
    setCopySuccess(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopySuccess(false);
    }
  };

  const handleSwap = () => {
    const temp = selectedFontFrom;
    setSelectedFontFrom(selectedFontTo);
    setSelectedFontTo(temp);
    navigate(`/f/${selectedFontTo}/t/${temp}`);
    if (text) {
      try {
        const output = convertText(text, selectedFontTo, temp);
        setConvertedText(output);
        setCopySuccess(false);
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleFontFromChange = (event) => {
    const newFontFrom = event.target.value;
    if (newFontFrom !== selectedFontTo) {
      setSelectedFontFrom(newFontFrom);
      navigate(`/f/${newFontFrom}/t/${selectedFontTo}`);
      if (text) {
        try {
          const output = convertText(text, newFontFrom, selectedFontTo);
          setConvertedText(output);
          setCopySuccess(false);
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const handleFontToChange = (event) => {
    const newFontTo = event.target.value;
    if (newFontTo !== selectedFontFrom) {
      setSelectedFontTo(newFontTo);
      navigate(`/f/${selectedFontFrom}/t/${newFontTo}`);
      if (text) {
        try {
          const output = convertText(text, selectedFontFrom, newFontTo);
          setConvertedText(output);
          setCopySuccess(false);
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  if (!availableFonts.includes(selectedFontFrom) || !availableFonts.includes(selectedFontTo)) {
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
        <h2 className={style.subheading}>
          {`${selectedFontFrom}`} to {`${selectedFontTo}`} Converter
        </h2>
      </div>
      <div className={style.converter}>
        <div className={style.fontSelectorWrapper}>
          <div className={style.fontSelector}>
            <label className={style.fontLabel} htmlFor="fontFrom">
              From:
            </label>
            <select
              className={style.fontDropdown}
              value={selectedFontFrom}
              onChange={handleFontFromChange}
              id="fontFrom"
              name="fontFrom"
            >
              {availableFonts
                .filter((font) => font !== selectedFontTo)
                .map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.fontSelector}>
            <label className={style.fontLabel} htmlFor="fontTo">
              To:
            </label>
            <select
              className={style.fontDropdown}
              value={selectedFontTo}
              onChange={handleFontToChange}
              id="fontTo"
              name="fontTo"
            >
              {availableFonts
                .filter((font) => font !== selectedFontFrom)
                .map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={style.buttonWrapper}>
          <button className={style.convertButton} onClick={handleConvert}>
            Convert
          </button>
          <button className={style.clearButton} onClick={handleClear}>
            Clear
          </button>
          <button className={style.swapButton} onClick={handleSwap}>
            Swap Fonts
          </button>
          <button
            className={style.copyButton}
            onClick={handleCopy}
            disabled={!convertedText}
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className={style.textareaWrapper}>
          <textarea
            className={style.input}
            style={{
              fontFamily:
                fontFamilyMap[selectedFontFrom.toLowerCase()] || '"Inter", sans-serif',
            }}
            placeholder="இங்கே உரையை உள்ளிடவும்..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            id="inputText"
            name="inputText"
          ></textarea>
          <textarea
            className={style.output}
            style={{
              fontFamily:
                fontFamilyMap[selectedFontTo.toLowerCase()] || '"Inter", sans-serif',
            }}
            placeholder="மாற்றப்பட்ட உரை இங்கே தோன்றும்..."
            value={convertedText}
            readOnly
            id="outputText"
            name="outputText"
          ></textarea>
        </div>
      </div>
      <div className={style.footer}>
        <p className={style.footerText}>
          © {new Date().getFullYear()} Tamil Fonts Converter. All rights reserved.
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