import { createRouter, createWebHistory } from 'vue-router'

import NoMenuLayout from '@/components/layouts/NoMenuLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

import Login from '@/modules/auth/pages/SignInScreen.vue'
import Overview from '@/modules/dashboard/pages/OverviewScreen.vue'
import NotFoundScreen from '@/components/error/NotFoundScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: NoMenuLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
        },
      ],
    },
    {
      path: '/dashboard',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'overview',
          component: Overview,
        },
      ],
    },
    {
      path: '/error/404',
      name: 'not-found',
      component: NotFoundScreen,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    },
  ],
})

export default router
