import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/",auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);
router.get("/author/:authorId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.getCommentByAuthor);
router.get("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.getCommentById);
router.patch("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateComment);
router.delete("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteComment);
router.patch("/:commentId/moderate", auth(Role.ADMIN), commentController.updateCommentToModerate);

export const commentRoutes = router;
