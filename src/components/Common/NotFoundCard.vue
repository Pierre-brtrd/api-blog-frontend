<template>
    <div class="card-info">
        <slot>Aucun résultat pour votre recherche</slot>
    </div>
</template>

<style lang="scss" scoped>
.card-info {
    @include flexbox(center, center);
    width: 100%;
    height: 100%;
    padding: 2rem;
    background-color: $dark-muted;
    border-radius: $border-radius;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    color: $white;
}
</style>