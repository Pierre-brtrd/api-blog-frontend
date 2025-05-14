<template>
    <div class="filter-grid">
        <p class="text-muted">Nombre total d'articles: {{ articleStore.pagination.total }}</p>
        <SortFilter :options="sortOptions" v-model="selectedSort" />
    </div>
    <div class="list">
        <SkeletonCard v-if="loading" v-for="n in articleStore.pagination.limit" :key="n" />
        <ArticleCard v-for="article in articleStore.list" :key="article.id" :article="article"
            @deleted="onArticleDeleted" @switch="changeVisibility" />
    </div>
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

watch(selectedSort, () => fetchPage(articleStore.pagination.page))

function fetchPage(page) {
    loading.value = true
    const limit = articleStore.pagination.limit
    const sort = selectedSort.value.sort
    const order = selectedSort.value.order
    const sortQuery = `&sort=${sort}&order=${order}`

    if (isAdmin) {
        articleStore.fetchPagination(`?page=${page}&limit=${limit}&${sortQuery}`)
    } else {
        articleStore.fetchAllEnabledPagination(`?page=${page}&limit=${limit}&${sortQuery}&enabled=true`)
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
    @include flexbox(space-between, center, $gap: 1rem);
    margin-top: 1rem;

    &>* {
        flex: 0 0 30%;

        @for $i from 1 through 6 {
            & :nth-child(#{$i}) {
                --stagger-delay: #{($i - 1) * 100}ms;
            }
        }
    }
}
</style>