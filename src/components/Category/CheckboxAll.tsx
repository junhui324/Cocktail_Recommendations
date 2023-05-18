import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';

interface cocktailListType {
  [key: string]: string;
}

interface checkboxAllPropsType {
  alcoholFilteredList: cocktailListType[];
}

function CheckboxAll({ alcoholFilteredList }: checkboxAllPropsType) {
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(true);

  //All 체크박스에서 체크 이벤트가 발생했을 때 실행할 핸들러
  const handleIsCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(() => e.target.checked);
    console.log('All', isCheckedAll);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <Checkbox
        isCheckedAll={isCheckedAll}
        setIsCheckedAll={setIsCheckedAll}
        alcoholFilteredList={alcoholFilteredList}
      />
    </div>
  );
}

export default CheckboxAll;
