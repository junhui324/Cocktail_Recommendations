import React from "react";

import Description from "./Description";

function Information({ random }: any) {
  return (
    random && (
      <section>
        <div>
          <img alt="cocktail" src={random.strDrinkThumb} />
        </div>

        <Description data={random} />
      </section>
    )
  );
}

export default Information;
