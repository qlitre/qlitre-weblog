<script setup lang="ts">
import type { Tag, TagList } from '../types/blog'
import type { MicroCMSQueries } from 'microcms-js-sdk'

type Props = {
  selectedTagId?: string
}

const { selectedTagId } = defineProps<Props>()
const { data: tags } = await useFetch<TagList>('/api/tagList')

const tagList = tags.value.contents
// 選択中のタグがある場合先頭にもってくる
if (selectedTagId) {
  tagList.sort((first: Tag, second: Tag) => {
    if (first.id == selectedTagId) {
      return -1
    } else if (second.id == selectedTagId) {
      return 1
    } else {
      return 0
    }
  })
}

const queries: MicroCMSQueries = {
  limit: 50,
  fields: 'tag',
}

const countData: Record<string, number> = {}

const { data: posts } = await useFetch('/api/postList', { params: queries })
for (const post of posts.value.contents) {
  for (const tag of post.tag) {
    if (countData[tag.id] == undefined) countData[tag.id] = 0
    countData[tag.id]++
  }
}

const totalCount = posts.value.totalCount
const cnt = Math.ceil(totalCount / 50)
for (let i = 1; i < cnt; i++) {
  queries.offset = i * 50
  const { data: posts } = await useFetch('/api/postList', { params: queries })
  for (const post of posts.value.contents) {
    for (const tag of post.tag) {
      if (countData[tag.id] == undefined) countData[tag.id] = 0
      countData[tag.id]++
    }
  }
}

function getClass(tagId: string) {
  if (tagId == selectedTagId) return 'active'
  return 'nonActive'
}
</script>

<template>
  <div class="inline">
    <span v-for="tag in tagList" :key="tag.id">
      <TagLabel
        :tag="tag"
        :is-inline="true"
        :color-class="getClass(tag.id)"
        :count="countData[tag.id]"
      />
    </span>
  </div>
</template>

<style scoped lang="scss">
.inline {
  margin-bottom: var(--spacing-4);
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: var(--spacing-2);
  scrollbar-width: thin;
  scrollbar-color: var(--c-gray-300) var(--c-white);
}

.inline::-webkit-scrollbar {
  width: 2px;
}

.inline::-webkit-scrollbar-track {
  background: var(--c-white);
  border: none;
  border-radius: var(--radius-sm);
  box-shadow: inset 0 0 2px #777;
}

.inline::-webkit-scrollbar-thumb {
  background: var(--c-gray-300);
  border-radius: var(--radius-sm);
  box-shadow: none;
}
</style>
