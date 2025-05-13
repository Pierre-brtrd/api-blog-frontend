import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useUsersStore = defineStore('users', {
    state: () => ({
        list: [],
        user: null,
        pagination: { total: 0, limit: 6, page: 1, pages: 1 }
    }),
    actions: {
        async fetchAll() {
            this.list = await apiFetch('/admin/users')
        },
        async fetchPagination(filters) {
            const { items, meta } = await apiFetch(`/admin/users${filters}`)

            this.list = items
            this.pagination = meta
        },
        async fetch(id) {
            this.user = await apiFetch(`/admin/users/${id}`)
        },
        async update(id, user) {
            await apiFetch(`/admin/users/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(user),
            })
        },
        async delete(id) {
            await apiFetch(`/admin/users/${id}`, {
                method: 'DELETE',
            })

            this.list = this.list.filter(u => u.id !== id)

            if (this.user?.id === id) {
                this.user = null
            }
        }
    }
})
