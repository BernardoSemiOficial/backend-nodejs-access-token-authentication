import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecoded } from "../token.model";

export class AuthorizationMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const tokenWithBearer = req.headers.authorization;
    if (!tokenWithBearer) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const SECRET_KEY = process.env.SECRET_KEY_TOKEN!;
      const token = tokenWithBearer.split(" ")[1];
      jwt.verify(token, SECRET_KEY) as TokenDecoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
