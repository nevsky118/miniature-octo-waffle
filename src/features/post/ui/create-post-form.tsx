import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useCurrentUser } from "@/shared/lib/use-current-user"
import { useAppDispatch } from "@/shared/lib/store-hooks"
import { Button } from "@/shared/ui/button"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/shared/ui/input-group"

import { createPost } from "../model/create-post"

const POST_MAX_LENGTH = 280

const createPostSchema = z.object({
  text: z
    .string()
    .min(1, { error: "Пост не может быть пустым" })
    .max(POST_MAX_LENGTH, { error: `Максимум ${POST_MAX_LENGTH} символов` }),
})

type CreatePostValues = z.infer<typeof createPostSchema>

interface CreatePostFormProps {
  onSuccess: () => void
}

export function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const dispatch = useAppDispatch()
  const user = useCurrentUser()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    defaultValues: { text: "" },
  })

  const textLength = watch("text").length

  async function onSubmit(values: CreatePostValues) {
    if (!user) return
    await dispatch(createPost({ authorId: user.id, text: values.text }))
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <InputGroup>
        <InputGroupTextarea
          placeholder="Что нового?"
          rows={3}
          maxLength={POST_MAX_LENGTH}
          {...register("text")}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText>
            {textLength}/{POST_MAX_LENGTH}
          </InputGroupText>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="ml-auto"
            disabled={!isValid || isSubmitting}
          >
            Создать
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
