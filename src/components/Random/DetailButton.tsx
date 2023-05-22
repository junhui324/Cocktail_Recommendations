import React from "react";
import { Link } from "react-router-dom";

import styles from "./DetailButton.module.scss";

interface DetailButtonInterface {
  cocktailId: string;
}

function DetailButton({ cocktailId }: DetailButtonInterface) {
  return (
    <div className={styles.link_div}>
      <Link to={`/detail/${cocktailId}`} className={styles.link}>
        Show Detail
      </Link>
    </div>
  );
}

export default DetailButton;
