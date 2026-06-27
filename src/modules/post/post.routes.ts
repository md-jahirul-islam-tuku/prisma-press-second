import { Router } from "express";
import { postController } from "./post.controller";
import { Role } from "../../../prisma/generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.createPost,
);

router.get(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.getAllPosts,
);

router.get(
  "/my-posts",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.getMyPosts,
);

router.get(
  "/:postId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.getPostById,
);

router.patch(
  "/:postId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.updatePost,
);

router.delete(
  "/:postId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.deletePost,
);

export const postRoutes = router;
