import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./CustomNavLink.module.scss";

interface CustomNavLinkInterface {
  to: string;
  text: string;
}

function CustomNavLink(props: CustomNavLinkInterface) {
  const activeStyle = {
    borderBottom: "2px solid black",
  };

  return (
    <NavLink
      to={props.to}
      style={({ isActive }) => (isActive ? activeStyle : {})}
      className={styles.navlink}
    >
      {props.text}
    </NavLink>
  );
}

export default CustomNavLink;
