import React from 'react';
import CWLayout from '../Layout/CWLayout';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Contents from '../components/Category/Contents';
import AlcoholicOps from '../components/Category/AlcoholicOps';
import ScrollHandler from '../components/Category/ScrollHandler';

function Category() {
  return (
    <CWLayout>
      <Provider store={store}>
        <h2>Browsing our cocktails</h2>
        <Contents />
        <AlcoholicOps />
        <ScrollHandler />
      </Provider>
    </CWLayout>
  );
}

export default Category;
