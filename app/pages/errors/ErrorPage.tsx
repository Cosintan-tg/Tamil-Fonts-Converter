import styles from '@/app/pages/errors/ErrorPage.module.css';

function ErrorPage({
  errorHeading,
  errorDescription,
  children,
}: {
  errorHeading?: string;
  errorDescription?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{errorHeading}</h1>
      <h2 className={styles.description}>{errorDescription}</h2>
      {children}
    </div>
  );
}

export default ErrorPage;
