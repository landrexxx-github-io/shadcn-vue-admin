<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import SearchTable from '../components/search-table.vue'
import Input from '@/components/ui/input/Input.vue'
</script>

<template>
  <div class="grid w-full max-w-sm gap-2">
    <InputGroup>
      <InputGroupInput placeholder="Customer name" type="text" />
      <InputGroupAddon align="inline-end">
        <Popover>
          <PopoverTrigger as-child>
            <InputGroupButton variant="ghost" aria-label="Info" size="icon-sm">
              <Search />
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent class="min-w-2xl">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="font-medium leading-none">Dimensions</h4>
                <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div class="grid gap-2"></div>
            </div>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="Customer name" type="text" />
      <InputGroupAddon align="inline-end">
        <Popover>
          <PopoverTrigger as-child>
            <InputGroupButton variant="ghost" aria-label="Info" size="icon-sm">
              <Search />
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent class="min-w-2xl shadow-2xl">
            <div class="flex justify-between">
              <div>Search - Customer Information</div>
              <div>right</div>
            </div>
            <div class="grid gap-4">
              <SearchTable />
            </div>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
    <Input />
  </div>
</template>
