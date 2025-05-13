<template>
    <p class="text-muted">Nombre total d'articles: {{ articleStore.pagination.total }}</p>
    <div class="list">
        <ArticleCard v-for="article in articleStore.list" :key="article.id" :article="article"
            @deleted="onArticleDeleted" @switch="changeVisibility" />
    </div>
    <PaginationControls :page="articleStore.pagination.page" :pages="articleStore.pagination.pages"
        @change="onPageChange" />
</template>

<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import ArticleCard from './ArticleCard.vue';
import PaginationControls from '../Filter/PaginationControls.vue';

const articleStore = useArticleStore()

function fetchPage(page) {
    const limit = articleStore.pagination.limit
    articleStore.fetchPagination(`?page=${page}&limit=${limit}`)
}

onMounted(() => {
    fetchPage(1)
})

const onPageChange = (page) => {
    fetchPage(page)
}

function onArticleDeleted(id) {
    fetchPage(articleStore.pagination.page)
}

const flashStore = useFlashStore()

function changeVisibility(id) {
    try {
        articleStore.switch(id)
    } catch (error) {
        flashStore.flash(error.message, 'danger')
    }
}
</script>

<style lang="scss" scoped>
.list {
    @include flexbox(space-between, center, $gap: 1rem);
    margin-top: 2rem;

    &>* {
        flex: 0 0 30%;
    }
}
</style>