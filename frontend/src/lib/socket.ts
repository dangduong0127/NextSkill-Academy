import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      reconnection: true, // mặc định: true
      reconnectionAttempts: 5, // số lần thử lại
      reconnectionDelay: 1000, // thời gian giữa mỗi lần thử lại
    });
  }
  return socket;
};

export default getSocket;
// const socket = io("http://localhost:3003", {
//   withCredentials: true,
// });

// socket.on("connect", () => {
//   console.log("Connected socket to server ");
// });

// socket.on("connect_error", (err) => {
//   console.error("Connection error:", err.message);
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from server");
// });
