<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
</script>

<template>
  <ArticleDetail :slug="slug" />
</template>
