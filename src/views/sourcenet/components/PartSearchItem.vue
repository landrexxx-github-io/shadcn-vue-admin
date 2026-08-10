<script setup lang="ts">
import { computed, ref } from 'vue'

import { Item } from '@/components/ui/item'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import InputSearch from '@/components/common/InputSearch.vue'
import Label from '@/components/ui/label/Label.vue'

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
  { value: 'replacement', label: 'Replacement' },
  { value: 'alternate', label: 'Alternate' },
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
</script>

<template>
  <div class="w-full min-w-0">
    <Item
      variant="outline"
      class="w-full min-w-0 rounded-lg border-blue-200 bg-blue-50 p-3 shadow-sm dark:border-blue-900 dark:bg-blue-950/30"
    >
      <form
        class="grid w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2"
        @submit.prevent="handleSearch"
      >
        <div class="min-w-0 sm:col-span-2">
          <Label for="part-search" class="sr-only">Search part number</Label>
          <InputSearch
            id="part-search"
            v-model="searchTermModel"
            class="w-full min-w-0"
            placeholder="Search for part number..."
          />
        </div>

        <div class="min-w-0">
          <Label for="category-filter" class="sr-only">Category</Label>
          <Select v-model="categoryModel">
            <SelectTrigger id="category-filter" class="h-9 w-full min-w-0 rounded-md bg-background">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel><a href="#">Categories</a></SelectLabel>
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

        <div class="min-w-0">
          <label for="part-remark-filter" class="sr-only">Part remark</label>
          <Select v-model="partRemarkModel">
            <SelectTrigger
              id="part-remark-filter"
              class="h-9 w-full min-w-0 rounded-md bg-background"
            >
              <SelectValue placeholder="Select part remark" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Part remarks</SelectLabel>
                <SelectItem v-for="remark in partRemarks" :key="remark.value" :value="remark.value">
                  {{ remark.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </Item>
  </div>
</template>
