import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AlcoholFilteredListContext } from './AlcoholicOps';
import { RootState } from '../../store/store';
import Pagination from './Pagination';
import styles from './CocktailList.module.scss';
import { useSelector } from 'react-redux';

interface cocktailListType {
  [key: string]: string;
}

function CocktailList() {
  const alcoholFilteredList = useContext(AlcoholFilteredListContext);
  const isChecked = useSelector((state: RootState) => state.isChecked);
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
      <p className={styles.cocktailContainer}>
        {currentPageCocktails.length !== 0 ? (
          currentPageCocktails.map((cocktail, idx) => (
            <div key={idx}>
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
          ))
        ) : (
          <div>설정된 카테고리에 해당하는 칵테일이 없습니다.</div>
        )}
      </p>

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
