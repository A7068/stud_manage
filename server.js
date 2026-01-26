import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/students.js";
import attendanceRoutes from "./routes/attendance.js";
import feesRoutes from "./routes/fees.js";
import assignmentRoutes from "./routes/assignments.js";
import notesRoutes from "./routes/notes.js";
import announcementRoutes from "./routes/announcements.js";
import submissionRoutes from "./routes/submission.js";
import adminRoutes from "./routes/admin.js";
import notificationRoutes from "./routes/notifications.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
