import { Request, Response, Router } from "express";
import followersService from "./followers.service";

const followersController = Router();
followersController.delete("/:userId", async (req: Request, res: Response) => {
  // 유저아이디
  const followingId = req.user!.id;

  // 삭제하고싶은 아이디
  const followerId = req.params.userId;

  if (followerId === followingId) throw new Error("Same User");

  const follower = await followersService.deleteFollower({
    followerId,
    followingId,
  });
  res.json(follower);
});

export default followersController;
