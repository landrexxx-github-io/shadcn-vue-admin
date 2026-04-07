<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpenText,
  Command,
  DollarSign,
  FileBoxIcon,
  GalleryVerticalEnd,
  List,
  RefreshCw,
  SquarePenIcon,
} from 'lucide-vue-next'

import NavMain from './NavMain.vue'
import TeamSwitcher from './TeamSwitcher.vue'

import { SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import CustomSidebar from '../ui/sidebar/CustomSidebar.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const data = {
  user: {
    name: 'Landrex',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    { name: 'Administrator', logo: GalleryVerticalEnd, plan: 'Head Office' },
    { name: 'Finance', logo: AudioWaveform, plan: 'Admininstrator' },
    { name: 'Evil Corp.', logo: Command, plan: 'Free' },
  ],
  navMain: [
    {
      title: 'Accounting',
      url: '/accounting',
      icon: BookOpenText,
      isActive: false,
      actions: [
        {
          title: 'Journal Transactions',
          icon: SquarePenIcon,
          url: '#',
        },
        {
          title: 'Account Summary',
          icon: DollarSign,
          url: '#',
        },
        {
          title: 'Account Details',
          icon: List,
          url: '#',
        },
        {
          title: 'Reclassify Journal Entries',
          icon: RefreshCw,
          url: '#',
        },
      ],
      groups: [
        {
          label: 'Transactions',
          items: [
            { title: 'Journal Transactions', url: '#' },
            { title: 'Disbursement Voucher', url: '#' },
            { title: 'Journal Entry Voucher', url: '#' },
          ],
        },
        {
          label: 'Processes',
          items: [
            { title: 'Run Allocations', url: '#' },
            { title: 'Reclassify Transactions', url: '#' },
            { title: 'Import Consolidation Data', url: '#' },
            { title: 'Manage Financial Periods', url: '#' },
          ],
        },
        {
          label: 'Reports',
          items: [
            { title: 'Trial Balance Summary', url: '#' },
            { title: 'Transactions for Period', url: '#' },
            { title: 'Transactions for Account', url: '#' },
          ],
        },
        {
          label: 'Financial Statements',
          items: [
            { title: 'Balance Sheet', url: '#' },
            { title: 'Profit & Loss', url: '#' },
            { title: 'Cash Flow Statement', url: '#' },
            { title: 'Profit & Loss Quarterly', url: '#' },
            { title: 'Balance Sheet EU Consolidation', url: '#' },
          ],
        },
        {
          label: 'Profiles',
          items: [
            { title: 'Master Financial Calendar', url: '#' },
            { title: 'Allocations', url: '#' },
            { title: 'Chart of Accounts', url: '#' },
            { title: 'Subaccounts', url: '#' },
          ],
        },
      ],
    },
    {
      title: 'Inventory Planning',
      url: '#',
      icon: FileBoxIcon,
      actions: [],
      groups: [
        {
          label: 'Setup',
          items: [
            { title: 'Genesis Config', url: '#' },
            { title: 'Explorer Options', url: '#' },
          ],
        },
      ],
    },
  ],
}
</script>

<template>
  <CustomSidebar v-bind="props" variant="sidebar">
    <SidebarHeader class="bg-linear-to-r from-blue-700 to-blue-700 text-white">
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" :level="1" />
    </SidebarContent>
    <SidebarRail />
  </CustomSidebar>
</template>
