<template>
    <section v-if="props.article" class="banner" :style="{
        background: imageSrc
            ? `url(${imageSrc}) no-repeat center center/cover`
            : 'none'
    }">
        <div class="banner-content">
            <h1 class="banner-title">{{ props.article.title }}</h1>
            <p>{{ props.article.shortContent }}</p>
            <button @click="scrollToContent" class="btn-primary">
                Lire l’article
            </button>
        </div>
    </section>
</template>

<script setup>
import { computed, nextTick } from 'vue'

const props = defineProps({
    article: { type: Object, required: true },
})

const BASE_IMAGE_URL = import.meta.env.VITE_API_UPLOAD_IMAGE_URL

const imageSrc = computed(() => {
    return props.article.imageName
        ? `${BASE_IMAGE_URL}/articles/${props.article.imageName}`
        : null
})

function scrollToContent() {
    nextTick(() => {
        const el = document.getElementById('article-content')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    })
}
</script>
