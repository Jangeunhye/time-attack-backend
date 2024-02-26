import { Request, Response, Router } from "express";
import followingsService from "./followings.service";

const followingsController = Router();
followingsController.post("/:userId", async (req: Request, res: Response) => {
  // 유저가 팔로잉 하고 싶은 아이디
  const followingId = req.params.userId;

  // 로그인한 유저의 아이디
  const followerId = req.user!.id;

  // 두 아이디가 같으면 안됨
  if (followerId === followingId) throw new Error("Same User");

  const following = await followingsService.addFollow({
    followerId,
    followingId,
  });
  res.json(following);
});

followingsController.delete("/:userId", async (req: Request, res: Response) => {
  // 유저가 팔로잉에서 삭제하고 싶은 아이디
  const followingId = req.params.userId;

  // 로그인한 유저의 아이디
  const followerId = req.user!.id;

  // 두 아이디가 같으면 안됨
  if (followerId === followingId) throw new Error("Same User");

  const following = await followingsService.deleteFollow({
    followerId,
    followingId,
  });
  res.json(following);
});

export default followingsController;
