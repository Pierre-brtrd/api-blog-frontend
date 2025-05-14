import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFlashStore } from '@/stores/flash'
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
      component: () => import('@/views/Admin/User/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/users/:id/edit',
      name: 'admin-user-edit',
      component: () => import('@/views/Admin/User/UserEditView.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/admin/articles',
      name: 'admin-articles',
      component: () => import('@/views/Admin/Article/ArticlesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/articles/create',
      name: 'admin-article-create',
      component: () => import('@/views/Admin/Article/ArticleCreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/articles/:id/edit',
      name: 'admin-article-edit',
      component: () => import('@/views/Admin/Article/ArticleEditView.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/views/Frontend/ArticleListView.vue'),
    },
    {
      path: '/articles/:slug',
      name: 'article-show',
      component: () => import('@/views/Frontend/ArticleShowView.vue'),
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Frontend/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/medias',
      name: 'admin-medias',
      component: () => import('@/views/Admin/Media/MediasView.vue'),
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const flash = useFlashStore()

  if (to.meta.requiresAuth && !auth.token) {
    flash.flash('Vous devez être connecté pour accéder à cette page.', 'danger')
    return next('/login')
  }
  next()
})

export default router
