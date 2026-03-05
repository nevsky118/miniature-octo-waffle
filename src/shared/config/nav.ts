import type { FileRoutesByTo } from "../../routeTree.gen"

interface NavItem {
  label: string
  to: keyof FileRoutesByTo
}

export const navItems: NavItem[] = [
  { label: "Лента", to: "/" },
  { label: "Обзор", to: "/explore" },
  { label: "Профиль", to: "/$userId" },
  { label: "Подписчики", to: "/$userId/followers" },
  { label: "Подписки", to: "/$userId/following" },
]
