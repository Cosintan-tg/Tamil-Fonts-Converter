import { useNavigate, useParams } from "react-router-dom";
import style from "./FontPage.module.css";
import availableFonts from "../../assets/availableFonts";

function FontPage() {
  const { fontName } = useParams();
  const navigate = useNavigate();

  // Validate fontName
  if (!availableFonts.includes(fontName)) {
    return (
      <div className={style.errorContainer}>
        <h1 className={style.errorText}>
          Error: Invalid font "{fontName}". Please select a valid font.
        </h1>
      </div>
    );
  }

  const handleConversionClick = (fontFrom, fontTo) => {
    navigate(`/f/${fontFrom}/t/${fontTo}`);
  };

  // Capitalize font name for display
  const displayFontName = fontName.charAt(0).toUpperCase() + fontName.slice(1);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.heading}>{displayFontName} Font Converters</h1>
        <h2 className={style.subheading}>
          Convert Tamil Text To or From {displayFontName}
        </h2>
        <p className={style.description}>
          Easily convert Tamil text involving the {displayFontName} font encoding.
          Choose a conversion pair below to start.
        </p>
      </div>
      <div className={style.conversionLists}>
        <div className={style.listContainer}>
          <h3 className={style.listHeading}>
            {displayFontName} to Other Fonts
          </h3>
          <div className={style.conversionGrid}>
            {availableFonts
              .filter((font) => font !== fontName)
              .map((fontTo) => (
                <button
                  key={`${fontName}-to-${fontTo}`}
                  className={style.conversionBox}
                  onClick={() => handleConversionClick(fontName, fontTo)}
                >
                  {displayFontName} to{" "}
                  {fontTo.charAt(0).toUpperCase() + fontTo.slice(1)} Converter
                </button>
              ))}
          </div>
        </div>
        <div className={style.listContainer}>
          <h3 className={style.listHeading}>
            Other Fonts to {displayFontName}
          </h3>
          <div className={style.conversionGrid}>
            {availableFonts
              .filter((font) => font !== fontName)
              .map((fontFrom) => (
                <button
                  key={`${fontFrom}-to-${fontName}`}
                  className={style.conversionBox}
                  onClick={() => handleConversionClick(fontFrom, fontName)}
                >
                  {fontFrom.charAt(0).toUpperCase() + fontFrom.slice(1)} to{" "}
                  {displayFontName} Converter
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <p className={style.footerText}>
          © {new Date().getFullYear()} Tamil Fonts Converter. All rights reserved.
        </p>
        <p className={style.footerText}>
          Developed by{" "}
          <a
            className={style.companyLinkFooter}
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
}

export default FontPage;