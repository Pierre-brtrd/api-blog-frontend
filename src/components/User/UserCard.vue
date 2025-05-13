<template>
    <div class="card">
        <div class="card-body">
            <h2 class="text-primary">{{ user.firstName }} {{ user.lastName }}</h2>
            <p><small>{{ user.username }}</small></p>
            <time :datetime="user.createdAt" class="text-muted">{{ formattedCreatedAt }}</time>
            <p class="card-roles">
                <em v-for="role in mapRoles(user.roles)">{{ role }} </em>
            </p>
            <div class="card-btn">
                <RouterLink :to="{ name: 'admin-user-edit', params: { id: user.id } }" class="btn-warning">
                    Modifier
                </RouterLink>
                <button class="btn-danger" @click="showConfirm = true" :disabled="deleting">
                    {{ deleting ? 'Suppression…' : 'Supprimer' }}
                </button>
            </div>
            <ConfirmModal :visible="showConfirm" @confirm="onConfirmDelete" @cancel="showConfirm = false">
                <template #title>Supprimer cet utilisateur ?</template>
                <template #message>
                    Cette action est irréversible. Voulez-vous vraiment supprimer
                    <strong>{{ user.firstName }} {{ user.lastName }}</strong> ?
                </template>
            </ConfirmModal>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mapRoles } from '@/utils/roleMap'
import { useUsersStore } from '@/stores/users'
import { useFlashStore } from '@/stores/flash'
import ConfirmModal from '@/components/Layout/ConfirmModal.vue'

const usersStore = useUsersStore()
const flashStore = useFlashStore()

const deleting = ref(false)
const showConfirm = ref(false)

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

async function onConfirmDelete() {
    deleting.value = true
    try {
        await usersStore.delete(props.user.id)
        flashStore.flash('Utilisateur supprimé avec succès', 'success')
    } catch (err) {
        flashStore.flash(err.message || 'Erreur lors de la suppression', 'error')
    } finally {
        showConfirm.value = false
        deleting.value = false
    }
}
</script>

<style lang="scss" scoped>
.card {
    &-roles {
        @include flexbox($align: center, $gap: .5rem)
    }
}
</style>