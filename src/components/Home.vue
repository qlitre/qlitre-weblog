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
    <div class="mb-6">
      <TagInline :selected-tag-id="tagId" />
    </div>
    <div class="lg:grid lg:grid-cols-[600px_300px] lg:grid-rows-1 lg:gap-x-[60px]">
      <div>
        <ArticleList :posts="posts.contents" />
      </div>
      <div>
        <adsbygoogle ad-slot="3796995428" />
      </div>
    </div>
    <Pagination :num-pages="numPages" :current="page" :tag-id="tagId" />
  </div>
</template>
