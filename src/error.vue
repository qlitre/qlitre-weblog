<script setup lang="ts">
const error = useError()
</script>

<template>
  <TheHeader />
  <div class="relative mx-auto w-[960px] pt-28">
    <h1 class="mb-[30px] text-center text-[2.4rem] font-bold">{{ error.message }}</h1>
    <TopToLink />
  </div>
  <TheFooter />
</template>
