import React from "react";

import Description from "./Description";
import styles from "./Information.module.scss";

function Information({ random }: any) {
  return (
    random && (
      <section className={styles.section}>
        <div className={styles.image_div}>
          <img
            alt="cocktail"
            src={random.strDrinkThumb}
            className={styles.image}
          />
        </div>

        <Description name={random.strDrink} cocktailId={random.idDrink} />
      </section>
    )
  );
}

export default Information;
