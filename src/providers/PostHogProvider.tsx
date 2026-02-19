'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, ReactNode } from 'react'
import { useRouter } from '@tanstack/react-router'

export default function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST,
      capture_pageview: true
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = router.subscribe('onResolved', () => {
      posthog.capture('$pageview')
    })

    return unsubscribe
  }, [router])

  return null
}