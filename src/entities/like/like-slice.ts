import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { LikePayload, LikeState } from "./like-types"

const initialState: LikeState = { byPost: {} }

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    postLiked(state, action: PayloadAction<LikePayload>) {
      const { postId, userId } = action.payload
      const list = state.byPost[postId] ?? []
      if (!list.includes(userId)) {
        state.byPost[postId] = [...list, userId]
      }
    },
    postUnliked(state, action: PayloadAction<LikePayload>) {
      const { postId, userId } = action.payload
      const list = state.byPost[postId] ?? []
      state.byPost[postId] = list.filter((id) => id !== userId)
    },
  },
})

export const { postLiked, postUnliked } = likeSlice.actions
export const likeReducer = likeSlice.reducer
