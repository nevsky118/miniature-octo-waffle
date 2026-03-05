import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router"
import * as React from "react"

import { NotFound } from "@/shared/components/not-found"
import { Toaster } from "@/shared/ui/sonner"
import { siteConfig } from "@/shared/config/site"
import { AppContainerContext } from "@/shared/lib/app-container"
import type { RouterContext } from "@/shared/lib/router-context"

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        title: siteConfig.name,
      },
    ],
  }),
})

function RootComponent() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  return (
    <>
      <HeadContent />
      <div className="flex h-screen items-center justify-center bg-muted">
        <div
          ref={setContainer}
          className="app-container relative h-(--app-height) w-(--app-width) max-h-screen overflow-hidden antialiased bg-background"
        >
          <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden overscroll-none">
            <AppContainerContext value={container}>
              <Outlet />
              <Toaster position="top-center" />
            </AppContainerContext>
          </div>
        </div>
      </div>
    </>
  )
}
