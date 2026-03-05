import { Users } from "lucide-react"
import * as React from "react"

import { selectUserById, UserCard } from "@/entities/user"
import { FollowButton } from "@/features/subscription"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty"

const PAGE_SIZE = 5

type SubscriptionListProps = {
  userIds: string[]
  from?: "followers" | "following"
  emptyTitle?: string
}

export function SubscriptionList({
  userIds,
  from,
  emptyTitle = "Пока здесь пусто",
}: SubscriptionListProps) {
  const [limit, setLimit] = React.useState(PAGE_SIZE)
  const visibleIds = userIds.slice(0, limit)
  const hasMore = limit < userIds.length

  const store = useAppSelector((state) => state)

  if (userIds.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {visibleIds.map((id) => {
          const user = selectUserById(store, id)
          if (!user) return null
          return (
            <UserCard
              key={id}
              userId={id}
              username={user.username}
              from={from}
              actions={<FollowButton targetId={id} />}
            />
          )
        })}
      </div>
      {hasMore && (
        <div className="flex justify-center py-4">
          <Button variant="ghost" size="sm" onClick={() => setLimit((prev) => prev + PAGE_SIZE)}>
            Загрузить ещё
          </Button>
        </div>
      )}
    </div>
  )
}
