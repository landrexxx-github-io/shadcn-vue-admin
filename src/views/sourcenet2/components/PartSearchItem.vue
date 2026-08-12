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
import InputGroupInput from '@/components/ui/input-group/InputGroupInput.vue'
import { Search } from 'lucide-vue-next'
import InputGroupAddon from '@/components/ui/input-group/InputGroupAddon.vue'

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
  // { value: 'used', label: 'USED' },
  // { value: 'ipd', label: 'IPD' },
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
    <Item variant="outline" class="w-full min-w-0 rounded-xl bg-card p-3 shadow-sm sm:p-4">
      <form
        class="grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,3fr)_minmax(180px,1fr)]"
        @submit.prevent="handleSearch"
      >
        <!-- Category and part-number search -->
        <div class="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-1">
          <div class="grid min-w-0 gap-1.5">
            <div class="flex justify-between">
              <Label for="category-filter"> Category </Label>
              <Label for="category-filter"> </Label>
            </div>

            <Select v-model="categoryModel">
              <SelectTrigger id="category-filter" class="w-full min-w-0">
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

          <div class="grid min-w-0 gap-1.5">
            <Label for="part-search"> Part number </Label>
            <InputGroup>
              <InputGroupInput
                id="part-search"
                v-model="searchTermModel"
                class="w-full min-w-0"
                placeholder="Enter a part number"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <!-- Part remarks -->
        <div class="min-w-0 border-t pt-4 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">
          <div class="mb-2">
            <Label>Part remark</Label>
          </div>

          <div
            class="grid grid-cols-4 gap-1.5 sm:grid-cols-8 xl:grid-cols-2"
            role="radiogroup"
            aria-label="Part remark"
          >
            <Button
              v-for="remark in partRemarks"
              :key="remark.value"
              type="button"
              size="sm"
              :variant="partRemarkModel === remark.value ? 'default' : 'outline'"
              class="h-8 min-w-0 px-1.5 text-xs"
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
