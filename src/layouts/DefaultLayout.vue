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
  <SidebarProvider :default-open="open" class="group/sidebar-wrapper h-svh min-h-0 overflow-hidden">
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
