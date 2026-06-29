import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

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
  "/stats",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.getPostsStats,
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
