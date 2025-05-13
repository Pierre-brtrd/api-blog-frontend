<template>
    <div v-if="visible" class="modal-backdrop" @click.self="cancel">
        <div class="modal">
            <header class="modal-header">
                <slot name="title">Confirmation</slot>
            </header>
            <section class="modal-body">
                <slot name="message">Êtes-vous sûr ?</slot>
            </section>
            <footer class="modal-footer">
                <button class="btn-secondary" @click="cancel">Annuler</button>
                <button class="btn-danger" @click="confirm">Confirmer</button>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    visible: { type: Boolean, required: true }
})

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
    emit('confirm')
}
function cancel() {
    emit('cancel')
}
</script>

<style lang="scss" scoped>
.modal {
    background: white;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    padding: 1rem;

    &-backdrop {
        @include flexbox($align: center, $justify: center);
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    &-header {
        font-weight: bold;
        margin-bottom: .5rem;
    }

    &-body {
        margin-bottom: 1rem;
    }

    &-footer {
        @include flexbox($align: center, $justify: flex-end);
        gap: .5rem;
    }
}
</style>
