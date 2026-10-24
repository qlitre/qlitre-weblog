import client from './client'
import type { Post } from '../../types/blog'
import type { MicroCMSQueries } from 'microcms-js-sdk'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  const slug = params.slug
  const queries: MicroCMSQueries = {}
  if (params.draftKey) {
    queries.draftKey = String(params.draftKey)
  }

  const data = client
    .getListDetail<Post>({
      endpoint: 'post',
      contentId: String(slug),
      queries: queries,
    })
    .catch((err) => console.error(err))
  return data
})
