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
        component: () => import('../components/navigator/about.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../components/navigator/products.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../components/navigator/user.vue')
      },
      {
        path: 'foodData',
        name: 'FoodData',
        component: () => import('../components/navigator/foodData.vue')
      },
      {
        path: 'questionsAns',
        name: 'QuestionsAns',
        component: () => import('../components/navigator/questionsAns.vue')
      },
      {
        path: 'delivery',
        name: 'Delivery',
        component: () => import('../components/delivery.vue')
      },
      {
        path: 'return',
        name: 'Return',
        component: () => import('../components/return.vue')
      },
      {
        path: 'private',
        name: 'Private',
        component: () => import('../components/private.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
