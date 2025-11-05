import styles from '@/app/pages/errors/Error404.module.css';

function Error404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Error 404</h1>
      <h2 className={styles.description}>Not Found!</h2>
    </div>
  );
}

export default Error404;
