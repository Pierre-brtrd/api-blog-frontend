<template>
    <div class="card">
        <div v-if="article.imageName" class="card-img-wrapper">
            <img :src="imageSrc" :alt="`Image de l'article ${article.title}`" loading="lazy" />
        </div>
        <div class="card-body">
            <RouterLink :to="{ name: 'article-show', params: { slug: article.slug } }" class="card-link">
                <h2 class="text-primary">{{ article.title }}</h2>
            </RouterLink>
            <small class="text-muted">{{ article.slug }}</small>
            <p class="text-muted">{{ formattedDate }}</p>
            <p>{{ formattedContent }}</p>
            <p v-if="article.user" class="text-muted mt-2">{{ article.user.fullName }}</p>

            <div v-if="isAdmin" class="field">
                <label class="switch">
                    <input class="switch-input" type="checkbox" :checked="article.enabled" @change="onSwitch" />
                    <span class="slider"></span>
                    <span class="label-text">Actif</span>
                </label>
            </div>

            <div v-if="isAdmin" class="card-btn">
                <RouterLink :to="{ name: 'admin-article-edit', params: { id: article.id } }" class="btn-warning">
                    Modifier
                </RouterLink>

                <button class="btn-danger" @click="showConfirm = true" :disabled="deleting">
                    {{ deleting ? 'Suppression…' : 'Supprimer' }}
                </button>
            </div>

            <ConfirmModal :visible="showConfirm" @confirm="onConfirmDelete" @cancel="showConfirm = false">
                <template #title>
                    Supprimer cet article ?
                </template>
                <template #message>
                    Cette action est irréversible. Voulez-vous vraiment supprimer
                    <strong>{{ article.title }}</strong> ?
                </template>
            </ConfirmModal>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue'
import { useArticleStore } from '@/stores/articles'
import { useFlashStore } from '@/stores/flash'
import ConfirmModal from '@/components/Layout/ConfirmModal.vue'

const isAdmin = inject('isAdmin', false)

const BASE_IMAGE_URL = import.meta.env.VITE_API_UPLOAD_IMAGE_URL

const imageSrc = computed(() => {
    return props.article.imageName
        ? `${BASE_IMAGE_URL}/articles/${props.article.imageName}`
        : null
})

const props = defineProps({
    article: { type: Object, required: true }
})

const emit = defineEmits(['deleted', 'switch'])

const formattedDate = computed(() => {
    const dt = new Date(props.article.createdAt)
    return dt.toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
    })
})

const formattedContent = computed(() => {
    return props.article.shortContent?.length > 100
        ? props.article.shortContent.substring(0, 100) + '…'
        : props.article.shortContent
})

const articleStore = useArticleStore()
const flashStore = useFlashStore()

const deleting = ref(false)
const showConfirm = ref(false)

function onSwitch() {
    emit('switch', props.article.id)
}

async function onConfirmDelete() {
    deleting.value = true
    try {
        await articleStore.delete(props.article.id)
        flashStore.flash('Article supprimé avec succès', 'success')
        emit('deleted', props.article.id)
    } catch (err) {
        flashStore.flash(err.message || 'Erreur lors de la suppression', 'danger')
    } finally {
        showConfirm.value = false
        deleting.value = false
    }
}
</script>

<style scoped lang="scss">
.card {
    &-btn {
        // @include flexbox($gap: 0.5rem);
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }
}
</style>
