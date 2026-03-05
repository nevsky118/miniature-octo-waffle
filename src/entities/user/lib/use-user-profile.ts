import { selectFollowers, selectFollowing } from "@/entities/subscription"
import { useAppSelector } from "@/shared/lib/store-hooks"

import { selectUserById } from "../user-selectors"

export function useUserProfile(userId: string) {
  const user = useAppSelector((state) => selectUserById(state, userId))
  const followersCount = useAppSelector((state) => selectFollowers(state, userId).length)
  const followingCount = useAppSelector((state) => selectFollowing(state, userId).length)
  return { user, followersCount, followingCount }
}
