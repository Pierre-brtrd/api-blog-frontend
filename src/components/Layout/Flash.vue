<template>
    <div v-if="flash.message" :class="`alert-${type}`">
        <p>{{ flash.message }}</p>
    </div>
</template>

<script setup>
import { watch, onBeforeUnmount, computed } from 'vue'
import { useFlashStore } from '@/stores/flash'

const flash = useFlashStore()
const type = computed(() => flash.type || 'info')

let timer = null

function clear() {
    flash.clear()
    if (timer) {
        clearTimeout(timer)
        timer = null
    }
}

watch(
    () => flash.message,
    (msg) => {
        if (msg) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                flash.clear()
                timer = null
            }, 5000)
        }
    }
)

onBeforeUnmount(() => {
    if (timer) {
        clearTimeout(timer)
    }
})
</script>