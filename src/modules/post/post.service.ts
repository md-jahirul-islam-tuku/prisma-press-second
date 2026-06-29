
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

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
  // await prisma.post.update({
  //   where: { id: postId },
  //   data: { views: { increment: 1 } },
  //   include: { author: { select: { name: true } }, comment: true },
  // });
  // const post = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
  // return post;

  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });
    const post = await tx.post.findUniqueOrThrow({
      where: { id: postId },
      include: {
        author: { select: { name: true } },
        comment: {
          where: {
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            comment: true,
          },
        },
      },
    });
    return post;
  });
  return transactionResult;
};
const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }
  const result = await prisma.post.update({
    where: { id: postId },
    data: payload,
    include: { author: { select: { name: true } }, comment: true },
  });
  return result;
};
const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }
  const result = await prisma.post.delete({
    where: { id: postId },
  });
  return result;
};
const getPostsStats = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // const totalPosts = await tx.post.count();
    // const totalPublishedPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.PUBLISHED,
    //   },
    // });
    // const totalWithheldPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.WITHHELD,
    //   },
    // });

    // const totalComments = await tx.comment.count();
    // const totalApprovedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.APPROVED,
    //   },
    // });
    // const totalRejectedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.REJECT,
    //   },
    // });

    // const totalPostViewsAggregate = await tx.post.aggregate({
    //   _sum: { views: true },
    // });
    // const totalPostViews = totalPostViewsAggregate._sum.views;

    // return {
    //   totalPosts,
    //   totalWithheldPosts,
    //   totalComments,
    //   totalRejectedComments,
    //   totalPostViews,
    //   totalApprovedComments,
    //   totalPublishedPosts,
    // };

    const [
      totalPosts,
      totalPublishedPosts,
      totalWithheldPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViewsAggregate,
    ] = await Promise.all([
      await tx.post.count(),
      await tx.post.count({
        where: {
          status: PostStatus.PUBLISHED,
        },
      }),
      await tx.post.count({
        where: {
          status: PostStatus.WITHHELD,
        },
      }),

      await tx.comment.count(),
      await tx.comment.count({
        where: {
          status: CommentStatus.APPROVED,
        },
      }),
      await tx.comment.count({
        where: {
          status: CommentStatus.REJECT,
        },
      }),

      await tx.post.aggregate({
        _sum: { views: true },
      }),
    ]);
    return {
      totalPosts,
      totalPublishedPosts,
      totalWithheldPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViews: totalPostViewsAggregate._sum.views,
    };
  });
  return transactionResult;
};
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
