const pr = new Intl.PluralRules("ru")

type PluralForms = {
  one: string
  few: string
  many: string
}

export function plural(count: number, forms: PluralForms): string {
  const rule = pr.select(count)
  if (rule === "one") return forms.one
  if (rule === "few") return forms.few
  return forms.many
}

export const followerForms: PluralForms = {
  one: "подписчик",
  few: "подписчика",
  many: "подписчиков",
}

export const followingForms: PluralForms = {
  one: "подписка",
  few: "подписки",
  many: "подписок",
}
