import React, { useEffect, useState } from "react";

import { getCateogry } from "../../API/CocktailAPI";

interface CategoryInterface {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

function Category({ setCategory }: CategoryInterface) {
  const [categories, setCategories] = useState<any>();
  const [checked, setChecked] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCateogry();

      const all = {
        strCategory: "All",
      };

      setCategories([all, ...data]);
      setCategory("All");
    };

    fetchData();
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value);
    setCategory(e.target.value);
  };

  return (
    <fieldset>
      <legend>Category</legend>

      {categories?.map((category: any, index: number) => (
        <React.Fragment key={index}>
          <label htmlFor={`category_${category.strCategory}`}>
            <input
              type="radio"
              value={category.strCategory}
              id={`category_${category.strCategory}`}
              name="category"
              onChange={changeHandler}
              checked={checked === category.strCategory}
            />
            {category.strCategory}
          </label>
        </React.Fragment>
      ))}
    </fieldset>
  );
}

export default Category;
