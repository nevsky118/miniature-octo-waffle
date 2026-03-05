export interface SubscriptionPayload {
  userId: string
  targetId: string
}

export interface SubscriptionState {
  byUser: Record<string, string[]>
}
