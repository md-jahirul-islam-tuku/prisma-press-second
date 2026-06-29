import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comment.interface";

const createComment = async (
  authorId: string,
  payload: ICreateCommentPayload,
) => {
  await prisma.post.findFirstOrThrow({
    where: {
      id: payload.postId,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
  });
  return comment;
};

const getCommentByAuthor = async (authorId: string) => {
  const comments = await prisma.comment.findMany({
    where: { authorId },
  });
  return comments;
};

export const commentService = {
  createComment,
  getCommentByAuthor,
};
