import React from "react";
import CocktailMatch from "../components/Landing/CocktailMatch";
import CHLayout from "../components/Landing/CHLayout";
import CHPageCard from "../components/Landing/CHPageCard";

function Landing() {
  return (
    <CHLayout>
      <CHPageCard>
        <CocktailMatch></CocktailMatch>
      </CHPageCard>
    </CHLayout>
  );
}

export default Landing;
