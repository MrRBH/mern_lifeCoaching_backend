// // File: server.js
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// // Initialize Express and HTTP server
// const app = express();
// const server = http.createServer(app);

// // Setup Socket.IO
// const io = new Server(server, 
// //   {
// //   cors: {
// //     origin: "*",
// //     methods: ["GET", "POST"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //     transports: ["websocket"],
// //   },
// // }
// );

// // Middleware for authentication
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   console.log({"JWT" : token});
  

//   if (!token) {
//     return next(new Error("Authentication error: Token missing"));
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     socket.userId = decoded.id; // Attach user ID to socket instance
//     next();
//   } catch (err) {
//     return next(new Error("Authentication error: Invalid token"));
//   }
// });

// // User socket mapping
// const userSocketMap = {};

// // Utility to get socket ID of a receiver by user ID
// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // WebSocket connection handling
// io.on("connection", (socket) => {
//   const { userId } = socket;
//   console.log(`New connection: Socket ID - ${socket.id}, User ID - ${userId}`);

//   // Save the socket ID for the user
//   if (userId) {
//     userSocketMap[userId] = socket.id;
//   }

//   // Handle chat messages
//   socket.on("sendMessage", (messageData) => {
//     console.log("Received message:", messageData);

//     const receiverSocketId = getReceiverSocketId(messageData.receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("chat_message", {
//         senderId: messageData.senderId,
//         message: messageData.message,
//       });
//     }
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: User ID - ${userId}`);
//     delete userSocketMap[userId];
//   });
// });




// // export {
// //   io,server,app
// // }
