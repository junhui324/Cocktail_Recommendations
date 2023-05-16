import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <main className={styles.main}>{props.children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
