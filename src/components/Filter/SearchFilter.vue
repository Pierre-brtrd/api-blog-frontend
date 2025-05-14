<template>
    <div class="filter-search">
        <input type="text" placeholder="Rechercher..." v-model="searchQuery" @input="onSearch" />
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash'

const emit = defineEmits(['update:searchQuery'])
const searchQuery = ref('')

const debouncedSearch = debounce((query) => {
    emit('update:searchQuery', query)
}, 200)

function onSearch() {
    debouncedSearch(searchQuery.value)
}

onBeforeUnmount(() => {
    debouncedSearch.cancel()
})
</script>