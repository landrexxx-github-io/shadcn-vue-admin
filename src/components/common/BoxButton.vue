<script setup lang="ts">
import { Button } from '@/components/ui/button'
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue'
import Tooltip from '../ui/tooltip/Tooltip.vue'
import TooltipTrigger from '../ui/tooltip/TooltipTrigger.vue'
import TooltipContent from '../ui/tooltip/TooltipContent.vue'
import type { Component, FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

defineProps<{
  name: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps> | Component
}>()
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="default"
          class="w-36 h-20 aspect-square justify-start items-start gap-3 py-3 cursor-pointer"
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
