import { Router } from "express";
import UserOnly from "../../guards/userOnly.guard";
import accountsService from "./accounts.service";
import { SignUpData } from "./accounts.type";

const accountsController = Router();

// 회원가입
accountsController.post<"/sign-up", never, string, SignUpData>(
  "/sign-up",
  async (req, res, next) => {
    try {
      const { email, password, nickname, selfIntroduction } = req.body;
      const accessToken = await accountsService.signUp({
        email,
        password,
        nickname,
        selfIntroduction,
      });
      res.json(accessToken);
    } catch (e) {
      next(e);
    }
  }
);

// 로그인
accountsController.post<
  "/log-in",
  never,
  string,
  { email: string; password: string }
>("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await accountsService.logIn({ email, password });
    res.json(accessToken);
  } catch (e) {
    next(e);
  }
});

// 유저 프로필 정보 업데이트
accountsController.put("/", UserOnly, async (req, res, next) => {
  const { nickname, selfIntroduction } = req.body;
  const userId = req.user!.id;
  const userProfile = await accountsService.updateProfile({
    userId,
    nickname,
    selfIntroduction,
  });

  res.json(userProfile);
});

// 사용자가 유저 프로필 조회
accountsController.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const userProfile = await accountsService.getProfile(userId);
  res.json(userProfile);
});

// 유저 페이지에서 유저의 팔로잉 확인
accountsController.get(
  "/:userId/followings",
  UserOnly,
  async (req, res, next) => {
    const userId = req.user!.id;
    const followings = await accountsService.getFollowings(userId);
    res.json(followings);
  }
);

// 유저 페이지에서 유저의 팔로워 확인
accountsController.get(
  "/:userId/followers",
  UserOnly,
  async (req, res, next) => {
    const userId = req.user!.id;
    const followings = await accountsService.getFollowers(userId);
    res.json(followings);
  }
);
export default accountsController;
