<template>
    <section v-if="user" class="container mt-3">
        <h1 class="title text-center">Modification de {{ user?.fullName }}</h1>
        <hr class="separator-secondary w-30 mx-auto" />
        <FormUser :user="user" :is-new="false" :is-admin="true" @submit="handleUpdate" />
        <BackToList :to="{ name: 'admin-users' }" />
    </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { useFlashStore } from '@/stores/flash'
import FormUser from '@/components/User/FormUser.vue'
import BackToList from '@/components/Common/BackToList.vue'
import { useHead } from '@vueuse/head'

useHead({
    title: 'Modification d\'un utilisateur - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Modifiez les informations d\'un utilisateur sur le blog API Rest Vue.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
})

const userStore = useUsersStore()
const flashStore = useFlashStore()
const router = useRouter()

const { id } = defineProps({ id: String })

onMounted(async () => {
    try {
        await userStore.fetch(id)

        if (!userStore.user) {
            throw new Error('Utilisateur non trouvé')
        }
    } catch (err) {
        flashStore.flash(err, 'danger')

        return router.replace({ name: 'admin-users' })
    }
})

const user = computed(() => userStore.user)

async function handleUpdate(payload) {
    try {
        await userStore.update(id, payload)
        flashStore.flash('Utilisateur mis à jour avec succès', 'success')
        router.push({ name: 'admin-users' })
    } catch (err) {
        flashStore.flash(err.message, 'error')
    }
}
</script>