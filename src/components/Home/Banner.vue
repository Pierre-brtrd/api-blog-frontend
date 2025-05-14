<template>
    <section class="banner">
        <div class="banner-content">
            <h1 class="banner-title">Bienvenue sur le blog API REST !</h1>
            <p>Découvrez nos articles VueJs et Symfony et restez informé.</p>
            <RouterLink :to="{ name: 'articles' }" class="btn-primary">Voir les articles</RouterLink>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.banner {
    background: url('@/assets/images/banner-formations.jpg') no-repeat center center/cover;
}
</style>