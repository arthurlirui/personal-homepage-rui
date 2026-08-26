// Brand-specific SVG icons for academic platforms.
// Each icon inherits currentColor and accepts a size prop.

interface IconProps {
  size?: number
  className?: string
}

export function GoogleScholarIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L1 9h11l2-2-2-2H5L0 0h12l4 4h8v6h-9l-2 2 2 2h9v6h-8l-4 4H0l5-5h6l2-2-2-2H4l-4-4h12z" />
      <path d="M5.246 21.097c-.46-.418-.762-.99-.762-1.676 0-1.29 1.1-2.343 2.457-2.343.6 0 1.146.21 1.572.557.41-.336.945-.557 1.534-.557 1.357 0 2.457 1.053 2.457 2.343 0 .686-.302 1.258-.762 1.676.46.418.762.99.762 1.676 0 1.29-1.1 2.343-2.457 2.343-.59 0-1.124-.22-1.534-.557-.426.347-.972.557-1.572.557-1.357 0-2.457-1.053-2.457-2.343 0-.686.302-1.258.762-1.676z" opacity="0" />
    </svg>
  )
}

// Simplified Google Scholar icon (the classic graduation cap shape)
export function ScholarIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      <path d="M5 13.18v3.82c0 1.1 3.13 2 7 2s7-.9 7-2v-3.82" />
      <path d="M1 9v6c0 .55.45 1 1 1s1-.45 1-1V9" />
    </svg>
  )
}

export function GitHubIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function LinkedInIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

export function OrcidIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.51 7.52h1.26v8.96H7.51V7.52zm.63-2.02c.44 0 .8.36.8.8s-.36.8-.8.8-.8-.36-.8-.8.36-.8.8-.8zm3.47 2.02h3.34c2.48 0 4.02 1.88 4.02 4.32 0 2.44-1.54 4.32-4.02 4.32h-3.34V7.52zm1.26 1.12v6.4h2c1.78 0 2.58-1.4 2.58-3.2s-.8-3.2-2.58-3.2h-2z" />
    </svg>
  )
}

export function OpenReviewIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M7 8h10M7 12h7M7 16h10" />
    </svg>
  )
}
