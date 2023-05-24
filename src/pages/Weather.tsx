import React from 'react';
import Layout from '../Layout/Layout';
import { SearchAddress } from '../components/Weather/SearchAddress';
import { GetWeather } from '../components/Weather/GetWeather';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function Weather() {
  return (
    <Provider store={store}>
      <div>
        <Layout>
          <GetWeather></GetWeather>
          <SearchAddress></SearchAddress>
        </Layout>
      </div>
    </Provider>
  );
}

export default Weather;
