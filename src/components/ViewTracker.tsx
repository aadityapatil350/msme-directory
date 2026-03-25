'use client'

import { useEffect, useState } from 'react'

type ViewTrackerProps = {
  type: 'scheme' | 'blog' | 'guide' | 'loan' | 'consultant'
  id: string
  initialCount: number
}

export default function ViewTracker({ type, id, initialCount }: ViewTrackerProps) {
  const [viewCount, setViewCount] = useState(initialCount)
  const [hasTracked, setHasTracked] = useState(false)

  useEffect(() => {
    // Only track once per page load
    if (hasTracked) return

    const trackView = async () => {
      try {
        // Check if we've already tracked this view in this session
        const sessionKey = `viewed_${type}_${id}`
        const alreadyViewed = sessionStorage.getItem(sessionKey)

        if (alreadyViewed) {
          setHasTracked(true)
          return
        }

        const response = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, id }),
        })

        if (response.ok) {
          const data = await response.json()
          setViewCount(data.viewCount)
          sessionStorage.setItem(sessionKey, 'true')
        }
      } catch (error) {
        console.error('Failed to track view:', error)
      } finally {
        setHasTracked(true)
      }
    }

    // Small delay to avoid tracking bots/quick bounces
    const timer = setTimeout(trackView, 1000)
    return () => clearTimeout(timer)
  }, [type, id, hasTracked])

  return <span>{viewCount.toLocaleString()}</span>
}
