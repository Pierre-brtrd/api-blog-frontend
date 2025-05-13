import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useUsersStore = defineStore('users', {
    state: () => ({ list: [], user: null }),
    actions: {
        async fetchAll() {
            this.list = await apiFetch('/admin/users')
        },
        async fetch(id) {
            this.user = await apiFetch(`/admin/users/${id}`)
        },
        async update(id, user) {
            await apiFetch(`/admin/users/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(user),
            })
        }
    }
})
