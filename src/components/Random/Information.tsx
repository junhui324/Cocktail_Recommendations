import React from "react";

import DetailButton from "./DetailButton";
import styles from "./Information.module.scss";
import CocktailContainer from "../Common/CocktailContainer";

function Information({ random }: any) {
  return (
    random && (
      <section className={styles.section}>
        <CocktailContainer
          src={random.strDrinkThumb}
          alt="cocktail"
          name={random.strDrink}
          upward={true}
        />

        <DetailButton cocktailId={random.idDrink} />
      </section>
    )
  );
}

export default Information;
