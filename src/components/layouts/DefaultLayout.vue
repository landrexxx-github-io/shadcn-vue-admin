<script lang="ts">
export const description = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import AppSidebar from '@/components/app-sidebar/AppSidebar.vue'
import NavUser from '../app-sidebar/NavUser.vue' // Adjust this import path if needed
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupInput from '../ui/input-group/InputGroupInput.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import { Search } from 'lucide-vue-next'
import SidebarTrigger from '../ui/sidebar/SidebarTrigger.vue'

const open = ref(true)

// Mock user data so :user="data.user" doesn't error out
// Replace this with your actual fetched user data later
const data = ref({
  user: {
    name: 'Landrex Rebuera',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
})

// TODOS: fetch the menus of the logged in user passed it to the appSidebar
</script>

<template>
  <SidebarProvider :default-open="open" class="group/sidebar-wrapper">
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex w-full px-4 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear bg-linear-to-r from-blue-700 to-blue-950 text-white"
      >
        <div class="flex items-center gap-2">
          <SidebarTrigger class="-ml-1" />
          <InputGroup class="bg-white text-foreground">
            <InputGroupInput placeholder="Search..." class="rounded-sm!" />
            <InputGroupAddon align="inline-end">
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div class="flex">
          <NavUser :user="data.user" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-5">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
