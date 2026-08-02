<script setup lang="ts">
import { ref } from 'vue'
import { Maximize2Icon, Minimize2Icon } from 'lucide-vue-next'

import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Badge from '@/components/ui/badge/Badge.vue'
import PartSearchItem from './components/PartSearchItem.vue'

interface TabItem {
  value: string
  label: string
  count?: number
  title: string
  description: string
}

const tabs: TabItem[] = [
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
    // count: 3,
    title: 'Enquiry',
    description: 'Customer enquiry records will appear here.',
  },
  {
    value: 'quotation',
    label: 'Quotation',
    // count: 3,
    title: 'Quotation',
    description: 'Quotation records will appear here.',
  },
  {
    value: 'invoice',
    label: 'Invoice',
    // count: 2,
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

const bottomPanelRef = ref<InstanceType<typeof SplitterPanel> | null>(null)

const isTopPanelMaximized = ref(false)

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
  <div class="flex h-full w-full min-w-0 min-h-0 flex-col overflow-x-hidden">
    <SplitterGroup direction="vertical" class="h-full w-full min-w-0 min-h-0 overflow-hidden">
      <!-- Upper panel -->
      <SplitterPanel
        id="upper-panel"
        :default-size="60"
        :min-size="25"
        class="min-h-0 min-w-0 overflow-hidden"
      >
        <!--
          Mobile: one column
          Medium: first column full width, then two columns
          XL: 30 / 40 / 30
        -->
        <div class="h-full min-w-0 overflow-y-auto xl:overflow-hidden">
          <div
            class="grid min-h-full min-w-0 grid-cols-1 md:grid-cols-2 xl:h-full xl:min-h-0 xl:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,3fr)]"
          >
            <!-- First column -->
            <section class="min-w-0 md:col-span-2 xl:col-span-1 xl:min-h-0">
              <div class="min-w-0 p-4 xl:h-full xl:overflow-y-auto">
                <PartSearchItem />
              </div>
            </section>

            <!-- Second column -->
            <section class="min-w-0 xl:min-h-0">
              <div class="min-w-0 p-4 xl:h-full xl:overflow-y-auto">
                <!-- Second-column content -->
              </div>
            </section>

            <!-- Third column -->
            <section class="min-w-0 xl:min-h-0">
              <div class="min-w-0 p-4 xl:h-full xl:overflow-y-auto">
                <!-- Third-column content -->
              </div>
            </section>
          </div>
        </div>
      </SplitterPanel>

      <!-- Resize handle -->
      <SplitterResizeHandle
        id="vertical-panel-handle"
        class="group relative flex h-8 w-full shrink-0 cursor-row-resize items-center justify-center bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          class="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border transition-colors group-hover:bg-primary/40"
        />

        <button
          type="button"
          class="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-6 sm:w-auto sm:gap-1.5 sm:px-3"
          :aria-label="isTopPanelMaximized ? 'Restore panel' : 'Minimize panel'"
          @pointerdown.stop
          @click.stop="toggleTopPanel"
        >
          <Minimize2Icon v-if="!isTopPanelMaximized" class="size-3.5 shrink-0" />

          <Maximize2Icon v-else class="size-3.5 shrink-0" />

          <!-- Hide long text on extra-small screens -->
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
        <Tabs default-value="web-online-basket" class="flex h-full min-h-0 min-w-0 flex-col p-4">
          <!--
            Keep tab overflow inside this container instead of
            allowing it to increase the page width.
          -->
          <div class="-mx-4 min-w-0 shrink-0 overflow-x-auto px-4">
            <TabsList class="flex w-max min-w-full flex-nowrap justify-start">
              <TabsTrigger
                v-for="tab in tabs"
                :key="tab.value"
                :value="tab.value"
                class="shrink-0 whitespace-nowrap"
              >
                {{ tab.label }}

                <Badge
                  v-if="tab.count !== undefined"
                  variant="secondary"
                  class="ml-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-700 p-0 text-[10px] text-white hover:bg-red-700"
                >
                  {{ tab.count }}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            class="mt-4 min-h-0 min-w-0 flex-1 overflow-auto data-[state=inactive]:hidden"
          >
            <div class="max-w-full rounded-md border p-4">
              <h2 class="font-semibold">
                {{ tab.title }}
              </h2>

              <p class="mt-1 break-words text-sm text-muted-foreground">
                {{ tab.description }}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
