import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

import { selectFollowing } from "@/entities/subscription"
import { selectUsername } from "@/entities/user"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"
import { SubscriptionList } from "@/widgets/subscription-list"

export const Route = createFileRoute("/_authenticated/$userId/following")({
  loader: ({ context, params }) => ({
    username: selectUsername(context.store.getState(), params.userId),
  }),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.username ? `Подписки @${loaderData.username}` : "Подписки" }],
  }),
  component: FollowingPage,
})

function FollowingPage() {
  const { userId } = Route.useParams()
  const followingIds = useAppSelector((state) => selectFollowing(state, userId))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-2 border-b p-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/$userId" params={{ userId }} search={{ from: undefined }}>
            <ArrowLeft className="size-4" />
            Назад
          </Link>
        </Button>
        <span className="text-sm font-medium">Подписки</span>
      </header>
      <SubscriptionList userIds={followingIds} from="following" emptyTitle="Нет подписок" />
    </div>
  )
}
