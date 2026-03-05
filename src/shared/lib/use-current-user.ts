import { selectUserById } from "@/entities/user"
import { useAppSelector } from "@/shared/lib/store-hooks"

export function useCurrentUser() {
  return useAppSelector((state) => {
    if (!state.session.currentUserId) return null
    return selectUserById(state, state.session.currentUserId) ?? null
  })
}
