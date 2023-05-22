import React, { useRef } from "react";

import { useImgLoadStatus } from "../../hooks/useImgLoadStatus";
import styles from "./CocktailContainer.module.scss";

interface ImgContainerInterface {
  src: string;
  alt: string;
  name: string;
  upward: boolean;
}

function CocktailContainer(props: ImgContainerInterface) {
  const imgRef = useRef<HTMLImageElement>(null);

  const isImgLoaded = useImgLoadStatus(imgRef);

  return (
    <div>
      {props.upward && isImgLoaded && <h2>{props.name}</h2>}

      <div className={styles.image_div}>
        <img
          alt={props.alt}
          src={props.src}
          className={styles.image}
          ref={imgRef}
        />
      </div>

      {!props.upward && isImgLoaded && <h2>{props.name}</h2>}
    </div>
  );
}

export default CocktailContainer;
