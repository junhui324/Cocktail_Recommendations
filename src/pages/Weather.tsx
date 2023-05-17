import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import Layout from '../Layout/Layout';
import { fetchWeatherData, getLocation } from '../API/WeatherAPI/index';
import { getCocktailWithWeather } from '../API/CocktailAPI/index';
import DaumPostcode from 'react-daum-postcode';

type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

function SearchAddress(): JSX.Element {
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

  return (
    <div>
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

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{currentTime.toLocaleTimeString()}</>;
}

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type CocktailProps = {
  mainWeather: string;
};

function Cocktail({ mainWeather }: CocktailProps) {
  const [cocktail, setCocktail] = useState<Drink[]>([]);

  useEffect(() => {
    const getCocktail = async () => {
      try {
        const cocktailData = await getCocktailWithWeather(mainWeather);
        //console.log(cocktailData);
        setCocktail(cocktailData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCocktail();
  }, [mainWeather]);

  return (
    <div>
      <ul>
        {cocktail.map((drink) => (
          <li key={drink.idDrink}>
            {drink.strDrink}
            <img src={drink.strDrinkThumb} alt="drink img"></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCurrentWeather();
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const { name, main, weather: weatherDetails } = weather;
  const temperature = `${main.temp.toFixed(0)} °C`;
  const { description, icon } = weatherDetails[0];
  const mainWeather = weatherDetails[0].main;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  console.log(mainWeather);

  return (
    <Layout>
      <div>
        <h1>
          날씨가 {description}일 때 어울리는 칵테일{' '}
          <img src={iconUrl} alt="Weather Icon"></img>
        </h1>
      </div>
      <hr />
      <div>
        <div>
          <img src={iconUrl} alt="Weather Icon" />
        </div>

        <p>현재 시각 : {<Clock></Clock>}</p>
        <p>현재 지역 : {name}</p>
        <p>온도 : {temperature}</p>
        <p>날씨 : {description}</p>
      </div>
      <hr />
      <div>
        <Cocktail mainWeather={mainWeather}></Cocktail>
      </div>
      <p>주소 검색</p>
      <div>
        <SearchAddress></SearchAddress>
      </div>
    </Layout>
  );
}

export default Weather;
