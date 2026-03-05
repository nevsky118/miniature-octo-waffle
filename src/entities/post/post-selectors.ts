import type { RootState } from "@/app/store"
import { selectFollowing } from "@/entities/subscription"

import { postAdapter } from "./post-slice"

const baseSelectors = postAdapter.getSelectors((state: RootState) => state.posts)

export const selectAllPostsSorted = (state: RootState) => {
  const posts = baseSelectors.selectAll(state)
  return posts.toSorted((a, b) => b.createdAt - a.createdAt)
}

export const selectPostsByAuthor = (state: RootState, authorId: string) =>
  selectAllPostsSorted(state).filter((post) => post.authorId === authorId)

export const selectFollowingPosts = (state: RootState, userId: string) => {
  const following = selectFollowing(state, userId)
  const allowedIds = new Set([userId, ...following])
  return selectAllPostsSorted(state).filter((p) => allowedIds.has(p.authorId))
}
