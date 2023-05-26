import React, { useEffect, useState } from 'react';
import { getWholeCocktailUsingAlphabet } from '../../API/CocktailAPI';
import styles from './Contents.module.scss';
import Search from './Search';
import { NavLink } from 'react-router-dom';

interface cocktailListType {
  [key: string]: string;
}

function Contents() {
  const [wholeCocktails, setWholeCocktails] = useState<cocktailListType[]>([]);

  //데이터를 받아오는 함수 -> ref 객체에 저장
  const getWholeCocktails = async () => {
    try {
      const wholeCocktailsList = await getWholeCocktailUsingAlphabet();
      console.log('전체데이터: ', wholeCocktailsList);
      return wholeCocktailsList;
    } catch (err) {
      throw new Error('모든 칵테일 정보를 받아오는데 실패했습니다.');
    }
  };

  //마운트 될 때 데이터 요청
  useEffect(() => {
    (async () => {
      const getWholeCocktailsList = await getWholeCocktails();
      setWholeCocktails(() => getWholeCocktailsList);
      return;
    })();
  }, []);

  return (
    <>
      <div className={styles.titleBox}>
        <NavLink to="/category" className={styles.title}>
          Browsing our cocktails!
        </NavLink>
      </div>
      <Search wholeCocktails={wholeCocktails} />
    </>
  );
}

export default Contents;
