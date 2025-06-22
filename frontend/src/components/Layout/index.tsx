import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.scss";
import Chat from "../Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Link } from "react-router-dom";
import type { userInfo } from "../../utils/types";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [openChat, setOpenChat] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setUserInfo(user);
  }, []);

  const handleOpenChat = () => {
    setOpenChat(!openChat);
  };

  return (
    <>
      <Header />
      <div className="main">{children}</div>
      {userInfo && userInfo.role === "admin" ? (
        <Link className="btn-chat" to="/dashboard/chat">
          <ChatBubbleIcon />
        </Link>
      ) : (
        <>
          {openChat && <Chat eventOpenChat={handleOpenChat} />}
          <button className="btn-chat" onClick={() => setOpenChat(!openChat)}>
            <ChatBubbleIcon />
          </button>
        </>
      )}
      <Footer />
    </>
  );
};
export default Layout;
