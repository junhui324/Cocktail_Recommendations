import React from "react";
import { NavLink } from "react-router-dom";

interface CustomNavLinkInterface {
  to: string;
  text: string;
}

function CustomNavLink(props: CustomNavLinkInterface) {
  const activeStyle = {
    backgroundColor: "blue",
  };

  return (
    <NavLink
      to={props.to}
      style={({ isActive }) => (isActive ? activeStyle : {})}
    >
      {props.text}
    </NavLink>
  );
}

export default CustomNavLink;
