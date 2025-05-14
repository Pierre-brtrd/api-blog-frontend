import { defineStore } from "pinia";
import apiFetch from '@/api/client'

export const useMediaStore = defineStore('media', {
    actions: {
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
        }
    }
})