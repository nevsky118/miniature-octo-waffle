import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { selectAllUsers, userUpdated } from "@/entities/user"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store-hooks"
import { Input } from "@/shared/ui/input"

const USERNAME_MIN = 4
const USERNAME_MAX = 12

function createRenameUserSchema(takenUsernames: Set<string>) {
  return z.object({
    username: z
      .string()
      .trim()
      .min(USERNAME_MIN, { error: `Минимум ${USERNAME_MIN} символа` })
      .max(USERNAME_MAX, { error: `Максимум ${USERNAME_MAX} символов` })
      .refine((v) => !takenUsernames.has(v), { message: "Имя занято" }),
  })
}

type RenameUserValues = z.infer<ReturnType<typeof createRenameUserSchema>>

export function RenameUserInput({ userId, defaultValue }: { userId: string; defaultValue: string }) {
  const dispatch = useAppDispatch()
  const allUsers = useAppSelector(selectAllUsers)

  const takenUsernames = React.useMemo(
    () => new Set(allUsers.filter((u) => u.id !== userId).map((u) => u.username)),
    [allUsers, userId],
  )

  const schema = React.useMemo(() => createRenameUserSchema(takenUsernames), [takenUsernames])

  const form = useForm<RenameUserValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { username: defaultValue },
  })

  function onSubmit({ username }: RenameUserValues) {
    if (username === defaultValue) return
    dispatch(userUpdated({ id: userId, changes: { username } }))
  }

  function handleBlur() {
    form.handleSubmit(onSubmit, (errors) => {
      if (errors.username) toast.error(errors.username.message)
      form.reset({ username: defaultValue })
    })()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            maxLength={USERNAME_MAX}
            className="h-auto w-fit border border-transparent
              bg-transparent px-2 py-0 -mx-2 text-lg
              font-semibold shadow-none
              hover:bg-input/30
              focus-visible:border-border
              focus-visible:bg-background
              dark:bg-transparent
              dark:hover:bg-input/30
              dark:focus-visible:bg-input/30"
          />
        )}
      />
    </form>
  )
}
