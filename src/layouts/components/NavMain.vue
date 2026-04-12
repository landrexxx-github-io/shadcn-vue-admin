<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next' // Import the Close icon
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import BoxButton from '@/components/common/BoxButton.vue'

import type { NavItem } from '@/types'

defineProps<{
  items?: NavItem[]
  level: number
}>()

const activeFlyout = ref<NavItem | null>(null)

function handleToggleFlyout(item: NavItem) {
  if (item.groups && item.groups.length > 0) {
    activeFlyout.value = activeFlyout.value?.title === item.title ? null : item
  } else {
    activeFlyout.value = null
  }
}
</script>

<template>
  <SidebarGroup class="relative">
    <SidebarGroupLabel class="text-sm transition-all group-data-[state=collapsed]:hidden">
      Platform
    </SidebarGroupLabel>

    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton
          :tooltip="item.title"
          :is-active="activeFlyout?.title === item.title"
          @click="handleToggleFlyout(item)"
          class="p-5 transition-all cursor-pointer group-data-[state=collapsed]:flex-col! group-data-[state=collapsed]:w-full! group-data-[state=collapsed]:p-0! group-data-[state=collapsed]:justify-center! group-data-[state=collapsed]:items-center! group-data-[state=collapsed]:h-18! group-data-[state=collapsed]:gap-0!"
        >
          <component
            :is="item.groups?.length ? 'div' : 'a'"
            :href="item.groups?.length ? undefined : item.url"
            class="flex items-center w-full group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:items-center group-data-[state=collapsed]:justify-center"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="w-6! h-6! text-primary shrink-0 transition-all group-data-[state=collapsed]:mb-1"
            />

            <div
              class="text-base font-medium px-2 group-data-[state=collapsed]:text-[10px]! group-data-[state=collapsed]:px-1! group-data-[state=collapsed]:text-center! group-data-[state=collapsed]:w-full! group-data-[state=collapsed]:leading-tight! group-data-[state=collapsed]:line-clamp-2"
            >
              {{ item.title }}
            </div>
          </component>
        </SidebarMenuButton>

        <Transition
          enter-active-class="transition ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="activeFlyout?.title === item.title && item.groups?.length"
            class="fixed z-50 bg-white border-r p-8 transition-all w-[calc(100vw-6rem)] md:w-[calc(100vw-24rem)] top-16 h-[calc(100vh-4rem)] left-(--sidebar-width) group-data-[state=collapsed]:left-24! shadow-[10px_0px_15px_-3px_rgba(0,0,0,0.1)] overflow-y-auto"
          >
            <button
              @click="activeFlyout = null"
              class="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X class="w-6 h-6" />
            </button>

            <div class="mb-6">
              <h3 class="text-2xl font-bold text-slate-800">{{ item.title }}</h3>
            </div>

            <div v-if="item.actions?.length">
              <div class="flex flex-wrap gap-3 mb-8 border-b pb-6">
                <BoxButton
                  v-for="action in item.actions"
                  :key="action.title"
                  :name="action.title"
                  :icon="action.icon"
                />
              </div>
            </div>

            <nav class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
              <div
                v-for="group in item.groups"
                :key="group.label"
                class="flex flex-col gap-3 break-inside-avoid mb-8"
              >
                <h4 class="text-lg font-normal text-slate-900 mb-1">
                  {{ group.label }}
                </h4>
                <div class="flex flex-col gap-2">
                  <a
                    v-for="subItem in group.items"
                    :key="subItem.title"
                    :href="subItem.url"
                    class="text-[15px] text-blue-500 hover:text-blue-800 transition-colors inline-block w-fit"
                  >
                    {{ subItem.title }}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </Transition>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
