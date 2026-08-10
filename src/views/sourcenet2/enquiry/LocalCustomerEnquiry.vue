<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { ChevronsDownIcon, ChevronsUpIcon, GripHorizontalIcon } from 'lucide-vue-next'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

import SourcenetWorkspace from '@/views/sourcenet2/SourcenetPartsWorkspace2.vue'

const upperPanelRef = ref<InstanceType<typeof SplitterPanel>>()
const isUpperPanelOpen = ref(false)

onMounted(async () => {
  await nextTick()

  // Start with the upper panel hidden and lower panel at full height.
  upperPanelRef.value?.collapse()
})

function toggleUpperPanel() {
  if (isUpperPanelOpen.value) {
    upperPanelRef.value?.collapse()
  } else {
    // Restores the panel to its default size of 50%.
    upperPanelRef.value?.expand()
  }
}

function handleUpperPanelCollapse() {
  isUpperPanelOpen.value = false
}

function handleUpperPanelExpand() {
  isUpperPanelOpen.value = true
}
</script>

<template>
  <!-- Adjust the 4rem value if your application header has a different height. -->
  <div class="h-[calc(100vh-4rem)] min-h-0 overflow-hidden">
    <SplitterGroup direction="vertical" class="h-full min-h-0">
      <!-- Upper panel -->
      <SplitterPanel
        ref="upperPanelRef"
        collapsible
        :default-size="50"
        :min-size="20"
        :collapsed-size="0"
        class="min-h-0 overflow-hidden"
        @collapse="handleUpperPanelCollapse"
        @expand="handleUpperPanelExpand"
      >
        <div class="h-full min-h-0 overflow-auto">
          <SourcenetWorkspace />
        </div>
      </SplitterPanel>

      <!-- Draggable divider and automatic 50/50 control -->
      <SplitterResizeHandle
        class="group relative flex h-2 shrink-0 items-center justify-center border-y bg-muted/60 transition-colors hover:bg-primary/10 data-[state=drag]:bg-primary/20"
      >
        <div
          class="flex h-5 items-center gap-1 rounded-full border bg-background px-1 text-muted-foreground shadow-sm"
        >
          <GripHorizontalIcon class="size-3.5" />

          <button
            type="button"
            class="flex size-5 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            :aria-label="isUpperPanelOpen ? 'Hide Sourcenet workspace' : 'Show Sourcenet workspace'"
            :title="isUpperPanelOpen ? 'Hide upper panel' : 'Open panels at 50/50'"
            @pointerdown.stop
            @click.stop="toggleUpperPanel"
          >
            <ChevronsUpIcon v-if="!isUpperPanelOpen" class="size-3.5" />

            <ChevronsDownIcon v-else class="size-3.5" />
          </button>
        </div>
      </SplitterResizeHandle>

      <!-- Lower panel -->
      <SplitterPanel :default-size="50" :min-size="30" class="min-h-0 overflow-hidden">
        <div class="flex h-full min-h-0 flex-col gap-4 overflow-auto p-4">
          <div>
            <h1 class="text-2xl font-bold">Local Customer Enquiry</h1>

            <p class="mt-1 text-muted-foreground">
              This is the Local Customer Enquiry page. You can add your content here.
            </p>
          </div>

          <!-- Add the local customer enquiry table/form here. -->
        </div>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
