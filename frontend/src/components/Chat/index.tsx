import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Message } from "../../utils/types";
import "./styles.scss";
import { Avatar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import { getMessage } from "../../utils/axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import type { EmojiObject } from "../../utils/types";

type ChatProps = {
  eventOpenChat: () => void;
};

let socket: Socket;

const Chat = ({ eventOpenChat }: ChatProps) => {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<Message[]>([]);
  const [userId, setUserId] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const endOfMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUserId(userInfo.id);
  }, [userInfo.id]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", {
        room: userId,
        sender: userId,
        content: message,
        createdAt: Date.now(),
      });
      setMessage("");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await getMessage();
      setChatList(res.data.messData.mess);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmojiSelect = (emoji: EmojiObject) => {
    setMessage((prev) => prev + emoji.native);
  };

  useEffect(() => {
    endOfMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  useEffect(() => {
    fetchMessages();
    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    socket.on("receive_message", (data) => {
      setChatList((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      socket.off("receive_message");
    };
  }, []);

  const now = dayjs().format("HH:mm DD/MM/YYYY");

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Avatar
          src={`${import.meta.env.VITE_API_URL}/uploads/academy-logo-element-vector-illustration-decorative-design-191487693.jpg`}
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
          onClick={eventOpenChat}
          sx={{
            position: "absolute",
            cursor: "pointer",
            right: "20px",
            top: "20px",
          }}
        />
      </div>

      <div className="chat-messages">
        <div className="message received">
          <div className="message-bubble">
            Xin chào! Tôi có thể giúp gì cho bạn? 😊
          </div>
          <div className="message-time">{now}</div>
        </div>

        {chatList.map((item, index) => {
          const isSentByCurrentUser = item.sender === userId;
          return (
            <div
              key={index}
              className={`message ${isSentByCurrentUser ? "sent" : "received"}`}
            >
              <div className="message-bubble">{item.content}</div>
              <div className="message-time">
                {dayjs(item.createdAt).format("HH:mm DD/MM/YYYY")}
              </div>
            </div>
          );
        })}
        <div ref={endOfMessageRef} />
      </div>

      <div className="typing-indicator">
        <span className="typing-dots">Đang nhập...</span>
      </div>

      <div className="chat-input">
        <div className="input-container">
          <button
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            😊
          </button>

          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="light"
              />
            </div>
          )}

          <input
            value={message}
            type="text"
            className="message-input"
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
