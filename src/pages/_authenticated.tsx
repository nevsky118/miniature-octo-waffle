import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { NotFound } from "@/shared/components/not-found"
import { SiteHeader } from "@/widgets/site-header"

export const Route = createFileRoute("/_authenticated")({
  notFoundComponent: NotFound,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
