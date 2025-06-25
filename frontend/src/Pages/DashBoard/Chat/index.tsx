import { useState, useEffect, useRef } from "react";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { io, Socket } from "socket.io-client";
import { getAllUsers } from "../../../utils/axios";
import type { IUser, Message, EmojiObject } from "../../../utils/types";
import { getUserMessage } from "../../../utils/axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./styles.scss";

let socket: Socket;

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<Message[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userId, setUserId] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji: EmojiObject) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      room: selectedUserId,
      sender: userId,
      content: message,
      createdAt: Date.now(),
    });

    setMessage("");
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  useEffect(() => {
    if (selectedUserId) {
      socket.emit("join-room", `room:${selectedUserId}`);
    }

    getUserMessage(selectedUserId)
      .then((res) => {
        setChatList(res.data?.chat?.messData);
      })
      .catch((err) => console.log(err));
  }, [selectedUserId]);

  useEffect(() => {
    setUserId(userInfo.id);
  }, [userInfo.id]);

  useEffect(() => {
    fetchUsers();

    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    socket.on("receive_message", (data) => {
      console.log("Tin nhắn từ user: ", data);
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

  return (
    <Box
      display="flex"
      height="100vh"
      sx={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
    >
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{ width: 280, p: 2, overflowY: "auto", borderRadius: "10px" }}
      >
        <Typography variant="h6">Chats</Typography>
        <Divider sx={{ my: 1 }} />
        <List>
          {users &&
            users.map((user) => (
              <ListItem
                key={user._id}
                onClick={() => setSelectedUserId(user._id)}
                sx={{
                  backgroundColor:
                    user._id === selectedUserId ? "#e6e6e6" : "transparent",
                  cursor: "pointer",
                  borderRadius: 10,
                }}
              >
                <Avatar
                  sx={{ mr: 2 }}
                  src={
                    import.meta.env.VITE_API_URL +
                      "/src/uploads/" +
                      user.avatar || ""
                  }
                />
                <ListItemText primary={user.name} />
              </ListItem>
            ))}{" "}
        </List>
      </Paper>

      {/* Chat box */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        p={2}
        sx={{ backgroundColor: "#e7e7e7" }}
      >
        <Typography variant="h6" gutterBottom>
          Chat with {users.find((u) => u._id === selectedUserId)?.name}
        </Typography>
        <Divider />
        <Box flex={1} overflow="auto" my={2} sx={{ position: "relative" }}>
          {(chatList || []).map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.sender === userId ? "flex-end" : "flex-start"}
              mb={1}
            >
              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  bgcolor: msg.sender !== userId ? "#DCF8C6" : "#FFF",
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>
            </Box>
          ))}

          <div ref={endOfMessagesRef} />
        </Box>
        <Divider />
        <Box
          display="flex"
          alignItems="center"
          mt={1}
          className="box-chat-dashboard"
        >
          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="light"
              />
            </div>
          )}
          <button
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            😊
          </button>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
          />
          <IconButton onClick={handleSendMessage} color="primary">
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
