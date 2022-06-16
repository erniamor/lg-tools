<script setup lang="ts">

</script>

<template>
  <header>
    <RouterLink to="/">
      <div class="top">LG</div>
      <div class="bottom">TOOLS</div>
    </RouterLink>
  </header>
</template>

<style scoped>
header {
  padding: 10px;
  text-align: center;
}

header a {
  text-decoration: none;
  color: var(--color-text);
}

.top {
  font-size: 3em;
  line-height: 1em;
}

.bottom {
  font-size: 1em;
}
</style>