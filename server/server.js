require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const lostFoundRoutes = require("./routes/lostFoundRoutes");
const academicRoutes = require("./routes/academicRoutes");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");
const saveRoutes = require("./routes/saveRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

/* =========================
   CORS
========================= */

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://dummy-project-1-dfsr.onrender.com"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/lost-found", lostFoundRoutes);
app.use("/api/academic-resources", academicRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/saves", saveRoutes);
app.use("/api/uploads", uploadRoutes);

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
    res.send("CampusConnect Backend is running!");
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();