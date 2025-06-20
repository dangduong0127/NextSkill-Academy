import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.scss";
import Chat from "../Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [openChat, setOpenChat] = useState(false);
  const handleOpenChat = () => {
    setOpenChat(!openChat);
  };

  return (
    <>
      <Header />
      <div className="main">{children}</div>
      {openChat && <Chat eventOpenChat={handleOpenChat} />}
      <button className="btn-chat" onClick={() => setOpenChat(!openChat)}>
        <ChatBubbleIcon />
      </button>
      <Footer />
    </>
  );
};
export default Layout;
