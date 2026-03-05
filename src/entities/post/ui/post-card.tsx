import { Link } from "@tanstack/react-router"
import * as React from "react"

import { formatRelativeTime } from "@/shared/lib/date-utils"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Item, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle } from "@/shared/ui/item"

type PostCardProps = {
  username: string
  text: string
  createdAt: number
  profileTo: string
  actions?: React.ReactNode
}

export const PostCard = React.memo(function PostCard({
  username,
  text,
  createdAt,
  profileTo,
  actions,
}: PostCardProps) {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia>
        <Link to={profileTo}>
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Link to={profileTo} className="hover:underline">
            {username}
          </Link>
        </ItemTitle>
        <ItemDescription>{text}</ItemDescription>
      </ItemContent>
      <ItemFooter>
        {actions}
        <span className="text-xs text-muted-foreground">{formatRelativeTime(createdAt)}</span>
      </ItemFooter>
    </Item>
  )
})
