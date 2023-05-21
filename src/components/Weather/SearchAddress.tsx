import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { GeocoderAPI } from '../../API/WeatherAPI/index';
import { useDispatch, Provider } from 'react-redux';
import { setCoordinates } from '../../store/coordinatesSlice';
import { RootState, store } from '../../store/store';
import styles from './SearchAddress.module.scss';

export function SearchAddress(): JSX.Element {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  const dispatch = useDispatch();

  const [geocoderData, setGeocoderData] = useState(null);

  const handleSearchAddressButton = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `);
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  //일단 뭐... 작동은 됨. 이제 구한 위도 경도로 다시 날씨를 구해야함
  useEffect(() => {
    const getGeocoderData = async () => {
      try {
        const result = await GeocoderAPI(address);
        console.log(result);
        setGeocoderData(result);

        dispatch(
          setCoordinates({
            lat: result.y,
            lon: result.x,
          })
        );
      } catch (error) {
        console.error();
      }
    };
    getGeocoderData();
  }, [openPostcode, address]);

  return (
    <Provider store={store}>
      <div className={styles.searchAddress}>
        <p>주소 검색</p>
        <button onClick={handleSearchAddressButton.clickButton}>
          주소 검색
        </button>

        {openPostcode && (
          <DaumPostcode
            onComplete={handleSearchAddressButton.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          />
        )}
      </div>
    </Provider>
  );
}
