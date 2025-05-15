<template>
    <transition name="fade-btn" mode="out-in">
        <teleport to=".container">
            <RouterLink v-if="btnVisible" :to="to" class="btn-primary btn-fixed">
                <slot>
                    <v-icon name="md-backspace" />
                    Retour à la liste
                </slot>
            </RouterLink>
        </teleport>
    </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const btnVisible = ref(false);

onMounted(() => {
    btnVisible.value = true;
});

const { to } = defineProps({
    to: {
        type: Object,
        required: true
    }
});
</script>