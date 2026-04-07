<template>
  <InputGroup>
    <InputGroupInput placeholder="Customer name" type="text" />
    <InputGroupAddon align="inline-end">
      <Popover>
        <PopoverTrigger as-child>
          <InputGroupButton variant="ghost" aria-label="Info" size="icon-sm">
            <Search />
          </InputGroupButton>
        </PopoverTrigger>

        <PopoverContent
          :class="[
            'shadow-2xl flex flex-col p-0 bg-background overflow-hidden',
            isExpanded
              ? 'inset-0! max-w-full! max-h-full! w-screen! h-screen! transform-none!'
              : 'w-200 max-w-[90vw] max-h-[80vh]',
          ]"
        >
          <div class="flex items-center justify-between px-4 py-3 border-b">
            <div class="font-medium text-base">Select Account</div>
            <div class="flex items-center gap-2 text-muted-foreground">
              <button
                @click="isExpanded = !isExpanded"
                class="hover:bg-muted p-1 rounded-md transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                <Minimize v-if="isExpanded" class="w-4 h-4" />
                <Maximize v-else class="w-4 h-4" />
              </button>
              <PopoverClose class="hover:bg-muted p-1 rounded-md transition-colors cursor-pointer">
                <X class="w-4 h-4" />
              </PopoverClose>
            </div>
          </div>

          <div class="p-4 flex flex-col">
            <SearchTable />
          </div>
        </PopoverContent>
      </Popover>
    </InputGroupAddon>
  </InputGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Maximize, Minimize, X } from 'lucide-vue-next'
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '../ui/input-group/InputGroupButton.vue'
import InputGroupInput from '../ui/input-group/InputGroupInput.vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { PopoverClose } from 'reka-ui'
import SearchTable from './SearchTable.vue'

const isExpanded = ref(false)
</script>
