import { createFileRoute } from "@tanstack/react-router"

import { selectFollowingPosts } from "@/entities/post"
import { useAuth } from "@/features/auth"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { usePaginated } from "@/shared/lib/use-paginated"
import { FeedList } from "@/widgets/feed-list"

export const Route = createFileRoute("/_authenticated/(feed)/following")({
  head: () => ({
    meta: [{ title: "Подписки" }],
  }),
  component: FollowingPage,
})

function FollowingPage() {
  const { currentUserId } = useAuth()
  const allPosts = useAppSelector((state) => selectFollowingPosts(state, currentUserId!))
  const { items, hasMore, loading, fetchMore } = usePaginated(allPosts)
  return (
    <FeedList
      posts={items}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={fetchMore}
      emptyTitle="Нет постов"
    />
  )
}
