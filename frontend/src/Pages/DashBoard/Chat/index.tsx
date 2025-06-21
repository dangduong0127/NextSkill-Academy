import { useState, useEffect } from "react";
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
import type { IUser } from "../../../utils/types";
type Message = {
  key: [{ from: string; text: string }];
};

// const users = [
//   { id: 1, name: "Alice", avatar: "A" },
//   { id: 2, name: "Bob", avatar: "B" },
// ];

const dummyMessages = {
  1: [
    { from: "me", text: "Hi Alice!" },
    { from: "Alice", text: "Hello! How are you?" },
  ],
  2: [
    { from: "me", text: "Hey Bob!" },
    { from: "Bob", text: "Yo! What's up?" },
  ],
};
let socket: Socket;
const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message>(dummyMessages);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userId, setUserId] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      room: selectedUserId,
      sender: userId,
      content: message,
      createdAt: Date.now(),
    });

    setMessages((prev) => ({
      ...prev,
      [selectedUserId]: [
        ...(prev[selectedUserId] || []),
        { from: "me", text: message },
      ],
    }));

    setMessage("");
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    setUserId(userInfo.id);
  }, [userInfo.id]);

  useEffect(() => {
    // fetchMessages();
    fetchUsers();
    console.log("component mounted");

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
                <Avatar sx={{ mr: 2 }} src={user.avatar || ""} />
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
        <Box flex={1} overflow="auto" my={2}>
          {(messages[selectedUserId] || []).map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.from === "me" ? "flex-end" : "flex-start"}
              mb={1}
            >
              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  bgcolor: msg.from === "me" ? "#DCF8C6" : "#FFF",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" mt={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
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
