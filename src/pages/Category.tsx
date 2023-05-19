import React from 'react';
import Layout from '../Layout/Layout';
import Contents from '../components/Category/Contents';
import ScrollHandler from '../components/Category/ScrollHandler';

function Category() {
  return (
    <Layout>
      <Contents />
      <ScrollHandler />
    </Layout>
  );
}

export default Category;
