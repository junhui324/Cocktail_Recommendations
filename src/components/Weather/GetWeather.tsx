import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { fetchWeatherData, getLocation } from '../../API/WeatherAPI/index';
import { Clock } from './Clock';
import { Cocktail } from './Cocktail';
import { SearchAddress } from './SearchAddress';

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

function GetWeather() {
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
    <div>
      <div>
        <h1>
          날씨가 {description}일 때 어울리는 칵테일{' '}
          <img src={iconUrl} alt="Weather Icon"></img>
        </h1>
      </div>

      <div>
        <img src={iconUrl} alt="Weather Icon" />
        <p>현재 시각 : {<Clock></Clock>}</p>
        <p>현재 지역 : {name}</p>
        <p>온도 : {temperature}</p>
        <p>날씨 : {description}</p>
      </div>

      <div>
        <Cocktail mainWeather={mainWeather}></Cocktail>
      </div>
    </div>
  );
}

export { GetWeather };
