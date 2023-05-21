import React from 'react';
import Layout from '../Layout/Layout';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Contents from '../components/Category/Contents';
import AlcoholicOps from '../components/Category/AlcoholicOps';
import ScrollHandler from '../components/Category/ScrollHandler';

function Category() {
  return (
    <Layout>
      <Provider store={store}>
        <Contents />
        <AlcoholicOps />
        <ScrollHandler />
      </Provider>
    </Layout>
  );
}

export default Category;
