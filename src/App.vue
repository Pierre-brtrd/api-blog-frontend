<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Layout/Header.vue'
import Flash from '@/components/Layout/flash.vue'
</script>

<template>
  <Header />
  <main>
    <Flash />
    <RouterView />
  </main>
</template>
