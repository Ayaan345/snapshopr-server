// require("dotenv").config({ path: ".env.local" });
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const chatCtrl = require("./controllers/chatCtrl"); // Update the path to match the correct location of the file

// const itemRoutes = require("./routes/itemRoutes");
// const userRoutes = require("./routes/userRoutes");
// const authRoutes = require("./routes/authRoutes");
// const chatRoutes = require("./routes/chatRoutes"); // Update the path to match the correct location of the file
// const { notFound, errorHandler } = require("./middleware/errorHandler");
// const Item = require("./models/item");
// // 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, `prod_${Date.now()}${path.extname(file.originalname)}`)
// });
// const upload = multer({ storage });

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000", // your Next.js dev server
//   credentials: true, // if you plan to send cookies/auth headers
// };

// app.use(cors(corsOptions)); // Preflight handler

// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// mongoose
//   .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// app.post(
//   "/api/items/:id/image",
//   upload.single("image"),
//   async (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No image provided" });
//     const imageUrl = `/uploads/${req.file.filename}`;
//     try {
//       const updated = await Item.findByIdAndUpdate(
//         req.params.id, { imageUrl }, { new: true }
//       );
//       if (!updated) return res.status(404).json({ error: "Item not found" });
//       res.json({ imageUrl });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// app.use("/api/items", itemRoutes);
// app.use("/api/chat", chatRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: corsOptions
// });

// require("./sockets/chat")(io);

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));

