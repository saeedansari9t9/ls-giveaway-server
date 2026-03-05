const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/api");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ls-giveaway-client.vercel.app",
];

// ✅ Important: origin function (more reliable than array directly)
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ✅ CORS should be before routes
app.use(cors(corsOptions));

// ✅ Preflight handle
app.options("*", cors(corsOptions));

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Lexora Giveaway API is running..."));

module.exports = app;