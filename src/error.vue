<script setup lang="ts">
const error = useError()
</script>

<template>
  <TheHeader />
  <div class="wrapper">
    <h1>{{ error.message }}</h1>
    <TopToLink />
  </div>
  <TheFooter />
</template>
<style scoped lang="scss">
.wrapper {
  padding-top: 112px;
  position: relative;
  width: 960px;
  margin: 0 auto 0;
}

h1 {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 30px;
}
</style>
