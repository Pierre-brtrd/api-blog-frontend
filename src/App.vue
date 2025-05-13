<script setup>
import { useRoute, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import Header from './components/Layout/Header.vue'
import Flash from '@/components/Layout/Flash.vue'

const route = useRoute()
const prevDepth = ref(0)
const transitionName = ref('slide-left')

function getDepth(path) {
  if (!path) {
    return 0
  }

  return path.split('/').filter(Boolean).length
}

prevDepth.value = getDepth(route.path)

watch(
  () => route.fullPath,
  (to, from) => {
    const toDepth = getDepth(to)
    const fromDepth = getDepth(from)

    if (toDepth === fromDepth) {
      transitionName.value = 'fade'
      return
    }

    transitionName.value = toDepth > fromDepth
      ? 'slide-left'
      : 'slide-right'

    prevDepth.value = toDepth
  },
  { immediate: true }
)
</script>

<template>
  <Header />
  <main>
    <Flash />
    <RouterView v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

/* Entrée slide-left  : new page vient de la droite */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* Sortie slide-left : old page sort vers la gauche */
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Entrée slide-right : new page vient de la gauche */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* Sortie slide-right : old page sort vers la droite */
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
