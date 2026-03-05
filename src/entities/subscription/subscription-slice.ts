import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { SubscriptionPayload, SubscriptionState } from "./subscription-types"

const initialState: SubscriptionState = {
  byUser: {},
}

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    userFollowed(state, action: PayloadAction<SubscriptionPayload>) {
      const { userId, targetId } = action.payload
      const list = state.byUser[userId] ?? []
      if (!list.includes(targetId)) {
        state.byUser[userId] = [...list, targetId]
      }
    },
    userUnfollowed(state, action: PayloadAction<SubscriptionPayload>) {
      const { userId, targetId } = action.payload
      const list = state.byUser[userId] ?? []
      state.byUser[userId] = list.filter((id) => id !== targetId)
    },
  },
})

export const { userFollowed, userUnfollowed } = subscriptionSlice.actions
export const subscriptionReducer = subscriptionSlice.reducer
