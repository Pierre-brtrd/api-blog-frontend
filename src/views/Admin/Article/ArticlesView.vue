<template>
    <section class="container mt-3">
        <h1 class="text-center">Administration des articles</h1>
        <RouterLink :to="{ name: 'admin-article-create' }" class="btn-primary mb-4 mt-2">Créer un article</RouterLink>
        <ListArticle />
    </section>
</template>

<script setup>
import { provide } from 'vue';
import ListArticle from '@/components/Article/ListArticle.vue';

provide('isAdmin', true);
</script>