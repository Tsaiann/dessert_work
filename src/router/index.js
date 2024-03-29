import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: 'content',
    children: [
      {
        path: 'content',
        name: 'HomeContent',
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
        component: () => import('../components/navigator/products.vue'),
        redirect: { name: 'Goods' },
        children: [
          {
            path: 'goods',
            name: 'Goods',
            component: () => import('../components/goods/goods.vue')
          },
          {
            path: 'hot',
            name: 'Hot',
            component: () => import('../components/goods/hot.vue')
          },
          {
            path: 'chiffon',
            name: 'Chiffon',
            component: () => import('../components/goods/chiffon.vue')
          },
          {
            path: 'cupcake',
            name: 'Cupcake',
            component: () => import('../components/goods/cupcake.vue')
          },
          {
            path: 'macaron',
            name: 'Macaron',
            component: () => import('../components/goods/macaron.vue')
          },
          {
            path: 'other',
            name: 'Other',
            component: () => import('../components/goods/other.vue')
          }
        ]
      },
      {
        path: 'goodsDetail',
        name: 'GoodsDetail',
        component: () => import('../components/goods/goodsDetail.vue')
      },
      {
        path: 'specsDetail',
        name: 'SpecsDetail',
        component: () => import('../components/goods/specsDetail.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../components/navigator/user.vue'),
        redirect: { name: 'Login' },
        children: [
          {
            path: 'login',
            name: 'Login',
            component: () => import('../components/user/login.vue')
          },
          {
            path: 'register',
            name: 'Register',
            component: () => import('../components/user/register.vue')
          }
        ]
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('../components/user/member/member.vue'),
        redirect: { name: 'Homepage' },
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: 'homepage',
            name: 'Homepage',
            component: () => import('../components/user/member/homepage.vue'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'order',
            name: 'Order',
            component: () => import('../components/user/member/order.vue'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'like',
            name: 'Like',
            component: () => import('../components/user/member/like.vue'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'discount',
            name: 'Discount',
            component: () => import('../components/user/member/discount.vue'),
            meta: {
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../components/cart/cart.vue')
      },
      {
        path: 'fillInfo',
        name: 'FillInfo',
        component: () => import('../components/cart/fillInfo.vue')
      },
      {
        path: 'finish',
        name: 'Finish',
        component: () => import('../components/cart/finish.vue')
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const memberInfo = JSON.parse(localStorage.getItem('memberInfo'))
  if (to.meta.requiresAuth) {
    if (memberInfo.token !== '' && memberInfo) {
      next()
    } else {
      next({ name: 'Login' })
      localStorage.removeItem('memberInfo')
    }
  } else {
    next()
  }
})
export default router
