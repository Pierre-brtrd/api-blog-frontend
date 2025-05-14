<template>
    <div class="profile-info mt-3">
        <h2 class="title">Informations de votre compte</h2>
        <ul class="list">
            <li>
                <strong>Nom d'utilisateur :</strong>
                {{ user.username }}
            </li>
            <li>
                <strong>Prénom :</strong>
                {{ user.firstName }}
            </li>
            <li>
                <strong>Nom :</strong>
                {{ user.lastName }}
            </li>
            <li>
                <strong>Date de création du compte :</strong>
                {{ formattedCreatedAt }}
            </li>
            <li v-if="isAdmin">
                <strong>Rôles :</strong>
                {{ mapRoles(user.roles).join(', ') }}
            </li>
        </ul>
    </div>
    <div class="profile-article mt-4">
        <h2 class="title">Informations sur vos articles</h2>
        <div class="list-articles">
            <SkeletonCard v-if="loading" v-for="n in articleStore.userPagination.limit" :key="n" />
            <ArticleCard v-if="!loading" v-for="article in articleStore.userList" :key="article.id"
                :article="article" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useAuthStore } from '@/stores/auth'
import { useArticleStore } from '@/stores/articles'
import { mapRoles } from '@/utils/roleMap'
import ArticleCard from '@/components/Article/ArticleCard.vue'
import SkeletonCard from '../Common/SkeletonCard.vue'

useHead({
    title: 'Votre compte - Blog API Rest Vue',
    meta: [
        {
            name: 'description',
            content: 'Gérez votre compte utilisateur sur notre blog API Rest Vue.'
        },
        {
            name: 'author',
            content: 'Pierre Bertrand'
        }
    ]
})

const auth = useAuthStore()
const user = computed(() => auth.user)
const isAdmin = computed(() => {
    return Array.isArray(auth.user?.roles)
        && auth.user.roles.includes('ROLE_ADMIN')
})

const formattedCreatedAt = computed(() => {
    const dt = new Date(user.value.createdAt)

    return dt.toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
    })
})

const loading = ref(true)
const articleStore = useArticleStore()

const sortOptions = [
    { label: 'Date décroissante', sort: 'createdAt', order: 'DESC' },
    { label: 'Date croissante', sort: 'createdAt', order: 'ASC' },
    { label: 'Titre de A→Z', sort: 'title', order: 'ASC' },
    { label: 'Titre de Z→A', sort: 'title', order: 'DESC' },
]

const selectedSort = ref(sortOptions[0])
const search = ref('')

watch(selectedSort, () => fetchArticle(articleStore.userPagination.page))
watch(search, () => fetchArticle(articleStore.userPagination.page))

async function fetchArticle(page) {
    loading.value = true

    const limit = 20
    const sort = selectedSort.value.sort
    const order = selectedSort.value.order
    const sortQuery = `sort=${sort}&order=${order}`
    const searchQuery = search.value ? `search=${search.value}` : ''

    if (searchQuery) {
        page = 1
    }

    await articleStore.fetchByUser(user.value.id, `?page=${page}&limit=${limit}&${sortQuery}&${searchQuery}`)
    loading.value = false
}

onMounted(() => {
    fetchArticle(1)
})

const onPageChange = (page) => {
    fetchArticle(page)
}
</script>

<style lang="scss" scoped>
.list-articles {
    @include grid(repeat(auto-fill, minmax(300px, 1fr)), $gap: 1rem);
}
</style>