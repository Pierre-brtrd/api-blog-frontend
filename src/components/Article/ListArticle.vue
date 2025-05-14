<template>
    <div class="filter-grid">
        <p class="text-muted">Nombre total d'articles: {{ articleStore.pagination.total }}</p>
        <div class="filter-fields">
            <SearchFilter v-model:searchQuery="search" />
            <SortFilter :options="sortOptions" v-model="selectedSort" />
        </div>
    </div>
    <div class="list">
        <SkeletonCard v-if="loading" v-for="n in articleStore.pagination.limit" :key="n" />
        <ArticleCard v-if="!loading" v-for="article in articleStore.list" :key="article.id" :article="article"
            @deleted="onArticleDeleted" @switch="changeVisibility" />
    </div>
    <NotFoundCard v-if="!loading && articleStore.list.length === 0" />
    <PaginationControls :page="articleStore.pagination.page" :pages="articleStore.pagination.pages"
        @change="onPageChange" />
</template>

<script setup>
import { ref, inject, onMounted, watch } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import ArticleCard from './ArticleCard.vue';
import PaginationControls from '@/components/Filter/PaginationControls.vue';
import SkeletonCard from '../Common/SkeletonCard.vue';
import SortFilter from '../Filter/SortFilter.vue';
import SearchFilter from '../Filter/SearchFilter.vue';
import NotFoundCard from '../Common/NotFoundCard.vue';

const isAdmin = inject('isAdmin', false)
const articleStore = useArticleStore()
const loading = ref(true)

const sortOptions = [
    { label: 'Date décroissante', sort: 'createdAt', order: 'DESC' },
    { label: 'Date croissante', sort: 'createdAt', order: 'ASC' },
    { label: 'Titre de A→Z', sort: 'title', order: 'ASC' },
    { label: 'Titre de Z→A', sort: 'title', order: 'DESC' },
]

const selectedSort = ref(sortOptions[0])
const search = ref('')

watch(selectedSort, () => fetchPage(articleStore.pagination.page))
watch(search, () => fetchPage(articleStore.pagination.page))

async function fetchPage(page) {
    loading.value = true

    const limit = articleStore.pagination.limit
    const sort = selectedSort.value.sort
    const order = selectedSort.value.order
    const sortQuery = `sort=${sort}&order=${order}`
    const searchQuery = search.value ? `search=${search.value}` : ''

    if (searchQuery) {
        page = 1
    }

    if (isAdmin) {
        await articleStore.fetchPagination(`?page=${page}&limit=${limit}&${sortQuery}&${searchQuery}`)
    } else {
        await articleStore.fetchAllEnabledPagination(`?page=${page}&limit=${limit}&${sortQuery}&${searchQuery}&enabled=true`)
    }
    loading.value = false
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
    @include grid($columns: repeat(auto-fill, minmax(30%, 1fr)), $gap: 1rem, $align: stretch);
    margin-top: 1rem;
}
</style>