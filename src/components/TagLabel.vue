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
  <NuxtLink :class="`tag-badge ${colorClass}`" :to="getPath(tag.id)">
    {{ tag.name }}<span v-if="count">({{ count }})</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.tag-badge {
  display: inline-block;
  border-radius: 4px;
  text-align: center;
  border: 1px solid var(--c-gray-500);
  padding: 4px 8px;
  cursor: pointer;
  font-size: var(--font-size-xs);
  margin-right: 1rem;
  letter-spacing: 1.5px;

  &:hover {
    opacity: 0.6;
  }
}

.active {
  color: var(--c-white);
  background-color: var(--c-gray-500);
  border: none;
}

.nonActive {
  color: var(--c-gray-700);
  background-color: var(--c-white);
}
</style>
