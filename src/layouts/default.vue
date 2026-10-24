<template>
  <div>
    <TheHeader />
    <div class="container">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.container {
  margin-top: var(--spacing-16);
  margin-bottom: var(--spacing-16);
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}
</style>
