<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpenText,
  Command,
  FileBoxIcon,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  TimerIcon,
} from 'lucide-vue-next'

import NavMain from './NavMain.vue'
import TeamSwitcher from './TeamSwitcher.vue'

import { SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import CustomSidebar from '../ui/sidebar/CustomSidebar.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'Landrex',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  // the user should be able to switch roles
  teams: [
    {
      name: 'Administrator',
      logo: GalleryVerticalEnd,
      plan: 'Head Office',
    },
    {
      name: 'Finance',
      logo: AudioWaveform,
      plan: 'Admininstrator',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Accounting',
      url: '/accounting',
      icon: BookOpenText,
      isActive: false,
      items: [
        {
          title: 'Disbursement Voucher',
          url: '',
        },
        {
          title: 'Journals',
          url: '#',
        },
        {
          title: 'Journal Entry Voucher',
          url: '#',
        },
        {
          title: 'Journal Entry Voucher (Special)',
          url: '#',
        },
        {
          title: 'Journal Entry Voucher (Special) - Deposits',
          url: '#',
        },
        {
          title: 'Journal Entry Voucher (Special) - Transfers',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
          items: [
            {
              title: 'Profile',
              url: '',
            },
            {
              title: 'Security',
              url: '',
            },
          ],
        },
      ],
    },
    {
      title: 'Inventory Planning',
      url: '#',
      icon: FileBoxIcon,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Time and Expenses',
      url: '#',
      icon: TimerIcon,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
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
      <!-- <NavProjects :projects="data.projects" /> -->
    </SidebarContent>
    <SidebarRail />
  </CustomSidebar>
</template>
