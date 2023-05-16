import React from "react";

import styles from "./Hamburger.module.scss";

interface HamburgerInterface {
  clickHandler: () => void;
}

function Hamburger({ clickHandler }: HamburgerInterface) {
  return (
    <div className={styles.div}>
      <button onClick={clickHandler}>햄버거</button>
    </div>
  );
}

export default Hamburger;
