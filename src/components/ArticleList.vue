<script setup lang="ts">
import type { Post } from '../types/blog'

type Props = {
  posts: Post[]
}

const { posts } = defineProps<Props>()
</script>

<template>
  <div>
    <article v-for="post in posts" :key="post.id" class="mb-12 w-full">
      <NuxtLink :to="`/${post.id}`">
        <h1 class="text-lg leading-[1.8] font-bold text-black hover:underline hover:opacity-50">
          {{ post.title }}
        </h1>
      </NuxtLink>
      <p class="mt-4 text-sm text-gray-700">
        <span> 公開日：{{ $formatDate(post.publishedAt) }} </span>
        <span class="ml-4"> 更新日：{{ $formatDate(post.revisedAt) }} </span>
      </p>
      <p class="mt-4 text-sm leading-[1.8] text-gray-700">{{ post.description }}</p>
      <TagLabel
        v-for="tag in post.tag"
        :key="tag.id"
        :tag="tag"
        :color-class="`nonActive`"
        class="mt-4"
      ></TagLabel>
    </article>
  </div>
</template>
