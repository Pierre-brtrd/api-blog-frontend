<template>
    <header class="navbar">
        <nav class="navbar-content container">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />
            <ul class="navbar-links">
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
            </ul>
            <ul class="navbar-btn">
                <li v-if="!isLoggedIn">
                    <RouterLink to="/login" class="btn-primary">Login</RouterLink>
                </li>
                <li v-else>
                    <button class="btn-primary" @click="logout">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const isLoggedIn = computed(() => Boolean(auth.token))

function logout() {
    auth.logout()
    router.push('/')
}
</script>