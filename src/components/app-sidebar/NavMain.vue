<script setup lang="ts">
import { ref } from 'vue'
import type { LucideIcon } from 'lucide-vue-next'
import { X } from 'lucide-vue-next' // Import the Close icon
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type MenuItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: MenuItem[]
}

defineProps<{
  items?: MenuItem[]
  level: number
}>()

const activeFlyout = ref<MenuItem | null>(null)

function handleToggleFlyout(item: MenuItem) {
  if (item.items && item.items.length > 0) {
    activeFlyout.value = activeFlyout.value?.title === item.title ? null : item
  } else {
    activeFlyout.value = null
  }
}
</script>

<template>
  <SidebarGroup class="relative">
    <SidebarGroupLabel
      class="text-sm transition-all duration-300 group-data-[state=collapsed]:hidden"
    >
      Platform
    </SidebarGroupLabel>

    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton
          :tooltip="item.title"
          :is-active="activeFlyout?.title === item.title"
          @click="handleToggleFlyout(item)"
          class="p-5 transition-all duration-300 cursor-pointer group-data-[state=collapsed]:flex-col! group-data-[state=collapsed]:w-full! group-data-[state=collapsed]:p-0! group-data-[state=collapsed]:justify-center! group-data-[state=collapsed]:items-center! group-data-[state=collapsed]:h-18! group-data-[state=collapsed]:gap-0!"
        >
          <component
            :is="item.items?.length ? 'div' : 'a'"
            :href="item.items?.length ? undefined : item.url"
            class="flex items-center w-full group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:items-center group-data-[state=collapsed]:justify-center"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="w-6! h-6! text-primary shrink-0 transition-all duration-300 group-data-[state=collapsed]:mb-1"
            />

            <div
              class="text-base font-medium px-2 group-data-[state=collapsed]:text-[10px]! group-data-[state=collapsed]:px-1! group-data-[state=collapsed]:text-center! group-data-[state=collapsed]:w-full! group-data-[state=collapsed]:leading-tight! group-data-[state=collapsed]:line-clamp-2"
            >
              {{ item.title }}
            </div>
          </component>
        </SidebarMenuButton>

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="activeFlyout?.title === item.title && item.items?.length"
            class="fixed z-50 bg-white border-r p-8 transition-all w-[calc(90vw-var(--sidebar-width))] top-16 h-[calc(100vh-4rem)] left-(--sidebar-width) group-data-[state=collapsed]:left-24!"
          >
            <button
              @click="activeFlyout = null"
              class="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X class="w-6 h-6" />
            </button>

            <div class="mb-8">
              <h3 class="text-3xl font-bold text-slate-900">{{ item.title }}</h3>
              <p class="text-slate-500 mt-2">Select a sub-category to continue.</p>
            </div>

            <nav class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <a
                v-for="subItem in item.items"
                :key="subItem.title"
                :href="subItem.url"
                class="block px-4 py-4 text-lg font-medium border rounded-xl hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
              >
                {{ subItem.title }}
              </a>
            </nav>
          </div>
        </Transition>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
