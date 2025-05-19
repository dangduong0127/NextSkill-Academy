import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.scss";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
