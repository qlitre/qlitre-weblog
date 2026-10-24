<script setup lang="ts">
const route = useRoute()

const slug = String(route.query.id)
const draftKey = String(route.query.draftKey)
</script>

<template>
  <ArticleDetail :slug="slug" :draftKey="draftKey" />
</template>
