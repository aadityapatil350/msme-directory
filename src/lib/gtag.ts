export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

type GtagEventParams = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, params: GtagEventParams = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  w.gtag('event', name, params)
}
