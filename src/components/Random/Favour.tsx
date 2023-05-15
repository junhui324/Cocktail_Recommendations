import React from "react";

import Option from "./Option";

interface FavourInterface {
  setRandom: React.Dispatch<any>;
}

function Favour({ setRandom }: FavourInterface) {
  return (
    <section>
      <h2>Add favour</h2>

      <Option setRandom={setRandom} />
    </section>
  );
}

export default Favour;
