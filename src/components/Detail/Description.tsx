import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailDescription } from '../../API/CocktailAPI';
import Ingredients from './Ingredients';

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
    <>
      <h1>{drink.strDrink}</h1>
      <img alt={drink.strDrink} src={drink.strDrinkThumb} />
      <h3>Description</h3>
      <div>{drink.strInstructions}</div>
      <Ingredients />
    </>
  );
}

export default Description;
