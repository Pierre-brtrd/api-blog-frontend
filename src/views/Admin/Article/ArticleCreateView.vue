<template>
    <section class="container mt-3">
        <h1 class="title text-center">Création d'un article</h1>
        <hr class="separator-secondary w-50 mx-auto" />
        <FormArticle :article="null" :isNew="true" @submit="onSubmit" />
        <BackToList :to="{ name: 'admin-articles' }" />
    </section>
</template>

<script setup>
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'
import FormArticle from '@/components/Article/FormArticle.vue';
import BackToList from '@/components/Common/BackToList.vue';
import { useHead } from '@vueuse/head';

useHead({
    title: 'Création d\'un article - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Créez un nouvel article sur le blog API Rest Vue et partagez vos idées avec le monde.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
});

const articleStore = useArticleStore();
const flashStore = useFlashStore();
const authStore = useAuthStore();
const router = useRouter();

async function onSubmit(payload, file) {
    try {
        payload.userId = authStore.user.id;
        payload.enabled = payload.enabled ? true : false;

        const { id } = await articleStore.create(payload);

        if (file) {
            await articleStore.uploadImage(id, file);
        }

        flashStore.flash('Article créé avec succès', 'success');

        return router.replace({ name: 'admin-articles' });
    } catch (error) {
        flashStore.flash(error.message, 'danger');
    }
}
</script>