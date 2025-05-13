<template>
    <form class="form card mt-3 w-50 center" @submit.prevent="onSubmit">
        <div class="alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div class="field">
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" placeholder="JohnDoe" required>
        </div>
        <div class="field">
            <label for="password">Mot de passe</label>
            <input type="password" v-model="password" id="password" placeholder="S3CR3T" required
                autocomplete="current-password">
        </div>
        <button class="btn-primary" :disabled="loading">
            {{ loading ? 'Connexion..' : 'Se connecter' }}
        </button>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['submit']);

const loading = ref(false)
const username = ref('')
const password = ref('')

const props = defineProps({
    error: { type: String, default: '' }
})

function onSubmit() {
    loading.value = true

    try {
        emit('submit', { username: username.value, password: password.value })
    } finally {
        loading.value = false
    }
}
</script>