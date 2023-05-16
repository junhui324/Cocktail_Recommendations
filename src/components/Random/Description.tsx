import React from "react";
import { Link } from "react-router-dom";

import styles from "./Description.module.scss";

interface DescriptionInterface {
  description: string;
}

function Description({ description }: DescriptionInterface) {
  return (
    <section className={styles.section}>
      <div className={styles.desc}>{description}</div>

      <div className={styles.link_div}>
        <Link to="/detail" className={styles.link}>
          Show Detail
        </Link>
      </div>
    </section>
  );
}

export default Description;
