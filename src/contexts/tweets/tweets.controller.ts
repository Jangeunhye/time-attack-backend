import { Request, Response, Router } from "express";
import UserOnly from "../../guards/userOnly.guard";
import bookMarksController from "./bookmarks/bookmarks.controller";
import commentsController from "./comments/comments.controller";
import tweetsService from "./tweets.service";

const tweetsController = Router();

// commentsController 연결
tweetsController.use("/:tweetId/comments", UserOnly, commentsController);

// bookMarkController 연결
tweetsController.use("/:tweetId/bookmarks", UserOnly, bookMarksController);

// 모든 tweet get
tweetsController.get("/", async (_, res: Response) => {
  const tweets = await tweetsService.getTweets();
  res.json(tweets);
});

// tweet 생성
tweetsController.post("/", UserOnly, async (req: Request, res: Response) => {
  const user = req.user;
  const { content } = req.body;
  const tweet = await tweetsService.createTweet({
    authorId: user!.id,
    content,
  });
  res.json(tweet);
});

// tweet 수정
tweetsController.patch(
  "/:tweetId",
  UserOnly,
  async (req: Request, res: Response) => {
    const user = req.user;
    const tweetId = Number(req.params.tweetId);
    const { content } = req.body;
    const tweet = await tweetsService.updateTweet({
      authorId: user!.id,
      tweetId,
      content,
    });
    res.json(tweet);
  }
);

tweetsController.delete(
  "/:tweetId",
  UserOnly,
  async (req: Request, res: Response) => {
    const user = req.user;
    const tweetId = Number(req.params.tweetId);
    const tweet = await tweetsService.deleteTweet({
      authorId: user!.id,
      tweetId,
    });
    res.json(tweet);
  }
);
export default tweetsController;
