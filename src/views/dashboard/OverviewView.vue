<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CheckIcon,
  ChevronDownIcon,
  Layers3Icon,
  Maximize2Icon,
  Minimize2Icon,
} from 'lucide-vue-next'

import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Badge from '@/components/ui/badge/Badge.vue'
import PartSearchItem from './components/PartSearchItem.vue'

interface MenuItem {
  value: string
  label: string
  count?: number
  title: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    value: 'web-online-basket',
    label: 'Online Enquiry',
    count: 3,
    title: 'Web Online Basket',
    description: 'Online enquiry records will appear here.',
  },
  {
    value: 'enquiry',
    label: 'Enquiry',
    title: 'Enquiry',
    description: 'Customer enquiry records will appear here.',
  },
  {
    value: 'quotation',
    label: 'Quotation',
    title: 'Quotation',
    description: 'Quotation records will appear here.',
  },
  {
    value: 'invoice',
    label: 'Invoice',
    title: 'Invoice',
    description: 'Invoice records will appear here.',
  },
  {
    value: 'lost-sale',
    label: 'Lost Sale',
    title: 'Lost Sale',
    description: 'Lost sale records will appear here.',
  },
  {
    value: 'branch-transfer',
    label: 'Branch Transfer',
    title: 'Branch Transfer',
    description: 'Branch transfer records will appear here.',
  },
  {
    value: 'store-transfer',
    label: 'Store Transfer',
    title: 'Store Transfer',
    description: 'Store transfer records will appear here.',
  },
  {
    value: 'transfers',
    label: 'Transfers',
    title: 'Transfers',
    description: 'Transfer records will appear here.',
  },
  {
    value: 'order',
    label: 'Order',
    title: 'Order',
    description: 'Order records will appear here.',
  },
]

const selectedMenuValue = ref('web-online-basket')

const selectedMenu = computed<MenuItem>(() => {
  return menuItems.find((item) => item.value === selectedMenuValue.value) ?? menuItems[0]!
})

const bottomPanelRef = ref<InstanceType<typeof SplitterPanel> | null>(null)

const isTopPanelMaximized = ref(false)

function selectMenu(value: string): void {
  selectedMenuValue.value = value
}

function toggleTopPanel(): void {
  const bottomPanel = bottomPanelRef.value

  if (!bottomPanel) {
    return
  }

  if (isTopPanelMaximized.value) {
    bottomPanel.expand()
  } else {
    bottomPanel.collapse()
  }
}

function handleBottomPanelCollapse(): void {
  isTopPanelMaximized.value = true
}

function handleBottomPanelExpand(): void {
  isTopPanelMaximized.value = false
}
</script>

<template>
  <div class="flex h-full w-full min-h-0 min-w-0 max-w-full flex-col overflow-x-hidden">
    <SplitterGroup
      direction="vertical"
      class="h-full w-full min-h-0 min-w-0 max-w-full overflow-hidden"
    >
      <!-- Upper panel -->
      <SplitterPanel
        id="upper-panel"
        :default-size="60"
        :min-size="25"
        class="min-h-0 min-w-0 overflow-hidden"
      >
        <div class="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto xl:overflow-y-hidden">
          <div
            class="grid min-h-full w-full min-w-0 grid-cols-1 md:grid-cols-2 xl:h-full xl:min-h-0 xl:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,3fr)] xl:grid-rows-[auto_minmax(0,1fr)]"
          >
            <!-- Part search row -->
            <section class="min-w-0 overflow-x-hidden md:col-span-2 xl:col-span-3">
              <div class="mx-auto w-full min-w-0 max-w-3xl px-3 pb-2 sm:px-4">
                <PartSearchItem />
              </div>
            </section>

            <!-- First content column -->
            <section class="min-w-0 overflow-x-hidden xl:min-h-0">
              <div class="min-w-0 p-3 sm:p-4 xl:h-full xl:overflow-y-auto">
                <!-- First-column content -->
              </div>
            </section>

            <!-- Second content column -->
            <section class="min-w-0 overflow-x-hidden xl:min-h-0">
              <div class="min-w-0 p-3 sm:p-4 xl:h-full xl:overflow-y-auto">
                <!-- Second-column content -->
              </div>
            </section>

            <!-- Third content column -->
            <section class="min-w-0 overflow-x-hidden xl:min-h-0">
              <div class="min-w-0 p-3 sm:p-4 xl:h-full xl:overflow-y-auto">
                <!-- Third-column content -->
              </div>
            </section>
          </div>
        </div>
      </SplitterPanel>

      <!-- Resize handle -->
      <SplitterResizeHandle
        id="vertical-panel-handle"
        class="group relative flex h-8 w-full min-w-0 shrink-0 cursor-row-resize items-center justify-center overflow-hidden bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          class="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border transition-colors group-hover:bg-primary/40"
        />

        <button
          type="button"
          class="relative z-1 flex size-7 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-6 sm:w-auto sm:gap-1.5 sm:px-3"
          :aria-label="isTopPanelMaximized ? 'Restore panels' : 'Minimize lower panel'"
          @pointerdown.stop
          @click.stop="toggleTopPanel"
        >
          <Minimize2Icon v-if="!isTopPanelMaximized" class="size-3.5 shrink-0" />

          <Maximize2Icon v-else class="size-3.5 shrink-0" />

          <span class="hidden whitespace-nowrap text-[11px] font-medium sm:inline">
            {{ isTopPanelMaximized ? 'Restore panels' : 'Minimize panel' }}
          </span>
        </button>
      </SplitterResizeHandle>

      <!-- Lower panel -->
      <SplitterPanel
        id="lower-panel"
        ref="bottomPanelRef"
        :default-size="40"
        :min-size="20"
        :collapsed-size="0"
        collapsible
        class="min-h-0 min-w-0 overflow-hidden"
        @collapse="handleBottomPanelCollapse"
        @expand="handleBottomPanelExpand"
      >
        <div
          class="flex h-full w-full min-h-0 min-w-0 max-w-full flex-col overflow-hidden p-3 sm:p-4"
        >
          <!-- Popup menu -->
          <div class="min-w-0 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" class="h-10 w-full min-w-0 justify-between sm:w-72">
                  <span class="flex min-w-0 items-center gap-2 overflow-hidden">
                    <Layers3Icon class="size-4 shrink-0 text-muted-foreground" />

                    <span class="truncate">
                      {{ selectedMenu.label }}
                    </span>

                    <Badge
                      v-if="selectedMenu.count !== undefined"
                      variant="secondary"
                      class="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-700 p-0 text-[10px] text-white hover:bg-red-700"
                    >
                      {{ selectedMenu.count }}
                    </Badge>
                  </span>

                  <ChevronDownIcon class="ml-2 size-4 shrink-0 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                :side-offset="6"
                class="max-h-80 w-[var(--reka-dropdown-menu-trigger-width)] min-w-64 overflow-y-auto"
              >
                <DropdownMenuLabel class="flex items-center gap-2">
                  <Layers3Icon class="size-4" />

                  Select section
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    v-for="item in menuItems"
                    :key="item.value"
                    class="cursor-pointer"
                    @select="selectMenu(item.value)"
                  >
                    <div class="flex w-full min-w-0 items-center justify-between gap-3">
                      <span class="flex min-w-0 items-center gap-2">
                        <CheckIcon
                          class="size-4 shrink-0"
                          :class="selectedMenuValue === item.value ? 'opacity-100' : 'opacity-0'"
                        />

                        <span
                          class="truncate"
                          :class="{
                            'font-medium': selectedMenuValue === item.value,
                          }"
                        >
                          {{ item.label }}
                        </span>
                      </span>

                      <Badge
                        v-if="item.count !== undefined"
                        variant="secondary"
                        class="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-700 p-0 text-[10px] text-white hover:bg-red-700"
                      >
                        {{ item.count }}
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <!-- Selected menu content -->
          <div class="mt-3 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
            <div class="w-full min-w-0 overflow-hidden rounded-md border bg-card p-4">
              <div class="flex min-w-0 items-start gap-3">
                <div class="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Layers3Icon class="size-4 text-muted-foreground" />
                </div>

                <div class="min-w-0">
                  <h2 class="break-words font-semibold">
                    {{ selectedMenu.title }}
                  </h2>

                  <p class="mt-1 break-words text-sm text-muted-foreground">
                    {{ selectedMenu.description }}
                  </p>
                </div>
              </div>

              <div class="mt-4 min-w-0">
                <!-- Online enquiry -->
                <template v-if="selectedMenuValue === 'web-online-basket'">
                  <!-- Add your OnlineEnquiry component here -->
                </template>

                <!-- Enquiry -->
                <template v-else-if="selectedMenuValue === 'enquiry'">
                  <!-- Add your Enquiry component here -->
                </template>

                <!-- Quotation -->
                <template v-else-if="selectedMenuValue === 'quotation'">
                  <!-- Add your Quotation component here -->
                </template>

                <!-- Invoice -->
                <template v-else-if="selectedMenuValue === 'invoice'">
                  <!-- Add your Invoice component here -->
                </template>

                <!-- Lost sale -->
                <template v-else-if="selectedMenuValue === 'lost-sale'">
                  <!-- Add your LostSale component here -->
                </template>

                <!-- Branch transfer -->
                <template v-else-if="selectedMenuValue === 'branch-transfer'">
                  <!-- Add your BranchTransfer component here -->
                </template>

                <!-- Store transfer -->
                <template v-else-if="selectedMenuValue === 'store-transfer'">
                  <!-- Add your StoreTransfer component here -->
                </template>

                <!-- Transfers -->
                <template v-else-if="selectedMenuValue === 'transfers'">
                  <!-- Add your Transfers component here -->
                </template>

                <!-- Order -->
                <template v-else-if="selectedMenuValue === 'order'">
                  <!-- Add your Order component here -->
                </template>
              </div>
            </div>
          </div>
        </div>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
