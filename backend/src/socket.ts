import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake?.headers?.cookie?.split("accessToken=")[1];
    console.log(token);
    try {
    } catch (err) {
      throw next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export default initSocket;
