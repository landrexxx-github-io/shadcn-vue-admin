<script setup lang="ts">
import { ref } from 'vue'

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

const emit = defineEmits<{
  search: [
    filters: {
      searchTerm: string
      category: string
      partRemark: string
    },
  ]
}>()

const searchTerm = ref('')
const selectedCategory = ref('ct-parts')
const selectedPartRemark = ref('de')

const recentSearchTerms = ref(['7S3206', '1R-0750', '4P-0710', '8N-7005'])

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
  const normalizedSearchTerm = searchTerm.value.trim()

  saveRecentSearch(normalizedSearchTerm)

  emit('search', {
    searchTerm: normalizedSearchTerm,
    category: selectedCategory.value,
    partRemark: selectedPartRemark.value,
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
        class="grid w-full min-w-0 grid-cols-1 items-start gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(15rem,2fr)_minmax(10rem,1fr)_minmax(9rem,0.8fr)]"
        @submit.prevent="handleSearch"
      >
        <!-- Part-number search and recent searches -->
        <div class="min-w-0 sm:col-span-3 lg:col-span-1">
          <label for="part-search" class="sr-only"> Search part number </label>

          <InputSearch
            id="part-search"
            v-model="searchTerm"
            class="w-full min-w-0"
            placeholder="Search part number"
          />

          <!-- <div
            v-if="recentSearchTerms.length"
            class="mt-2 flex min-w-0 flex-wrap items-center gap-1.5"
          >
            <span class="mr-0.5 text-xs text-muted-foreground">
              Recent:
            </span>

            <button
              v-for="term in recentSearchTerms"
              :key="term"
              type="button"
              class="max-w-32 truncate rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :title="`Search for ${term}`"
              @click="selectRecentSearch(term)"
            >
              {{ term }}
            </button>
          </div> -->
        </div>

        <!-- Category -->
        <div class="min-w-0">
          <label for="category-filter" class="sr-only"> Category </label>

          <Select v-model="selectedCategory">
            <SelectTrigger id="category-filter" class="h-9 w-full min-w-0">
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
                  <span class="flex w-full min-w-0 items-center justify-between gap-3">
                    <span class="truncate">
                      {{ category.label }}
                    </span>
                  </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- Part remark -->
        <div class="min-w-0">
          <label for="part-remark-filter" class="sr-only"> Part remark </label>

          <Select v-model="selectedPartRemark">
            <SelectTrigger id="part-remark-filter" class="h-9 w-full min-w-0">
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
