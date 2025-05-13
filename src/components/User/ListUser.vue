<template>
    <p class="text-muted">Nombre de users total: {{ userStore.pagination.total }}</p>
    <div class="list">
        <SkeletonCard v-if="loading" v-for="n in userStore.pagination.limit" :key="n" :image="false" />
        <UserCard v-for="user in userStore.list" :key="user.id" :user="user" />
    </div>
    <PaginationControls :page="userStore.pagination.page" :pages="userStore.pagination.pages" @change="onPageChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserCard from '@/components/User/UserCard.vue'
import PaginationControls from '../Filter/PaginationControls.vue'
import SkeletonCard from '../Common/SkeletonCard.vue'

const userStore = useUsersStore()
const loading = ref(true)

onMounted(() => {
    loading.value = true
    userStore.fetchPagination(`?page=1&limit=${userStore.pagination.limit}`)
    loading.value = false
})

const onPageChange = (page) => {
    loading.value = true
    userStore.fetchPagination(`?page=${page}&limit=${userStore.pagination.limit}`)
    loading.value = false
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