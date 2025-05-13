<template>
    <transition name="slide-flash">
        <div v-if="flash.message" :class="`alert-${type}`" @click="flash.clear">
            <p>{{ flash.message }}</p>
        </div>
    </transition>
</template>

<script setup>
import { onBeforeUnmount, computed } from 'vue'
import { useFlashStore } from '@/stores/flash'

const flash = useFlashStore()
const type = computed(() => flash.type || 'info')

onBeforeUnmount(() => {
    if (timer) {
        clearTimeout(timer)
    }
})
</script>

<style scoped lang="scss">
.slide-flash-enter-active,
.slide-flash-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-flash-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-flash-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-flash-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.slide-flash-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>