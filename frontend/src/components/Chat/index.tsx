import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatList((prev) => [...prev, data]);
    });

    // Clean up
    return () => {
      socket.off("receive_message");
    };
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Realtime</h2>
      <div style={{ marginBottom: 10 }}>
        {chatList.map((item, index) => (
          <div key={index}>{item.message}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
};

export default Chat;
