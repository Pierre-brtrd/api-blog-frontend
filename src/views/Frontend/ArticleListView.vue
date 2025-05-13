<template>
    <section class="container mt-3">
        <h1 class="text-center">Découvrez nos articles</h1>
        <ListArticle />
    </section>
</template>

<script setup>
import { provide } from 'vue'
import ListArticle from '@/components/Article/ListArticle.vue'
import { useHead } from '@vueuse/head'

provide('isAdmin', false)

useHead({
    title: 'Liste des articles - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Découvrez notre liste d\'articles sur le développement web et les dernières tendances en matière de technologie.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
})
</script>