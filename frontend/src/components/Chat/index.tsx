import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { Message } from "../../utils/types";
import "./styles.scss";
import { Avatar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import { getMessage } from "../../utils/axios";

type ChatProps = {
  // active: boolean;
  eventOpenChat: () => void;
};

let socket: Socket;

const Chat = ({ eventOpenChat }: ChatProps) => {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<Message[]>([]);
  const [userId, setUserId] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "😍", "🤔", "😎", "🙏", "✨"];

  useEffect(() => {
    setUserId(userInfo.id);
  }, [userInfo.id]);

  const sendMessage = () => {
    console.log(message);
    if (message.trim() !== "") {
      socket.emit("send_message", {
        sender: userId,
        message,
        timestamp: Date.now(),
      });
      setMessage("");
    }
  };

  function addEmoji() {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessage((prev) => prev + randomEmoji);
  }

  const fetchMessages = async () => {
    try {
      const res = await getMessage(userId);
      setChatList(res.data.messData.mess);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    socket = io("http://localhost:3003", {
      withCredentials: true,
    });

    socket.on("receive_message", (data) => {
      setChatList((prev) => {
        return [...prev, data];
      });
    });

    // Clean up
    return () => {
      socket.disconnect();
      socket.off("receive_message");
    };
  }, []);

  const now = dayjs().format("HH:mm DD/MM/YYYY");
  return (
    <div className={`chat-container }`}>
      <div className="chat-header">
        <Avatar
          src="http://localhost:3003/src/uploads/academy-logo-element-vector-illustration-decorative-design-191487693.jpg"
          sx={{ width: "50px", height: "50px" }}
        />
        <div className="chat-header-info">
          <h2>💬 NextSkill Academy</h2>
          <div className="online-status">
            <span className="status-dot"></span>
            <span>Đang hoạt động</span>
          </div>
        </div>
        <CancelIcon
          onClick={() => eventOpenChat()}
          sx={{
            position: "absolute",
            cursor: "pointer",
            right: "20px",
            top: "20px",
          }}
        />
      </div>

      <div className="chat-messages" id="chatMessages">
        <div className="message received">
          <div className="message-bubble">
            Xin chào! Tôi có thể giúp gì cho bạn? 😊
          </div>
          <div className="message-time">{now}</div>
        </div>

        {chatList &&
          chatList.map((item, index) => {
            const isSentByCurrentUser = item.sender === userId;
            return (
              <div
                className={`message ${isSentByCurrentUser ? "sent" : "received"}`}
                key={index}
              >
                <div className="message-bubble">{item.message}</div>
                <div className="message-time">
                  {dayjs(item.timestamp).format("HH:mm DD/MM/YYYY")}
                </div>
              </div>
            );
          })}
      </div>

      <div className="typing-indicator" id="typingIndicator">
        <span className="typing-dots">Đang nhập...</span>
      </div>

      <div className="chat-input">
        <div className="input-container">
          <button className="emoji-button" onClick={addEmoji}>
            😊
          </button>
          <input
            value={message}
            type="text"
            className="message-input"
            id="messageInput"
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-button" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
