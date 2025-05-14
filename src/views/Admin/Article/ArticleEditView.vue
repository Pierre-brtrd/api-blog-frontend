<template>
    <section v-if="article" class="container mt-3">
        <h1 class="title text-center">Modification de l'article</h1>
        <hr class="separator-secondary w-50 mx-auto" />
        <FormArticle :article="article" :is-new="false" @submit="handleUpdate" />
        <BackToList :to="{ name: 'admin-articles' }" />
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import FormArticle from '@/components/Article/FormArticle.vue';
import BackToList from '@/components/Common/BackToList.vue';
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

useHead({
    title: 'Modification d\'un article - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Modifiez un article existant sur le blog API Rest Vue et partagez vos idées avec le monde.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
});

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

async function handleUpdate(payload, file) {
    try {
        await articleStore.update(id, payload);

        if (file) {
            await articleStore.uploadImage(id, file);
        }

        flashStore.flash('Article mis à jour avec succès', 'success');
        router.push({ name: 'admin-articles' });
    } catch (err) {
        flashStore.flash(err, 'danger');
    }
}
</script>