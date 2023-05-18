import React, { useState, useEffect } from 'react';
import CheckboxAll from './CheckboxAll';

type cocktailListType = {
  [key: string]: string;
};

interface alcoholicOpsPropsType {
  wholeCocktailList: cocktailListType[];
}

function AlcoholicOps({ wholeCocktailList }: alcoholicOpsPropsType) {
  const [alcoholicOps, setAlcoholicOps] = useState<string>('All');
  const [alcoholFilteredList, setAlcoholFilteredList] =
    useState<cocktailListType[]>(wholeCocktailList);

  //알코올 필터링
  useEffect(() => {
    setAlcoholFilteredList(() => {
      return [...wholeCocktailList];
    });
  }, []);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.target as HTMLButtonElement;
    setAlcoholicOps(value);

    if (alcoholicOps !== 'All') {
      const newCocktailList = wholeCocktailList.filter(
        (cocktail) =>
          cocktail.strAlcoholic === alcoholicOps ||
          cocktail.strAlcoholic === 'Optional alcohol'
      );
      setAlcoholFilteredList(() => newCocktailList);
      console.log('알코올 필터링 결과', alcoholFilteredList);
      return;
    }
    setAlcoholFilteredList(() => {
      const cocktailListNonOps = [...wholeCocktailList];
      return cocktailListNonOps;
    });
    console.log('알코올 필터링 미적용(All)', alcoholFilteredList);
  };

  return (
    <>
      <p>지금 렌더링되는 칵테일은 {alcoholicOps}입니다.</p>
      <button className="filter" value="All" onClick={handleOnClick}>
        All
      </button>
      <button className="filter" value="Alcoholic" onClick={handleOnClick}>
        Alcoholic
      </button>
      <button className="filter" value="Non alcoholic" onClick={handleOnClick}>
        Non-Alcoholic
      </button>
      <CheckboxAll alcoholFilteredList={alcoholFilteredList} />
    </>
  );
}

export default AlcoholicOps;
