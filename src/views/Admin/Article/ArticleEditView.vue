<template>
    <section v-if="article" class="container mt-3">
        <h1 class="text-center">Modification de l'article {{ article?.title }}</h1>
        <FormArticle :article="article" :is-new="false" @submit="handleUpdate" />
        <RouterLink :to="{ name: 'admin-articles' }" class="btn btn-primary mt-5">Retour à la liste</RouterLink>
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import FormArticle from '@/components/Article/FormArticle.vue';
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import { useRouter } from 'vue-router';

const articleStore = useArticleStore();
const flashStore = useFlashStore();
const router = useRouter();

const { id } = defineProps({ id: String });

onMounted(async () => {
    try {
        await articleStore.fetch(id);

        if (!articleStore.article) {
            throw new Error('Article non trouvé');
        }
    } catch (err) {
        flashStore.flash(err, 'danger');

        return router.push({ name: 'admin-articles' });
    }
})

const article = computed(() => articleStore.article);

async function handleUpdate(payload) {
    try {
        await articleStore.update(id, payload);
        flashStore.flash('Article mis à jour avec succès', 'success');
        router.push({ name: 'admin-articles' });
    } catch (err) {
        flashStore.flash(err, 'danger');
    }
}
</script>