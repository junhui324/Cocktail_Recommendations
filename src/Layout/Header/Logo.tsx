import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <Link to="/" className={styles.logo_link}>
      <img alt="logo" src={logo} className={styles.logo_img} />
    </Link>
  );
}

export default Logo;
