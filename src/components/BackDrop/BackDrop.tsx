import React from "react";

import styles from "./BackDrop.module.scss";

interface BackDropInterface {
  closeHandler: () => void;
}

function BackDrop({ closeHandler }: BackDropInterface) {
  return <div onClick={closeHandler} className={styles.backdrop}></div>;
}

export default BackDrop;
