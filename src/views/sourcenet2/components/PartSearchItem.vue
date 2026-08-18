<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import InputGroup from '@/components/ui/input-group/InputGroup.vue'
import InputGroupAddon from '@/components/ui/input-group/InputGroupAddon.vue'
import InputGroupInput from '@/components/ui/input-group/InputGroupInput.vue'
import { Search } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    searchTerm?: string
    category?: string
    partRemark?: string
  }>(),
  {
    searchTerm: '',
    category: 'ct-parts',
    partRemark: 'de',
  },
)

const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:category': [value: string]
  'update:partRemark': [value: string]
  search: [
    filters: {
      searchTerm: string
      category: string
      partRemark: string
    },
  ]
}>()

const searchTermModel = computed({
  get: () => props.searchTerm,
  set: (value: string) => emit('update:searchTerm', value),
})

const categoryModel = computed({
  get: () => props.category,
  set: (value: string) => emit('update:category', value),
})

const partRemarkModel = computed({
  get: () => props.partRemark,
  set: (value: string) => emit('update:partRemark', value),
})

const recentSearchTerms = ref(['5722761', '7S3206', '1R-0750', '4P-0710'])

const categories = [
  { value: 'ct-parts', label: 'CT Parts' },
  { value: 'engine-parts', label: 'Engine Parts' },
  { value: 'hydraulic-parts', label: 'Hydraulic Parts' },
  { value: 'electrical-parts', label: 'Electrical Parts' },
]

const partRemarks = [
  { value: 'de', label: 'DE' },
  { value: 'oem', label: 'OEM' },
  { value: 'reb', label: 'REB' },
  { value: 'used', label: 'USED' },
  { value: 'ipd', label: 'IPD' },
  // { value: 'trk', label: 'TRK' },
  // { value: 'bq', label: 'BQ' },
  // { value: 'dsg', label: 'DSG' },
]

function saveRecentSearch(term: string): void {
  const normalizedTerm = term.trim()

  if (!normalizedTerm) {
    return
  }

  recentSearchTerms.value = [
    normalizedTerm,
    ...recentSearchTerms.value.filter(
      (recentTerm) => recentTerm.toLowerCase() !== normalizedTerm.toLowerCase(),
    ),
  ].slice(0, 5)
}

function handleSearch(): void {
  const normalizedSearchTerm = searchTermModel.value.trim()

  searchTermModel.value = normalizedSearchTerm
  saveRecentSearch(normalizedSearchTerm)

  emit('search', {
    searchTerm: normalizedSearchTerm,
    category: categoryModel.value,
    partRemark: partRemarkModel.value,
  })
}

function selectPartRemark(value: string): void {
  partRemarkModel.value = value
}
</script>

<template>
  <div class="w-full min-w-0">
    <Item variant="outline" class="w-full min-w-0 rounded-lg bg-card p-3 sm:p-4">
      <form class="grid w-full min-w-0 gap-2" @submit.prevent="handleSearch">
        <!-- Category -->
        <div class="grid min-w-0 grid-cols-1 items-center gap-1">
          <Label for="category-filter" class="text-muted-foreground uppercase text-[11px]">
            Category
          </Label>
          <Select v-model="categoryModel">
            <SelectTrigger id="category-filter" class="w-full min-w-0" size="sm">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem
                  v-for="category in categories"
                  :key="category.value"
                  :value="category.value"
                >
                  {{ category.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- Part number -->
        <div class="grid min-w-0 grid-cols-1 items-center gap-1">
          <Label for="part-search" class="text-muted-foreground uppercase text-[11px]">
            Part number
          </Label>
          <InputGroup class="h-8">
            <InputGroupInput
              id="part-search"
              v-model="searchTermModel"
              class="w-full min-w-0 text-sm"
              placeholder="Enter a part number"
            />

            <InputGroupAddon align="inline-end">
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <!-- Part remark -->
        <div class="grid min-w-0 grid-cols-1 items-center gap-1">
          <Label class="text-muted-foreground uppercase text-[11px]"> Part remark </Label>

          <div class="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Part remark">
            <Button
              v-for="remark in partRemarks"
              :key="remark.value"
              type="button"
              size="sm"
              :variant="partRemarkModel === remark.value ? 'default' : 'outline'"
              class="min-w-0 text-xs"
              role="radio"
              :aria-checked="partRemarkModel === remark.value"
              @click="selectPartRemark(remark.value)"
            >
              {{ remark.label }}
            </Button>
          </div>
        </div>
      </form>
    </Item>
  </div>
</template>
