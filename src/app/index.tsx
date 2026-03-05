import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { useAuth } from "@/features/auth"
import { Spinner } from "@/shared/ui/spinner"

import { routeTree } from "../routeTree.gen"
import { persistor, store } from "./store"

import "../styles.css"

import { ThemeProvider } from "@/shared/components/theme-provider"
import type { RouterContext } from "@/shared/lib/router-context"
import { TooltipProvider } from "@/shared/ui/tooltip"

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
    store: undefined!,
  } as RouterContext,
  defaultPendingComponent: () => (
    <Spinner
      className="absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2"
    />
  ),
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const { isAuthenticated } = useAuth()
  return <RouterProvider router={router} context={{ auth: { isAuthenticated }, store }} />
}

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Provider store={store}>
          <PersistGate
            loading={
              <Spinner
                className="absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2"
              />
            }
            persistor={persistor}
          >
            <InnerApp />
          </PersistGate>
        </Provider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
