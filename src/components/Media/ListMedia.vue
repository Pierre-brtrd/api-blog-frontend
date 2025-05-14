<template>
    <div class="filter-grid">
        <p class="text-muted">Nombre total d'images: {{ mediaStore.pagination.total }}</p>
    </div>

    <div class="list">
        <SkeletonCard v-if="loading" v-for="n in mediaStore.pagination.limit" :key="n" />
        <MediaCard v-if="!loading" v-for="media in mediaStore.list" :key="media.id" :media="media"
            @deleted="onMediaDeleted" />
    </div>
    <NotFoundCard v-if="!loading && mediaStore.list.length === 0" />
    <PaginationControls :page="mediaStore.pagination.page" :pages="mediaStore.pagination.pages"
        @change="onPageChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMediaStore } from '@/stores/media';
import SkeletonCard from '../Common/SkeletonCard.vue';
import NotFoundCard from '../Common/NotFoundCard.vue';
import PaginationControls from '../Filter/PaginationControls.vue';
import MediaCard from './MediaCard.vue';
import { useHead } from '@vueuse/head';

useHead({
    title: 'Administration des médias - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Gérez vos médias sur le blog API Rest Vue et partagez vos idées avec le monde.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
});


const mediaStore = useMediaStore();
const loading = ref(true);

async function fetchMedia(page) {
    loading.value = true;

    const limit = mediaStore.pagination.limit;
    await mediaStore.fetchPagination(`?page=${page}&limit=${limit}`);

    loading.value = false;
}

onMounted(() => {
    fetchMedia(1);
});

const onPageChange = (page) => {
    fetchMedia(page)
}

function onMediaDeleted(id) {
    fetchMedia(mediaStore.pagination.page)
}
</script>

<style lang="scss" scoped>
.list {
    @include grid($columns: repeat(auto-fill, minmax(20%, 1fr)), $gap: 1rem, $align: stretch);
    margin-top: 1rem;
}
</style>