import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCocktailIngredients,
  getIngredientImg,
} from '../../API/CocktailAPI';

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
      <h3>Ingredients</h3>
      <div>
        {ingredients.map((ingredient: string, index: number) => {
          const ingredientImg = ingredientImgs[index];

          return (
            <span key={index}>
              {ingredientImg && <img src={ingredientImg} alt={ingredient} />}
              {measures[index]} {ingredient}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default Ingredients;
