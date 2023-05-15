import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer";
import "./Layout.module.scss";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
