import React, { useState, useEffect } from 'react';
import CheckboxAll from './CheckboxAll';

type cocktailListType = {
  [key: string]: string;
};

interface alcoholicOpsPropsType {
  wholeCocktails: cocktailListType[];
}

function AlcoholicOps({ wholeCocktails }: alcoholicOpsPropsType) {
  const [alcoholicOps, setAlcoholicOps] = useState<string>('All');
  const [alcoholFilteredList, setAlcoholFilteredList] =
    useState<cocktailListType[]>(wholeCocktails);

  //디버깅
  useEffect(() => {
    console.log('알코올 필터링 변경', alcoholFilteredList);
  }, [alcoholFilteredList]);

  //알코올 필터링
  useEffect(() => {
    setAlcoholFilteredList(() => {
      return wholeCocktails;
    });
  }, [wholeCocktails]);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.target as HTMLButtonElement;
    setAlcoholicOps(value);

    if (alcoholicOps !== 'All') {
      const newCocktailList = wholeCocktails.filter(
        (cocktail) =>
          cocktail.strAlcoholic === alcoholicOps ||
          cocktail.strAlcoholic === 'Optional alcohol'
      );
      setAlcoholFilteredList(() => newCocktailList);
      return;
    }
    setAlcoholFilteredList(() => {
      const cocktailListNonOps = [...wholeCocktails];
      return cocktailListNonOps;
    });
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', margin: 0 }}>
        <button className="filter" value="All" onClick={handleOnClick}>
          All
        </button>
        <button className="filter" value="Alcoholic" onClick={handleOnClick}>
          Alcoholic
        </button>
        <button
          className="filter"
          value="Non alcoholic"
          onClick={handleOnClick}
        >
          Non-Alcoholic
        </button>
      </div>
      <CheckboxAll alcoholFilteredList={alcoholFilteredList} />
    </>
  );
}

export default AlcoholicOps;
