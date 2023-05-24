import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailDescription } from '../../API/CocktailAPI';
import Ingredients from './Ingredients';
import styles from './Detail.module.scss';

function Description() {
  const [drink, setDrink] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    async function getDescription() {
      const data = await getCocktailDescription(Number(id));
      setDrink(data);
    }
    getDescription();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.drink}>
        <h1>{drink.strDrink}</h1>
        <img
          alt={drink.strDrink}
          src={drink.strDrinkThumb}
          className={styles.drink_img}
        />
      </div>
      <div className={styles.description}>
        <div className={styles.instructions}>
          <h2>Description</h2>
          <div className={styles.instruction_font}>{drink.strInstructions}</div>
        </div>
        <hr />
        <Ingredients />
      </div>
    </div>
  );
}

export default Description;
