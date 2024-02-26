import prismaClient from "../../../prisma/client.prisma";
import { AddBookMarkData, DeleteBookMarkData } from "./bookmarks.type";

const AddBookMark = async (data: AddBookMarkData) => {
  const { tweetId, userId } = data;
  const bookmark = await prismaClient.bookmarkTweet.create({
    data: { userId, tweetId },
  });
  return bookmark;
};

const DeleteBookMark = async (data: DeleteBookMarkData) => {
  const { tweetId, userId } = data;
  const bookmark = await prismaClient.bookmarkTweet.delete({
    where: { userId_tweetId: { tweetId, userId } },
  });
  return bookmark;
};

const getBookMark = async (userId: string) => {
  const bookmarks = await prismaClient.bookmarkTweet.findMany({
    where: { userId },
  });
  return bookmarks;
};

const bookmarksService = { AddBookMark, DeleteBookMark, getBookMark };
export default bookmarksService;
