import { Link } from "@tanstack/react-router"

import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/shared/ui/item"

type UserCardProps = {
  userId: string
  username: string
  from?: "followers" | "following"
  actions?: React.ReactNode
}

export function UserCard({ userId, username, from, actions }: UserCardProps) {
  return (
    <Item size="sm">
      <ItemMedia>
        <Avatar className="size-9">
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Link to="/$userId" params={{ userId }} search={{ from }} className="hover:underline">
            {username}
          </Link>
        </ItemTitle>
      </ItemContent>
      <ItemActions>{actions}</ItemActions>
    </Item>
  )
}
