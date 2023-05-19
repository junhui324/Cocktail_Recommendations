import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { NavLink } from 'react-router-dom';

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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(cocktailList.length / 30);
  const firstCocktailIdx = (currentPage - 1) * 30;
  const lastCocktailIdx = firstCocktailIdx + 30;
  const currentPageCocktails = cocktailList.slice(
    firstCocktailIdx,
    lastCocktailIdx
  );

  useEffect(() => {
    const newCocktailList = alcoholFilteredList.filter(
      (cocktail) =>
        isChecked.includes(cocktail.strCategory) ||
        isChecked.includes(cocktail.strIngredient1)
    );
    setCocktailList(() => newCocktailList);
  }, [alcoholFilteredList, isChecked]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentPageCocktails.length !== 0
          ? currentPageCocktails.map((cocktail, idx) => (
              <section key={idx}>
                <div>
                  <NavLink to={`/detail/${cocktail.idDrink}`}>
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
                  </NavLink>

                  <NavLink to={`/detail/${cocktail.idDrink}`}>
                    {cocktail.strDrink}
                  </NavLink>
                </div>
              </section>
            ))
          : '설정된 카테고리에 해당하는 칵테일이 없습니다.'}
      </div>
      {currentPageCocktails.length !== 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></Pagination>
      )}
    </>
  );
}

export default CocktailList;
