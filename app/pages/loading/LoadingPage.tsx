import styles from '@/app/pages/loading/LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingPage;
