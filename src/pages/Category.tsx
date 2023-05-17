import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import { getWholeCocktailUsingAlphabet } from '../API/CocktailAPI';

interface CategoryType {
  [key: string]: string;
}

interface cocktailListType {
  [key: string]: string;
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
  const [cocktailList, setCocktailList] = useState<cocktailListType[]>([]);
  const [isChecked, setIsChecked] = useState<string[]>([]);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(true);
  const [alcoholicOps, setAlcoholicOps] = useState<string>('All');
  const [alcoholFilteringList, setAlcoholFilteringList] = useState<
    cocktailListType[]
  >([]);
  const wholeCocktailListRef = useRef<cocktailListType[]>([]);

  //데이터를 받아오는 함수 -> ref 객체에 저장
  const getWholeCocktails = async () => {
    try {
      const wholeCocktails = await getWholeCocktailUsingAlphabet();
      wholeCocktailListRef.current = wholeCocktails;
      console.log('전체데이터: ', wholeCocktailListRef.current);
      return wholeCocktailListRef.current;
    } catch (err) {
      throw new Error('모든 칵테일 정보를 받아오는데 실패했습니다.');
    }
  };

  //마운트 될 때 데이터 요청
  useEffect(() => {
    (async () => {
      await getWholeCocktails();
      return;
    })();
    setIsCheckedAll(true);
  }, []);

  //체크박스에서 체크되면 전체 데이터 중에 체크항목만 필터링
  useEffect(() => {
    const newCocktailList = alcoholFilteringList.filter(
      (cocktail) =>
        isChecked.includes(cocktail.strCategory) ||
        isChecked.includes(cocktail.strIngredient1)
    );
    setCocktailList(newCocktailList);
  }, [alcoholFilteringList, isChecked]);

  //알코올 필터링
  useEffect(() => {
    setAlcoholFilteringList(() => {
      return [...wholeCocktailListRef.current];
    });

    if (alcoholicOps !== 'All') {
      const newCocktailList = alcoholFilteringList.filter(
        (cocktail) =>
          cocktail.strAlcoholic === alcoholicOps ||
          cocktail.strAlcoholic === 'Optional alcohol'
      );
      setAlcoholFilteringList(newCocktailList);
      console.log('알코올 필터링 결과', alcoholFilteringList);
      return;
    }
    console.log('알코올 필터링 결과', alcoholFilteringList);
    return;
  }, [alcoholicOps]);

  //카테고리 체크박스에서 체크 이벤트가 발생했을 때 실행할 핸들러
  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked((current) => [...current, value]);
      return;
    }
    setIsChecked((current) => {
      const newIsChecked = current.filter((category) => category !== value);
      return newIsChecked;
    });

    // Object.values(isChecked).includes(false) || setIsCheckedAll(true);
    console.log('단일 카테고리 체크', isChecked);
  };

  //All 체크박스에서 체크 이벤트가 발생했을 때 실행할 핸들러
  const handleIsCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(e.target.checked);
    console.log('All', isCheckedAll);
    if (isCheckedAll) {
      const newIsChecked = Object.values(CATEGORY);
      setIsChecked(newIsChecked);
      return;
    }
    const initIsChecked: string[] = [];
    setIsChecked(initIsChecked);
  };

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.target as HTMLButtonElement;
    setAlcoholicOps(value);
    setIsCheckedAll(true);
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
      <label key={0} style={{ display: 'flex' }}>
        <input
          type="checkbox"
          className="category"
          checked={isCheckedAll}
          value="All"
          onChange={handleIsCheckedAll}
          style={{ display: 'flex' }}
        />
        All
      </label>
      {Object.keys(CATEGORY).map((category, idx) => (
        <label key={idx + 1} style={{ display: 'flex' }}>
          <input
            type="checkbox"
            className="category"
            checked={isChecked.includes(CATEGORY[category])}
            value={CATEGORY[category]}
            onChange={handleIsChecked}
            style={{ display: 'flex' }}
          />
          {CATEGORY[category]}
        </label>
      ))}

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

export default Category;
