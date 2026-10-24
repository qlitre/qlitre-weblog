<script setup lang="ts">
import type { Tag } from '../types/blog'

type Props = {
  tag: Tag
  colorClass: 'active' | 'nonActive'
  isInline?: boolean
  count?: number
}
const { tag, colorClass, isInline, count } = defineProps<Props>()

function getPath(tagId: string) {
  if (colorClass == 'active' && isInline) return '/'
  return `/tags/${tagId}/page/1`
}
</script>

<template>
  <NuxtLink
    class="mr-4 inline-block cursor-pointer rounded-sm px-2 py-1 text-center text-xs tracking-[1.5px] hover:opacity-60"
    :class="
      colorClass == 'active'
        ? 'bg-gray-500 text-white'
        : 'border border-gray-500 bg-white text-gray-700'
    "
    :to="getPath(tag.id)"
  >
    {{ tag.name }}<span v-if="count">({{ count }})</span>
  </NuxtLink>
</template>
