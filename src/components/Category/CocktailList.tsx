import React, { useState, useEffect } from 'react';

interface cocktailListType {
  [key: string]: string;
}

interface cocktailListPropsType {
  alcoholFilteredList: cocktailListType[];
  isChecked: string[];
}

function CocktailList({
  alcoholFilteredList,
  isChecked,
}: cocktailListPropsType) {
  const [cocktailList, setCocktailList] = useState<cocktailListType[]>([]);

  useEffect(() => {
    const newCocktailList = alcoholFilteredList.filter(
      (cocktail) =>
        isChecked.includes(cocktail.strCategory) ||
        isChecked.includes(cocktail.strIngredient1)
    );
    setCocktailList(newCocktailList);
    console.log(cocktailList);
  }, [alcoholFilteredList, isChecked]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cocktailList.map((cocktail, idx) => (
          <div key={idx}>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              style={{
                margin: 0,
                width: 250,
                height: 250,
                display: 'flex',
              }}
            />
            <p>{cocktail.strDrink}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CocktailList;
