import { NextResponse } from 'next/server'

const GITHUB_USER = 'arthurlirui'

// Server-side proxy for GitHub activity data.
// Runs on the server to avoid browser CORS and rate-limit issues.
// Optionally uses GITHUB_TOKEN from environment for higher rate limits.
//
// 数据源优先级（从最准确到最弱）：
//   1. GraphQL contributionCalendar —— 与 GitHub 个人主页热力图同源，
//      覆盖完整 12 个月、包含 commits/PR/Issue/Review 等全部贡献类型。
//   2. 抓取公开的 /users/<user>/contributions SVG 页面，解析每个 day rect
//      的 data-date / data-count。同样覆盖完整一年，无需 token。
//   3. Events API（仅最近 ~90 天，仅 PushEvent）—— 最后降级用。
export async function GET() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'personal-homepage-rui',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  // 1. GraphQL contributions calendar
  if (process.env.GITHUB_TOKEN) {
    try {
      const gql = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `query {
            user(login: "${GITHUB_USER}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }`,
        }),
        next: { revalidate: 3600 },
      })
      if (gql.ok) {
        const json = await gql.json()
        const weeks =
          json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
        if (Array.isArray(weeks) && weeks.length > 0) {
          const counts: Record<string, number> = {}
          for (const w of weeks) {
            for (const d of w.contributionDays || []) {
              counts[d.date] = d.contributionCount
            }
          }
          return NextResponse.json({
            counts,
            total: Object.keys(counts).length,
            source: 'graphql',
          })
        }
      }
    } catch {
      // 落到 SVG 抓取
    }
  }

  // 2. Scrape the public contributions SVG (no auth required)
  try {
    const svgRes = await fetch(
      `https://github.com/users/${GITHUB_USER}/contributions`,
      {
        headers: { Accept: 'text/html', 'User-Agent': 'personal-homepage-rui' },
        next: { revalidate: 3600 },
      }
    )
    if (svgRes.ok) {
      const html = await svgRes.text()
      const counts: Record<string, number> = {}
      const rectRegex = /<rect\b[^>]*>/g
      let m: RegExpExecArray | null
      while ((m = rectRegex.exec(html)) !== null) {
        const rect = m[0]
        if (!rect.includes('data-date=')) continue
        const dateMatch = rect.match(/data-date="(\d{4}-\d{2}-\d{2})"/)
        const countMatch = rect.match(/data-count="(\d+)"/)
        if (dateMatch) {
          counts[dateMatch[1]] = countMatch ? parseInt(countMatch[1], 10) : 0
        }
      }
      if (Object.keys(counts).length > 0) {
        return NextResponse.json({
          counts,
          total: Object.keys(counts).length,
          source: 'svg',
        })
      }
    }
  } catch {
    // 落到 Events API
  }

  // 3. Fallback: Events API (limited to ~90 days, PushEvent only)
  try {
    const eventPages = await Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) =>
        fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${page}`,
          { headers }
        )
          .then((r) => (r.ok ? r.json() : []))
          .catch(() => [])
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

    // 补充仓库最后推送日
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`,
      { headers }
    )
    if (reposRes.ok) {
      const repos = await reposRes.json()
      for (const repo of repos) {
        if (repo.pushed_at) {
          const date = repo.pushed_at.slice(0, 10)
          if (!counts[date]) counts[date] = 1
        }
      }
    }

    return NextResponse.json({
      counts,
      total: Object.keys(counts).length,
      source: 'events',
    })
  } catch {
    return NextResponse.json({ counts: {}, total: 0, source: 'none' }, { status: 200 })
  }
}
