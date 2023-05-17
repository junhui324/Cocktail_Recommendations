import React, { useState, useEffect } from 'react';
import { getCocktailWithWeather } from '../../API/CocktailAPI/index';

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type CocktailProps = {
  mainWeather: string;
};

export function Cocktail({ mainWeather }: CocktailProps) {
  const [cocktail, setCocktail] = useState<Drink[]>([]);

  useEffect(() => {
    const getCocktail = async () => {
      try {
        const cocktailData = await getCocktailWithWeather(mainWeather);
        //console.log(cocktailData);
        setCocktail(cocktailData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCocktail();
  }, [mainWeather]);

  return (
    <div>
      {cocktail.map((drink) => (
        <span key={drink.idDrink}>
          {drink.strDrink}
          <img
            src={drink.strDrinkThumb}
            alt="drink img"
            style={{ width: 300, height: 300 }}
          ></img>
        </span>
      ))}
    </div>
  );
}
