<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Index</RouterLink>
      <RouterLink to="/combat">Combat</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
