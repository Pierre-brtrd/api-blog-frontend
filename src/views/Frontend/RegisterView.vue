<template>
    <section class="container mt-3">
        <h1 class="title text-center">Page d'inscription</h1>
        <hr class="separator-secondary w-10 mx-auto " />
        <FormUser @submit="handleRegister" :isNew="true" />
    </section>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { useUsersStore } from '@/stores/users';
import { useFlashStore } from '@/stores/flash';
import { useRouter } from 'vue-router';
import FormUser from '@/components/User/FormUser.vue';

useHead({
    title: 'Page d\'inscription - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Inscrivez-vous pour créer un compte et accéder à toutes les fonctionnalités du blog API Rest Vue.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
})

const usersStore = useUsersStore()
const flashStore = useFlashStore()
const router = useRouter()

async function handleRegister(payload) {
    try {
        await usersStore.create(payload)
        flashStore.flash('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'success')
        router.push({ name: 'login' })
    } catch (err) {
        flashStore.flash(err, 'danger')
    }
}
</script>