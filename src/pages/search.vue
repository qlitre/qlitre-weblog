<script setup lang="ts">
import { BLOG_PER_PAGE } from '../settings/siteSettings'
import type { MicroCMSQueries } from 'microcms-js-sdk'

const limit = BLOG_PER_PAGE
const route = useRoute()
const page = Number(route.query.page || 1)
const query = String(route.query.q)
const params: MicroCMSQueries = {
  q: query,
  limit: limit,
  offset: (page - 1) * limit,
  orders: '-publishedAt',
  fields: 'id,title,description,tag,publishedAt,revisedAt',
}

const { data: posts } = await useFetch('/api/postList', { params: params })

const numPages = Math.ceil(posts.value.totalCount / limit)

// queryが変化した場合にページをリロードする
watch(
  () => route.query,
  () => location.reload()
)
</script>

<template>
  <div class="relative mx-auto w-[960px] pt-28 max-lg:w-full max-lg:max-w-[600px] max-lg:px-4">
    <SearchForm class="relative my-8" :keyword="query" />
    <div v-if="posts.contents">
      <ArticleList :posts="posts.contents" />
      <Pagination class="pt-28" :num-pages="numPages" :current="page" :keyword="query" />
    </div>
    <div v-if="posts.contents.length == 0">
      <h1 class="mb-[30px] text-center text-[2.4rem] font-bold">
        お探しの記事は見つかりませんでした。
      </h1>
    </div>
  </div>
</template>
