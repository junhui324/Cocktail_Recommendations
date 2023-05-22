import React, { useState, useEffect } from "react";

import { getRandomCockTail } from "../API/CocktailAPI";
import Information from "../components/Random/Information";
import Favour from "../components/Random/Favour";
import NoData from "../components/Random/NoData";
import Layout from "../Layout/Layout";
import PageCard from "../components/Common/PageCard";
import PageTitle from "../components/Random/PageTitle";

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
      <PageCard>
        <PageTitle />

        {random ? <Information random={random} /> : <NoData />}

        <hr style={{ width: "100%" }} />

        <Favour setRandom={setRandom} />
      </PageCard>
    </Layout>
  );
}

export default Random;
