export interface LikePayload {
  postId: string
  userId: string
}

export interface LikeState {
  byPost: Record<string, string[]>
}
