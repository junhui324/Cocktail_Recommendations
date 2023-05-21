import React from 'react';
import Layout from '../Layout/Layout';
import { Provider } from 'react-redux';
import CategoryStore from '../store/CategoryStore';
import Contents from '../components/Category/Contents';
import ScrollHandler from '../components/Category/ScrollHandler';

function Category() {
  return (
    <Layout>
      <Provider store={CategoryStore}>
        <Contents />
        <ScrollHandler />
      </Provider>
    </Layout>
  );
}

export default Category;
