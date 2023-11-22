import { Request, Response, NextFunction } from "express"
import JWTProvider from "./core/domain/shared/JWTProvider"

declare module "express-serve-static-core" {
  interface Request {
    userId?: string
    userName?: string
    userEmail?: string
    userRole?: string
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" })
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token error" })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformatted" })
  }

  const decoded = JWTProvider.verify(token)

  if (typeof decoded === "object" && "userId" in decoded) {
    Object.assign(req, {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
      userName: decoded.userName,
      userRole: decoded.userRole,
    })
    next()
  } else {
    return res.status(401).json({ error: "Invalid token" })
  }
}
