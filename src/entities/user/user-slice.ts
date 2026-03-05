import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import type { User } from "./user-types"

export const userAdapter = createEntityAdapter<User>()

const userSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState(),
  reducers: {
    userAdded: userAdapter.addOne,
    userUpdated: userAdapter.updateOne,
  },
})

export const { userAdded, userUpdated } = userSlice.actions
export const userReducer = userSlice.reducer
