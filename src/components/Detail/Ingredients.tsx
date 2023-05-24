import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCocktailIngredients,
  getIngredientImg,
} from '../../API/CocktailAPI';
import styles from './Detail.module.scss';

function Ingredients() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [ingredientImgs, setIngredientImgs] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function getIngredients() {
      const { ingredients, measures } = await getCocktailIngredients(
        Number(id)
      );
      setIngredients(ingredients);
      setMeasures(measures);

      const imgsPromises = ingredients.map((ingredient) =>
        getIngredientImg(ingredient)
      );
      // console.log(imgsPromises);
      const imgsUrls = await Promise.all(imgsPromises);
      setIngredientImgs(imgsUrls);
    }
    getIngredients();
  }, []);

  return (
    <>
      <h2>Ingredients</h2>
      <div className={styles.ingredients_container}>
        {ingredients.map((ingredient: string, index: number) => {
          const ingredientImg = ingredientImgs[index];

          return (
            <div key={index} className={styles.ingredients}>
              {ingredientImg && (
                <img
                  src={ingredientImg}
                  alt={ingredient}
                  className={styles.ingredient_img}
                />
              )}
              <div className={styles.ingredient_name}>
                {measures[index]} {ingredient}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Ingredients;
