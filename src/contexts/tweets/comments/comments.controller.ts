import { Request, Response, Router } from "express";
import commentsService from "./comments.service";

const commentsController = Router({ mergeParams: true });
commentsController.post("/", async (req: Request, res: Response) => {
  const user = req.user;
  const { content } = req.body;
  const tweetId = Number(req.params.tweetId);
  const comment = await commentsService.createComment({
    authorId: user!.id,
    content,
    tweetId,
  });
  res.send(comment);
});

commentsController.patch("/:commentId", async (req: Request, res: Response) => {
  const user = req.user;
  const { content } = req.body;
  const tweetId = Number(req.params.tweetId);
  const commentId = Number(req.params.commentId);
  const comment = await commentsService.updateComment({
    authorId: user!.id,
    commentId,
    content,
    tweetId,
  });
  res.json(comment);
});
commentsController.delete(
  "/:commentId",
  async (req: Request, res: Response) => {
    const user = req.user;
    const tweetId = Number(req.params.tweetId);
    const commentId = Number(req.params.commentId);
    const comment = await commentsService.deleteComment({
      authorId: user!.id,
      tweetId,
      commentId,
    });
    res.json(comment);
  }
);

export default commentsController;
