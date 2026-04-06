import { createRouter, createWebHistory } from 'vue-router'

import NoMenuLayout from '@/components/layouts/NoMenuLayout.vue'

import Login from '@/modules/auth/pages/sign-in.vue'
import Overview from '@/modules/dashboard/pages/overview.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

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
  ],
})

export default router
