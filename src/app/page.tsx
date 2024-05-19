import React from 'react';
import Movies from '../movies/page';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.description}>Movies watched: </div>
      <Movies />
    </main>
  );
}
