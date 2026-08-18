<script setup lang="ts">
import { ChevronsDownIcon, ChevronsUpIcon, GripHorizontalIcon, SearchIcon } from 'lucide-vue-next'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'
import { nextTick, onMounted, reactive, ref } from 'vue'

import { Badge } from '@/components/ui/badge'
import SourcenetWorkspace from '@/views/sourcenet2/SourcenetPartsWorkspace2.vue'

interface EnquiryRecord {
  id: number
  customerCode: string
  customerName: string
  category: string
  remarkCode: string
  partNumber: string
  description: string
  enquiryQuantity: number
  targetPrice: number
  warehouse: string
  dePrice: number
  remarks: string
  enquiryDate: string
  status: 'Pending' | 'Completed' | 'Sent'
}

const enquiryRecords = ref<EnquiryRecord[]>([
  {
    id: 1,
    customerCode: 'AL MA',
    customerName: 'AL MAHA HEAVY EQUIPMENT PARTS',
    category: 'CT',
    remarkCode: 'DE',
    partNumber: '5722761',
    description: 'GASKET KT',
    enquiryQuantity: 1,
    targetPrice: 0,
    warehouse: 'BQ',
    dePrice: 598,
    remarks: '4/5 DAYS',
    enquiryDate: '03/08/2026 03:10',
    status: 'Pending',
  },
  {
    id: 2,
    customerCode: 'AL MA',
    customerName: 'AL MAHA HEAVY EQUIPMENT PARTS',
    category: 'CT',
    remarkCode: 'DE',
    partNumber: '7S3206',
    description: 'SEAL-O-RING',
    enquiryQuantity: 2,
    targetPrice: 0,
    warehouse: 'UAE',
    dePrice: 3,
    remarks: 'EX-STOCK',
    enquiryDate: '03/08/2026 03:12',
    status: 'Pending',
  },
  {
    id: 3,
    customerCode: 'AL RO',
    customerName: 'AL RODHA HEAVY EQUIP SPARE PARTS TR. LLC',
    category: 'EN',
    remarkCode: 'OEM',
    partNumber: '1R-0750',
    description: 'FILTER-AS LUBE',
    enquiryQuantity: 4,
    targetPrice: 82,
    warehouse: 'DE',
    dePrice: 86,
    remarks: 'EX-STOCK',
    enquiryDate: '03/08/2026 03:18',
    status: 'Sent',
  },
  {
    id: 4,
    customerCode: 'AL RO',
    customerName: 'AL RODHA HEAVY EQUIP SPARE PARTS TR. LLC',
    category: 'EN',
    remarkCode: 'Replacement',
    partNumber: '4P-0710',
    description: 'GASKET-CYLINDER HEAD',
    enquiryQuantity: 2,
    targetPrice: 145,
    warehouse: 'ADH',
    dePrice: 149,
    remarks: '2/3 DAYS',
    enquiryDate: '03/08/2026 03:24',
    status: 'Completed',
  },
])

interface EnquiryForm {
  customerName: string
  location: string
  preparedBy: string
  category: string
  partNumber: string
  partRemark: string
  description: string
  delivery: string
  quantity: number
  unitPrice: number
  discountPercent: number
  remarks: string
}

const enquiryForm = reactive<EnquiryForm>({
  customerName: '',
  location: 'Abu Dhabi',
  preparedBy: 'Amro',
  category: 'CT',
  partNumber: '',
  partRemark: 'DE',
  description: '',
  delivery: 'Ex-Stock',
  quantity: 1,
  unitPrice: 0,
  discountPercent: 0,
  remarks: '',
})

const formMessage = ref('')

function triggerWorkspaceSearch(): void {
  const partNumber = enquiryForm.partNumber.trim()

  if (!partNumber) {
    formMessage.value = 'Enter a part number first.'
    return
  }

  selectedEnquiryId.value = null
  selectedPartNumber.value = partNumber
  selectedCategory.value = toWorkspaceCategory(enquiryForm.category)
  selectedPartRemark.value = toWorkspaceRemark(enquiryForm.partRemark)
  formMessage.value = `Searching Sourcenet for ${partNumber}â€¦`
  openWorkspace()
}

function insertEnquiry(): void {
  const partNumber = enquiryForm.partNumber.trim()

  const newRecord: EnquiryRecord = {
    id: Math.max(0, ...enquiryRecords.value.map((record) => record.id)) + 1,
    customerCode: enquiryForm.customerName.slice(0, 5).toUpperCase(),
    customerName: enquiryForm.customerName.trim() || 'TEST CUSTOMER',
    category: enquiryForm.category,
    remarkCode: enquiryForm.partRemark,
    partNumber,
    description: enquiryForm.description.trim() || 'TEST ITEM DESCRIPTION',
    enquiryQuantity: Number(enquiryForm.quantity) || 1,
    targetPrice: 0,
    warehouse: enquiryForm.location,
    dePrice: Number(enquiryForm.unitPrice) || 0,
    remarks: enquiryForm.remarks.trim() || enquiryForm.delivery,
    enquiryDate: new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date()),
    status: 'Pending',
  }

  enquiryRecords.value.unshift(newRecord)
  selectCustomerEnquiry(newRecord)
  formMessage.value = `Enquiry for ${partNumber} was added.`
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
  }).format(value)
}

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

const selectedEnquiryId = ref<number | null>(enquiryRecords.value[0]?.id ?? null)
const selectedPartNumber = ref(enquiryRecords.value[0]?.partNumber ?? '')
const selectedCategory = ref(toWorkspaceCategory(enquiryRecords.value[0]?.category ?? 'CT'))
const selectedPartRemark = ref(toWorkspaceRemark(enquiryRecords.value[0]?.remarkCode ?? 'DE'))

function toWorkspaceCategory(category: string): string {
  return category.toUpperCase() === 'EN' ? 'engine-parts' : 'ct-parts'
}

function toWorkspaceRemark(remarkCode: string): string {
  return remarkCode.toUpperCase() === 'OEM' ? 'oem' : 'de'
}

function selectCustomerEnquiry(record: EnquiryRecord): void {
  selectedEnquiryId.value = record.id
  selectedPartNumber.value = record.partNumber
  selectedCategory.value = toWorkspaceCategory(record.category)
  selectedPartRemark.value = toWorkspaceRemark(record.remarkCode)

  openWorkspace()
}

function openWorkspace(): void {
  if (isUpperPanelOpen.value) return

  isUpperPanelOpen.value = true
  upperPanelRef.value?.expand()
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
          <SourcenetWorkspace
            :part-number="selectedPartNumber"
            :category="selectedCategory"
            :part-remark="selectedPartRemark"
          />
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
        <div class="flex h-full min-h-0 flex-col gap-3 overflow-hidden p-4">
          <h1 class="text-2xl font-bold">Local Customer Enquiry</h1>

          <div class="grid min-h-0 flex-1 gap-4 overflow-auto lg:grid-cols-[320px_minmax(0,1fr)]">
            <!-- Enquiry entry form -->
            <form
              class="h-fit rounded-lg border bg-card p-4 shadow-sm"
              @submit.prevent="insertEnquiry"
            >
              <div class="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 class="font-semibold">New enquiry</h2>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <label class="grid gap-1 text-xs font-medium">
                  Category
                  <select
                    v-model="enquiryForm.category"
                    class="h-9 rounded-md border bg-background px-2 font-normal outline-none focus:border-primary"
                  >
                    <option value="CT">CT</option>
                    <option value="EN">EN</option>
                  </select>
                </label>

                <label class="grid gap-1 text-xs font-medium">
                  Part remark
                  <select
                    v-model="enquiryForm.partRemark"
                    class="h-9 rounded-md border bg-background px-2 font-normal outline-none focus:border-primary"
                  >
                    <option value="DE">DE</option>
                    <option value="OEM">OEM</option>
                    <option value="Replacement">Replacement</option>
                  </select>
                </label>

                <label class="col-span-2 grid gap-1 text-xs font-medium">
                  Part number <span class="text-destructive">*</span>
                  <div class="flex gap-2">
                    <input
                      v-model="enquiryForm.partNumber"
                      required
                      placeholder="Enter part number"
                      class="h-9 min-w-0 flex-1 rounded-md border bg-background px-3 font-normal uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      @change="triggerWorkspaceSearch"
                      @keydown.enter.prevent="triggerWorkspaceSearch"
                    />
                    <button
                      type="button"
                      class="h-9 rounded-md border bg-background px-3 text-xs font-medium transition hover:bg-accent"
                      @click="triggerWorkspaceSearch"
                    >
                      <SearchIcon class="size-4" />
                    </button>
                  </div>
                </label>

                <label class="col-span-2 grid gap-1 text-xs font-medium">
                  Description
                  <input
                    v-model="enquiryForm.description"
                    placeholder="Part description"
                    class="h-9 rounded-md border bg-background px-3 font-normal outline-none focus:border-primary"
                  />
                </label>

                <label class="col-span-2 grid gap-1 text-xs font-medium">
                  Remarks
                  <textarea
                    v-model="enquiryForm.remarks"
                    rows="2"
                    placeholder="Optional remarks"
                    class="resize-none rounded-md border bg-background px-3 py-2 font-normal outline-none focus:border-primary"
                  />
                </label>
              </div>

              <p
                v-if="formMessage"
                class="mt-3 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground"
                aria-live="polite"
              >
                {{ formMessage }}
              </p>

              <button
                type="submit"
                class="mt-4 h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Add enquiry
              </button>
            </form>

            <!-- Enquiry records -->
            <div class="min-h-80 overflow-auto rounded-lg border">
              <table class="w-full min-w-295 text-left text-xs">
                <thead class="sticky top-0 z-10 bg-muted text-muted-foreground">
                  <tr>
                    <th class="px-3 py-2.5 font-medium">Customer</th>
                    <th class="px-3 py-2.5 font-medium">Part no.</th>
                    <th class="px-3 py-2.5 font-medium">Description</th>
                    <th class="px-3 py-2.5 font-medium">Category</th>
                    <th class="px-3 py-2.5 font-medium">Remark</th>
                    <th class="px-3 py-2.5 text-right font-medium">Qty</th>
                    <th class="px-3 py-2.5 text-right font-medium">Target price</th>
                    <th class="px-3 py-2.5 font-medium">Warehouse</th>
                    <th class="px-3 py-2.5 text-right font-medium">DE price</th>
                    <th class="px-3 py-2.5 font-medium">Availability</th>
                    <th class="px-3 py-2.5 font-medium">Enquiry date</th>
                    <th class="px-3 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr
                    v-for="record in enquiryRecords"
                    :key="record.id"
                    tabindex="0"
                    class="cursor-pointer transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                    :class="selectedEnquiryId === record.id ? 'bg-primary/10' : ''"
                    @click="selectCustomerEnquiry(record)"
                    @keydown.enter.prevent="selectCustomerEnquiry(record)"
                    @keydown.space.prevent="selectCustomerEnquiry(record)"
                  >
                    <td class="px-3 py-2.5">
                      <p
                        class="max-w-[240px] truncate text-[11px] text-muted-foreground"
                        :title="record.customerName"
                      >
                        {{ record.customerName }}
                      </p>
                    </td>
                    <td class="px-3 py-2.5 font-semibold text-primary">
                      {{ record.partNumber }}
                    </td>
                    <td class="px-3 py-2.5">{{ record.description }}</td>
                    <td class="px-3 py-2.5">{{ record.category }}</td>
                    <td class="px-3 py-2.5">{{ record.remarkCode }}</td>
                    <td class="px-3 py-2.5 text-right tabular-nums">
                      {{ record.enquiryQuantity }}
                    </td>
                    <td class="px-3 py-2.5 text-right tabular-nums">
                      {{ formatMoney(record.targetPrice) }}
                    </td>
                    <td class="px-3 py-2.5">{{ record.warehouse }}</td>
                    <td class="px-3 py-2.5 text-right font-medium tabular-nums">
                      {{ formatMoney(record.dePrice) }}
                    </td>
                    <td class="px-3 py-2.5">{{ record.remarks }}</td>
                    <td class="whitespace-nowrap px-3 py-2.5">
                      {{ record.enquiryDate }}
                    </td>
                    <td class="px-3 py-2.5">
                      <Badge
                        variant="outline"
                        :class="{
                          'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400':
                            record.status === 'Pending',
                          'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400':
                            record.status === 'Completed',
                          'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400':
                            record.status === 'Sent',
                        }"
                      >
                        {{ record.status }}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
