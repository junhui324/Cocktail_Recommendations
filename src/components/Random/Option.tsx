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

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (category === "All" && alcoholic === "All") {
      const data = await getRandomCockTail();

      setRandom(data);

      setIsLoading(false);

      return;
    }

    const data = await getRandomCocktailWithFavour(category, alcoholic);

    setRandom(data);

    setIsLoading(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.option_form}>
      <Category setCategory={setCategory} />

      <Alcohol setAlcoholic={setAlcoholic} />

      <div className={styles.btn_div}>
        <button disabled={isLoading}>Re-Recommend</button>
      </div>
    </form>
  );
}

export default Option;
