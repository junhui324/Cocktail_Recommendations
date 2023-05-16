import React, { useEffect, useState } from "react";

import { getAlcoholState } from "../../API/CocktailAPI";
import styles from "./Alcohol.module.scss";

interface AlcoholInterface {
  setAlcoholic: React.Dispatch<React.SetStateAction<string>>;
}

function Alcohol({ setAlcoholic }: AlcoholInterface) {
  const [alcohol, setAlcohol] = useState<any>();
  const [checked, setChecked] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAlcoholState();

      const all = {
        strAlcoholic: "All",
      };

      setAlcohol([all, ...data]);
      setAlcoholic("All");
    };

    fetchData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value);
    setAlcoholic(e.target.value);
  };

  return (
    <fieldset className={styles.filedset}>
      <legend>Alcohol</legend>

      {alcohol?.map((item: any, index: number) => (
        <label htmlFor={`alcohol_${item.strAlcoholic}`} key={index}>
          <input
            type="radio"
            value={item.strAlcoholic}
            id={`alcohol_${item.strAlcoholic}`}
            name="alcohol"
            onChange={changeHandler}
            checked={checked === item.strAlcoholic}
          />
          {item.strAlcoholic}
        </label>
      ))}
    </fieldset>
  );
}

export default Alcohol;
