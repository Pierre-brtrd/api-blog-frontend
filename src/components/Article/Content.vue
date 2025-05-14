<template>
    <section id="article-content" class="container mt-5">
        <h2 class="title">{{ article.title }}</h2>
        <hr class="separator-secondary" />
        <div class="markdown-body article-content" v-html="sanitizedFullHtml"></div>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const props = defineProps({
    article: { type: Object, required: true },
})

const md = new MarkdownIt({
    html: true,  // autorise le HTML « inline » dans le Markdown
    linkify: true,  // transforme automatiquement les URL en <a>
    typographer: true,  // ligatures, etc.
})

const rawShortHtml = computed(() =>
    props.article.shortContent
        ? md.render(props.article.shortContent)
        : ''
)
const rawFullHtml = computed(() =>
    md.render(props.article.content || '')
)

const sanitizedShortHtml = computed(() =>
    DOMPurify.sanitize(rawShortHtml.value)
)
const sanitizedFullHtml = computed(() =>
    DOMPurify.sanitize(rawFullHtml.value)
)
</script>
<style lang="scss" scoped>
.article-content {
    background: transparent;

    img {
        max-width: 100%;
        height: auto;
    }
}
</style>