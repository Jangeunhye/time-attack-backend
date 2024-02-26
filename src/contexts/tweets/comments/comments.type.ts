export type CreateCommentData = {
  content: string;
  authorId: string;
  tweetId: number;
};

export type updateCommentData = {
  content: string;
  authorId: string;
  tweetId: number;
  commentId: number;
};

export type deleteCommentDate = {
  authorId: string;
  tweetId: number;
  commentId: number;
};
