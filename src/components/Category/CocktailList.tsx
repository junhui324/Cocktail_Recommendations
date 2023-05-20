import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

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

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(queryParams.get('page') || '1');

  const cocktailsPerPage = 30;
  const totalPages = Math.ceil(cocktailList.length / cocktailsPerPage);
  const firstCocktailIdx = (currentPage - 1) * cocktailsPerPage;
  const lastCocktailIdx = firstCocktailIdx + cocktailsPerPage;
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
    setCocktailList(newCocktailList);
  }, [alcoholFilteredList, isChecked]);

  useEffect(() => {
    setCurrentPage(() => pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    navigate('/category');
  }, [isChecked, alcoholFilteredList]);

  const handlePageQueryChange = (targetPageNumber: number) => {
    setCurrentPage(() => targetPageNumber);
    queryParams.set('page', targetPageNumber.toString());
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentPageCocktails.length !== 0 ? (
          currentPageCocktails.map((cocktail, idx) => (
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
        ) : (
          <div>설정된 카테고리에 해당하는 칵테일이 없습니다.</div>
        )}
      </div>

      {currentPageCocktails.length !== 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageQueryChange={handlePageQueryChange}
        />
      )}
    </>
  );
}

export default CocktailList;
