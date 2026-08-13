<script lang="ts">
export const description = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import AppSidebar from './components/AppSidebar.vue'
import NavHeader from './components/NavHeader.vue'

const open = ref(true)

let sidebarBreakpoint: MediaQueryList | null = null

function updateSidebarState(event: MediaQueryListEvent | MediaQueryList) {
  // Closed at 1440px and below; open above 1440px.
  open.value = !event.matches
}

onMounted(() => {
  sidebarBreakpoint = window.matchMedia('(max-width: 1440px)')

  updateSidebarState(sidebarBreakpoint)
  sidebarBreakpoint.addEventListener('change', updateSidebarState)
})

onBeforeUnmount(() => {
  sidebarBreakpoint?.removeEventListener('change', updateSidebarState)
})
</script>

<template>
  <SidebarProvider v-model:open="open" class="group/sidebar-wrapper h-svh min-h-0 overflow-hidden">
    <AppSidebar />

    <SidebarInset class="h-svh min-h-0 overflow-hidden">
      <NavHeader class="shrink-0" />

      <div class="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-muted/20">
        <div class="mx-auto w-full max-w-450 p-3 pb-8 sm:p-4 sm:pb-10">
          <RouterView />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
