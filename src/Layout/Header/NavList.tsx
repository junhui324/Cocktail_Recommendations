import React, { useMemo } from "react";

import CustomNavLink from "../../components/NavLink/CustomNavLink";
import styles from "./NavList.module.scss";

function NavList() {
  const navArray = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <ul className={styles.ul}>
      {navArray.map((menu) => (
        <li className={styles.li} key={menu.id}>
          <CustomNavLink to={menu.to} text={menu.text} />
        </li>
      ))}
    </ul>
  );
}

export default NavList;
