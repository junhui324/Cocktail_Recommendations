import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import Layout from '../Layout/Layout';
import { fetchWeatherData, getLocation } from '../API/WeatherAPI/index';
import { getCocktailWithWeather } from '../API/CocktailAPI/index';

//const API_KEY = process.env.REACT_APP_API_KEY;
//console.log(API_KEY);
//const API_KEY = '48a5fd1260a37826f8e477ce54dfde74';

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
        console.log(cocktailData);
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
          <li key={drink.idDrink}>{drink.strDrink}</li>
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
    </Layout>
  );
}

export default Weather;
