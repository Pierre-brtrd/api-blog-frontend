<template>
    <header class="navbar">
        <nav class="navbar-content container">
            <RouterLink to="/" class="navbar-logo">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />
            </RouterLink>
            <ul class="navbar-links">
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'articles' }">Articles</RouterLink>
                </li>
            </ul>
            <ul class="navbar-btn">
                <li v-if="isLoggedIn">
                    <RouterLink :to="{ name: 'profile' }" class="btn-primary">
                        <v-icon name="md-accountcircle" />
                        Profile
                    </RouterLink>
                </li>
                <li v-if="isAdmin">
                    <div class="dropdown">
                        <span class="btn-warning">
                            <v-icon name="md-adminpanelsettings" />
                            Admin
                        </span>
                        <ul class="dropdown-content">
                            <li class="dropdown-item">
                                <RouterLink to="/admin/users">Users</RouterLink>
                            </li>
                            <li class="dropdown-item">
                                <RouterLink to="/admin/articles">Articles</RouterLink>
                            </li>
                            <li class="dropdown-item">
                                <RouterLink :to="{ name: 'admin-medias' }">Medias</RouterLink>
                            </li>
                        </ul>
                    </div>

                </li>
                <li v-if="!isLoggedIn">
                    <RouterLink to="/login" class="btn-primary">
                        <v-icon name="md-login-outlined" />
                        Login
                    </RouterLink>
                </li>
                <li v-if="!isLoggedIn">
                    <RouterLink :to="{ name: 'register' }" class="btn-warning">
                        <v-icon name="md-contactpage-sharp" />
                        Signup
                    </RouterLink>
                </li>
                <li v-else>
                    <button class="btn-danger" @click="logout">
                        <v-icon name="md-logout" />
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
const isAdmin = computed(() => {
    return Array.isArray(auth.user?.roles)
        && auth.user.roles.includes('ROLE_ADMIN')
})

function logout() {
    auth.logout()
    router.push('/')
}
</script>