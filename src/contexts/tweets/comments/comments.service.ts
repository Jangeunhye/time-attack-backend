import prismaClient from "../../../prisma/client.prisma";
import {
  CreateCommentData,
  deleteCommentDate,
  updateCommentData,
} from "./comments.type";

const createComment = async (data: CreateCommentData) => {
  const { authorId, content, tweetId } = data;

  const comment = await prismaClient.comment.create({
    data: {
      authorId,
      content,
      tweetId,
    },
  });
  return comment;
};

const updateComment = async (data: updateCommentData) => {
  const { authorId, commentId, content, tweetId } = data;
  const comment = await prismaClient.comment.update({
    where: { id: commentId, tweetId: tweetId, authorId },
    data: {
      content,
    },
  });
  return comment;
};

const deleteComment = async (data: deleteCommentDate) => {
  const { authorId, commentId, tweetId } = data;
  const comment = await prismaClient.comment.delete({
    where: { id: commentId, authorId, tweetId },
  });
  return comment;
};

const commentsService = {
  createComment,
  updateComment,
  deleteComment,
};

export default commentsService;
