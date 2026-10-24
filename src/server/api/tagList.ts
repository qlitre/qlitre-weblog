import client from './client'
import { Tag } from '../../types/blog'

export default defineEventHandler(async (event) => {
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
