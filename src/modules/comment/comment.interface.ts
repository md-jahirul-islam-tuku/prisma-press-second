export interface ICreateCommentPayload {
  postId: string;
  authorId: string;
  content: string;
}

export interface IUpdateCommentPayload {
  authorId: string;
  content: string;
}
