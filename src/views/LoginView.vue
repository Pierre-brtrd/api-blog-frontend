<script setup>
import FormLogin from '../components/User/FormLogin.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const error = ref('')

async function handleLogin({ username, password }) {
    error.value = ''
    try {
        await auth.login(username, password)
        router.push('/home')
    } catch (err) {
        error.value = err.message || 'Identifiants invalides'
    }
}
</script>

<template>
    <section class="container mt-3">
        <h1 class="text-center">Page de connexion</h1>
        <FormLogin @submit="handleLogin" :error="error" />
    </section>
</template>
