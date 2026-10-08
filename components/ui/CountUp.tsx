'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `value` once it scrolls into view.
 * Uses IntersectionObserver (with a small root margin) and an ease-out
 * rAF loop so the count slows as it approaches the target.
 */
export default function CountUp({
  value,
  duration = 1.4,
  suffix = '',
  prefix = '',
}: {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const elapsed = (now - start) / 1000
              const t = Math.min(elapsed / duration, 1)
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3)
              setDisplay(Math.round(eased * value))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.disconnect()
          }
        }
      },
      { rootMargin: '-40px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
