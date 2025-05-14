<template>
    <transition name="fade-btn" mode="out-in">
        <teleport to=".container">
            <RouterLink v-if="btnVisible" :to="to" class="btn-primary btn-fixed">
                <slot>Retour à laliste</slot>
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