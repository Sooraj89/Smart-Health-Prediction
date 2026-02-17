import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const protect = (req, res, next) => {
  let token;

  // ✅ Check if token exists
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user info
      return next();
    } catch (error) {
      console.error("❌ Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // ❌ No token
  return res.status(401).json({ message: "Not authorized, no token" });
};

// ✅ Correct export (default + named both)
export { protect };
export default protect;
