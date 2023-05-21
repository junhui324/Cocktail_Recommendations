import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import styles from './CheckboxAll.module.scss';

function CheckboxAll() {
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(true);

  //디버깅
  useEffect(() => {
    console.log('isCheckedAll 변경', isCheckedAll);
  }, [isCheckedAll]);

  //All 체크박스에서 체크 이벤트가 발생했을 때 실행할 핸들러
  const handleIsCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(() => e.target.checked);
  };

  return (
    <>
      <div className={styles.checkboxContainer}>
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
        />
      </div>
    </>
  );
}

export default CheckboxAll;
