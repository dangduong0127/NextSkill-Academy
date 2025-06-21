// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import { MessageModel } from "./models";

// const initSocket = (server: any) => {
//   const io = new Server(server, {
//     cors: {
//       origin: process.env.CLIENT_URL,
//       credentials: true,
//     },
//   });

//   io.use((socket: any, next) => {
//     try {
//       const rawCookie = socket.handshake?.headers?.cookie;
//       if (!rawCookie) return next(new Error("Unauthorized"));
//       const accessToken = rawCookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
//       const token = accessToken[1];
//       const decoded: any = jwt.verify(
//         token,
//         process.env.JWT_ACCESS_TOKEN_SECRET
//       );
//       socket.data = {
//         id: decoded.id,
//         role: decoded.role,
//       };
//       next();
//     } catch (err) {
//       next(new Error("Authentication failed"));
//     }
//   });
//   io.on("connection", (socket) => {
//     const { id, role } = socket.data;
//     console.log(`Socket connected: ${id}`);
//     console.log("User Data: ", socket.data);

//     // Kiểm tra quyền và phân nhóm

//     role === "admin" ? socket.join("admins") : socket.join(`user_${id}`);

//     // lắng nghe khi người dùng gửi tin nhắn
//     socket.on("send_message", (data) => {
//       console.log("Tin nhắn: ", data);

//       if (role === "user") {
//         // gửi mess tới tất cả admin
//         io.to("admins").emit("receive_message", data);
//         io.to(`user_${id}`).emit("receive_message", data);
//         // Lưu tin nhắn vào cơ sở dữ liệu
//         const message = new MessageModel({
//           sender: id,
//           receiver: null,
//           message: data.message,
//           timestamp: new Date(),
//         });
//         message.save();
//       } else {
//         // Admin cần chỉ định user nào để gửi tin nhắn
//         const receiverId = "682c45c933989fa58d3c98f9";
//         io.to(`user_${receiverId}`).emit("receive_message", data);
//         io.to("admins").emit("receive_message", data);

//         const message = new MessageModel({
//           sender: id,
//           receiver: receiverId,
//           message: data.message,
//           timestamp: new Date(),
//         });
//         message.save();
//       }

//       // Gửi lại tin nhắn tới tất cả user (broadcast)
//       //   io.emit("receive_message", data);
//     });

//     socket.on("disconnect", () => {
//       console.log("Người dùng đã ngắt kết nối: ", socket.id);
//     });
//   });
// };

// export default initSocket;

import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { MessageModel, RoomModel } from "./models";

const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use((socket: any, next) => {
    try {
      const rawCookie = socket.handshake?.headers?.cookie;
      if (!rawCookie) return next(new Error("Unauthorized"));
      const accessToken = rawCookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
      const token = accessToken[1];
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      socket.data = {
        id: decoded.id,
        role: decoded.role,
      };
      next();
    } catch (err) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    const { id, role } = socket.data;
    console.log(`Socket connected: ${id}`);
    socket.on("join-room", async (roomId) => {
      socket.join(roomId);
      // const messages = await MessageModel.find({ roomId });
      // socket.emit("room-messages", messages);
    });

    socket.on("send_message", async (socket) => {
      const { content, toUserId } = socket;
      console.log("Tin nhắn: ", socket);

      let room = await RoomModel.findOne({
        user: toUserId,
      });
      if (!room) room = await RoomModel.create({ user: toUserId });

      const message = await MessageModel.create({
        room: room._id,
        sender: id,
        content,
        createdAt: new Date(),
      });

      io.to(`room:${toUserId}`).emit("receive_message", {
        _id: message._id,
        content: message.content,
        sender: id,
        createdAt: message.createdAt,
      });
    });

    socket.on("disconnect", () => {
      console.log(`[DISCONNECTED] ${role} ${id}`);
    });
  });
};

export default initSocket;
