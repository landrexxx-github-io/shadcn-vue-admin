<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronUpIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent } from '@/components/ui/item'

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

const itemRef = ref<HTMLElement | null>(null)
const isFilterExpanded = ref(false)

const selectedCategory = ref('ct-parts')
const selectedPartRemark = ref('de')

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

const selectedCategoryLabel = computed(() => {
  return (
    categories.find((category) => category.value === selectedCategory.value)?.label ?? 'ct-parts'
  )
})

const selectedPartRemarkLabel = computed(() => {
  return partRemarks.find((remark) => remark.value === selectedPartRemark.value)?.label ?? 'de'
})

const activeFilterLabel = computed(() => {
  return `${selectedCategoryLabel.value} · ${selectedPartRemarkLabel.value}`
})

function toggleFilter(): void {
  isFilterExpanded.value = !isFilterExpanded.value
}

function handleClickOutside(event: PointerEvent): void {
  if (!isFilterExpanded.value || !itemRef.value) {
    return
  }

  const eventPath = event.composedPath()

  // The search item itself
  const clickedInsideItem = eventPath.includes(itemRef.value)

  // SelectContent is portalled outside itemRef, so it must be
  // treated as part of the floating search component.
  const clickedInsideSelectContent = eventPath.some((node) => {
    return node instanceof Element && node.matches('[data-part-filter-select="true"]')
  })

  if (!clickedInsideItem && !clickedInsideSelectContent) {
    isFilterExpanded.value = false
  }
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    isFilterExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div ref="itemRef" class="w-full">
    <Item
      variant="outline"
      class="w-full flex-col items-stretch bg-background/95 shadow-lg backdrop-blur transition-all duration-200 supports-backdrop-filter:bg-background/80"
    >
      <!-- Main search row -->
      <div class="flex w-full items-start gap-3">
        <ItemContent class="min-w-0 flex-1">
          <InputSearch class="w-full" />

          <!-- Selected filter summary -->
          <p class="mt-1.5 truncate px-1 text-[12px] text-muted-foreground">
            <span class="font-medium text-foreground/70"> Filters: </span>
            {{ activeFilterLabel }}
          </p>
        </ItemContent>

        <ItemActions class="shrink-0">
          <Button
            type="button"
            variant="outline"
            :aria-expanded="isFilterExpanded"
            aria-controls="part-search-filters"
            @click="toggleFilter"
          >
            <ChevronUpIcon v-if="isFilterExpanded" class="size-4" />

            <SlidersHorizontalIcon v-else class="size-4" />

            <span class="hidden sm:inline"> Filter </span>
          </Button>
        </ItemActions>
      </div>

      <!-- Expanded filter panel -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="-translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-1 opacity-0"
      >
        <div
          v-if="isFilterExpanded"
          id="part-search-filters"
          class="grid w-full gap-3 border-t pt-2 sm:grid-cols-[1.35fr_1fr]"
        >
          <!-- Category -->
          <div class="space-y-2.5">
            <label
              for="category-filter"
              class="mb-1 block text-xs font-normal text-muted-foreground"
            >
              Category
            </label>

            <div class="flex items-center gap-2">
              <Select v-model="selectedCategory">
                <SelectTrigger id="category-filter" class="h-9 min-w-0 flex-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent data-part-filter-select="true">
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

              <Button
                type="button"
                size="icon"
                class="size-9 shrink-0"
                aria-label="Search selected filters"
                title="Search"
              >
                <SearchIcon class="size-4" />
              </Button>
            </div>
          </div>

          <!-- Part remark -->
          <div class="space-y-2.5">
            <label
              for="part-remark-filter"
              class="mb-1 block text-xs font-normal text-muted-foreground"
            >
              Part remark
            </label>

            <Select v-model="selectedPartRemark">
              <SelectTrigger id="part-remark-filter" class="h-9 w-full">
                <SelectValue placeholder="Select part remark" />
              </SelectTrigger>

              <!-- Marker used by handleClickOutside -->
              <SelectContent data-part-filter-select="true">
                <SelectGroup>
                  <SelectLabel>Part remarks</SelectLabel>

                  <SelectItem
                    v-for="remark in partRemarks"
                    :key="remark.value"
                    :value="remark.value"
                  >
                    {{ remark.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Transition>
    </Item>
  </div>
</template>
