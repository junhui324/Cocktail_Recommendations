import React from 'react';
import CocktailMatch from '../components/Landing/CocktailMatch';
import CHLayout from '../components/Landing/CHLayout';
import CHPageCard from '../components/Landing/CHPageCard';

function Landing() {
  const navigate = useNavigate();

  // 추천받은 칵테일 상세 페이지로 넘어가기
  const [selectedCocktailId, setSelectedCocktailId] = useState<string | null>(
    null
  );
  console.log('랜덤 칵테일 id:', selectedCocktailId);

  const handleButtonClickForDetail = () => {
    if (selectedCocktailId) {
      navigate(`/detail/${selectedCocktailId}`);
    } else {
      console.warn('칵테일 상세 페이지로 이동 중 에러 발생');
    }
  };

  // 다시 추천받기 기능
  const [reloadKey, setReloadKey] = useState(0);
  const handleButtonClickForReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  // weather 데이터 불러오기
  type WeatherData = {
    name: string;
    main: {
      temp: number;
    };
    weather: {
      main: any;
      description: string;
      icon: string;
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
    return (
      <div className={styles.loadingPg}>날씨에 어울리는 칵테일 제조중...</div>
    );
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
    <CHLayout>
      <CHPageCard>
        <CocktailMatch></CocktailMatch>
      </CHPageCard>
    </CHLayout>
  );
}

export default Landing;
