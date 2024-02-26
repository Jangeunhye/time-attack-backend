import { Request, Response, Router } from "express";
import bookmarksService from "./bookmarks.service";

const bookMarksController = Router({ mergeParams: true });

bookMarksController.put("/", async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const tweetId = Number(req.params.tweetId);
  const bookmark = await bookmarksService.AddBookMark({ userId, tweetId });
  res.json(bookmark);
});
bookMarksController.delete("/", async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const tweetId = Number(req.params.tweetId);
  const bookmark = await bookmarksService.DeleteBookMark({ userId, tweetId });
  res.json(bookmark);
});

export default bookMarksController;
