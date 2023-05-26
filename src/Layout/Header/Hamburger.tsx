import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Hamburger.module.scss";

interface HamburgerInterface {
  clickHandler: () => void;
}

function Hamburger({ clickHandler }: HamburgerInterface) {
  return (
    <button onClick={clickHandler} className={styles.toggle_btn}>
      <GiHamburgerMenu size={30} />
    </button>
  );
}

export default Hamburger;
