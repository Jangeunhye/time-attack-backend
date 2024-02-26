import { Router } from "express";
import accountsService from "./accounts.service";

const accountsController = Router();

// 회원가입
accountsController.post<
  "/users/sign-up",
  never,
  string,
  { email: string; password: string }
>("/users/sign-up", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await accountsService.signUp({ email, password });
    res.json(accessToken);
  } catch (e) {
    next(e);
  }
});

// 로그인
accountsController.post<
  "/users/log-in",
  never,
  string,
  { email: string; password: string }
>("/users/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await accountsService.logIn({ email, password });
    res.json(accessToken);
  } catch (e) {
    next(e);
  }
});

export default accountsController;
