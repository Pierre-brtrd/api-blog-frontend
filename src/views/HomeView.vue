<template>
  <Banner />
</template>

<script setup>
import Banner from '@/components/Home/Banner.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Page d\'Accueil - Blog API Rest Vue',
  meta: [
    {
      name: 'description',
      content: 'Découvrez le blog API Rest Vue et découvrez les dernières tendances en matière de développement web.'
    },
    {
      name: 'author',
      content: 'Pierre Bertrand'
    }
  ]
})
</script>
