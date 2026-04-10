<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <Popover>
        <PopoverTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer md:justify-center w-auto"
          >
            <Avatar class="h-8 w-8 rounded-lg flex items-center justify-center">
              <CalendarIcon />
            </Avatar>

            <div class="hidden md:flex flex-col flex-1 text-left leading-tight">
              <span class="truncate font-medium text-sm">{{ formattedDate }}</span>
              <span class="truncate text-[10px] opacity-80">{{ formattedTime }}</span>
            </div>
            <ChevronDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0" align="end">
          <Label class="p-3 border-b">Business Date:</Label>
          <Calendar initial-focus v-model="calendarDate" layout="month-and-year" />
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-vue-next'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

// Added imports for the Sidebar components to match NavUser
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Avatar } from '@/components/ui/avatar'

import { type DateValue, getLocalTimeZone, now } from '@internationalized/date'
import Label from '../ui/label/Label.vue'

// --- Date & Time Logic ---
const currentNativeTime = ref(new Date())
let timer: ReturnType<typeof setInterval>

const calendarDate = ref<DateValue>(now(getLocalTimeZone()))

onMounted(() => {
  timer = setInterval(() => {
    currentNativeTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const formattedDate = computed(() => {
  const date = calendarDate.value.toDate(getLocalTimeZone())
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const formattedTime = computed(() => {
  return currentNativeTime.value.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
})
</script>
