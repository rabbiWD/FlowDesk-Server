import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import type { Roles } from "../types/user";
import type { IJwtPayload } from "../types/jwt";

const auth = (...roles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      const decoded = jwt.verify(token, config.jwt_secret) as IJwtPayload;

      if (roles.length && !roles.includes(decoded.role as Roles)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!",
        });
      }

      req.user = decoded;
      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Unauthorized",
      });
    }
  };
};

export default auth;
