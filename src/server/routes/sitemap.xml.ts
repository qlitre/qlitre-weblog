import client from '../api/client'
import type { Post } from '../../types/blog'

// UTC の日時文字列を JST の YYYY-MM-DD に変換
const toJstDate = (utc: string) => {
  const jst = new Date(new Date(utc).getTime() + 9 * 60 * 60 * 1000)
  return jst.toISOString().slice(0, 10)
}

export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig()
  const posts = await client.getAllContents<Post>({
    endpoint: 'post',
    queries: { fields: 'id,updatedAt' },
  })

  const urls = posts.map(
    (post) =>
      `<url><loc>${siteUrl}/${post.id}</loc><lastmod>${toJstDate(post.updatedAt)}</lastmod></url>`
  )
  // 最後にトップURL
  urls.push(`<url><loc>${siteUrl}</loc></url>`)

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`
})
