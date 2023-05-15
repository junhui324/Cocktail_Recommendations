import React from "react";

interface DescriptionInterface {
  description: string;
}

// const dataNumber = new Array(15)
//   .fill(0)
//   .map((item, index) => (item = index + 1));

// const dataNumber = new Array(15)
//   .fill(0)
//   .map((item, index) => (item = `strIngredient${index + 1}`));

function Description({ data }: any) {
  return (
    <div>
      <div>{data.strInstructions}</div>
    </div>
  );
}

export default Description;
