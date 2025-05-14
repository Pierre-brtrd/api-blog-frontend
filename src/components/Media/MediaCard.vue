<template>
    <div class="card">
        <div v-if="media.mediaName" class="card-img-wrapper">
            <img :src="imageSrc" loading="lazy" />
        </div>
        <div class="card-body">
            <p class="text-muted">Créé le {{ formattedDate }}</p>
            <div class="card-btn">
                <button class="btn-danger" @click="showConfirm = true" :disabled="deleting">
                    {{ deleting ? 'Suppression…' : 'Supprimer' }}
                </button>
            </div>

            <ConfirmModal :visible="showConfirm" @confirm="onConfirmDelete" @cancel="showConfirm = false">
                <template #title>
                    Supprimer ce média ?
                </template>
                <template #message>
                    Cette action est irréversible. Voulez-vous vraiment supprimer ?
                </template>
            </ConfirmModal>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFlashStore } from '@/stores/flash'
import { useMediaStore } from '@/stores/media'
import ConfirmModal from '@/components/Layout/ConfirmModal.vue'

const props = defineProps({
    media: {
        type: Object,
        required: true
    }
})

const formattedDate = computed(() => {
    const dt = new Date(props.media.createdAt)
    return dt.toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
    })
})

const BASE_IMAGE_URL = import.meta.env.VITE_API_UPLOAD_IMAGE_URL

const imageSrc = computed(() => {
    return props.media.mediaName
        ? `${BASE_IMAGE_URL}/medias/${props.media.mediaName}`
        : null
})

const emit = defineEmits(['deleted'])

const deleting = ref(false)
const showConfirm = ref(false)

const mediaStore = useMediaStore()
const flashStore = useFlashStore()

async function onConfirmDelete() {
    deleting.value = true

    try {
        await mediaStore.delete(props.media.id)
        flashStore.flash('Le média a été supprimé avec succès.', 'success')
        emit('deleted', props.media.id)
    } catch (error) {
        flashStore.flash(error.message || 'Erreur lors de la suppression', 'danger')
    } finally {
        deleting.value = false
        showConfirm.value = false
    }
}
</script>