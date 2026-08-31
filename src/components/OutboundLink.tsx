'use client'

import { trackEvent } from '@/lib/gtag'
import { ReactNode } from 'react'

interface Props {
  href: string
  portal?: string
  eventName?: string
  className?: string
  children: ReactNode
}

export default function OutboundLink({ href, portal, eventName = 'outbound_apply_click', className, children }: Props) {
  const handleClick = () => {
    try {
      const url = new URL(href)
      trackEvent(eventName, { portal: portal || url.hostname, url: href })
    } catch {
      trackEvent(eventName, { portal: portal || href, url: href })
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
