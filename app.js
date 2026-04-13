const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// 🔥 DB Connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("DB Error ❌", error);
    process.exit(1);
  }
};

connectDB();

// 🔹 Routes
const UserRoutes = require("./routes/auth.routes");
const ProfileRoutes = require("./routes/profile.routes");
const TeamRoutes = require('./routes/team.routes');
const Hackathon = require("./routes/hackathon.routes");

const ConversationRoutes = require("./routes/conversation.routes");
const MessageRoutes = require("./routes/message.route");

// 🔹 Use Routes
app.use("/api/auth", UserRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/team", TeamRoutes);
app.use("/api/hackathon", Hackathon);

app.use("/api/conversation", ConversationRoutes);
app.use("/api/message", MessageRoutes);


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ userId, teamId }) => {
    socket.join(teamId);
    console.log(`User ${userId} joined team ${teamId}`);
  });

  // 🔥 send message realtime
  socket.on("sendMessage", ({ senderId, teamId, text }) => {
    io.to(teamId).emit("getMessage", {
      sender: { name: "User" }, // basic (later improve)
      text,
      createdAt: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});