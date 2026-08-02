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
    count: 3,
    title: 'Enquiry',
    description: 'Customer enquiry records will appear here.',
  },
  {
    value: 'quotation',
    label: 'Quotation',
    count: 3,
    title: 'Quotation',
    description: 'Quotation records will appear here.',
  },
  {
    value: 'invoice',
    label: 'Invoice',
    count: 2,
    title: 'Invoice',
    description: 'Invoice records will appear here.',
  },
  {
    value: 'lost-sale',
    label: 'Lost Sale',
    title: 'Lost Sale',
    description: 'Lost sale records will appear here.',
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
  <div class="flex h-full min-h-0 flex-col">
    <SplitterGroup direction="vertical" class="h-full min-h-0 overflow-hidden">
      <!-- Upper panel: 60% -->
      <SplitterPanel id="upper-panel" :default-size="60" :min-size="25" class="min-h-0">
        <!-- Responsive columns: 30 / 40 / 30 -->
        <div class="grid h-full min-h-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-[3fr_4fr_3fr]">
          <!-- First column: 30% -->
          <section class="min-h-0 min-w-0 md:col-span-2 xl:col-span-1">
            <div class="h-full overflow-y-auto p-4">
              <PartSearchItem />
            </div>
          </section>

          <!-- Second column: 40% -->
          <section class="min-h-0 min-w-0">
            <div class="h-full overflow-y-auto p-4">
              <!-- Second-column content -->
            </div>
          </section>

          <!-- Third column: 30% -->
          <section class="min-h-0 min-w-0">
            <div class="h-full overflow-y-auto p-4">
              <!-- Third-column content -->
            </div>
          </section>
        </div>
      </SplitterPanel>

      <!-- Custom draggable handle -->
      <SplitterResizeHandle
        id="vertical-panel-handle"
        class="group relative flex h-8 shrink-0 cursor-row-resize items-center justify-center bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        <!-- Horizontal separator line -->
        <div
          class="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border transition-colors group-hover:bg-primary/40"
        />

        <!-- Maximize/restore button -->
        <button
          type="button"
          class="relative z-10 flex h-6 items-center gap-1.5 rounded-full border bg-background px-3 text-[11px] font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :aria-label="isTopPanelMaximized ? 'Restore panel' : 'Minimize panel'"
          @pointerdown.stop
          @click.stop="toggleTopPanel"
        >
          <Minimize2Icon v-if="!isTopPanelMaximized" class="size-3.5" />

          <Maximize2Icon v-else class="size-3.5" />

          <span>
            {{ isTopPanelMaximized ? 'Restore panels' : 'Minimize panel' }}
          </span>
        </button>
      </SplitterResizeHandle>

      <!-- Lower panel: 40% -->
      <SplitterPanel
        id="lower-panel"
        ref="bottomPanelRef"
        :default-size="40"
        :min-size="20"
        :collapsed-size="0"
        collapsible
        class="min-h-0"
        @collapse="handleBottomPanelCollapse"
        @expand="handleBottomPanelExpand"
      >
        <Tabs default-value="web-online-basket" class="flex h-full min-h-0 flex-col p-4">
          <!-- Tab navigation -->
          <div class="shrink-0">
            <TabsList class="w-max justify-start">
              <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
                {{ tab.label }}

                <Badge
                  v-if="tab.count"
                  variant="secondary"
                  class="ml-1 flex size-5 items-center justify-center rounded-full bg-red-700 p-0 text-[10px] text-white hover:bg-red-700"
                >
                  {{ tab.count }}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <!-- Tab contents -->
          <TabsContent
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            class="mt-4 min-h-0 flex-1 overflow-y-auto data-[state=inactive]:hidden"
          >
            <div class="rounded-md border p-4">
              <h2 class="font-semibold">
                {{ tab.title }}
              </h2>

              <p class="mt-1 text-sm text-muted-foreground">
                {{ tab.description }}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
