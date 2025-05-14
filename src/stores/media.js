import { defineStore } from "pinia";
import apiFetch from '@/api/client'

export const useMediaStore = defineStore('media', {
    state: () => ({
        list: [],
        media: null,
        pagination: { total: 0, limit: 8, page: 1, pages: 1 },
    }),
    actions: {
        async fetchAll() {
            this.list = await apiFetch('/admin/medias')
        },
        async fetchPagination(filters) {
            const { items, meta } = await apiFetch(`/admin/medias${filters}`)

            this.list = items
            this.pagination = meta
        },
        async upload(file) {
            const form = new FormData()
            form.append('media', file)

            const { id, mediaName, mediaSize } = await apiFetch(`/admin/medias`, {
                method: 'POST',
                body: form,
            })

            return {
                id,
                mediaName,
                mediaSize,
                url: `${import.meta.env.VITE_API_UPLOAD_IMAGE_URL}/medias/${mediaName}`,
            }
        },
        async delete(id) {
            await apiFetch(`/admin/medias/${id}`, {
                method: 'DELETE',
            })
        }
    }
})