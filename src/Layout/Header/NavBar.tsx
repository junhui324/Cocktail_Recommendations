import React from "react";

import CustomNavLink from "../../components/NavLink/CustomNavLink";
import styles from "./NavBar.module.scss";

function NavBar() {
  const navArray = [
    {
      id: 1,
      to: "/",
      text: "Home",
    },
    {
      id: 2,
      to: "/category",
      text: "Cocktail",
    },
    {
      id: 3,
      to: "/random",
      text: "Random",
    },
    {
      id: 4,
      to: "/weather",
      text: "Weather",
    },
    {
      id: 5,
      to: "/game",
      text: "Quiz",
    },
  ];

  return (
    <nav>
      <ul className={styles.ul}>
        {navArray.map((menu) => (
          <li className={styles.li} key={menu.id}>
            <CustomNavLink to={menu.to} text={menu.text} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
