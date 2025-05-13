<template>
    <div class="card">
        <p class="text-primary">{{ user.firstName }} {{ user.lastName }}</p>
        <p><small>{{ user.username }}</small></p>
        <time :datetime="user.createdAt" class="text-muted">{{ formattedCreatedAt }}</time>
        <p class="card-roles">
            <em v-for="role in mapRoles(user.roles)">{{ role }} </em>
        </p>
        <div class="card-btn">
            <RouterLink :to="{ name: 'admin-user-edit', params: { id: user.id } }" class="btn-warning">Modifier
            </RouterLink>
            <RouterLink :to="`/admin/users/${user.id}/delete`" class="btn-danger">Supprimer</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { mapRoles } from '@/utils/roleMap'

const props = defineProps({
    user: {
        type: Object,
        required: true,
    }
})

const formattedCreatedAt = computed(() => {
    const dt = new Date(props.user.createdAt)

    return dt.toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
    })
})
</script>

<style lang="scss" scoped>
.card {
    &-roles {
        @include flexbox($align: center, $gap: .5rem)
    }
}
</style>