import * as React from "react"

import { useAppContainer } from "@/shared/lib/app-container"
import { Button } from "@/shared/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer"
import { Spinner } from "@/shared/ui/spinner"

const CreatePostForm = React.lazy(() =>
  import("./create-post-form").then((m) => ({ default: m.CreatePostForm }))
)

export function CreatePostDrawer() {
  const [open, setOpen] = React.useState(false)
  const container = useAppContainer()

  return (
    <Drawer open={open} onOpenChange={setOpen} container={container}>
      <DrawerTrigger asChild>
        <Button className="w-full">+ Добавить пост</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Новый пост</DrawerTitle>
        </DrawerHeader>
        {open && (
          <React.Suspense
            fallback={
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            }
          >
            <CreatePostForm onSuccess={() => setOpen(false)} />
          </React.Suspense>
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Отмена</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
