import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import BackDrop from "../../components/BackDrop/BackDrop";
import SlideMenu from "./SlideMenu";
import styles from "./HamburgerMenu.module.scss";

interface HamburgerMenuInterface {
  clickHandler: () => void;
  isOpen: boolean;
}

function HamburgerMenu({ clickHandler, isOpen }: HamburgerMenuInterface) {
  // isOpen이 true일 때는 스크롤 막기
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, [isOpen]);

  const content = (
    <div
      id="hamburger"
      className={`${styles.menu} ${isOpen ? styles.toggle_menu : ""}`}
    >
      <BackDrop closeHandler={clickHandler} isOpen={isOpen} />

      <SlideMenu closeHandler={clickHandler} isOpen={isOpen} />
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("responsive_menu") as HTMLElement
  );
}

export default HamburgerMenu;
