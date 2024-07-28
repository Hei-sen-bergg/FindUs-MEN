import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ message: "Token is not valid" });
    }

    console.log("Token verified, user ID:", payload.id);
    req.userId = payload.id;
    next();
  });
};
