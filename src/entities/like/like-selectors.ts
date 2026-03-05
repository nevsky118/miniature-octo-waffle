import type { RootState } from "@/app/store"

export const selectLikesByPost = (state: RootState, postId: string): string[] =>
  state.likes.byPost[postId] ?? []

export const selectLikeCount = (state: RootState, postId: string): number =>
  selectLikesByPost(state, postId).length

export const selectIsLiked = (state: RootState, postId: string, userId: string): boolean =>
  selectLikesByPost(state, postId).includes(userId)
