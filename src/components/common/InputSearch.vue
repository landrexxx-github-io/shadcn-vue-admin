<template>
  <InputGroup>
    <InputGroupInput placeholder="Search for part number..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
  </InputGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Maximize, Minimize, X, SearchIcon } from 'lucide-vue-next'
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '../ui/input-group/InputGroupButton.vue'
import InputGroupInput from '../ui/input-group/InputGroupInput.vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { PopoverClose } from 'reka-ui'
import Datatable from './DataTable.vue'

const isExpanded = ref(false)
</script>
