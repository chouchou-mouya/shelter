import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Landing from '@/views/LandingPage.vue'
import Test from '@/views/Test.vue'
import Analyze from '@/views/Analyze.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', name: "search", component: Landing },
      { path: 'analyze', name: "analyze", component: Analyze }
    ],
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
