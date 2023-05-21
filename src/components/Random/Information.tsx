import React, { useRef } from "react";

import Description from "./Description";
import styles from "./Information.module.scss";
import { useImgLoadStatus } from "../../hooks/useImgLoadStatus";

function Information({ random }: any) {
  const imgRef = useRef<HTMLImageElement>(null);

  const isImgLoaded = useImgLoadStatus(imgRef);

  return (
    random && (
      <section className={styles.section}>
        <div className={styles.image_div}>
          <img
            alt="cocktail"
            src={random.strDrinkThumb}
            className={styles.image}
            ref={imgRef}
          />
        </div>

        {isImgLoaded && (
          <Description name={random.strDrink} cocktailId={random.idDrink} />
        )}
      </section>
    )
  );
}

export default Information;
