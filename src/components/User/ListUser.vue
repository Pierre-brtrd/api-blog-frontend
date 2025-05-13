<template>
    <p class="text-muted">Nombre de users total: {{ userStore.pagination.total }}</p>
    <div class="list">
        <UserCard v-for="user in userStore.list" :key="user.id" :user="user" />
    </div>
    <PaginationControls :page="userStore.pagination.page" :pages="userStore.pagination.pages" @change="onPageChange" />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserCard from '@/components/User/UserCard.vue'
import PaginationControls from '../Filter/PaginationControls.vue'

const userStore = useUsersStore()

onMounted(() => {
    userStore.fetchPagination(`?page=1&limit=${userStore.pagination.limit}`)
})

const onPageChange = (page) => {
    userStore.fetchPagination(`?page=${page}&limit=${userStore.pagination.limit}`)
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