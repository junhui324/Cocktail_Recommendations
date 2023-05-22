import React from 'react';

import Header from './Header/Header';
import Footer from './Footer';
import styles from './CWLayout.module.scss';

function CWLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <main className={styles.main}>{props.children}</main>

      <Footer />
    </div>
  );
}

export default CWLayout;
