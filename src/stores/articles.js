import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useArticleStore = defineStore('articles', {
    state: () => ({
        list: [],
        pagination: { page: 1, total: 0, pages: 0, limit: 6 },
    }),
    actions: {
        async fetchAll() {
            this.list = await apiFetch('/admin/articles')
        },
        async fetchPagination(filters) {
            const { items, meta } = await apiFetch(`/admin/articles${filters}`)

            this.list = items
            this.pagination = meta
        },
        async create(data) {
            await apiFetch('/admin/articles', {
                method: 'POST',
                body: JSON.stringify(data),
            })
        },
        async delete(id) {
            await apiFetch(`/admin/articles/${id}`, { method: 'DELETE' })
            this.list = this.list.filter((item) => item.id !== id)
        },
        async switch(id) {
            await apiFetch(`/admin/articles/${id}/switch`)

            this.list = this.list.map((item) => {
                if (item.id === id) {
                    item.active = !item.active
                }
                return item
            })
        }
    }
})