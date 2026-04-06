<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Input
    data-slot="input-group-control"
    :class="
      cn(
        // Added `h-full` and `py-0` here to override the base Input padding
        'flex-1 h-full py-0 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent focus-visible:border-ring text-sm',
        props.class,
      )
    "
  />
</template>
