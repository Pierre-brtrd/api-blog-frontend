<template>
    <transition name="slide-flash">
        <div v-if="flash.message" :class="`alert-${type}`" @click="flash.clear">
            <p>
                <v-icon :name="iconName" animation="pulse" />
                {{ flash.message }}
            </p>
        </div>
    </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useFlashStore } from '@/stores/flash'

const flash = useFlashStore()
const type = computed(() => flash.type || 'info')
const iconName = computed(() => {
    switch (type.value) {
        case 'success':
            return 'md-checkcircle'
        case 'danger':
            return 'md-dangerous-sharp'
        case 'warning':
            return 'md-warning'
        default:
            return 'md-info'
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