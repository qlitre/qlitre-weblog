<script setup lang="ts">
type Toc = {
  id: string
  name: string
  text: string
}
type Props = {
  toc: Toc[]
}
const { toc } = defineProps<Props>()
</script>

<template>
  <ul class="toc">
    <li :class="`list ${item.name}`" v-for="item in toc" :key="item.id">
      <a :href="`#${item.id}`">
        {{ item.text }}
      </a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.toc {
  padding: var(--spacing-4);
  padding-right: 0;
  font-size: var(--font-size-xs);
  line-height: 1.8;
  border: var(--border-1);
  border-color: var(--c-teal-400);
}

@media (min-width: 1024px) {
  .toc {
    position: sticky;
    top: 100px;
    margin-left: var(--spacing-8);
  }
}

@media (max-width: 1024px) {
  .toc {
    margin: var(--spacing-4) 0;
  }
}

.toc:deep(li) {
  margin-top: 0.5rem;
  list-style-type: none;
}

.h1 {
  margin-left: 0.5rem;
}

.h2 {
  margin-left: 1rem;
}

.h3 {
  margin-left: 2rem;
}

.list:deep(a) {
  color: var(--c-gray-700);
}

.list:deep(a):hover {
  color: var(--c-teal-400);
  opacity: 0.9;
}
</style>
