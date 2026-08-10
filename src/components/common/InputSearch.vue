<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'

const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <div class="relative w-full min-w-0">
    <SearchIcon
      class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
    />

    <input
      v-model="model"
      v-bind="$attrs"
      type="search"
      class="flex h-9 w-full rounded-md border border-input bg-background py-1 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
    />
  </div>
</template>
