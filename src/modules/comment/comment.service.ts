import { prisma } from "../../lib/prisma";
import {
  ICommentUpdateToModerate,
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
    orderBy: {
      createdAt: "desc",
    },
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

const deleteComment = async (commentId: string, authorId: string) => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
  });
  await prisma.comment.delete({
    where: {
      id: commentId,
      authorId,
    },
  });
  return null;
};

const updateCommentToModerate = async (
  commentId: string,
  authorId: string,
  payload: ICommentUpdateToModerate,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
  });

  if (commentData.status === payload.status) {
    throw new Error(`Your provided status: ${payload.status} is already upto date.`)
  }

  const result = await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data: { ...payload },
  });
  return result;
};

export const commentService = {
  createComment,
  getCommentByAuthor,
  getCommentById,
  updateComment,
  deleteComment,
  updateCommentToModerate,
};
