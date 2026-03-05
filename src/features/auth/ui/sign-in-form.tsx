import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { useAppDispatch, useAppSelector } from "@/shared/lib/store-hooks"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"

import { signIn } from "../model/sign-in"

const signInSchema = z.object({
  username: z.string().min(4, "Минимум 4 символа").max(12, "Максимум 12 символов"),
})

type SignInValues = z.infer<typeof signInSchema>

export function SignInForm({ className }: { className?: string }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const status = useAppSelector((state) => state.session.status)
  const isPending = status === "pending"

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(values: SignInValues) {
    await dispatch(signIn(values.username))
    navigate({ to: "/" })
  }

  return (
    <Card className={cn("border-0 shadow-none", className)}>
      <CardHeader>
        <CardTitle>Введите имя</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Имя пользователя"
                    maxLength={12}
                    autoComplete="off"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>От 4 до 12 символов</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={!form.formState.isValid || isPending}>
                {isPending ? "Вход..." : "Продолжить"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
