import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await postService.createPost(payload, userId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Post created successfully",
      data: result,
    });
  },
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPosts();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Posts retrieved successfully",
      data: result,
    });
  },
);
const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.postId;
    if (!id) {
      throw new Error("Post id not found!");
    }
    const result = await postService.getPostById(id as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post retrieved successfully",
      data: result,
    });
  },
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getPostsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPosts(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Posts retrieved successfully",
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};
