<template>
    <section class="container mt-3">
        <h1 class="text-center">Découvrez nos articles</h1>
        <ListArticle />
    </section>
</template>

<script setup>
import { provide } from 'vue'
import ListArticle from '@/components/Article/ListArticle.vue'
provide('isAdmin', false)
</script>