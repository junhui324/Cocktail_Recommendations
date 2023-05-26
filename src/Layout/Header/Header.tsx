import React, { useState, useEffect } from "react";

import Logo from './Logo';
import NavBar from './NavBar';
import Hamburger from './Hamburger';
import HamburgerMenu from './HamburgerMenu';
import styles from './Header.module.scss';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  // HamburgerMenu가 보이는 상태에서 화면 크기가 반응형 헤더를 변경 시킬 시
  // 토글을 통해 HamburgerMenu를 닫는다.
  useEffect(() => {
    const checkWindow = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", checkWindow);

    return () => {
      window.removeEventListener("resize", checkWindow);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 45) {
        return;
      }

      const moving = window.pageYOffset;

      setVisible(currentScroll > moving);

      setCurrentScroll(moving);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentScroll, isOpen]);

  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${visible ? styles.scrolled : ""}`}>
      <Logo />

      <NavBar />

      <Hamburger clickHandler={clickHandler} />

      <HamburgerMenu clickHandler={clickHandler} isOpen={isOpen} />
    </header>
  );
}

export default Header;
