import { createFileRoute } from "@tanstack/react-router"

import { selectPostsByAuthor } from "@/entities/post"
import { ProfileCard, selectUsername, useUserProfile } from "@/entities/user"
import { useCurrentUser } from "@/shared/lib/use-current-user"
import { FollowButton } from "@/features/subscription"
import { RenameUserInput } from "@/features/user"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { usePaginated } from "@/shared/lib/use-paginated"
import { FeedList } from "@/widgets/feed-list"

export const Route = createFileRoute("/_authenticated/$userId/(profile)/")({
  loader: ({ context, params }) => ({
    username: selectUsername(context.store.getState(), params.userId),
  }),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.username ? `@${loaderData.username}` : "Профиль" }],
  }),
  component: ProfilePage,
})

function ProfilePage() {
  const { userId } = Route.useParams()
  const currentUser = useCurrentUser()
  const isOwn = currentUser?.id === userId
  const { user, followersCount, followingCount } = useUserProfile(userId)
  const allPosts = useAppSelector((state) => selectPostsByAuthor(state, userId))
  const { items, hasMore, loading, fetchMore } = usePaginated(allPosts)

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 pb-4">
      <ProfileCard
        username={user.username}
        followersCount={followersCount}
        followingCount={followingCount}
        userId={userId}
        nameSlot={isOwn ? <RenameUserInput userId={userId} defaultValue={user.username} /> : undefined}
      >
        <FollowButton targetId={userId} />
      </ProfileCard>
      <FeedList
        posts={items}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={fetchMore}
        emptyTitle="Пока нет постов"
      />
    </div>
  )
}
