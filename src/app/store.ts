import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import { likeReducer } from "@/entities/like"
import { postReducer } from "@/entities/post"
import { subscriptionReducer } from "@/entities/subscription"
import { userReducer } from "@/entities/user"
import { sessionReducer } from "@/features/auth"

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  posts: postReducer,
  subscriptions: subscriptionReducer,
  likes: likeReducer,
})

const persistConfig = {
  key: "app-state",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
