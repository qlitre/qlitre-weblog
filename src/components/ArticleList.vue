<script setup lang="ts">
import type { Post } from '../types/blog'

type Props = {
  posts: Post[]
}

const { posts } = defineProps<Props>()
</script>

<template>
  <div>
    <article v-for="post in posts" :key="post.id" class="article">
      <NuxtLink :to="`/${post.id}`">
        <h1 class="title">
          {{ post.title }}
        </h1>
      </NuxtLink>
      <p class="date">
        <span class="published"> 公開日：{{ $formatDate(post.publishedAt) }} </span>
        <span class="revised"> 更新日：{{ $formatDate(post.revisedAt) }} </span>
      </p>
      <p class="description">{{ post.description }}</p>
      <TagLabel
        v-for="tag in post.tag"
        :key="tag.id"
        :tag="tag"
        :color-class="`nonActive`"
        class="tag"
      ></TagLabel>
    </article>
  </div>
</template>
<style scoped lang="scss">
.article {
  margin-bottom: 3rem;
  width: 100%;
  align-items: center;
}

.date {
  margin-top: 1rem;
  font-size: var(--font-size-sm);
  color: var(--c-gray-700);
}

.revised {
  margin-left: 1rem;
}

.title {
  font-size: var(--font-size-lg);
  color: var(--c-black);
  line-height: 1.8;
  font-weight: bold;

  &:hover {
    opacity: 0.5;
    text-decoration: underline;
  }
}

.description {
  margin-top: 1rem;
  font-size: var(--font-size-sm);
  color: var(--c-gray-700);
  line-height: 1.8;
}

.post-link:hover {
  opacity: 0.8;
  text-decoration: underline var(--c-gray-700);
}

.tag {
  margin-top: 1rem;
}
</style>
