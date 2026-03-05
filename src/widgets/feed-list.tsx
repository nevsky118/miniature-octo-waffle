import { useVirtualizer } from "@tanstack/react-virtual"
import { FileText } from "lucide-react"
import * as React from "react"

import type { Post } from "@/entities/post"
import { PostCard } from "@/entities/post"
import { selectUserById } from "@/entities/user"
import { LikeButton } from "@/features/like"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty"
import { Spinner } from "@/shared/ui/spinner"

type FeedListProps = {
  posts: Post[]
  hasMore?: boolean
  loading?: boolean
  onLoadMore?: () => void
  emptyTitle?: string
}

export function FeedList({
  posts,
  hasMore = false,
  loading = false,
  onLoadMore,
  emptyTitle = "Пока здесь пусто",
}: FeedListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 112,
    overscan: 5,
    gap: 12,
  })

  React.useEffect(() => {
    const items = virtualizer.getVirtualItems()
    const lastItem = items[items.length - 1]
    if (!lastItem) return
    if (lastItem.index >= posts.length - 1 && hasMore && !loading) {
      onLoadMore?.()
    }
  }, [virtualizer.getVirtualItems(), posts.length, hasMore, loading, onLoadMore])

  const store = useAppSelector((state) => state)

  if (posts.length === 0 && !loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText />
            </EmptyMedia>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }

  return (
    <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const post = posts[virtualItem.index]
          const author = selectUserById(store, post.authorId)
          return (
            <div
              key={post.id}
              className="absolute top-0 left-0 w-full px-4"
              style={{ transform: `translateY(${virtualItem.start}px)` }}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
            >
              <PostCard
                username={author?.username ?? "???"}
                text={post.text}
                createdAt={post.createdAt}
                profileTo={`/${post.authorId}`}
                actions={<LikeButton postId={post.id} />}
              />
            </div>
          )
        })}
      </div>
      {loading && (
        <div className="flex justify-center py-4">
          <Spinner className="size-5 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
