<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Component, FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'
import { useRouter } from 'vue-router'
import Tooltip from '../ui/tooltip/Tooltip.vue'
import TooltipContent from '../ui/tooltip/TooltipContent.vue'
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue'
import TooltipTrigger from '../ui/tooltip/TooltipTrigger.vue'

const props = defineProps<{
  name: string
  url: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps> | Component
}>()

const router = useRouter()

const emit = defineEmits<{
  click: []
}>()

function navigateToPage() {
  if (!props.url || props.url === '#') return

  emit('click')
  router.push(props.url)
}
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="default"
          class="w-36 h-20 aspect-square justify-start items-start gap-3 py-3 cursor-pointer"
          @click="navigateToPage"
        >
          <component :is="icon" class="w-8! h-8! shrink-0 text-white" />
          <div class="flex flex-col text-left overflow-hidden">
            <span class="text-md leading-tight whitespace-normal w-full truncate">
              {{ name }}
            </span>
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ name }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
