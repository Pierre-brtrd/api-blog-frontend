<template>
    <section class="container mt-3">
        <h1 class="title">Administration des articles</h1>
        <hr class="separator-secondary">
        <RouterLink :to="{ name: 'admin-article-create' }" class="btn-primary mb-4 mt-2">
            <v-icon name="md-createnewfolder-round" />
            Créer un article
        </RouterLink>
        <ListArticle />
    </section>
</template>

<script setup>
import { provide } from 'vue';
import ListArticle from '@/components/Article/ListArticle.vue';
import { useHead } from '@vueuse/head';

useHead({
    title: 'Administration des articles - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Gérez vos articles sur le blog API Rest Vue et partagez vos idées avec le monde.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
});

provide('isAdmin', true);
</script>