<template>
    <section class="container mt-3">
        <h1 class="text-center">Création d'un article</h1>
        <FormArticle :article="null" :isNew="true" @submit="onSubmit" />
    </section>
</template>

<script setup>
import { useArticleStore } from '@/stores/articles';
import { useFlashStore } from '@/stores/flash';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'
import FormArticle from '@/components/Article/FormArticle.vue';

const articleStore = useArticleStore();
const flashStore = useFlashStore();
const authStore = useAuthStore();
const router = useRouter();

async function onSubmit(payload) {
    try {
        payload.userId = authStore.user.id;
        payload.enabled = payload.enabled ? true : false;

        await articleStore.create(payload);
        flashStore.flash('Article créé avec succès', 'success');

        return router.replace({ name: 'admin-articles' });
    } catch (error) {
        flashStore.flash(error.message, 'danger');
    }
}
</script>