import prismaClient from "../../prisma/client.prisma";
import {
  CreateTweetData,
  DeleteTweetData,
  UpdateTweetData,
} from "./tweets.type";

const createTweet = async (data: CreateTweetData) => {
  const tweet = await prismaClient.tweet.create({
    data,
  });
  return tweet;
};

const getTweets = async () => {
  const tweets = await prismaClient.tweet.findMany({
    orderBy: { createdAt: "desc" },
    include: { comments: true },
  });
  return tweets;
};

const updateTweet = async (data: UpdateTweetData) => {
  const { authorId, content, tweetId } = data;
  const tweet = await prismaClient.tweet.update({
    where: { authorId, id: tweetId },
    data: { content },
  });
  return tweet;
};

const deleteTweet = async (data: DeleteTweetData) => {
  const { authorId, tweetId } = data;
  const tweet = await prismaClient.tweet.delete({
    where: { id: tweetId, authorId },
  });
  return tweet;
};
const tweetsService = {
  createTweet,
  getTweets,
  updateTweet,
  deleteTweet,
};

export default tweetsService;
