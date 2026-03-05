import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router"

import { useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"

export const Route = createFileRoute("/_authenticated/(feed)")({
  component: FeedLayout,
})

function FeedLayout() {
  const currentUserId = useAppSelector((state) => state.session.currentUserId)
  const matchRoute = useMatchRoute()
  const isFollowing = !!matchRoute({
    to: "/following",
  })
  const currentTab = isFollowing ? "following" : "all"
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Tabs value={currentTab} className="px-4 pt-4">
        <TabsList className="w-full">
          <TabsTrigger value="all" asChild>
            <Link to="/">Все посты</Link>
          </TabsTrigger>
          <TabsTrigger value="following" asChild>
            <Link to="/following">Подписки</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex min-h-0 flex-1 flex-col py-4">
        <Outlet />
      </div>
      <footer
        className="sticky bottom-0 border-t
          bg-background p-4"
      >
        <Button variant="link" asChild className="w-full">
          <Link to="/$userId" params={{ userId: currentUserId! }} search={{ from: undefined }}>
            Перейти в профиль
          </Link>
        </Button>
      </footer>
    </div>
  )
}
