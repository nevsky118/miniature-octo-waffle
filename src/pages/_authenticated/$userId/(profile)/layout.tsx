import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

import { CreatePostDrawer } from "@/features/post"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"

export const Route = createFileRoute("/_authenticated/$userId/(profile)")({
  validateSearch: (search: Record<string, unknown>) => ({
    from: search.from as "followers" | "following" | undefined,
  }),
  component: ProfileLayout,
})

function ProfileLayout() {
  const { userId } = Route.useParams()
  const { from } = Route.useSearch()
  const router = useRouter()
  const currentUserId = useAppSelector((state) => state.session.currentUserId)
  const isOwn = userId === currentUserId

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
      <footer className="sticky bottom-0 flex flex-col gap-2 border-t bg-background p-4">
        {isOwn && <CreatePostDrawer />}
        {from ? (
          <Button variant="link" className="w-full" onClick={() => router.history.back()}>
            <ArrowLeft className="size-4" />
            Назад
          </Button>
        ) : (
          <Button variant="link" asChild className="w-full">
            <Link to="/">В ленту</Link>
          </Button>
        )}
      </footer>
    </div>
  )
}
