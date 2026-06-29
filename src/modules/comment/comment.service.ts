import { prisma } from "../../lib/prisma";
import {
  ICreateCommentPayload,
  IUpdateCommentPayload,
} from "./comment.interface";

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

const getCommentById = async (commentId: string) => {
  const result = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });
  return result;
};

const updateComment = async (
  authorId: string,
  commentId: string,
  payload: IUpdateCommentPayload,
) => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
  });
  const result = await prisma.comment.update({
    where: { id: commentId, authorId },
    data: { ...payload },
  });
  return result;
};

export const commentService = {
  createComment,
  getCommentByAuthor,
  getCommentById,
  updateComment,
};
