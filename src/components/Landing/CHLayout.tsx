import React from 'react';

import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer';
import styles from './CHLayout.module.scss';

function CHLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <main className={styles.main}>{props.children}</main>

      <Footer />
    </div>
  );
}

export default CHLayout;
