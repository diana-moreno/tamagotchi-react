import React from 'react';
import styles from './app.module.scss';

const App = () => (
  <main>
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={`${styles.game} ${styles.day}`}></div>
        <div className={`${styles.fox} ${styles.hidden}`}></div>
        <div className={`${styles.poopBag} ${styles.hidden}`}></div>
        <div className={styles.foregroundRain}></div>
        <div className={styles.modal}>
          <div className={styles.modalInner}>
            Press the middle button to start
          </div>
        </div>
        <div className={styles.frame}></div>
        <div className={styles.buttons}>
          <div className={`${styles.btn} ${styles.leftBtn}`}></div>
          <div className={`${styles.btn} ${styles.middleBtn}`}></div>
          <div className={`${styles.btn} ${styles.rightBtn}`}></div>
        </div>
        <div className={styles.icons}>
          <div
            className={`${styles.icon} ${styles.highlighted} ${styles.fishIcon}`}
          ></div>
          <div className={`${styles.icon} ${styles.poopIcon}`}></div>
          <div className={`${styles.icon} ${styles.weatherIcon}`}></div>
        </div>
      </div>
    </div>
  </main>
);

export default App;
