import style from "./Converter.module.css";
import { convertText } from "../../scripts/convertText";
import { useState } from "react";
import { useParams } from "react-router-dom";
import availableFonts from "../../assets/availableFonts";

function Converter() {
  const [error, setError] = useState(null);
  const { fontFrom, fontTo } = useParams();
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");

  const handleConvert = () => {
    try {
      const output = convertText(text, fontFrom, fontTo);
      setConvertedText(output);
    } catch (error) {
      setError(error);
    }
  };

  if(!availableFonts.includes(fontFrom) || !availableFonts.includes(fontTo)) {
    const error = new Error("Invalid font selection. Please select valid fonts.");
    return (
      <div className={style.errorContainer}>
        <h1 className={style.errorText}>Error: {error.message}</h1>
      </div>  
    )
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
        <button className={style.convertButton} onClick={handleConvert}>
          Convert
        </button>
        <textarea
          className={style.input}
          placeholder="Enter text here..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <textarea
          className={style.output}
          placeholder="Converted text will appear here..."
          value={convertedText}
          readOnly
        ></textarea>
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
