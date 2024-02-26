import { Request, Response, Router } from "express";
import UserOnly from "../guards/userOnly.guard";
import accountsController from "./accounts/accounts.controller";
import followersController from "./followers/followers.controller";
import followingsController from "./followings/followings.controller";
import bookmarksService from "./tweets/bookmarks/bookmarks.service";
import tweetsController from "./tweets/tweets.controller";

const controllers = Router();

controllers.get("/health-check", (_, res) => {
  res.status(200).send();
});
controllers.get("/bookmarks", async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const bookmarks = await bookmarksService.getBookMark(userId);
  res.json(bookmarks);
});

controllers.use("/accounts/users", accountsController);
controllers.use("/tweets", tweetsController);
controllers.use("/followings", UserOnly, followingsController);
controllers.use("/followers", UserOnly, followersController);

export default controllers;
