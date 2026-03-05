import type { Store } from "@reduxjs/toolkit"

import type { RootState } from "@/app/store"

export interface RouterContext {
  auth: { isAuthenticated: boolean }
  store: Store<RootState>
}
