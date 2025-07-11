// // 1. Load environment variables
// require("dotenv").config({ path: ".env.local" });

// // 2. Import dependencies
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require('multer');
// const path = require('path');

// // 3. Import your routes and middleware
// const itemRoutes = require("./routes/itemRoutes");
// const userRoutes = require("./routes/userRoutes");
// const authRoutes = require("./routes/authRoutes");
// const { notFound, errorHandler } = require("./middleware/errorHandler");

// // ────────────────────────────────────────────────────────────────────────────────


// // ─── 2. Configure Multer storage (just once) ───
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename:    (req, file, cb) =>
//     cb(null, `prod_${Date.now()}${path.extname(file.originalname)}`)
// });
// const upload = multer({ storage });


// // 4. Create your Express application
// const app = express();

// // 5. Mount CORS *after* you’ve created `app`:
// app.use(
//   cors({
//     origin: "http://localhost:3000",  // your Next.js dev server
//     credentials: true,                // if you plan to send cookies/auth headers
//   })
// );

// // 6. Body parser
// app.use(express.json());

// // 7. Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // 8. Mount your API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/items", itemRoutes);


// app.post(
//   '/api/products/:id/image',    // → same pattern as your other product routes
//   upload.single('image'),        // ← this middleware handles the file
//   async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image provided' });
//     }
//     const imageUrl = `/uploads/${req.file.filename}`;
//     // TODO: save imageUrl into your product in the database, e.g.:
//     // await Product.findByIdAndUpdate(req.params.id, { imageUrl });
//     res.json({ imageUrl });
//   }
// );
// // ─── 5. Serve the uploads folder (once) ───
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ─── 6. Your other routes and error handlers ───

// // etc.

// // 9. 404 + error handlers
// app.use(notFound);
// app.use(errorHandler);


// // 10. Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// 1. Load environment variables
// require("dotenv").config({ path: ".env.local" });

// // 2. Import dependencies
// const express  = require("express");
// const mongoose = require("mongoose");
// const cors     = require("cors");

// // ─── INSERT MULTER IMPORT HERE ───
// const multer   = require("multer");   // ← Add this line

// // 3. Import your routes and middleware
// const itemRoutes  = require("./routes/itemRoutes");
// const userRoutes  = require("./routes/userRoutes");
// const authRoutes  = require("./routes/authRoutes");
// const { notFound, errorHandler } = require("./middleware/errorHandler");

// // ─── INSERT MULTER STORAGE CONFIG HERE ───
// const path    = require("path");      // if not already imported
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename:    (req, file, cb) =>
//     cb(null, `prod_${Date.now()}${path.extname(file.originalname)}`)
// });
// const upload = multer({ storage });

// // ────────────────────────────────────────────────────────────────────────────────
// // 4. Create your Express application
// const app = express();

// // 5. Mount CORS *after* you’ve created `app`:
// app.use(
//   cors({
//     origin:      "http://localhost:3000",  
//     credentials: true,                    
//   })
// );

// // 6. Body parser
// app.use(express.json());

// // ─── INSERT STATIC SERVE FOR UPLOADS HERE ───
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 7. Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // 8. Mount your API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // ─── INSERT IMAGE UPLOAD ROUTE HERE ───
// // app.post(
// //   "/api/items/:id/image",    // matches your items pattern
// //   upload.single("image"),    // Multer middleware
// //   async (req, res) => {
// //     if (!req.file) {
// //       return res.status(400).json({ error: "No image provided" });
// //     }
// //     const imageUrl = `/uploads/${req.file.filename}`;
// //     // TODO: save `imageUrl` into your Item document in MongoDB, e.g.:
// //     // await Item.findByIdAndUpdate(req.params.id, { imageUrl });
// //     res.json({ imageUrl });
// //   }
// // );
// // const Item = require("./models/item"); // Import your Item model (ensure this exists)
// const Item = require("./models/item");
// app.post(
//   "/api/items/:id/image",
//   upload.single("image"),
//   async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image provided" });
//     }
//     const imageUrl = `/uploads/${req.file.filename}`;
//     try {
//       const updatedItem = await Item.findByIdAndUpdate(
//         req.params.id,
//         { imageUrl }, // Update the imageUrl field
//         { new: true } // Return the updated document
//       );
//       if (!updatedItem) {
//         return res.status(404).json({ error: "Item not found" });
//       }
//       res.json({ imageUrl });
//     } catch (error) {
//       console.error("Error updating item with image URL:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
//   );

// // Existing items route
// app.use("/api/items", itemRoutes);


//  // 9. 404 + error handlers
// app.use(notFound);
// app.use(errorHandler);

// // 10. Start the server
// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // frontend origin
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// const chatRoutes = require('./routes/chatRoutes');
// app.use('/api/chat', chatRoutes);

// // Socket.IO connection logic
// io.on("connection", (socket) => {
//   console.log("🟢 New user connected:", socket.id);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`📥 User joined room: ${roomId}`);
//   });

//   socket.on("sendMessage", (data) => {
//     console.log("📨 Message received:", data);
//     io.to(data.roomId).emit("receiveMessage", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected:", socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


require("dotenv").config({ path: ".env.local" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const chatCtrl = require("./controllers/chatCtrl"); // Update the path to match the correct location of the file

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes"); // Update the path to match the correct location of the file
const { notFound, errorHandler } = require("./middleware/errorHandler");
const Item = require("./models/item");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `prod_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // your Next.js dev server
  credentials: true, // if you plan to send cookies/auth headers
};

app.use(cors(corsOptions)); // Preflight handler

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.post(
  "/api/items/:id/image",
  upload.single("image"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image provided" });
    const imageUrl = `/uploads/${req.file.filename}`;
    try {
      const updated = await Item.findByIdAndUpdate(
        req.params.id, { imageUrl }, { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Item not found" });
      res.json({ imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.use("/api/items", itemRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions
});

// io.on("connection", socket => {
//   console.log("🟢 New user:", socket.id);
//   socket.on("joinRoom", roomId => socket.join(roomId));
//   socket.on("sendMessage", data => io.to(data.roomId).emit("receiveMessage", data));
//   socket.on("disconnect", () => console.log("🔴 User disconnected:", socket.id));
// });

require("./sockets/chat")(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));

