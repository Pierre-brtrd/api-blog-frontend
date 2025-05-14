import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useArticleStore = defineStore('articles', {
    state: () => ({
        list: [],
        userList: [],
        userPagination: { page: 1, total: 0, pages: 0, limit: 6 },
        article: null,
        pagination: { page: 1, total: 0, pages: 0, limit: 6 },
    }),
    actions: {
        async fetchAllEnabledPagination(filters) {
            const { items, meta } = await apiFetch(
                `/articles${filters}`
            )

            this.list = items
            this.pagination = meta
        },
        async fetchAll() {
            this.list = await apiFetch('/admin/articles')
        },
        async fetchPagination(filters) {
            const { items, meta } = await apiFetch(`/admin/articles${filters}`)

            this.list = items
            this.pagination = meta
        },
        async fetch(id) {
            this.article = await apiFetch(`/admin/articles/${id}`)
        },
        async fetchBySlug(slug) {
            this.article = await apiFetch(`/articles/${slug}`)
        },
        async create(data) {
            return await apiFetch('/admin/articles', {
                method: 'POST',
                body: JSON.stringify(data),
            })
        },
        async update(id, data) {
            return await apiFetch(`/admin/articles/${id}`, {
                method: 'PATCH',
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
        },
        async uploadImage(id, file) {
            const form = new FormData()
            form.append('image', file)
            return await apiFetch(`/admin/articles/${id}/upload`, {
                method: 'POST',
                body: form,
            })
        },
        async fetchByUser(id, filters) {
            const { items, meta } = await apiFetch(
                `/articles/user/${id}${filters}`
            )

            this.userList = items
            this.userPagination = meta
        }
    }
})