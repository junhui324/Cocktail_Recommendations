import React from 'react';
import CocktailMatch from '../components/Landing/CocktailMatch';
// import CHLayout from "../components/Landing/CHLayout";
import Layout from "../Layout/Layout";
import CHPageCard from '../components/Landing/CHPageCard';


function Landing() {
  return (
    <Layout>
      <CHPageCard>
      <CocktailMatch></CocktailMatch>
      </CHPageCard>
    </Layout>
  );
}

export default Landing;