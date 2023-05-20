import React, { useEffect, useState } from 'react';
import AlcoholicOps from './AlcoholicOps';

type cocktailListType = {
  [key: string]: string;
};

interface searchPropsType {
  wholeCocktails: cocktailListType[];
}

function Search({ wholeCocktails }: searchPropsType) {
  const [searchResults, setSearchResults] = useState<cocktailListType[] | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    console.log('검색결과', searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log('쿼리', searchQuery);
  }, [searchQuery]);

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
      const results = searchCocktails(submittedQuery);
      setSearchResults(() => results);
      return;
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(() => e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmitQuery}>
        <input
          type="text"
          name="searchQuery"
          onChange={handleSearchInputChange}
        />
        <button type="submit">검색</button>
      </form>
      <AlcoholicOps
        wholeCocktails={searchResults !== null ? searchResults : wholeCocktails}
      />
    </>
  );
}

export default Search;
