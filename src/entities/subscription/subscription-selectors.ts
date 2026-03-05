import type { RootState } from "@/app/store"

export const selectFollowing = (state: RootState, userId: string): string[] =>
  state.subscriptions.byUser[userId] ?? []

export const selectFollowers = (state: RootState, userId: string): string[] =>
  Object.entries(state.subscriptions.byUser)
    .filter(([, ids]) => ids.includes(userId))
    .map(([id]) => id)

export const selectIsFollowing = (state: RootState, userId: string, targetId: string): boolean =>
  selectFollowing(state, userId).includes(targetId)