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
  arr.forEach((elm) => {
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
    <div class="mb-8 pb-[30px]">
      <TagLabel
        v-for="tag in article.tag"
        :key="tag.id"
        :tag="tag"
        :color-class="`nonActive`"
      ></TagLabel>
      <h1 class="mt-2 text-xl leading-[1.6] font-bold text-black">
        {{ article.title }}
      </h1>
      <p class="mt-8 text-base text-gray-700">
        <span> 公開日：{{ $formatDate(article.publishedAt) }} </span>
        <span class="ml-2"> 更新日：{{ $formatDate(article.revisedAt) }} </span>
      </p>
    </div>
    <div
      class="flex flex-col-reverse gap-[30px] pb-8 lg:grid lg:grid-cols-[600px_300px] lg:grid-rows-1"
    >
      <div>
        <div v-if="article.useRepeatBody">
          <RepeatedBody :repeated-body="article.repeated" />
        </div>
        <div v-if="!article.useRepeatBody">
          <MarkdownBody :body="article.text" />
        </div>
      </div>
      <div>
        <Toc :toc="toc" />
      </div>
    </div>
    <Share :id="article.id" :title="article.title" />
    <TopToLink />
  </div>
</template>
