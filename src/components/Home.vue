<script setup lang="ts">
import { BLOG_PER_PAGE } from '../settings/siteSettings'
import type { MicroCMSQueries } from 'microcms-js-sdk'
import { config } from '../settings/siteSettings'

type Props = {
  page: number
  tagId?: string
}

const { page, tagId } = defineProps<Props>()
const limit = BLOG_PER_PAGE
const queries: MicroCMSQueries = {
  limit: limit,
  orders: '-publishedAt',
  offset: (page - 1) * limit,
  fields: config.postListField,
}
if (tagId) {
  queries.filters = `tag[contains]${tagId}`
}

const { data: posts } = await useFetch('/api/postList', { method: 'GET', params: queries })

const numPages = Math.ceil(posts.value.totalCount / limit)

useIndexHead()
</script>

<template>
  <div>
    <div class="mb-2">
      <TagInline :selectedTagId="tagId" />
    </div>
    <div class="post-wrapper">
      <div class="posts">
        <ArticleList :posts="posts.contents" />
      </div>
      <div class="aside">
        <adsbygoogle adSlot="3796995428" />
      </div>
    </div>
    <Pagination :numPages="numPages" :current="page" :tagId="tagId" />
  </div>
</template>

<style scoped lang="scss">
.mb-2 {
  margin-bottom: var(--spacing-6);
}

@media (min-width: 1024px) {
  .post-wrapper {
    display: grid;
    grid-template-columns: 600px 300px;
    -moz-column-gap: 60px;
    column-gap: 60px;
    grid-template-rows: 1fr;
  }
}
</style>
