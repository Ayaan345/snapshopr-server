const router = require("express").Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemCtrl");
const { protect } = require("../middleware/auth");
const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `prod_${Date.now()}${path.extname(file.originalname)}`)
});

const upload = require('../middleware/upload');

router.post("/", optionalProtect, upload.single('image'), createItem);

// Routes
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", optionalProtect, upload.single('image'), createItem);
router.patch("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

// Optional auth middleware that doesn't fail if no token
function optionalProtect(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('optionalProtect - authHeader:', authHeader);
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log('optionalProtect - token:', token);
    
    // Try to set user if we have a valid JWT token
    const jwt = require("jsonwebtoken");
    const User = require("../models/user");
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (!err && decoded) {
        try {
          req.user = await User.findById(decoded.id).select("-password");
          console.log('optionalProtect - user found:', req.user?.email);
        } catch (userError) {
          console.log('optionalProtect - user lookup failed:', userError.message);
        }
      } else {
        console.log('optionalProtect - JWT verification failed:', err?.message);
      }
      next();
    });
  } else {
    // No auth header, proceed without user
    console.log('optionalProtect - no auth header, proceeding without user');
    next();
  }
}

module.exports = router;