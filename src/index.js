import cookieParser from 'cookie-parser';
// import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app, io, server} from './app.js'

dotenv.config({ path: './.env' });

// const app = express();
const port = process.env.PORT || 8100;

// Middleware to parse JSON request bodies


// io.on("connection", (socket)=>{
//     console.log(`client connected : ${socket.id}`)
//     console.log("this is from connection event");
    
  
//     socket.on("disconnect", () => {
//       console.log(`client disconnected : ${socket.id}`)
//     });
//   })


connectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`⚙️ Server is running at port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed: ", err);
    });