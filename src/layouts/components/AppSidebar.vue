<script setup lang="ts">
import { SidebarHeader, SidebarFooter, type SidebarProps } from '@/components/ui/sidebar'
import CustomSidebar from '@/components/ui/sidebar/CustomSidebar.vue'

import { defaultSidebarData as data } from '@/constants/navigation'
import TeamSwitcher from './TeamSwitcher.vue'
import SidebarContent from '@/components/ui/sidebar/SidebarContent.vue'
import NavMain from './NavMain.vue'
import SidebarRail from '@/components/ui/sidebar/SidebarRail.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
</script>

<template>
  <CustomSidebar v-bind="props" variant="sidebar">
    <SidebarHeader class="from-blue-700 to-blue-700 bg-linear-to-r text-white">
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" :level="1" />
    </SidebarContent>
    <SidebarRail />
    <SidebarFooter> </SidebarFooter>
  </CustomSidebar>
</template>
