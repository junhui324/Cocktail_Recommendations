import React, { useState } from "react";

import Category from "./Category";
import Alcohol from "./Alcohol";
import {
  getRandomCocktailWithFavour,
  getRandomCockTail,
} from "../../API/CocktailAPI/index";
import styles from "./Option.module.scss";

interface OptionInterface {
  setRandom: React.Dispatch<any>;
}

function Option({ setRandom }: OptionInterface) {
  const [category, setCategory] = useState("");
  const [alcoholic, setAlcoholic] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(category);
    console.log(alcoholic);

    if (category === "All" && alcoholic === "All") {
      const data = await getRandomCockTail();

      setRandom(data);

      return;
    }

    const data = await getRandomCocktailWithFavour(category, alcoholic);

    setRandom(data);
    console.log(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <Category setCategory={setCategory} />

      <Alcohol setAlcoholic={setAlcoholic} />

      <div className={styles.btn_div}>
        <button>Re-Recommend</button>
      </div>
    </form>
  );
}

export default Option;
