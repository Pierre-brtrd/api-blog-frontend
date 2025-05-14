<template>
    <section id="article-content" class="container mt-5">
        <h2 class="title">{{ article.title }}</h2>
        <hr class="separator-secondary" />
        <div class="markdown-body article-content ck-content" v-html="sanitizedFullHtml"></div>
    </section>
</template>

<script setup>
import 'ckeditor5/ckeditor5.css';
import 'highlight.js/styles/atom-one-dark.css'

import { computed, onMounted, nextTick } from 'vue'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'

const props = defineProps({
    article: { type: Object, required: true },
})

const rawFullHtml = computed(() =>
    props.article.content || ''
)

const sanitizedFullHtml = computed(() =>
    DOMPurify.sanitize(rawFullHtml.value)
)

onMounted(async () => {
    // wait for DOM update
    await nextTick()
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block)
    })
})

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

<style>
.ck-content pre {
    padding: var(--base-size-16) !important;
    overflow: auto !important;
    font-size: 85% !important;
    line-height: 1.45 !important;
    color: var(--fgColor-default) !important;
    background-color: var(--bgColor-muted) !important;
    border-radius: 6px !important;
}
</style>