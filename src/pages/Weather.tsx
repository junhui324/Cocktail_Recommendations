import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

//const API_KEY = process.env.REACT_APP_API_KEY;
//console.log(API_KEY);
const API_KEY = '48a5fd1260a37826f8e477ce54dfde74';

type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
        );
        const cityName = await axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );
        const newCityName = `${cityName.data[0].name} ${response.data.name}`;
        const newRespone = { ...response.data, name: newCityName };

        setWeather(newRespone);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const { name, main, weather: weatherDetails } = weather;
  const temperature = `${main.temp.toFixed(0)} °C`;
  const { description, icon } = weatherDetails[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div>
      <h1>Weather in {name}</h1>
      <div>
        <img src={iconUrl} alt="Weather Icon" />
      </div>
      <div>Temperature: {temperature}</div>
      <div>Weather Description: {description}</div>
    </div>
  );
};

export default Weather;
