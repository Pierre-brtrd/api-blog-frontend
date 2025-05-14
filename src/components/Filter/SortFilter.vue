<template>
    <div class="filter-dropdown">
        <button class="btn-primary" @click="open = !open">
            Trier par: {{ currentLabel }}
            <span class="arrow" :class="{ open }">▾</span>
        </button>
        <ul v-if="open" class="filter-options">
            <li v-for="option in options" :key="option.value" @click="select(option)"
                :class="{ active: option.label === modelValue.label }">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, watch, toRefs } from 'vue'

const open = ref(false)

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Object,
        default: () => ({}),
    }
})

const { modelValue, options } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const currentLabel = computed(() => {
    return modelValue.value.label ?? options.value[0].label
})

function select(option) {
    emit('update:modelValue', option)
    open.value = false
}

watch(open, val => {
    if (val) {
        document.addEventListener('click', onClickOutside)
    } else {
        document.removeEventListener('click', onClickOutside)
    }
})
function onClickOutside(e) {
    if (!e.target.closest('.filter-dropdown')) {
        open.value = false
    }
}
</script>