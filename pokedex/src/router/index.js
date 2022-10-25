//Imports
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CardView from '@/views/CardView.vue'
import CombatView from '@/views/CombatView.vue'

//Router de les diferents vistes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/card/:Id',
      name: 'card',
      component: CardView
    },
    {
      path: '/combat',
      name: 'combat',
      component: CombatView
    }
  ]
})

export default router
