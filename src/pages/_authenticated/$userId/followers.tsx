import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

import { selectFollowers } from "@/entities/subscription"
import { selectUsername } from "@/entities/user"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"
import { SubscriptionList } from "@/widgets/subscription-list"

export const Route = createFileRoute("/_authenticated/$userId/followers")({
  loader: ({ context, params }) => ({
    username: selectUsername(context.store.getState(), params.userId),
  }),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.username ? `Подписчики @${loaderData.username}` : "Подписчики" }],
  }),
  component: FollowersPage,
})

function FollowersPage() {
  const { userId } = Route.useParams()
  const followerIds = useAppSelector((state) => selectFollowers(state, userId))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-2 border-b p-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/$userId" params={{ userId }} search={{ from: undefined }}>
            <ArrowLeft className="size-4" />
            Назад
          </Link>
        </Button>
        <span className="text-sm font-medium">Подписчики</span>
      </header>
      <SubscriptionList userIds={followerIds} from="followers" emptyTitle="Нет подписчиков" />
    </div>
  )
}
