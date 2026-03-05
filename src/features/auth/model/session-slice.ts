import { createSlice } from "@reduxjs/toolkit"

import { signIn } from "./sign-in"

export interface SessionState {
  currentUserId: string | null
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: SessionState = {
  currentUserId: null,
  status: "idle",
  error: null,
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionEnded(state) {
      state.currentUserId = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "pending"
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.currentUserId = action.payload
        state.status = "succeeded"
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "failed"
        state.error = "Ошибка входа"
      })
  },
})

export const { sessionEnded } = sessionSlice.actions

export const sessionReducer = sessionSlice.reducer
