import React from 'react';

import HeaderCategory from './Header/HeaderCategory';
import Footer from './Footer';
import styles from './LayoutCategory.module.scss';

function LayoutCategory(props: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <HeaderCategory />

      <main className={styles.main}>{props.children}</main>

      <Footer />
    </div>
  );
}

export default LayoutCategory;
