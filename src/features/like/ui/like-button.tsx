import { HeartIcon } from "lucide-react"

import { postLiked, postUnliked, selectIsLiked, selectLikeCount } from "@/entities/like"
import { useCurrentUser } from "@/shared/lib/use-current-user"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

export function LikeButton({ postId }: { postId: string }) {
  const dispatch = useAppDispatch()
  const currentUser = useCurrentUser()
  const isLiked = useAppSelector((state) => (currentUser ? selectIsLiked(state, postId, currentUser.id) : false))
  const count = useAppSelector((state) => selectLikeCount(state, postId))

  function handleClick() {
    if (!currentUser) return
    const payload = {
      postId,
      userId: currentUser.id,
    }
    dispatch(isLiked ? postUnliked(payload) : postLiked(payload))
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} className="gap-1.5 text-muted-foreground">
      <HeartIcon className={cn({ "fill-current text-red-500": isLiked })} />
      {count > 0 && <span className="text-xs">{count}</span>}
    </Button>
  )
}
