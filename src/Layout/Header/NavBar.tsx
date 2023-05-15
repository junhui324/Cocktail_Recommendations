import React from "react";

import CustomNavLink from "../../components/NavLink/CustomNavLink";
import "./NavBar.module.scss";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <CustomNavLink to="/" text="Home" />
        </li>
        <li>
          <CustomNavLink to="/category" text="Cocktail" />
        </li>
        <li>
          <CustomNavLink to="/random" text="Random" />
        </li>
        <li>
          <CustomNavLink to="/weather" text="Weather" />
        </li>
        <li>
          <CustomNavLink to="/game" text="Quiz" />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
