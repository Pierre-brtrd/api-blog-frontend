import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useUsersStore = defineStore('users', {
    state: () => ({ list: [] }),
    actions: {
        async fetchAll() {
            this.list = await apiFetch('/admin/users')
        }
    }
})
