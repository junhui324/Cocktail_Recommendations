import React, { useState } from 'react';

import Logo from './Logo';
import NavBar from './NavBar';
import Hamburger from './Hamburger';
import HamburgerMenu from './HamburgerMenu';
import styles from './Header.module.scss';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      {/* <Logo /> */}

      <NavBar />

      <Hamburger clickHandler={clickHandler} />

      {isOpen && <HamburgerMenu clickHandler={clickHandler} />}
    </header>
  );
}

export default Header;
