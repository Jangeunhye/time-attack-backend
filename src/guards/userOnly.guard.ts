import { NextFunction, Request, Response } from "express";

export default function UserOnly(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) throw new Error("Unauthorized");
  next();
}
