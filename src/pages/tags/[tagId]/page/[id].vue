<script setup lang="ts">
const route = useRoute()
const page = Number(route.params.id || 1)
const tagId = String(route.params.tagId == undefined ? '' : route.params.tagId)
</script>

<template>
  <Home :page="page" :tag-id="tagId" />
</template>
