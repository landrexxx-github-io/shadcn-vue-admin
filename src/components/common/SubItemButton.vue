<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'

defineProps<{
  url: RouteLocationRaw
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <Button
    as-child
    variant="link"
    class="h-auto w-fit justify-start p-0 text-[15px] text-blue-500! no-underline hover:text-blue-800! hover:no-underline"
  >
    <RouterLink :to="url" @click="emit('click')">
      <slot />
    </RouterLink>
  </Button>
</template>
