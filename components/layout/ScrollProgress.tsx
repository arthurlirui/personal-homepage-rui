'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * A thin progress bar fixed to the top of the viewport that fills as the
 * user scrolls down the page. Sits above the header (z-index higher than
 * the sticky header) and is hidden on print.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent z-[60] print:hidden"
    />
  )
}
