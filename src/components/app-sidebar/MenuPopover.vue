<script setup lang="ts">
import { ref } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { LucideIcon } from 'lucide-vue-next'

type MenuItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: MenuItem[]
}

// defineProps<{
//   items: {
//     title: string
//     url: string
//     icon?: LucideIcon
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }>()

defineProps<{
  items?: MenuItem[]
  level: number
}>()

const open = ref(true)
const selectedItem = ref<MenuItem>()

function handleMenuClick(item: MenuItem) {
  selectedItem.value = item
  open.value = true
}
</script>

<template>
  <Popover :open="open" @update:open="open = $event">
    <PopoverTrigger as-child>
      <div class="hidden" />
    </PopoverTrigger>

    <div class="space-y-1">
      <SidebarMenuButton
        v-for="item in items"
        :key="item.title"
        :tooltip="item.title"
        @click="handleMenuClick(item)"
      >
        <component :is="item.icon" v-if="item.icon" />
        <span>{{ item.title }}</span>
      </SidebarMenuButton>
    </div>

    <div>
      <PopoverContent
        side="right"
        align="start"
        :side-offset="8"
        class="w-[calc((100vw-var(--app-sidebar-width))*0.8)] max-w-none data-[state=open]:animate-none data-[state=closed]:animate-none"
      >
        <div v-if="selectedItem" class="p-4">
          <h3 class="text-lg font-semibold">{{ selectedItem.title }}</h3>

          <div class="mt-4 space-y-2">
            <div
              v-for="child in selectedItem.items"
              :key="child.title"
              class="rounded-md border p-3"
            >
              {{ child.title }}
            </div>
          </div>
        </div>
      </PopoverContent>
    </div>
  </Popover>
</template>
