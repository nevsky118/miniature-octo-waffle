import { useAppSelector } from "@/shared/lib/store-hooks"

export function useAuth() {
  const currentUserId = useAppSelector((state) => state.session.currentUserId)
  return {
    currentUserId,
    isAuthenticated: currentUserId !== null,
  }
}
