<template>
    <nav class="pagination-controls">
        <button class="btn-primary" :disabled="page <= 1" @click="$emit('change', page - 1)">Précédent</button>
        <ul class="pages">
            <li v-for="p in pagesArray" :key="p" :class="{ active: p === page }" @click="$emit('change', p)">{{ p }}</li>
        </ul>
        <button class="btn-primary" :disabled="page >= pages" @click="$emit('change', page + 1)">Suivant</button>
    </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    page: { type: Number, required: true },
    pages: { type: Number, required: true },
})

const pagesArray = computed(() => {
    return Array.from({ length: props.pages }, (_, i) => i + 1)
})
</script>

<style scoped lang="scss">
.pagination-controls {
    @include flexbox($justify: center, $align: center, $gap: 0.5rem);
    margin-top: 1rem;

    .pages {
        @include flexbox($gap: 0.25rem);
        margin: 0 0.5rem;
        padding: 0;

        li {
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;

            &.active {
                background: $secondary;
                color: $white;
            }

            &:hover:not(.active) {
                background: $dark-muted;
            }
        }
    }

    button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
</style>