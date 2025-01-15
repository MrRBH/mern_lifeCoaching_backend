import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import lernerProfileRouter from "./routes/lernerprofile.routes.js";
import QuickAskrouter from "./routes/quickAsk.routes.js";
import coachqualificaonRouter from "./routes/CoachQualification.routes.js";
import ChatRouter from "./routes/chat.routes.js";
import coachProfileRouter from "./routes/Coachprofile.routes.js";
import blogRouter from "./routes/blog.routes.js";
import HabitRouter from "./routes/Habits.routes.js";
import passport from "passport";
import "./../src/utils/passport.js";
import session from "express-session";
import multer from "multer";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Initialize app and server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS settings
const io =  new Server (server , {
    cors :{
      origin : "http://localhost:5173",
      methods : ["GET", "POST"],
      credentials : true,
    }
  })

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // 30 days
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing requests
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Test route
app.get("/test", (req, res) => {
//   res.send("Test endpoint is working!");
  res.sendFile("/Users/RBH/mern_lifeCoaching_backend/src/public/index1.html");
});

// Register routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/lernerprofile", lernerProfileRouter);
app.use("/api/v1/Quick", QuickAskrouter);
app.use("/api/v1/coach", coachqualificaonRouter);
app.use("/api/v1/coachProfile", coachProfileRouter);
app.use("/api/v1/createBlog", blogRouter);
app.use("/api/v1/createHabit", HabitRouter);
app.use("/api/v1/Chat", ChatRouter);

// Socket.IO middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.token;

  console.log({ JWT: token });

  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.userId = decoded.id; // Attach user ID to socket instance
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});



// User socket mapping
const userSocketMap = {};
console.log({ "userSocketMap length":userSocketMap});


  

// Utility to get receiver's socket ID  
 export const getReceiverSocketId = (userId) => userSocketMap[userId];

// WebSocket event handlers
io.on("connection", (socket) => {
  const { userId } = socket;
//   console.log(`New connection: Socket ID - ${socket.id}, User ID - ${userId}`);
    console.log(`client connected : ${socket.id}`)
    console.log("socket.io running fine");
    


  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  socket.on("chat_message", (messageData) => {
    console.log("Received message:", messageData);

    const receiverSocketId = getReceiverSocketId(messageData.receiverId);
    console.log({ "ReceiverSocketID":receiverSocketId});
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("chat_message", {
        senderId: messageData.senderId,
        message: messageData.message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: User ID - ${userId}`);
    delete userSocketMap[userId];
  });
});

// Error handling for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Export app, server, and io
export { app, server, io };
