import { createAsyncThunk } from "@reduxjs/toolkit"

import type { RootState } from "@/app/store"
import { selectAllUsers, userAdded } from "@/entities/user"
import { delay } from "@/shared/lib/delay"
import { uuid } from "@/shared/lib/uuid"

export const signIn = createAsyncThunk(
  "session/signIn",
  async (username: string, { dispatch, getState }) => {
    await delay()
    const users = selectAllUsers(getState() as RootState)
    const existing = users.find((u) => u.username === username)
    if (existing) {
      return existing.id
    }
    const id = uuid()
    dispatch(userAdded({ id, username, createdAt: Date.now() }))
    return id
  },
)
