import { createFileRoute, redirect } from "@tanstack/react-router"

import { SignInForm } from "@/features/auth"

export const Route = createFileRoute("/sign-in")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/" })
    }
  },
  head: () => ({
    meta: [{ title: "Вход" }],
  }),
  component: SignInPage,
})

function SignInPage() {
  return (
    <div
      className="flex h-full items-center
        justify-center"
    >
      <SignInForm className="w-full max-w-sm" />
    </div>
  )
}
