<template>
    <div class="list">
        <UserCard v-for="user in userStore.list" :key="user.id" :user="user" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserCard from '@/components/User/UserCard.vue'

const userStore = useUsersStore()

onMounted(() => {
    userStore.fetchAll()
})
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