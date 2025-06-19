import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // io.use((socket, next) => {
  //   const token = socket.handshake?.headers?.cookie?.split("accessToken=")[1];
  //   console.log(token);
  //   try {
  //   } catch (err) {
  //     throw next(new Error("Authentication failed"));
  //   }
  // });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // lắng nghe khi người dùng gửi tin nhắn
    socket.on("send_message", (data) => {
      console.log("Tin nhắn: ", data);

      // Gửi lại tin nhắn tới tất cả user (broadcast)
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("Người dùng đã ngắt kết nối: ", socket.id);
    });
  });
};

export default initSocket;
