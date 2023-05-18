import React, { useEffect, useRef } from 'react';
import { getWholeCocktailUsingAlphabet } from '../../API/CocktailAPI';
import AlcoholicOps from './AlcoholicOps';
import CheckboxAll from './CheckboxAll';

interface cocktailListType {
  [key: string]: string;
}

function Contents() {
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
  }, []);

  return (
    <>
      <AlcoholicOps wholeCocktailList={wholeCocktailListRef.current} />
    </>
  );
}

export default Contents;
