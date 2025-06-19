import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.scss";
import Chat from "../Chat";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="main">{children}</div>
      <Chat />
      <Footer />
    </>
  );
};

export default Layout;
