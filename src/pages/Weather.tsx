import React from 'react';
//import axios from 'axios';
import Layout from '../Layout/Layout';
import { Clock } from '../components/Weather/Clock';
import { Cocktail } from '../components/Weather/Cocktail';
import { SearchAddress } from '../components/Weather/SearchAddress';
import { GetWeather } from '../components/Weather/GetWeather';

function Weather() {
  return (
    <Layout>
      <GetWeather></GetWeather>
      <SearchAddress></SearchAddress>
    </Layout>
  );
}

export default Weather;
