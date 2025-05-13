import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: '',
    }),
    persist: true,
    actions: {
        async login(username, password) {
            const { token } = await apiFetch('/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });
            this.token = token;
            this.user = await apiFetch('/profile');
        },
        logout() {
            this.token = '';
            this.user = null;
        }
    }
});