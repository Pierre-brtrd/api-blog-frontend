<template>
    <div class="filter-grid">
        <p class="text-muted">Nombre de users total: {{ userStore.pagination.total }}</p>
        <SortFilter :options="sortOptions" v-model="selectedSort" />
    </div>
    <div class="list">
        <SkeletonCard v-if="loading" v-for="n in userStore.pagination.limit" :key="n" :image="false" />
        <UserCard v-for="user in userStore.list" :key="user.id" :user="user" />
    </div>
    <PaginationControls :page="userStore.pagination.page" :pages="userStore.pagination.pages" @change="onPageChange" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserCard from '@/components/User/UserCard.vue'
import PaginationControls from '../Filter/PaginationControls.vue'
import SkeletonCard from '../Common/SkeletonCard.vue'
import SortFilter from '../Filter/SortFilter.vue'

const userStore = useUsersStore()
const loading = ref(true)

const sortOptions = [
    { label: 'Date décroissante', sort: 'createdAt', order: 'DESC' },
    { label: 'Date croissante', sort: 'createdAt', order: 'ASC' },
    { label: 'Prénom de A→Z', sort: 'firstName', order: 'ASC' },
    { label: 'Prénom de Z→A', sort: 'firstName', order: 'DESC' },
    { label: 'Nom de A→Z', sort: 'lastName', order: 'ASC' },
    { label: 'Nom de Z→A', sort: 'lastName', order: 'DESC' },
]

const selectedSort = ref(sortOptions[0])

watch(selectedSort, () => fetchPage(userStore.pagination.page))

function fetchPage(page) {
    loading.value = true
    const limit = userStore.pagination.limit
    const sort = selectedSort.value.sort
    const order = selectedSort.value.order
    const sortQuery = `&sort=${sort}&order=${order}`

    userStore.fetchPagination(`?page=${page}&limit=${limit}&${sortQuery}`)
    loading.value = false
}

onMounted(() => {
    fetchPage(1)
})

const onPageChange = (page) => {
    fetchPage(page)
}
</script>

<style lang="scss" scoped>
.list {
    @include flexbox(space-between, center, $gap: 1rem);
    margin-top: 2rem;

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