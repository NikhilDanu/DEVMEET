const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "https://devmeet-73rj.vercel.app",
  "http://localhost:5173"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.log("DB Error ", error);
    process.exit(1);
  }
};
connectDB();

// 🔹 Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/team", require("./routes/team.routes"));
app.use("/api/hackathon", require("./routes/hackathon.routes"));
app.use("/api/conversation", require("./routes/conversation.routes"));
app.use("/api/message", require("./routes/message.route"));

// 🔹 Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ userId, teamId }) => {
    socket.join(teamId);
  });

  socket.on("sendMessage", ({ senderId, teamId, text }) => {
    io.to(teamId).emit("getMessage", {
      sender: { name: "User" },
      text,
      createdAt: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🚀 Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
