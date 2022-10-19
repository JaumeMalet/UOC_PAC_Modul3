import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import CombatView from '@/views/CombatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/combat',
      name: 'combat',
      component: CombatView
    }
  ]
})

export default router
