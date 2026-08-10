<script lang="ts">
export const description = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
import NavHeader from './components/NavHeader.vue'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <SidebarProvider :default-open="open" class="group/sidebar-wrapper">
    <AppSidebar />
    <SidebarInset>
      <NavHeader />
      <div
        class="flex h-full w-full min-h-0 min-w-0 max-w-full flex-col overflow-hidden bg-muted/20"
      >
        <div class="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">
          <div class="mx-auto w-full max-w-450 p-3 sm:p-4">
            <RouterView />
          </div>
        </div>
      </div>
      <!-- <div class="flex flex-1 flex-col gap-4 p-2">
        <RouterView />
      </div> -->
    </SidebarInset>
  </SidebarProvider>
</template>
