<template>
    <div class="card">
        <h2 class="text-primary">{{ article.title }}</h2>
        <small class="text-muted">{{ article.slug }}</small>
        <p class="text-muted">{{ formattedDate }}</p>
        <p>{{ formattedContent }}</p>
        <p class="text-muted mt-2">{{ article.user.fullName }}</p>

        <div class="field">
            <label class="switch">
                <input v-bind="field" class="switch-input" type="checkbox" :checked="article.enabled"
                    @change="onSwitch" />
                <span class="slider"></span>
                <span class="label-text">Actif</span>
            </label>
        </div>

        <div class="card-btn">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useArticleStore } from '@/stores/articles'
import { useFlashStore } from '@/stores/flash'
import ConfirmModal from '@/components/Layout/ConfirmModal.vue'

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
    return props.article.content?.length > 100
        ? props.article.content.substring(0, 100) + '…'
        : props.article.content
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
