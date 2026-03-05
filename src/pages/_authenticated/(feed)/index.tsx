import { createFileRoute } from "@tanstack/react-router"

import { selectAllPostsSorted } from "@/entities/post"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { usePaginated } from "@/shared/lib/use-paginated"
import { FeedList } from "@/widgets/feed-list"

export const Route = createFileRoute("/_authenticated/(feed)/")({
  head: () => ({
    meta: [{ title: "Лента" }],
  }),
  component: AllPostsPage,
})

function AllPostsPage() {
  const allPosts = useAppSelector(selectAllPostsSorted)
  const { items, hasMore, loading, fetchMore } = usePaginated(allPosts)
  return <FeedList posts={items} hasMore={hasMore} loading={loading} onLoadMore={fetchMore} />
}
