<script setup lang="ts">
import { getToc } from '../libs/cheerio-utils'
import { config } from '../settings/siteSettings'

type Props = {
  slug: string
  draftKey?: string
}

const { slug, draftKey } = defineProps<Props>()

const params = {
  slug: slug,
  draftKey: draftKey,
  fields: config.postDetailField,
}

const { data: article } = await useFetch('/api/postDetail', { params: params })

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

let body = ''
if (article.value.useRepeatBody) {
  const arr = article.value.repeated
  arr.forEach((elm, index) => {
    if (elm.fieldId == 'richEditor') {
      body += elm.body
    }
  })
} else {
  body = article.value.text
}

const toc = getToc(body)

useDetailHead(article.value)
</script>

<template>
  <div>
    <div class="article-header">
      <TagLabel
        v-for="tag in article.tag"
        :key="tag.id"
        :tag="tag"
        :color-class="`nonActive`"
      ></TagLabel>
      <h1 class="title">
        {{ article.title }}
      </h1>
      <p class="date">
        <span class="published"> 公開日：{{ $formatDate(article.publishedAt) }} </span>
        <span class="revised"> 更新日：{{ $formatDate(article.revisedAt) }} </span>
      </p>
    </div>
    <div class="post-wrapper">
      <div class="posts">
        <div v-if="article.useRepeatBody">
          <RepeatedBody :repeated-body="article.repeated" />
        </div>
        <div v-if="!article.useRepeatBody">
          <MarkdownBody :body="article.text" />
        </div>
      </div>
      <div class="aside">
        <Toc :toc="toc" />
      </div>
    </div>
    <Share :id="article.id" :title="article.title" />
    <TopToLink />
  </div>
</template>

<style scoped lang="scss">
.article-header {
  padding-bottom: 30px;
  margin-bottom: var(--spacing-8);
}

.post-wrapper {
  padding-bottom: var(--spacing-8);
}

@media (max-width: 1024px) {
  .post-wrapper {
    display: flex;
    flex-direction: column-reverse;
    gap: 30px;
  }
}

@media (min-width: 1024px) {
  .post-wrapper {
    display: grid;
    grid-template-columns: 600px 300px;
    -moz-column-gap: 30px;
    column-gap: 30px;
    grid-template-rows: 1fr;
  }
}

.date {
  margin-top: var(--spacing-8);
  font-size: var(--font-size-base);
  color: var(--c-gray-700);
}

.revised {
  margin-left: var(--spacing-2);
}

.title {
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xl);
  color: var(--c-black);
  line-height: 1.6;
  font-weight: bold;
}
</style>
