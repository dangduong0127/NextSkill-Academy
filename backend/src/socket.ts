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

    socket.on("send_message", async (payload) => {
      const { content, room, fileUrl, fileType } = payload;
      console.log("Tin nhắn: ", payload);

      let check_room = await RoomModel.findOne({
        user: room,
      });
      if (!room) check_room = await RoomModel.create({ user: room });

      const message = await MessageModel.create({
        room: room,
        sender: id,
        content,
        fileUrl,
        fileType,
        createdAt: new Date(),
      });
      console.log("message promise:", message);
      io.to(`room:${room}`).emit("receive_message", {
        _id: message._id,
        content: message.content,
        sender: id,
        fileUrl,
        fileType,
        createdAt: message.createdAt,
      });
    });

    if (role === "user") {
      const roomId = `room:${id}`;
      socket.join(roomId);
    }

    socket.on("disconnect", () => {
      console.log(`[DISCONNECTED] ${role} ${id}`);
    });
  });
};

export default initSocket;
