import { Link } from "@tanstack/react-router"

import { formatCount } from "@/shared/lib/format-count"
import { followerForms, followingForms, plural } from "@/shared/lib/plural-utils"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"

type ProfileCardProps = {
  username: string
  followersCount: number
  followingCount: number
  userId: string
  children?: React.ReactNode
  nameSlot?: React.ReactNode
}

export function ProfileCard({
  username,
  followersCount,
  followingCount,
  userId,
  children,
  nameSlot,
}: ProfileCardProps) {
  return (
    <Card className="rounded-none border-x-0 border-t-0 shadow-none">
      <CardHeader className="grid-cols-[auto_1fr] items-center gap-x-4">
        <Avatar className="row-span-2 size-20">
          <AvatarFallback className="text-2xl font-semibold">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg">{nameSlot ?? username}</CardTitle>
        <div className="flex gap-6 text-sm">
          <Link to="/$userId/followers" params={{ userId }} className="flex gap-1">
            <span className="font-semibold">{formatCount(followersCount)}</span>
            <span className="text-muted-foreground">{plural(followersCount, followerForms)}</span>
          </Link>
          <Link to="/$userId/following" params={{ userId }} className="flex gap-1">
            <span className="font-semibold">{formatCount(followingCount)}</span>
            <span className="text-muted-foreground">{plural(followingCount, followingForms)}</span>
          </Link>
        </div>
      </CardHeader>
      {children && <CardFooter>{children}</CardFooter>}
    </Card>
  )
}
