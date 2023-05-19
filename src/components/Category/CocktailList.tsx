import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(() => true);
    const newCocktailList = alcoholFilteredList.filter(
      (cocktail) =>
        isChecked.includes(cocktail.strCategory) ||
        isChecked.includes(cocktail.strIngredient1)
    );
    setCocktailList(() => newCocktailList);
    setIsLoading(() => false);
  }, [alcoholFilteredList, isChecked]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {isLoading && <div>칵테일 목록 받아오는 중..</div>}
        {cocktailList.length !== 0
          ? cocktailList.map((cocktail, idx) => (
              <div key={idx}>
                <Link to={`/detail/${cocktail.idDrink}`}>
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
                </Link>
                <Link to={`/detail/${cocktail.idDrink}`}>
                  <p>{cocktail.strDrink}</p>
                </Link>
              </div>
            ))
          : '설정된 카테고리에 해당하는 칵테일이 없습니다.'}
      </div>
    </>
  );
}

export default CocktailList;
