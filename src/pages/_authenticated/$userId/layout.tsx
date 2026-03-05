import { createFileRoute, Outlet } from "@tanstack/react-router"

import { selectUserById } from "@/entities/user"
import { NotFound } from "@/shared/components/not-found"
import { useAppSelector } from "@/shared/lib/store-hooks"

export const Route = createFileRoute("/_authenticated/$userId")({
  component: UserLayout,
})

function UserLayout() {
  const { userId } = Route.useParams()
  const user = useAppSelector((state) => selectUserById(state, userId))

  if (!user) return <NotFound />

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Outlet />
    </div>
  )
}
