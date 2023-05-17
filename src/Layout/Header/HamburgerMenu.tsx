import React from "react";

import BackDrop from "../../components/BackDrop/BackDrop";
import SlideMenu from "./SlideMenu";
import styles from "./HamburgerMenu.module.scss";

interface HamburgerMenuInterface {
  clickHandler: () => void;
}

function HamburgerMenu({ clickHandler }: HamburgerMenuInterface) {
  return (
    <div className={styles.menu}>
      <BackDrop closeHandler={clickHandler} />

      <SlideMenu closeHandler={clickHandler} />
    </div>
  );
}

export default HamburgerMenu;
