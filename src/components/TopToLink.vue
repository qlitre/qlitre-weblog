<template>
  <div class="center">
    <NuxtLink class="top-to-link" :to="`/`"> 記事一覧へ </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.center {
  margin: 30px 0;
  text-align: center;
}

.top-to-link {
  font-size: var(--font-size-base);
  color: var(--c-black);
  text-decoration: underline;
}

.top-to-link:hover {
  color: var(--c-cyan-700);
}
</style>
