import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import type { Post } from "./post-types"

export const postAdapter = createEntityAdapter<Post>()

const postSlice = createSlice({
  name: "posts",
  initialState: postAdapter.getInitialState(),
  reducers: {
    postAdded: postAdapter.addOne,
    postRemoved: postAdapter.removeOne,
  },
})

export const { postAdded, postRemoved } = postSlice.actions
export const postReducer = postSlice.reducer
