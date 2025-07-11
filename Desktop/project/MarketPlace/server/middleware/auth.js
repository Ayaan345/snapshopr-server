const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (jwtError) {
      try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        // For OAuth users, find by email instead
        req.user = await User.findOne({ email: decoded.email }).select("-password");
        if (!req.user) {
          // Create user if they don't exist (for OAuth logins)
          req.user = await User.create({
            name: decoded.name,
            email: decoded.email,
            password: 'oauth' // placeholder password for OAuth users
          });
        }
        return next();
      } catch (nextAuthError) {
        throw new Error('Invalid token');
      }
    }
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ error: "Invalid token" });
  }
};
