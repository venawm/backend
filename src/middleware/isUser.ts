import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isUser = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: true, message: "Access token is missing" });
  }

  try {
    const decoded: any = jwt.verify(token, `${process.env.AUTH_SECRET_KEY}`);

    if (decoded.user.role !== "user") {
      return res.status(403).json({ error: true, message: "The person is not user." });
    }

    // Attach the decoded payload to the request for later use in the route handlers
    req.user = decoded.user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: true, message: "Invalid token" });
  }
};
