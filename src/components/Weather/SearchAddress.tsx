import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GEO_API_KEY;

async function GeocoderAPI(address: string) {
  try {
    const URL =
      `/req/address?service=address` +
      `&request=getcoord&version=2.0` +
      `&address=` +
      encodeURI(address) +
      `&type=road&key=${API_KEY}`;
    const response = await axios.get(URL);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export function SearchAddress(): JSX.Element {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [zonecode, setZonecode] = useState<string>('');

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
      setZonecode(data.zonecode);
      setOpenPostcode(false);
    },
  };

  //context를 써서 ... 다른 컴포넌트에서도 address를 사용할 수 있게 해야하나..
  console.log('address : ', address, ' zonecode : ', zonecode);

  //일단 뭐... 작동은 됨. 이제 구한 위도 경도로 다시 날씨를 구해야함
  useEffect(() => {
    GeocoderAPI(address);
  }, [openPostcode]);

  return (
    <div>
      <p>주소 검색</p>
      <button onClick={handleSearchAddressButton.clickButton}>주소 검색</button>

      {openPostcode && (
        <DaumPostcode
          onComplete={handleSearchAddressButton.selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        />
      )}
    </div>
  );
}
