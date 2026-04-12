import { createRouter, createWebHistory } from 'vue-router'

import NoMenuLayout from '@/layouts/NoMenuLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import Login from '@/views/auth/SignInView.vue'
import Overview from '@/views/dashboard/OverviewView.vue'
import NotFoundScreen from '@/views/error/NotFoundView.vue'

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
