import dotenv from "dotenv";
dotenv.config();
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import stadiumRouter from "./routes/stadium.js";
import aiRouter from "./routes/ai.js";
import stadiumService from "./services/stadiumService.js";

const app = express();
const server = http.createServer(app);

// --------------------
// Middleware
// --------------------

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// --------------------
// Socket.IO
// --------------------

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// --------------------
// Routes
// --------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    application: "Smart Stadium AI Backend",
    version: "2.0.0",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/stadium", stadiumRouter);

app.use("/api/ai", aiRouter);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// --------------------
// Socket Connection
// --------------------

io.on("connection", (socket) => {
  console.log(`✅ Client Connected: ${socket.id}`);

  socket.emit("stadiumUpdate", stadiumService.getState());

  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});

// --------------------
// Broadcast every 5 sec
// --------------------

setInterval(() => {
  const latest = stadiumService.refresh();

  io.emit("stadiumUpdate", latest);
}, 5000);

// --------------------
// 404
// --------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// --------------------
// Error Handler
// --------------------

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// --------------------
// Server
// --------------------

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
====================================
🏟 Smart Stadium AI Backend

🚀 Running on:
http://localhost:${PORT}

📡 Socket.IO Enabled

🤖 Gemini:
${process.env.GEMINI_API_KEY ? "Connected" : "API Key Missing"}

====================================
`);
});