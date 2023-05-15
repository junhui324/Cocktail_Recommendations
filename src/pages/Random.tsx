import React, { useState, useEffect } from "react";

import { getRandomCockTail } from "../API/CocktailAPI";
import Information from "../components/Random/Information";
import Favour from "../components/Random/Favour";
import NoData from "../components/Random/NoData";
import Layout from "../Layout/Layout";

function Random() {
  const [random, setRandom] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomCockTail();

      setRandom(data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <h1>How about this Cocktail?</h1>

        {random ? <Information random={random} /> : <NoData />}

        <Favour setRandom={setRandom} />
      </div>
    </Layout>
  );
}

export default Random;
