import React from "react";

import NavList from "./NavList";
import { GrClose } from "react-icons/gr";
import styles from "./SlideMenu.module.scss";

interface SlideMenuInterface {
  closeHandler: () => void;
  isOpen: boolean;
}

function SlideMenu({ closeHandler, isOpen }: SlideMenuInterface) {
  return (
    <nav className={styles.nav}>
      <div
        className={`${styles.menu_container} ${isOpen ? styles.toggle : ""}`}
      >
        <div className={styles.btn_div}>
          <button onClick={closeHandler}>
            <GrClose />
          </button>
        </div>

        <NavList />
      </div>
    </nav>
  );
}

export default SlideMenu;
