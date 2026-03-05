import type { RootState } from "@/app/store"

import { userAdapter } from "./user-slice"

const selectors = userAdapter.getSelectors((state: RootState) => state.users)

export const selectUserById = (state: RootState, id: string) => {
  return selectors.selectById(state, id)
}

export const selectUserIds = (state: RootState) => {
  return selectors.selectIds(state)
}

export const selectAllUsers = (state: RootState) => {
  return selectors.selectAll(state)
}

export const selectUsername = (state: RootState, userId: string) => {
  return selectUserById(state, userId)?.username
}
