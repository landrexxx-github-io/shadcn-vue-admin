import { createRouter, createWebHistory } from 'vue-router'

import NoMenuLayout from '@/layouts/NoMenuLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import Login from '@/views/auth/SignInView.vue'
import Overview from '@/views/dashboard/OverviewView.vue'
import NotFoundScreen from '@/views/error/NotFoundView.vue'
import SourcenetPartsWorkspace from '@/views/sourcenet/SourcenetPartsWorkspace.vue'
import SourcenetPartsWorkspace2 from '@/views/sourcenet2/SourcenetPartsWorkspace2.vue'
import OnlineCustomerEnquiry from '@/views/sourcenet2/enquiry/OnlineCustomerEnquiry.vue'
import LocalCustomerEnquiry from '@/views/sourcenet2/enquiry/LocalCustomerEnquiry.vue'
import CustomerQuotation from '@/views/sourcenet2/quotation/CustomerQuotation.vue'
import CreateCustomerQuotation from '@/views/sourcenet2/quotation/CreateCustomerQuotation.vue'

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
      path: '/sourcenet',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'sourcenet',
          component: SourcenetPartsWorkspace,
        },
      ],
    },
    {
      path: '/sourcenet2',
      component: DefaultLayout,
      children: [
        {
          path: 'part-search',
          name: 'part-search',
          component: SourcenetPartsWorkspace2,
        },
        {
          path: 'online-enquiry',
          name: 'online-enquiry',
          component: OnlineCustomerEnquiry,
        },
        {
          path: 'local-enquiry',
          name: 'local-enquiry',
          component: LocalCustomerEnquiry,
        },
        {
          path: 'quotation',
          name: 'quotation',
          component: CustomerQuotation,
        },
        {
          path: 'quotation/new',
          name: 'quotation-new',
          component: CreateCustomerQuotation,
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
