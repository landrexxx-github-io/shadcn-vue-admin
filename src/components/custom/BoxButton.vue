<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Component } from 'vue'

defineProps<{
  name: string
  icon: Component
}>()
</script>

<template>
  <Button
    variant="default"
    class="w-36 h-20 aspect-square justify-start items-start gap-3 py-3 cursor-pointer"
  >
    <component :is="icon" class="w-8! h-8! shrink-0 text-white" />
    <div class="flex flex-col text-left">
      <span class="text-md leading-tight whitespace-normal w-full h-auto">
        {{ name }}
      </span>
    </div>
  </Button>
</template>
