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
  const [isChecked, setIsChecked] = useState<string[]>(Object.values(CATEGORY));

  // 카테고리 체크박스에서 체크 이벤트가 발생했을 때 isChecked 목록 변경
  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      const addIsChecked = [...isChecked, value];
      setIsChecked(() => addIsChecked);
      return;
    }
    const subIsChecked = isChecked.filter((category) => category !== value);
    setIsChecked(() => subIsChecked);
  };

  // 디버깅
  useEffect(() => {
    console.log('isChecked 변경', isChecked);
  }, [isChecked]);

  // 단일 체크박스 상태가 변경된 경우 (x)
  useEffect(() => {
    const categories = Object.values(CATEGORY);
    if (isCheckedAll && isChecked.length === categories.length - 1) {
      setIsCheckedAll(() => false);
    }
    if (isChecked.length !== categories.length) {
      setIsCheckedAll(() => false);
    }
  }, [isChecked]);

  // All 체크박스 상태가 변경된 경우
  useEffect(() => {
    const categories = Object.values(CATEGORY);
    if (!isCheckedAll && isChecked.length === categories.length) {
      return setIsChecked(() => []);
    }
    if (!isCheckedAll && isChecked.length !== categories.length) {
      return;
    }
    const newIsChecked = [...categories];
    setIsChecked((prev) => {
      return prev.length !== categories.length ? newIsChecked : prev;
    });
    return;
  }, [isCheckedAll]);

  return (
    <>
      {Object.values(CATEGORY).map((category, idx) => (
        <label key={idx + 1} style={{ display: 'flex' }}>
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
