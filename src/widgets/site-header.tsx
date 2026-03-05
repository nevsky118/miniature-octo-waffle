import { Link } from "@tanstack/react-router"

import { LogoutButton } from "@/features/auth"
import { MobileNav } from "@/shared/components/mobile-nav"
import { ModeSwitcher } from "@/shared/components/mode-switcher"
import { siteConfig } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="flex h-(--header-height) items-center **:data-[slot=separator]:!h-4 px-3">
        <MobileNav />
        <Button asChild variant="ghost" className="ml-2">
          <Link to="/">
            <span>{siteConfig.name}</span>
          </Link>
        </Button>
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <ModeSwitcher />
          <Separator orientation="vertical" className="mr-2" />
          <LogoutButton size="sm" variant="ghost" />
        </div>
      </div>
    </header>
  )
}
