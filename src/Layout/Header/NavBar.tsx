import React from 'react';

import NavList from './NavList';
import styles from './NavBar.module.scss';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavList />
    </nav>
  );
}

export default NavBar;
