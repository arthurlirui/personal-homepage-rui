import { NextResponse } from 'next/server'

const GITHUB_USER = 'arthurlirui'

// Server-side proxy for GitHub activity data.
// Runs on the server to avoid browser CORS and rate-limit issues.
// Optionally uses GITHUB_TOKEN from environment for higher rate limits.
export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    // Fetch up to 10 pages of events (300 events max) for broader coverage
    const eventPages = await Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) =>
        fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${page}`,
          { headers }
        ).then((r) => (r.ok ? r.json() : [])).catch(() => [])
      )
    )

    const counts: Record<string, number> = {}

    for (const events of eventPages) {
      if (!Array.isArray(events)) continue
      for (const ev of events) {
        if (ev.type === 'PushEvent') {
          const date = ev.created_at?.slice(0, 10)
          if (!date) continue
          const commitCount = ev.payload?.size || 1
          counts[date] = (counts[date] || 0) + commitCount
        }
      }
    }

    // Fetch repos for pushed_at as supplementary data
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`,
      { headers }
    )
    if (reposRes.ok) {
      const repos = await reposRes.json()
      for (const repo of repos) {
        if (repo.pushed_at) {
          const date = repo.pushed_at.slice(0, 10)
          if (!counts[date]) {
            counts[date] = 1
          }
        }
      }
    }

    return NextResponse.json({ counts, total: Object.keys(counts).length })
  } catch {
    return NextResponse.json({ counts: {}, total: 0 }, { status: 200 })
  }
}
