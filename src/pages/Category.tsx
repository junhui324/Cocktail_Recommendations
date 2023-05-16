import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CategoryType {
  [key: string]: string;
}

interface cocktailListType {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const CATEGORY: CategoryType = {
  GIN: 'Gin',
  VODKA: 'Vodka',
  ORDINARY_DRINK: 'Ordinary Drink',
  COCKTAIL: 'Cocktail',
  SHAKE: 'Shake',
  COCOA: 'Cocoa',
  SHOT: 'Shot',
  COFFEE_TEA: 'Coffee / Tea',
  HOMEMADE_LIQUER: 'Homemade Liqueur',
  PUNCH_PARTY_DRINK: 'Punch / Party Drink',
  BEER: 'Beer',
  SOFT_DRINK: 'Soft Drink',
  OTHER: 'Other / Unknown',
};

function Category() {
  const [filteringKey, setFilteringKey] = useState<Record<string, boolean>>({});
  const [cocktailList, setCocktailList] = useState<cocktailListType[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const findCocktailsByCategory = async (category: string) => {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const cocktailInfoList = response.data.drinks;
    setCocktailList(() => {
      return cocktailInfoList;
    });
  };

  useEffect(() => {
    (async () => {
      Object.keys(filteringKey).map(async (category) => {
        return await findCocktailsByCategory(category);
      });
    })();
  }, [filteringKey]);

  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (isChecked) {
      return setFilteringKey((filteringKey) => ({
        ...filteringKey,
        [e.target.value]: true,
      }));
    }
    setFilteringKey((filteringKey) => {
      const newFilteringKey: Record<string, boolean> = { ...filteringKey };
      delete newFilteringKey[e.target.value];
      return newFilteringKey;
    });
  };

  return (
    <>
      {Object.keys(CATEGORY).map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            name="category"
            checked={isChecked}
            value={CATEGORY[category]}
            onChange={handleIsChecked}
          />
          {CATEGORY[category]}
        </label>
      ))}
      <div>
        {cocktailList.map((cocktail, idx) => (
          <div key={idx}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Category;
