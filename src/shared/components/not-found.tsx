import { Link } from "@tanstack/react-router"
import { Compass } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty"

export function NotFound() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Compass />
        </EmptyMedia>
        <EmptyTitle>Страница не найдена</EmptyTitle>
        <EmptyDescription>Возможно, она была удалена или ссылка неверная.</EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" asChild>
        <Link to="/">На главную</Link>
      </Button>
    </Empty>
  )
}
