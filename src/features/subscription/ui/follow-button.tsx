import { selectIsFollowing, userFollowed, userUnfollowed } from "@/entities/subscription"
import { useCurrentUser } from "@/shared/lib/use-current-user"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"

export function FollowButton({ targetId }: { targetId: string }) {
  const dispatch = useAppDispatch()
  const currentUser = useCurrentUser()
  const isFollowing = useAppSelector((state) =>
    currentUser ? selectIsFollowing(state, currentUser.id, targetId) : false
  )

  if (!currentUser || currentUser.id === targetId) return null

  function handleClick() {
    if (!currentUser) return
    if (isFollowing) {
      dispatch(userUnfollowed({ userId: currentUser.id, targetId }))
    } else {
      dispatch(userFollowed({ userId: currentUser.id, targetId }))
    }
  }

  return (
    <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={handleClick}>
      {isFollowing ? "Отписаться" : "Подписаться"}
    </Button>
  )
}
