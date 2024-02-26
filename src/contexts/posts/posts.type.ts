import { NextFunction, Request, Response, Router } from "express";

const postsController = Router();
// authController.post<
//   "/sign-up",
//   never,
//   string,
//   { email: string; password: string }
// >
postsController.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {}
);
