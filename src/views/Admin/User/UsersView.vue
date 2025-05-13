<template>
    <section class="container mt-3">
        <h1 class="text-center">Liste des utilisateurs</h1>
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