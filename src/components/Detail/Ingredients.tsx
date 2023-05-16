import React, { useState, useEffect } from 'react';
import { getCocktailIngredients } from '../../API/CocktailAPI';

function Ingredients() {
  const [ingredients, setIngredients] = useState<any>([]);
  const [measures, setMeasures] = useState<any>([]);

  useEffect(() => {
    async function getIngredients() {
      const { ingredients, measures } = await getCocktailIngredients();
      setIngredients(ingredients);
      setMeasures(measures);
    }
    getIngredients();
  }, []);

  return (
    <>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient: any, index: number) => {
          return (
            <li key={index}>
              {measures[index]} {ingredient}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Ingredients;
