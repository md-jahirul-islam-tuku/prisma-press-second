import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comment.interface";

const createComment = async (authorId:string, payload:ICreateCommentPayload) => {
  await prisma.post.findFirstOrThrow({
    where: {
      id: payload.postId,
    },
  });
  const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        },
    })
    return comment;
};

export const commentService = {
  createComment,
};
