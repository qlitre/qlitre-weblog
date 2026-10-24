import client from './client'
import type { Tag } from '../../types/blog'

export default defineEventHandler(async () => {
  const queries = {
    limit: 100,
  }

  const data = await client
    .getList<Tag>({
      endpoint: 'tag',
      queries: queries,
    })
    .catch((err) => console.error(err))
  return data
})
