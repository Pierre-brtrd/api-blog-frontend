import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@/views/Admin/UsersView.vue'),
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    return next('/login')
  }
  next()
})

export default router
