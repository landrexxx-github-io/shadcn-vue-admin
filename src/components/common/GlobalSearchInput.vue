<template>
  <div class="relative w-full max-w-md">
    <InputGroup class="bg-white text-foreground">
      <InputGroupInput v-model="searchQuery" placeholder="Search..." class="rounded-sm!" />
      <InputGroupAddon align="inline-end">
        <button
          v-if="isSearchActive"
          @click="closeSearch"
          class="flex items-center justify-center p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X class="w-4 h-4 text-slate-500" />
        </button>
        <Search v-else class="w-4 h-4 text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>

    <Transition
      enter-active-class="transition ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="isSearchActive"
        :class="[
          'fixed z-50 bg-white border-r p-8 right-0 top-16 h-[calc(100vh-4rem)] group-data-[state=collapsed]:left-24! shadow-[10px_0px_15px_-3px_rgba(0,0,0,0.1)] overflow-y-auto',
          state === 'collapsed' ? 'w-[calc(100vw-6rem)]' : 'left-(--sidebar-width)',
        ]"
      >
        <button
          @click="closeSearch"
          class="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <X class="w-6 h-6" />
        </button>

        <div class="h-full flex flex-col">
          <div class="flex items-end justify-between border-b mb-8">
            <div class="flex space-x-8 justify-around w-full">
              <div class="flex-1 text-center">
                <Button
                  variant="ghost"
                  :class="[
                    'cursor-pointer w-full h-full rounded-none!',
                    activeTab === 'menu-items'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-800',
                  ]"
                  @click="activeTab = 'menu-items'"
                >
                  <List />
                  <span class="hidden md:flex"> MENU ITEMS ({{ totalResults }}) </span>
                </Button>
              </div>
              <div class="flex-1 text-center">
                <Button
                  variant="ghost"
                  :class="[
                    'cursor-pointer w-full h-full rounded-none!',
                    activeTab === 'transactions'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-800',
                  ]"
                  @click="activeTab = 'transactions'"
                >
                  <ArrowLeftRightIcon />
                  <span class="hidden md:flex"> TRANSACTIONS AND PROFILES </span>
                </Button>
              </div>
              <div class="flex-1 text-center">
                <Button
                  variant="ghost"
                  :class="[
                    'cursor-pointer w-full h-full rounded-none!',
                    activeTab === 'files'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-800',
                  ]"
                  @click="activeTab = 'files'"
                >
                  <PaperclipIcon />
                  <span class="hidden md:flex"> FILES </span>
                </Button>
              </div>
            </div>
          </div>

          <div class="flex-1">
            <div v-if="filteredResults.length > 0">
              <div v-for="module in filteredResults" :key="module.name" class="mb-12">
                <div class="mb-6 flex items-center gap-3 border-b pb-5">
                  <component :is="module.icon" class="w-6 h-6 text-slate-800" />
                  <h3 class="text-2xl font-bold text-slate-800">{{ module.name }}</h3>
                </div>

                <nav class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
                  <div
                    v-for="category in module.categories"
                    :key="category.name"
                    class="flex flex-col gap-3 break-inside-avoid mb-8"
                  >
                    <h4 class="text-lg font-normal text-slate-900 mb-1">
                      {{ category.name }}
                    </h4>

                    <div class="flex flex-col gap-2">
                      <a
                        v-for="(item, index) in category.items"
                        :key="index"
                        href="#"
                        class="text-[15px] text-blue-500 hover:text-blue-800 transition-colors inline-block w-fit"
                        v-html="highlightText(item, searchQuery)"
                      ></a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <div v-else class="text-center py-20 text-slate-500">
              <Search class="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p class="text-lg">No results found matching "{{ searchQuery }}".</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import {
  Search,
  X,
  PieChart,
  Clock,
  Calculator,
  Banknote,
  List,
  PaperclipIcon,
  ArrowLeftRightIcon,
} from 'lucide-vue-next'
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupInput from '../ui/input-group/InputGroupInput.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import { useSidebar } from '@/components/ui/sidebar'
import Button from '../ui/button/Button.vue'

const { state } = useSidebar()

const searchQuery = ref('')
const isSearchActive = ref(false)
const activeTab = ref('menu-items')
let debounceTimeout: ReturnType<typeof setTimeout> | null = null

// --- Hierarchical Dummy Data based on the image ---
const dummyData = ref([
  {
    name: 'Data Views',
    icon: PieChart,
    categories: [
      {
        name: 'Inquiries',
        items: [
          'Unreconciled Transactions',
          'Unprocessed GL Transactions w...',
          'GL-Accepted Prediction %',
        ],
      },
    ],
  },
  {
    name: 'Time and Expenses',
    icon: Clock,
    categories: [
      {
        name: 'Time Tracking',
        items: [
          'Employee Time Activities',
          'Approve Time Activities',
          'Release Time Activities',
          'Approve Time Activity Summaries',
        ],
      },
      {
        name: 'Inquiries',
        items: ['Activities'],
      },
      {
        name: 'Preferences',
        items: ['Activity Types'],
      },
    ],
  },
  {
    name: 'Finance',
    icon: Calculator,
    categories: [
      {
        name: 'Transactions',
        items: ['Journal Transactions'],
      },
      {
        name: 'Processes',
        items: [
          'Release Transactions',
          'Post Transactions',
          'Generate Recurring Transactions',
          'Reclassify Transactions',
          'Recalculate Account History',
        ],
      },
      {
        name: 'Inquiries',
        items: ['Account Summary', 'Account by Subaccount', 'Account by Period', 'Account Details'],
      },
      {
        name: 'Reports',
        items: [
          'Transactions for Period',
          'Transactions for Account',
          'GL Edit Account Distribution',
          'GL Recurring Transactions',
          'GL Recurring Transactions Detai...',
        ],
      },
      {
        name: 'Preferences',
        items: ['Inter-Branch Account Mapping', 'Account Classes'],
      },
      {
        name: 'Profiles',
        items: ['Recurring Transactions', 'Chart of Accounts', 'Subaccounts'],
      },
    ],
  },
  {
    name: 'Banking',
    icon: Banknote,
    categories: [
      {
        name: 'Transactions',
        items: ['Cash Sales', 'Cash Returns', 'Bank Deposits'],
      },
    ],
  },
])

// --- Deep Filtering Logic ---
const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return []

  const results = []

  for (const module of dummyData.value) {
    const matchedCategories = []

    for (const category of module.categories) {
      const matchedItems = category.items.filter((item) => item.toLowerCase().includes(query))

      if (matchedItems.length > 0) {
        matchedCategories.push({
          ...category,
          items: matchedItems,
        })
      }
    }

    if (matchedCategories.length > 0) {
      results.push({
        ...module,
        categories: matchedCategories,
      })
    }
  }

  return results
})

const totalResults = computed(() => {
  return filteredResults.value.reduce((total, mod) => {
    return total + mod.categories.reduce((catTotal, cat) => catTotal + cat.items.length, 0)
  }, 0)
})

// --- Highlighting Logic ---
function highlightText(text: string, query: string) {
  if (!query) return text

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')

  // Highlighted text matches the new font styling standards
  return text.replace(regex, '<strong class="font-bold text-slate-900">$1</strong>')
}

// --- Debounce & Panel Logic ---
watch(searchQuery, (newValue) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  debounceTimeout = setTimeout(() => {
    if (newValue.trim().length > 0) {
      isSearchActive.value = true
    } else {
      isSearchActive.value = false
    }
  }, 300)
})

function closeSearch() {
  isSearchActive.value = false
  searchQuery.value = ''
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isSearchActive.value) {
    closeSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
