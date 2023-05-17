import React, { useState, useEffect } from "react";
import CocktailList from '../components/GlassSearch/WeatherToGlass';
import Layout from "../Layout/Layout";
import styles from "../components/GlassSearch/Landing.module.scss"
import { useNavigate } from "react-router-dom";
import { fetchWeatherData, getLocation } from '../API/WeatherAPI/index';


function Landing() {
  const navigate = useNavigate();
  
  // 추천받은 칵테일 상세 페이지로 넘어가기
  const handleButtonClickForDetail = () => {
    navigate('/detail');
  }
  
  // 다시 추천받기 기능
  const [reloadKey, setReloadKey] = useState(0); 
  const handleButtonClickForReload = () => {
    setReloadKey((prevKey) => prevKey + 1); 
  }

  // weather 데이터 불러오기
  type WeatherData = {
    name: string;
    main: {
      temp: number;
    };
    weather: {
      main: any;
      description: string;
      icon: string,
    }[];
  };

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;

        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeather(weatherData as WeatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCurrentWeather();
  }, []);

  if (!weather) {
    return <div>날씨에 어울리는칵테일 조리중...</div>;
  }

  const { name, main, weather: weatherDetails } = weather;
    console.log('weather:', weather);
    console.log('날씨(ko):', weatherDetails[0].description);
    
  const weatherName = weatherDetails[0].main;
    console.log('날씨(en):', weatherDetails[0].main);

  const temperature = `${main.temp.toFixed(0)} °C`;
  const { description, icon } = weatherDetails[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <Layout>
      <div className={styles.weatherbox}>
        <h3>현재 당신이 계신 곳은..</h3>
        <h3>{name}</h3>
        <p>날씨 : {description} | {temperature} </p>
        <img src={iconUrl} alt="Weather Icon"></img>

        <h3>날씨 '{description}'에 어울리는 칵테일은..</h3>

        <CocktailList 
          weather={weatherName}
          key={reloadKey}/> 
        <button 
          onClick={handleButtonClickForDetail}
          className={styles.toDetailPagebtn}>추천 칵테일에 대해 더 알아보기</button>
        <button onClick={handleButtonClickForReload}>다시 추천받기</button>
      </div>
    </Layout>
  );
}

export default Landing;