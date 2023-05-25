// 날씨와 매칭된 글래스옵션 api를 호출
// 호출된 API에서 반환된 칵테일 중에서 랜덤으로 하나를 선택하여 추천하는 기능을 추가

import React, { useEffect, useState } from 'react';
import styles from './WeatherToGlass.module.scss'

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

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface Props {
  weather: keyof typeof weatherToGlass;
  onCocktailSelected?: (id: string) => void;
}

const CocktailList: React.FC<Props> =({ weather, onCocktailSelected }) => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);


  // 해당 칵테일에 관한 구글 검색 페이지로 이동하기
  const handleGoogleSearch = () => {
    if (cocktail && cocktail.strDrink) {
      const searchWord = cocktail.strDrink;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchWord)}`;
      window.open(searchUrl, '_blank');
    }
  };
  

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
        
        // 선택된 칵테일의 ID를 상위 컴포넌트에 전달
        if (typeof onCocktailSelected === 'function') {
          onCocktailSelected(selectedCocktail.idDrink);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCocktails();
  }, [weather, onCocktailSelected]);

  if (!cocktail) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <h4 className={styles.cocktailName}>{cocktail.strDrink}</h4>
      <button 
        onClick={handleGoogleSearch}
        className={styles.googleBtn}>칵테일 정보 Google 검색</button>
      <img 
        src={cocktail.strDrinkThumb} 
        alt={cocktail.strDrink} 
        className={styles.drinkImg}
        />
    </div>
  );
};

export default CocktailList;
