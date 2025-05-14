<template>
    <section class="container mt-3">
        <h1 class="title">Liste des utilisateurs</h1>
        <hr class="separator-secondary">
        <ListUser />
    </section>
</template>

<script setup>
import ListUser from '@/components/User/ListUser.vue'
import { useHead } from '@vueuse/head'

useHead({
    title: 'Liste des utilisateurs - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Découvrez la liste des utilisateurs sur le blog API Rest Vue.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
})
</script>