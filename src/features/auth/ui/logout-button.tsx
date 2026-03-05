import { useNavigate } from "@tanstack/react-router"

import { persistor } from "@/app/store"
import { useAppDispatch } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"

import { sessionEnded } from "../model/session-slice"

export function LogoutButton(props: Omit<React.ComponentProps<typeof Button>, "onClick">) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(sessionEnded())
    persistor.purge()
    navigate({ to: "/sign-in" })
  }

  return (
    <Button onClick={handleLogout} {...props}>
      Выйти
    </Button>
  )
}
