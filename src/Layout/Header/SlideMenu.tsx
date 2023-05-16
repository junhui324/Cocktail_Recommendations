import React from "react";

import NavList from "./NavList";
import styles from "./SlideMenu.module.scss";

interface SlideMenuInterface {
  closeHandler: () => void;
}

function SlideMenu({ closeHandler }: SlideMenuInterface) {
  return (
    <nav className={styles.nav}>
      <div className={styles.btn_div}>
        <button onClick={closeHandler}>X</button>
      </div>

      <NavList />
    </nav>
  );
}

export default SlideMenu;
