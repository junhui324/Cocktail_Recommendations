import React, { useEffect, useState } from "react";

import { getAlcoholState } from "../../API/CocktailAPI";

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
    <fieldset>
      <legend>Alcohol</legend>

      {alcohol?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <label htmlFor={`alcohol_${item.strAlcoholic}`}>
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
        </React.Fragment>
      ))}
    </fieldset>
  );
}

export default Alcohol;
