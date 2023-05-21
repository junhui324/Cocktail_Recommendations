import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setSearchResults } from '../../store/searchResultsSlice';
import styles from './Search.module.scss';

type cocktailListType = {
  [key: string]: string;
};

interface searchPropsType {
  wholeCocktails: cocktailListType[];
}

function Search({ wholeCocktails }: searchPropsType) {
  const searchResults = useSelector((state: RootState) => state.searchResults);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    console.log('검색결과', searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log('쿼리', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(setSearchResults(wholeCocktails));
  }, [wholeCocktails]);

  const searchCocktails = (searchQuery: string) => {
    const filteredCocktails = wholeCocktails.filter((cocktail) => {
      const cocktailName = cocktail.strDrink.toLowerCase();
      return cocktailName.includes(searchQuery.toLowerCase());
    });
    return filteredCocktails;
  };

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedQuery = e.target.searchQuery.value;
    if (submittedQuery !== null) {
      const results = searchCocktails(submittedQuery); //제출이 null이 아니라면 searchResult에 검색결과 담김
      dispatch(setSearchResults(results));
      return;
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(() => e.target.value);
  };

  return (
    <>
      <form className={styles.searchContainer} onSubmit={handleSubmitQuery}>
        <input
          type="text"
          name="searchQuery"
          onChange={handleSearchInputChange}
        />
        <button type="submit">검색</button>
      </form>
    </>
  );
}

export default Search;
