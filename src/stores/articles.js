import { defineStore } from 'pinia'
import apiFetch from '@/api/client'

export const useArticleStore = defineStore('articles', {
    state: () => ({
        list: [],
    }),
    actions: {
        async fetchAll() {
            this.list = await apiFetch('/api/admin/articles')
        }
    }
})