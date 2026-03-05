import { useCallback, useEffect, useRef, useState } from "react"

import { delay } from "@/shared/lib/delay"

const PAGE_SIZE = 10

export function usePaginated<T>(allItems: T[], pageSize = PAGE_SIZE) {
  const [offset, setOffset] = useState(pageSize)
  const [loading, setLoading] = useState(false)
  const fetchingRef = useRef(false)

  const items = allItems.slice(0, offset)
  const hasMore = offset < allItems.length

  const fetchMore = useCallback(async () => {
    if (fetchingRef.current || !hasMore) return
    fetchingRef.current = true
    setLoading(true)
    await delay()
    setOffset((prev) => prev + pageSize)
    setLoading(false)
    fetchingRef.current = false
  }, [hasMore, pageSize])

  useEffect(() => {
    setOffset(pageSize)
  }, [allItems.length, pageSize])

  return { items, hasMore, loading, fetchMore }
}
