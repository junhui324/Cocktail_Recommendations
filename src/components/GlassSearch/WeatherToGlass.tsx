// 날씨와 매칭된 글래스옵션 api를 호출
// 호출된 API에서 반환된 칵테일 중에서 랜덤으로 하나를 선택하여 추천하는 기능을 추가

import React, { useEffect, useState } from 'react';
import styles from './Landing.module.scss'

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const weatherToGlass = {
  'Thunderstorm': 'Coffee_mug',
  'Tornado': 'Coffee_mug',
  'Rain': 'Coffee_mug',
  'Squall': 'Coffee_mug',
  'Drizzle': 'Collins_glass',
  'Mist': 'Collins_glass',
  'Smoke': 'Collins_glass',
  'Fog': 'Collins_glass',
  'Haze': 'Collins_glass',
  'Snow': 'Irish_coffee_cup',
  'Clear': 'Cocktail_glass',
  'Clouds': 'Highball_glass',
  'Dust': 'Highball_glass',
  'Sand': 'Highball_glass',
  'Ash': 'Highball_glass'
};

const CocktailList: React.FC<{ weather: keyof typeof weatherToGlass }> = ({ weather }) => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktails = async () => {
      const glassOption = weatherToGlass[weather];
      if (!glassOption) {
        throw new Error(`Invalid weather type: ${weather}`);
      }

      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassOption}`);
        const data = await response.json();
        const cocktails = data.drinks;
        const randomIndex = Math.floor(Math.random() * cocktails.length);
        const selectedCocktail = cocktails[randomIndex]; // 랜덤으로 선택된 칵테일

        setCocktail({
          idDrink: selectedCocktail.idDrink, 
          strDrink: selectedCocktail.strDrink, 
          strDrinkThumb: selectedCocktail.strDrinkThumb, 
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCocktails();
  }, [weather]);

  if (!cocktail) {
    return <div>칵테일 조리중...</div>;
  }

  return (
    <div>
      <h4>{cocktail.strDrink}</h4>
      <img 
        src={cocktail.strDrinkThumb} 
        alt={cocktail.strDrink} 
        className={styles.drinkImg}
        />
    </div>
  );
};

export default CocktailList;

