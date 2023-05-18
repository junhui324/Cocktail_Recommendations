import React, { useState, useEffect } from 'react';
import CATEGORY from './Constant';
import CocktailList from './CocktailList';

interface cocktailListType {
  [key: string]: string;
}

interface checkBoxPropsType {
  isCheckedAll: boolean;
  setIsCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
  alcoholFilteredList: cocktailListType[];
}

function Checkbox({
  isCheckedAll,
  setIsCheckedAll,
  alcoholFilteredList,
}: checkBoxPropsType) {
  const [isChecked, setIsChecked] = useState<string[]>([]);

  //카테고리 체크박스에서 체크 이벤트가 발생했을 때 isChecked 목록 변경
  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked((current) => [...current, value]);
      console.log('단일 카테고리 체크 목록', isChecked);
      return;
    }
    setIsChecked((current) => {
      const newIsChecked = current.filter((category) => category !== value);
      return newIsChecked;
    });

    console.log('단일 카테고리 체크 목록', isChecked);
  };

  useEffect(() => {
    isChecked.length === Object.values(CATEGORY).length &&
      setIsCheckedAll(() => true);
  }, [isChecked]);

  useEffect(() => {
    isCheckedAll && setIsChecked(() => Object.values(CATEGORY));
    !isCheckedAll && setIsChecked(() => []);
  }, [isCheckedAll]);

  return (
    <>
      {Object.values(CATEGORY).map((category, idx) => (
        <label key={idx + 1}>
          <input
            type="checkbox"
            className="category"
            checked={isChecked.includes(category)}
            value={category}
            onChange={handleIsChecked}
            style={{ display: 'flex' }}
          />
          {category}
        </label>
      ))}
      <CocktailList
        isChecked={isChecked}
        alcoholFilteredList={alcoholFilteredList}
      />
    </>
  );
}

export default Checkbox;
