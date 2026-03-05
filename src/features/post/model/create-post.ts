import { createAsyncThunk } from "@reduxjs/toolkit"

import { postAdded } from "@/entities/post"
import { delay } from "@/shared/lib/delay"
import { uuid } from "@/shared/lib/uuid"

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ authorId, text }: { authorId: string; text: string }, { dispatch }) => {
    await delay()
    const post = { id: uuid(), authorId, text, createdAt: Date.now() }
    dispatch(postAdded(post))
    return post
  },
)
