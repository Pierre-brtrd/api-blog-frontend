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
import { inject, onMounted } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import ArticleCard from './ArticleCard.vue';
import PaginationControls from '../Filter/PaginationControls.vue';

const articleStore = useArticleStore()

const isAdmin = inject('isAdmin', false)

function fetchPage(page) {
    const limit = articleStore.pagination.limit
    if (isAdmin) {
        articleStore.fetchPagination(`?page=${page}&limit=${limit}`)
    } else {
        articleStore.fetchAllEnabledPagination(`?page=${page}&limit=${limit}&enabled=true`)
    }
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
    if (isAdmin) {
        return;
    }

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