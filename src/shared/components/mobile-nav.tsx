import { Link, useNavigate } from "@tanstack/react-router"
import * as React from "react"

import { navItems } from "@/shared/config/nav"
import { useAppSelector } from "@/shared/lib/store-hooks"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const currentUserId = useAppSelector((state) => state.session.currentUserId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("extend-touch-target touch-manipulation", className)}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar !h-[calc(var(--app-height)-var(--header-height))] !w-(--app-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-12}
        sideOffset={10}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">Навигация</div>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const needsUser = String(item.to).includes("$userId")
                if (needsUser && !currentUserId) return null
                return (
                  <MobileLink
                    key={String(item.to)}
                    to={String(item.to)}
                    params={needsUser ? { userId: currentUserId! } : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </MobileLink>
                )
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileLink({
  to,
  params,
  className,
  children,
  ...props
}: {
  to: string
  params?: Record<string, string>
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentProps<"a">, "href">) {
  const navigate = useNavigate()
  return (
    <Link
      to={to}
      params={params}
      onClick={() => {
        navigate({ to, params })
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
