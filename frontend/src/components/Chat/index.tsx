import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Message } from "../../utils/types";
import "./styles.scss";
import { Avatar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import { getMessage, uploadImage } from "../../utils/axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import type { EmojiObject } from "../../utils/types";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUserId(userInfo.id);
  }, [userInfo.id]);

  const sendMessage = async () => {
    fetchMessages();

    let uploadedImgFileName: string | null = null;

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file_image", file);
      try {
        const response = await uploadImage(formData);
        if (response.data.files) {
          uploadedImgFileName = response.data.files.file_image[0].newFilename;
        }
      } catch (err) {
        console.log("Upload error: ", err);
      }
    }

    if (message.trim() !== "" || uploadedImgFileName) {
      socket.emit("send_message", {
        room: userId,
        sender: userId,
        content: message,
        fileUrl: uploadedImgFileName,
        fileType: uploadedImgFileName ? "image" : null,
        createdAt: Date.now(),
      });
      setMessage("");
      handleRemovePreview();
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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const urlPreview = URL.createObjectURL(file);
      setPreviewImage(urlPreview);
    }
  };

  const handleRemovePreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
              <div className="message-bubble">
                {item.content}{" "}
                {item?.fileUrl && (
                  <img
                    src={
                      import.meta.env.VITE_API_URL +
                      "/src/uploads/" +
                      item.fileUrl
                    }
                  />
                )}
              </div>
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

          {previewImage && (
            <div className="imagePreview">
              <img src={previewImage || ""} alt="image preview" />
              <CancelIcon
                className="btn-del-img"
                onClick={handleRemovePreview}
              />
            </div>
          )}

          <div>
            <input
              ref={fileInputRef}
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={onFileChange}
            />

            {/* Label wraps IconButton to trigger file input */}
            <label htmlFor="icon-button-file">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>

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
