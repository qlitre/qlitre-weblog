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
  <div class="wrapper">
    <SearchForm :keyword="query" />
    <div v-if="posts.contents">
      <ArticleList :posts="posts.contents" />
      <Pagination :num-pages="numPages" :current="page" :keyword="query" />
    </div>
    <div v-if="posts.contents.length == 0">
      <h1 class="no-result">お探しの記事は見つかりませんでした。</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding-top: 112px;
  position: relative;
  width: 960px;
  margin: 0 auto 0;
}

.no-result {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 30px;
}

@media (max-width: 1024px) {
  .wrapper {
    max-width: 600px;
    position: relative;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-right: auto;
    margin-left: auto;
  }
}

.search-form {
  margin-top: 2rem;
  position: relative;
  margin-bottom: 2rem;
}

input[type='text'] {
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  height: 30px;
  font-size: 16px;
  padding-left: 10px;
  box-shadow: none;
  transition: box-shadow 0.2s ease;
}

input[type='text']:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
