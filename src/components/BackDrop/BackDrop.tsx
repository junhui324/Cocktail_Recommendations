import React from "react";

import styles from "./BackDrop.module.scss";

interface BackDropInterface {
  closeHandler: () => void;
  isOpen: boolean;
}

function BackDrop({ closeHandler, isOpen }: BackDropInterface) {
  return (
    <div
      onClick={closeHandler}
      className={`${styles.backdrop} ${isOpen ? styles.toggle : ""}`}
    ></div>
  );
}

export default BackDrop;
