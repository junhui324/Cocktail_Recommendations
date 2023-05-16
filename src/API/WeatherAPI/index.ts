import axios from 'axios';

const API_KEY = '48a5fd1260a37826f8e477ce54dfde74';

type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

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

    return newRespone;
  } catch (err) {
    throw new Error('openweathermap API 통신 에러');
  }
};

const getLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

export { fetchWeatherData, getLocation };
