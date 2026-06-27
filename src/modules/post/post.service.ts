import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: { ...payload, authorId: userId },
  });
  return result;
};

const getAllPosts = async () => {
  const result = await prisma.post.findMany({
    include: { author: { select: { name: true } }, comment: true },
  });
  return result;
};
const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new Error("Post not found");
  }
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { views: { increment: 1 } },
    include: { author: { select: { name: true } }, comment: true },
  });
  return updatedPost;
};
const updatePost = async () => {};
const deletePost = async () => {};
const getPostsStats = async () => {};
const getMyPosts = async (authorId: string) => {
  const myPosts = await prisma.post.findMany({
    where: {
      authorId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      comment: true,
      author: {
        select: {
          name: true,
        },
      },

      _count: {
        select: {
          comment: true,
        },
      },
    },
  });

  return myPosts;
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};
