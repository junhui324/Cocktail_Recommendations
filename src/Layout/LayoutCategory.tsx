import React from 'react';

import Header from './Header/Header';
import Footer from './Footer';
import styles from './LayoutCategory.module.scss';

function LayoutCategory(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  );
}

export default LayoutCategory;
