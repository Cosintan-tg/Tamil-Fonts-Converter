import style from "./Home.module.css";
import { converterDetailsArray } from "../../assets/converterDetails";
import { useEffect, useState } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [converterDetails, setConverterDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setConverterDetails(converterDetailsArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <h1 className={style.loadingText}>Loading...</h1>
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
        <h1 className={style.heading}>Welcome to the Tamil Fonts Converter</h1>
        <h2 className={style.subHeading}>
          Convert your Tamil text easily and quickly!
        </h2>
      </div>
      <div className={style.converterContainer}>
        {converterDetails.map((converter) => (
          <div
            key={converter.id || converter.converterName}
            className={style.converterCard}
            onClick={() => window.open(converter.url, "_blank")}
          >
            <h3 className={style.converterName}>{converter.name}</h3>
            <p className={style.converterDescription}>
              {converter.description}
            </p>
          </div>
        ))}
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

export default Home;
