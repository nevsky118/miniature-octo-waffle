import { createFileRoute } from "@tanstack/react-router"

import { selectUserIds } from "@/entities/user"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { SubscriptionList } from "@/widgets/subscription-list"

export const Route = createFileRoute("/_authenticated/explore")({
  head: () => ({
    meta: [{ title: "Обзор" }],
  }),
  component: ExplorePage,
})

function ExplorePage() {
  const currentUserId = useAppSelector((state) => state.session.currentUserId)
  const allUserIds = useAppSelector((state) => selectUserIds(state).filter((id) => id !== currentUserId))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b p-4">
        <h1 className="text-lg font-semibold">Обзор</h1>
        <p className="text-sm text-muted-foreground">Люди, на которых можно подписаться</p>
      </header>
      <SubscriptionList userIds={allUserIds as string[]} emptyTitle="Нет пользователей" />
    </div>
  )
}
