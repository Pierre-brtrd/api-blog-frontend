<template>
    <div>
        <Banner v-if="article" :article="article" />
        <Content v-if="article" :article="article" />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useArticleStore } from '@/stores/articles'
import { useFlashStore } from '@/stores/flash'
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import Banner from '@/components/Article/Banner.vue'
import Content from '@/components/Article/Content.vue'

const articleStore = useArticleStore()
const flashStore = useFlashStore()
const router = useRouter()

const { slug } = defineProps({
    slug: { type: String, required: true }
})

onMounted(async () => {
    try {
        await articleStore.fetchBySlug(slug)
        if (!articleStore.article) {
            throw new Error('Article non trouvé')
        }
    } catch (err) {
        flashStore.flash(err, 'danger')
        return router.replace({ name: 'articles' })
    }
})

const article = computed(() => {
    return articleStore.article
})

useHead({
    title: computed(() => articleStore.article?.title || 'Titre de l\'article'),
    meta: [
        {
            name: 'description',
            content: computed(() => articleStore.article?.shortContent || 'Détails de l\'article'),
        },
    ],
})
</script>