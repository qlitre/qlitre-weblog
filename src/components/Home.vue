<script setup lang="ts">
import { BLOG_PER_PAGE, config } from '../settings/siteSettings'
import type { MicroCMSQueries } from 'microcms-js-sdk'

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
      <TagInline :selected-tag-id="tagId" />
    </div>
    <div class="post-wrapper">
      <div class="posts">
        <ArticleList :posts="posts.contents" />
      </div>
      <div class="aside">
        <adsbygoogle ad-slot="3796995428" />
      </div>
    </div>
    <Pagination :num-pages="numPages" :current="page" :tag-id="tagId" />
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
