<template>
  <header
    class="flex w-full px-4 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear bg-linear-to-r from-blue-700 to-blue-950 text-white"
  >
    <div class="flex items-center gap-2">
      <SidebarTrigger class="-ml-1" />
      <GlobalSearchInput />
    </div>

    <div class="flex items-center justify-end">
      <NavCalendar />
      <NavUser :user="data.user" />
    </div>
  </header>
</template>

<script setup lang="ts">
import SidebarTrigger from '@/components/ui/sidebar/SidebarTrigger.vue'
import GlobalSearchInput from '@/components/common/GlobalSearchInput.vue'
import NavCalendar from './NavCalendar.vue'
import NavUser from './NavUser.vue'
import { defaultSidebarData as data } from '@/constants/navigation'
</script>
