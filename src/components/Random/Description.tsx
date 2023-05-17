import React from "react";
import { Link } from "react-router-dom";

import styles from "./Description.module.scss";

interface DescriptionInterface {
  name: string;
  cocktailId: string;
}

function Description({ name, cocktailId }: DescriptionInterface) {
  return (
    <section className={styles.section}>
      <h2 className={styles.name}>{name}</h2>

      <div className={styles.link_div}>
        <Link to={`/detail/${cocktailId}`} className={styles.link}>
          Show Detail
        </Link>
      </div>
    </section>
  );
}

export default Description;
