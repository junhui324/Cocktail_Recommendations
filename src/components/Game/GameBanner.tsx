import React from "react";
import styles from "./GameBenner.module.scss";

const GameBanner = () => (
  <>
    <div className={styles.glass}>Cocktail Quiz</div>
    <div className={styles.cocktailParty}>
      <div className={styles.martini}>
        <div className={styles.glass}>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
        </div>
        <div className="olives"></div>
      </div>
    </div>
  </>
);

export default GameBanner;
