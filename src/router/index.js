import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect:'content',
    children:[
      {
        path: 'content',
        name: 'Content',
        component: () => import('../components/content.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../components/about.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../components/products.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../components/user.vue')
      },
      {
        path: 'questionsAns',
        name: 'QuestionsAns',
        component: () => import('../components/questionsAns.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
