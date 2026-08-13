<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import {
  ChevronsDownIcon,
  ChevronsUpIcon,
  GripHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-vue-next'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SourcenetWorkspace from '@/views/sourcenet2/SourcenetPartsWorkspace2.vue'
import Accordion from '@/components/ui/accordion/Accordion.vue'
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue'
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue'

interface QuotationLineItem {
  id: number
  category: string
  partNumber: string
  replacedNumber: string
  partRemark: string
  description: string
  weight: number
  quantity: number
  unitPrice: number
  deliveryOption: string
  itemSource: string
  sourceFrom: string
  supplierPrice: number
  origin: string
  discountRate: number
  vatRate: number
}

const lineItems = ref<QuotationLineItem[]>([
  {
    id: 1,
    category: 'CT',
    partNumber: '5722761',
    replacedNumber: '',
    partRemark: 'DE',
    description: 'GASKET KT',
    weight: 0.35,
    quantity: 1,
    unitPrice: 598,
    deliveryOption: '4–5 Days',
    itemSource: 'Supplier',
    sourceFrom: 'Al-Futtaim Auto & Machinery',
    supplierPrice: 550,
    origin: 'United Arab Emirates',
    discountRate: 0,
    vatRate: 5,
  },
  {
    id: 2,
    category: 'CT',
    partNumber: '7S3206',
    replacedNumber: '7S-3206',
    partRemark: 'DE',
    description: 'SEAL-O-RING',
    weight: 0.05,
    quantity: 2,
    unitPrice: 3,
    deliveryOption: 'Ex-Stock',
    itemSource: 'Supplier',
    sourceFrom: 'Caterpillar Middle East',
    supplierPrice: 2.5,
    origin: 'United States',
    discountRate: 0,
    vatRate: 5,
  },
])

interface LineItemForm {
  category: string
  partNumber: string
  replacedNumber: string
  partRemark: string
  description: string
  weight: number
  quantity: number
  unitPrice: number
  deliveryOption: string
  itemSource: string
  sourceFrom: string
  supplierPrice: number
  origin: string
  discountRate: number
  vatRate: number
}

const lineItemForm = reactive<LineItemForm>({
  category: 'CT',
  partNumber: '',
  replacedNumber: '',
  partRemark: 'DE',
  description: '',
  weight: 0,
  quantity: 1,
  unitPrice: 0,
  deliveryOption: 'Ex-Stock',
  itemSource: 'Supplier',
  sourceFrom: '',
  supplierPrice: 0,
  origin: '',
  discountRate: 0,
  vatRate: 5,
})

const suppliers = [
  'Al-Futtaim Auto & Machinery',
  'Caterpillar Middle East',
  'Dahbashi Engineering',
  'Galadari Trucks & Heavy Equipment',
  'Komatsu Middle East',
  'Mohamed Abdulrahman Al-Bahar',
  'Ritchie Bros. Middle East',
  'United Diesel',
  'Western Auto',
  'Zahid Tractor',
]

const countries = [
  'United Arab Emirates',
  'United States',
  'Germany',
  'Japan',
  'United Kingdom',
  'Italy',
  'France',
  'China',
  'India',
  'South Korea',
]

const currentLineSubtotal = computed(
  () => (Number(lineItemForm.quantity) || 0) * (Number(lineItemForm.unitPrice) || 0),
)
const currentDiscountAmount = computed(
  () =>
    (currentLineSubtotal.value *
      Math.min(100, Math.max(0, Number(lineItemForm.discountRate) || 0))) /
    100,
)
const currentVatAmount = computed(
  () =>
    ((currentLineSubtotal.value - currentDiscountAmount.value) *
      Math.min(100, Math.max(0, Number(lineItemForm.vatRate) || 0))) /
    100,
)
const currentGrandTotal = computed(
  () => currentLineSubtotal.value - currentDiscountAmount.value + currentVatAmount.value,
)

const currentPartMetadata = computed(() => {
  const normalizedPartNumber = lineItemForm.partNumber.trim().toUpperCase()
  const item = lineItems.value.find(
    (lineItem) => lineItem.partNumber.toUpperCase() === normalizedPartNumber,
  )

  return {
    description: item?.description || lineItemForm.description || 'Select or enter a part number',
    weight: item?.weight ?? lineItemForm.weight ?? 0,
  }
})

const isDescriptionDialogOpen = ref(false)
const descriptionForm = reactive({
  category: '',
  partNumber: '',
  description: '',
})

const canEditPartDescription = computed(() => {
  const partNumber = lineItemForm.partNumber.trim()
  return Boolean(
    partNumber && currentPartMetadata.value.description !== 'Select or enter a part number',
  )
})

function openDescriptionDialog(): void {
  if (!canEditPartDescription.value) return

  Object.assign(descriptionForm, {
    category: lineItemForm.category,
    partNumber: lineItemForm.partNumber.trim().toUpperCase(),
    description: currentPartMetadata.value.description,
  })
  isDescriptionDialogOpen.value = true
}

function updatePartDescription(): void {
  const description = descriptionForm.description.trim()
  if (!description) return

  const partNumber = descriptionForm.partNumber.toUpperCase()
  lineItems.value = lineItems.value.map((item) =>
    item.partNumber.toUpperCase() === partNumber ? { ...item, description } : item,
  )
  lineItemForm.description = description
  lineItemMessage.value = `Description for ${descriptionForm.partNumber} was updated.`
  isDescriptionDialogOpen.value = false
}

const editingLineItemId = ref<number | null>(null)
const lineItemMessage = ref('')
const selectedLineItemIds = ref<number[]>([])

const allLineItemsSelected = computed<boolean | 'indeterminate'>(() => {
  if (!selectedLineItemIds.value.length) return false
  if (selectedLineItemIds.value.length === lineItems.value.length) return true
  return 'indeterminate'
})
const selectedLineItemCount = computed(() => selectedLineItemIds.value.length)
const totalPartsValue = computed(() =>
  lineItems.value.reduce((total, item) => total + calculateLineGrandTotal(item), 0),
)

function toggleAllLineItems(checked: boolean | 'indeterminate'): void {
  selectedLineItemIds.value = checked === true ? lineItems.value.map((item) => item.id) : []
}

function toggleLineItem(id: number, checked: boolean | 'indeterminate'): void {
  selectedLineItemIds.value =
    checked === true
      ? [...new Set([...selectedLineItemIds.value, id])]
      : selectedLineItemIds.value.filter((selectedId) => selectedId !== id)
}

function deleteSelectedLineItems(): void {
  const selectedIds = new Set(selectedLineItemIds.value)
  lineItems.value = lineItems.value.filter((item) => !selectedIds.has(item.id))
  if (editingLineItemId.value !== null && selectedIds.has(editingLineItemId.value)) {
    resetLineItemForm()
  }
  selectedLineItemIds.value = []
}

function calculateLineGrandTotal(item: QuotationLineItem): number {
  const subtotal = item.quantity * item.unitPrice
  const discount = (subtotal * item.discountRate) / 100
  return subtotal - discount + ((subtotal - discount) * item.vatRate) / 100
}

function resetLineItemForm(): void {
  Object.assign(lineItemForm, {
    category: 'CT',
    partNumber: '',
    replacedNumber: '',
    partRemark: 'DE',
    description: '',
    weight: 0,
    quantity: 1,
    unitPrice: 0,
    deliveryOption: 'Ex-Stock',
    itemSource: 'Supplier',
    sourceFrom: '',
    supplierPrice: 0,
    origin: '',
    discountRate: 0,
    vatRate: 5,
  })
  editingLineItemId.value = null
}

function saveLineItem(): void {
  const partNumber = lineItemForm.partNumber.trim()
  if (!partNumber) {
    lineItemMessage.value = 'Part number is required.'
    return
  }

  const data = {
    ...lineItemForm,
    partNumber,
    replacedNumber: lineItemForm.replacedNumber.trim(),
    description: lineItemForm.description.trim(),
    weight: Math.min(9999, Math.max(0, Number(lineItemForm.weight) || 0)),
    quantity: Math.min(9999, Math.max(1, Number(lineItemForm.quantity) || 1)),
    unitPrice: Math.min(9999999, Math.max(0, Number(lineItemForm.unitPrice) || 0)),
    supplierPrice: Math.min(9999999, Math.max(0, Number(lineItemForm.supplierPrice) || 0)),
    discountRate: Math.min(100, Math.max(0, Number(lineItemForm.discountRate) || 0)),
    vatRate: Math.min(100, Math.max(0, Number(lineItemForm.vatRate) || 0)),
  }
  if (editingLineItemId.value !== null) {
    const index = lineItems.value.findIndex((item) => item.id === editingLineItemId.value)
    if (index !== -1) lineItems.value[index] = { id: editingLineItemId.value, ...data }
    lineItemMessage.value = `${partNumber} was updated.`
  } else {
    lineItems.value.push({
      id: Math.max(0, ...lineItems.value.map((item) => item.id)) + 1,
      ...data,
    })
    lineItemMessage.value = `${partNumber} was added.`
  }
  selectedPartNumber.value = partNumber
  selectedCategory.value = toWorkspaceCategory(data.category)
  selectedPartRemark.value = toWorkspaceRemark(data.partRemark)
  resetLineItemForm()
}

function editLineItem(item: QuotationLineItem): void {
  Object.assign(lineItemForm, item)
  editingLineItemId.value = item.id
}
function deleteLineItem(id: number): void {
  lineItems.value = lineItems.value.filter((item) => item.id !== id)
  selectedLineItemIds.value = selectedLineItemIds.value.filter((selectedId) => selectedId !== id)
  if (editingLineItemId.value === id) resetLineItemForm()
}

const quotationInformation = reactive({
  organization: 'Dahbashi Group of Companies',
  location: 'Head Office',
  customer: '',
  addressLine1: '',
  telephone: '',
  fax: '',
  kindAttention: '',
  header: '',
  footer: '',
  customerReference: 'Verbal',
  referenceDate: '',
  make: 'Caterpillar',
  model: '',
  serialNumber: '',
  status: 'Pending',
  validity: '15 Days',
  paymentTerms: 'Cash',
  paymentTermsNote: '',
  availability: 'Availability subject to prior sale',
  warranty: '',
  countryOfOrigin: '',
  currency: 'AED',
  preparedBy: 'Varghese',
})

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

const selectedPartNumber = ref(lineItems.value[0]?.partNumber ?? '')
const selectedCategory = ref(toWorkspaceCategory(lineItems.value[0]?.category ?? 'CT'))
const selectedPartRemark = ref(toWorkspaceRemark(lineItems.value[0]?.partRemark ?? 'DE'))

function toWorkspaceCategory(category: string): string {
  return category.toUpperCase() === 'EN' ? 'engine-parts' : 'ct-parts'
}

function toWorkspaceRemark(remarkCode: string): string {
  return remarkCode.toUpperCase() === 'OEM' ? 'oem' : 'de'
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
        <div class="flex h-full min-h-0 overflow-y-auto p-2 sm:p-4">
          <Accordion type="single" collapsible class="w-full" default-value="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Quotation Information</AccordionTrigger>
              <AccordionContent>
                <form class="pb-6" @submit.prevent>
                  <Card class="overflow-hidden">
                    <CardHeader
                      class="flex flex-col gap-3 border-b sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <CardTitle class="text-base">Quotation Information</CardTitle>
                        <p class="mt-1 text-sm text-muted-foreground">
                          Customer details, quotation terms, and equipment information
                        </p>
                      </div>
                      <Button type="submit" class="w-full sm:w-auto sm:min-w-36">
                        Save quotation
                      </Button>
                    </CardHeader>
                    <CardContent class="pt-6">
                      <div class="grid gap-6 grid-cols-2">
                        <section class="grid min-w-0 content-start gap-4">
                          <CardTitle class="text-sm">Customer Information</CardTitle>
                          <div class="grid gap-4">
                            <div class="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
                              <Label for="organization">Organization</Label>
                              <Select v-model="quotationInformation.organization"
                                ><SelectTrigger id="organization" class="w-full"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="Dahbashi Group of Companies"
                                    >Dahbashi Group of Companies</SelectItem
                                  ><SelectItem value="Dahbashi Engineering"
                                    >Dahbashi Engineering</SelectItem
                                  ></SelectContent
                                ></Select
                              >
                            </div>
                            <div class="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
                              <Label for="quotation-location">Location</Label>
                              <Select v-model="quotationInformation.location"
                                ><SelectTrigger id="quotation-location" class="w-full"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="Head Office">Head Office</SelectItem
                                  ><SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem
                                  ><SelectItem value="Dubai">Dubai</SelectItem></SelectContent
                                ></Select
                              >
                            </div>
                            <div class="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
                              <Label for="quotation-customer">Customer</Label
                              ><Input
                                id="quotation-customer"
                                v-model="quotationInformation.customer"
                                placeholder="Search or enter customer"
                              />
                            </div>
                            <div class="grid gap-2 sm:grid-cols-[140px_1fr]">
                              <Label for="address-1" class="pt-2">Address</Label>
                              <Input
                                id="address-1"
                                v-model="quotationInformation.addressLine1"
                                placeholder="Street, city, and country"
                              />
                            </div>
                            <div class="grid gap-4 sm:grid-cols-2">
                              <div class="grid gap-2">
                                <Label for="telephone">Telephone</Label
                                ><Input id="telephone" v-model="quotationInformation.telephone" />
                              </div>
                              <div class="grid gap-2">
                                <Label for="fax">Fax</Label
                                ><Input id="fax" v-model="quotationInformation.fax" />
                              </div>
                            </div>
                            <div class="grid gap-2">
                              <Label for="kind-attention">Kind Attention</Label
                              ><Input
                                id="kind-attention"
                                v-model="quotationInformation.kindAttention"
                              />
                            </div>
                            <div class="grid gap-2">
                              <Label for="quotation-header">Header</Label
                              ><Textarea
                                id="quotation-header"
                                v-model="quotationInformation.header"
                                rows="3"
                              />
                            </div>
                            <div class="grid gap-2">
                              <Label for="quotation-footer">Footer</Label
                              ><Textarea
                                id="quotation-footer"
                                v-model="quotationInformation.footer"
                                rows="3"
                              />
                            </div>
                          </div>
                        </section>

                        <section
                          class="grid min-w-0 content-start gap-4 border-t pt-6 2xl:border-l 2xl:border-t-0 2xl:pl-8 2xl:pt-0"
                        >
                          <CardTitle class="text-sm">Quotation Details</CardTitle>
                          <div class="grid gap-4">
                            <div class="grid gap-4 sm:grid-cols-2">
                              <div class="grid gap-2">
                                <Label for="customer-reference">Customer Reference</Label
                                ><Input
                                  id="customer-reference"
                                  v-model="quotationInformation.customerReference"
                                />
                              </div>
                              <div class="grid gap-2">
                                <Label for="reference-date">Reference Date</Label
                                ><Input
                                  id="reference-date"
                                  v-model="quotationInformation.referenceDate"
                                  type="date"
                                />
                              </div>
                            </div>
                            <div class="grid gap-4 sm:grid-cols-2">
                              <div class="grid gap-2">
                                <Label for="make">Make</Label
                                ><Input id="make" v-model="quotationInformation.make" />
                              </div>
                              <div class="grid gap-2">
                                <Label for="model">Model</Label
                                ><Input id="model" v-model="quotationInformation.model" />
                              </div>
                            </div>
                            <div class="grid gap-2">
                              <Label for="serial-number">Serial Number</Label
                              ><Input
                                id="serial-number"
                                v-model="quotationInformation.serialNumber"
                              />
                            </div>
                            <div class="grid gap-4">
                              <div class="grid gap-2">
                                <Label for="validity">Validity</Label
                                ><Select v-model="quotationInformation.validity"
                                  ><SelectTrigger id="validity" class="w-full"
                                    ><SelectValue /></SelectTrigger
                                  ><SelectContent
                                    ><SelectItem value="7 Days">7 Days</SelectItem
                                    ><SelectItem value="15 Days">15 Days</SelectItem
                                    ><SelectItem value="30 Days">30 Days</SelectItem></SelectContent
                                  ></Select
                                >
                              </div>
                            </div>
                            <div class="grid gap-2">
                              <Label for="payment-terms">Payment Terms</Label
                              ><Select v-model="quotationInformation.paymentTerms"
                                ><SelectTrigger id="payment-terms" class="w-full"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="Cash">Cash</SelectItem
                                  ><SelectItem value="Credit">Credit</SelectItem
                                  ><SelectItem value="Bank Transfer"
                                    >Bank Transfer</SelectItem
                                  ></SelectContent
                                ></Select
                              >
                            </div>
                            <div class="grid gap-2">
                              <Label for="availability">Availability</Label
                              ><Input
                                id="availability"
                                v-model="quotationInformation.availability"
                              />
                            </div>
                            <div class="grid gap-4 sm:grid-cols-2">
                              <div class="grid gap-2">
                                <Label for="warranty">Warranty</Label
                                ><Input id="warranty" v-model="quotationInformation.warranty" />
                              </div>
                              <div class="grid gap-2">
                                <Label for="country-origin">Country of Origin</Label
                                ><Input
                                  id="country-origin"
                                  v-model="quotationInformation.countryOfOrigin"
                                />
                              </div>
                            </div>
                            <div class="grid gap-4 sm:grid-cols-2">
                              <div class="grid gap-2">
                                <Label for="currency">Currency</Label
                                ><Select v-model="quotationInformation.currency"
                                  ><SelectTrigger id="currency" class="w-full"
                                    ><SelectValue /></SelectTrigger
                                  ><SelectContent
                                    ><SelectItem value="AED">AED</SelectItem
                                    ><SelectItem value="USD">USD</SelectItem
                                    ><SelectItem value="EUR">EUR</SelectItem></SelectContent
                                  ></Select
                                >
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Quotation Line Items</AccordionTrigger>
              <AccordionContent>
                <div
                  class="grid w-full min-w-0 gap-4 pb-6 min-[1440px]:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] min-[1440px]:items-start"
                >
                  <div
                    class="contents min-[1440px]:order-1 min-[1440px]:grid min-[1440px]:min-w-0 min-[1440px]:content-start min-[1440px]:gap-4"
                  >
                    <Card class="order-1 min-w-0 overflow-hidden">
                      <CardHeader
                        class="flex flex-col items-stretch gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div class="min-w-0">
                          <div class="flex min-w-0 items-start gap-1.5">
                            <CardTitle class="min-w-0 wrap-break-word text-base">{{
                              currentPartMetadata.description
                            }}</CardTitle>
                            <Button
                              v-if="canEditPartDescription"
                              type="button"
                              variant="ghost"
                              size="icon"
                              class="size-7 shrink-0"
                              title="Edit part description"
                              aria-label="Edit part description"
                              @click="openDescriptionDialog"
                            >
                              <PencilIcon class="size-3.5" />
                            </Button>
                          </div>
                          <p class="mt-1 text-xs text-muted-foreground">
                            Weight:
                            {{ currentPartMetadata.weight.toFixed(3) }} kg
                          </p>
                        </div>
                        <div class="flex w-full shrink-0 items-center gap-2 sm:w-auto">
                          <Button form="line-item-form" type="submit" class="flex-1 sm:flex-none">{{
                            editingLineItemId ? 'Update item' : 'Add item'
                          }}</Button>
                          <Button
                            v-if="editingLineItemId"
                            type="button"
                            variant="outline"
                            size="icon"
                            title="Cancel editing"
                            @click="resetLineItemForm"
                            ><XIcon class="size-4"
                          /></Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <form id="line-item-form" class="grid gap-5" @submit.prevent="saveLineItem">
                          <div
                            class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 min-[1200px]:grid-cols-4 min-[1440px]:grid-cols-[auto_150px_150px_auto_50px_150px_auto] min-[1440px]:items-end min-[1440px]:justify-start"
                          >
                            <div class="grid min-w-0 gap-1.5 min-[1440px]:w-auto">
                              <Label for="line-category" class="text-xs text-muted-foreground"
                                >Category</Label
                              ><Select v-model="lineItemForm.category"
                                ><SelectTrigger
                                  id="line-category"
                                  class="w-full min-[1440px]:w-auto"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="CT">CT</SelectItem
                                  ><SelectItem value="EN">EN</SelectItem></SelectContent
                                ></Select
                              >
                            </div>
                            <div class="grid min-w-0 gap-1.5 w-auto">
                              <Label for="line-part-number" class="text-xs text-muted-foreground"
                                >Part number <span class="text-destructive">*</span></Label
                              ><Input
                                id="line-part-number"
                                v-model="lineItemForm.partNumber"
                                required
                                class="uppercase"
                                placeholder="e.g. 7S3206"
                                size="xs"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5 w-auto">
                              <Label
                                for="line-replaced-number"
                                class="text-xs text-muted-foreground"
                                >Replaced number</Label
                              ><Input
                                id="line-replaced-number"
                                v-model="lineItemForm.replacedNumber"
                                class="uppercase"
                                placeholder="Optional"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5 min-[1440px]:w-auto">
                              <Label for="line-remark" class="text-xs text-muted-foreground"
                                >Part Remark</Label
                              ><Select v-model="lineItemForm.partRemark"
                                ><SelectTrigger id="line-remark" class="w-full min-[1440px]:w-auto"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="DE">DE</SelectItem
                                  ><SelectItem value="OEM">OEM</SelectItem
                                  ><SelectItem value="REB">REB</SelectItem>
                                  <SelectItem value="USED">USED</SelectItem>
                                  <SelectItem value="IPD">IPD</SelectItem>
                                  <SelectItem value="TRK">TRK</SelectItem>
                                  <SelectItem value="BQ">BQ</SelectItem>
                                  <SelectItem value="DSG">DSG</SelectItem>
                                </SelectContent></Select
                              >
                            </div>
                            <div class="grid min-w-0 gap-1.5 w-auto">
                              <Label for="line-quantity" class="text-xs text-muted-foreground"
                                >Quantity</Label
                              ><Input
                                id="line-quantity"
                                v-model.number="lineItemForm.quantity"
                                type="number"
                                min="1"
                                max="9999"
                                step="1"
                                inputmode="numeric"
                                class="w-full px-2"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5 w-auto">
                              <Label for="line-price" class="text-xs text-muted-foreground"
                                >Unit Price</Label
                              ><Input
                                id="line-price"
                                v-model.number="lineItemForm.unitPrice"
                                type="number"
                                min="0"
                                max="9999999"
                                step="0.01"
                                inputmode="decimal"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5 min-[1440px]:w-auto">
                              <Label for="line-delivery" class="text-xs text-muted-foreground"
                                >Delivery Option</Label
                              ><Select v-model="lineItemForm.deliveryOption"
                                ><SelectTrigger
                                  id="line-delivery"
                                  class="w-full min-[1440px]:w-auto"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="Ex-Stock">Ex-Stock</SelectItem
                                  ><SelectItem value="2–3 Days">2–3 Days</SelectItem
                                  ><SelectItem value="4–5 Days">4–5 Days</SelectItem
                                  ><SelectItem value="2–3 Weeks">2–3 Weeks</SelectItem
                                  ><SelectItem value="On Request"
                                    >On Request</SelectItem
                                  ></SelectContent
                                ></Select
                              >
                            </div>
                          </div>
                        </form>
                        <p
                          v-if="lineItemMessage"
                          class="mt-3 text-xs text-muted-foreground"
                          aria-live="polite"
                        >
                          {{ lineItemMessage }}
                        </p>
                      </CardContent>

                      <!-- <Separator /> -->

                      <!-- <div
                        class="flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div class="min-w-0">
                          <p class="text-xs text-muted-foreground">Total Value of the Parts</p>
                          <CardTitle class="mt-0.5 text-lg tabular-nums">{{
                            formatMoney(totalPartsValue)
                          }}</CardTitle>
                        </div>
                        <Button
                          v-if="selectedLineItemCount"
                          type="button"
                          variant="destructive"
                          size="sm"
                          class="w-full sm:w-auto"
                          @click="deleteSelectedLineItems"
                        >
                          <Trash2Icon class="mr-2 size-4" />
                          Delete selected ({{ selectedLineItemCount }})
                        </Button>
                      </div> -->

                      <div class="border-t">
                        <div
                          class="w-full max-w-full overflow-x-auto min-[1440px]:overflow-x-hidden"
                        >
                          <Table
                            class="w-full min-w-[1040px] text-xs text-muted-foreground min-[1440px]:min-w-0 min-[1440px]:table-fixed"
                          >
                            <TableHeader
                              ><TableRow
                                class="bg-muted text-xs font-semibold text-muted-foreground"
                                ><TableHead class="w-9 px-2">
                                  <Checkbox
                                    :checked="allLineItemsSelected"
                                    aria-label="Select all part items"
                                    @update:checked="toggleAllLineItems"
                                  /> </TableHead
                                ><TableHead class="w-16 whitespace-normal px-2">Category</TableHead
                                ><TableHead class="w-[92px] whitespace-normal px-2"
                                  >Part no.</TableHead
                                ><TableHead class="w-[90px] whitespace-normal px-2"
                                  >Replaced no.</TableHead
                                ><TableHead class="w-[60px] whitespace-normal px-2"
                                  >Remark</TableHead
                                ><TableHead class="whitespace-normal px-2">Description</TableHead
                                ><TableHead class="w-[60px] whitespace-normal px-2 text-right"
                                  >Weight</TableHead
                                ><TableHead class="w-[46px] whitespace-normal px-2 text-right"
                                  >Qty</TableHead
                                ><TableHead class="w-[88px] whitespace-normal px-2 text-right"
                                  >Unit Price</TableHead
                                ><TableHead class="w-[82px] whitespace-normal px-2"
                                  >Delivery</TableHead
                                ><TableHead class="w-[100px] whitespace-normal px-2 text-right"
                                  >Grand Total</TableHead
                                ><TableHead class="w-[70px] px-2 text-right"
                                  >Actions</TableHead
                                ></TableRow
                              ></TableHeader
                            >
                            <TableBody>
                              <TableRow v-if="!lineItems.length"
                                ><TableCell
                                  colspan="12"
                                  class="h-24 text-center text-muted-foreground"
                                  >No part items added yet.</TableCell
                                ></TableRow
                              >
                              <TableRow
                                v-for="item in lineItems"
                                :key="item.id"
                                :class="editingLineItemId === item.id ? 'bg-muted/60' : ''"
                              >
                                <TableCell class="px-2 py-2">
                                  <Checkbox
                                    :checked="selectedLineItemIds.includes(item.id)"
                                    :aria-label="`Select ${item.partNumber}`"
                                    @update:checked="toggleLineItem(item.id, $event)"
                                  /> </TableCell
                                ><TableCell class="px-2 py-2"
                                  ><Badge variant="outline">{{ item.category }}</Badge></TableCell
                                ><TableCell class="break-all px-2 py-2 font-medium">{{
                                  item.partNumber
                                }}</TableCell
                                ><TableCell class="break-all px-2 py-2">{{
                                  item.replacedNumber || '—'
                                }}</TableCell
                                ><TableCell class="px-2 py-2">{{ item.partRemark }}</TableCell
                                ><TableCell class="whitespace-normal break-words px-2 py-2">{{
                                  item.description || '—'
                                }}</TableCell
                                ><TableCell class="px-2 py-2 text-right tabular-nums">{{
                                  item.weight.toFixed(3)
                                }}</TableCell
                                ><TableCell class="px-2 py-2 text-right tabular-nums">{{
                                  item.quantity
                                }}</TableCell
                                ><TableCell class="px-2 py-2 text-right tabular-nums">{{
                                  formatMoney(item.unitPrice)
                                }}</TableCell
                                ><TableCell class="whitespace-normal break-words px-2 py-2">{{
                                  item.deliveryOption
                                }}</TableCell
                                ><TableCell class="px-2 py-2 text-right font-medium tabular-nums">{{
                                  formatMoney(calculateLineGrandTotal(item))
                                }}</TableCell>
                                <TableCell class="px-2 py-2"
                                  ><div class="flex justify-end gap-1">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      class="size-7"
                                      title="Edit item"
                                      @click="editLineItem(item)"
                                      ><PencilIcon class="size-4" /></Button
                                    ><Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      class="size-7 text-destructive hover:text-destructive"
                                      title="Delete item"
                                      @click="deleteLineItem(item.id)"
                                      ><Trash2Icon class="size-4"
                                    /></Button></div
                                ></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div class="order-2 grid min-w-0 content-start gap-4">
                    <Card class="min-w-0 overflow-hidden">
                      <CardContent class="grid min-w-0 gap-4">
                        <section class="grid gap-3">
                          <Label class="text-sm font-semibold">Additional Information</Label>
                          <div class="grid min-w-0 grid-cols-1 gap-3 min-[1440px]:grid-cols-1">
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="item-source" class="text-xs text-muted-foreground"
                                >Source</Label
                              >
                              <Select v-model="lineItemForm.itemSource"
                                ><SelectTrigger id="item-source" class="w-full"
                                  ><SelectValue /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem value="Supplier">Supplier</SelectItem
                                  ><SelectItem value="Source">Source</SelectItem></SelectContent
                                ></Select
                              >
                            </div>
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="source-from" class="text-xs text-muted-foreground"
                                >From</Label
                              >
                              <Select v-model="lineItemForm.sourceFrom"
                                ><SelectTrigger id="source-from" class="w-full"
                                  ><SelectValue placeholder="Select supplier" /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem
                                    v-for="supplier in suppliers"
                                    :key="supplier"
                                    :value="supplier"
                                    >{{ supplier }}</SelectItem
                                  ></SelectContent
                                ></Select
                              >
                            </div>
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="supplier-price" class="text-xs text-muted-foreground"
                                >Supplier Price</Label
                              ><Input
                                id="supplier-price"
                                v-model.number="lineItemForm.supplierPrice"
                                type="number"
                                min="0"
                                max="9999999"
                                step="0.01"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="item-origin" class="text-xs text-muted-foreground"
                                >Origin</Label
                              >
                              <Select v-model="lineItemForm.origin"
                                ><SelectTrigger id="item-origin" class="w-full"
                                  ><SelectValue placeholder="Select country" /></SelectTrigger
                                ><SelectContent
                                  ><SelectItem
                                    v-for="country in countries"
                                    :key="country"
                                    :value="country"
                                    >{{ country }}</SelectItem
                                  ></SelectContent
                                ></Select
                              >
                            </div>
                          </div>
                        </section>

                        <Separator />

                        <section class="grid gap-3">
                          <!-- <Label class="text-sm font-semibold">Discounts</Label> -->
                          <div class="grid min-w-0 grid-cols-2 gap-3">
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="discount-rate" class="text-xs text-muted-foreground"
                                >Discount Rate (%)</Label
                              ><Input
                                id="discount-rate"
                                v-model.number="lineItemForm.discountRate"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="discount-amount" class="text-xs text-muted-foreground"
                                >Discount Amount</Label
                              ><Input
                                id="discount-amount"
                                :model-value="currentDiscountAmount.toFixed(2)"
                                readonly
                                class="bg-muted tabular-nums"
                              />
                            </div>
                          </div>
                        </section>

                        <Separator />

                        <section class="grid gap-3">
                          <!-- <Label class="text-sm font-semibold">VAT</Label> -->
                          <div class="grid min-w-0 grid-cols-2 gap-3">
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="vat-rate" class="text-xs text-muted-foreground"
                                >VAT Rate (%)</Label
                              ><Input
                                id="vat-rate"
                                v-model.number="lineItemForm.vatRate"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                              />
                            </div>
                            <div class="grid min-w-0 gap-1.5">
                              <Label for="vat-amount" class="text-xs text-muted-foreground"
                                >VAT Amount</Label
                              ><Input
                                id="vat-amount"
                                :model-value="currentVatAmount.toFixed(2)"
                                readonly
                                class="bg-muted tabular-nums"
                              />
                            </div>
                          </div>
                          <div class="rounded-lg border bg-primary/5 p-4 text-right">
                            <p
                              class="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                            >
                              Grand Total
                            </p>
                            <p
                              class="mt-1 break-words text-xl font-bold tabular-nums text-primary sm:text-2xl"
                            >
                              {{ formatMoney(currentGrandTotal) }}
                            </p>
                          </div>
                        </section>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SplitterPanel>
    </SplitterGroup>

    <Dialog v-model:open="isDescriptionDialogOpen">
      <DialogContent class="sm:max-w-lg">
        <form class="grid gap-5" @submit.prevent="updatePartDescription">
          <DialogHeader>
            <DialogTitle>Update Part Description</DialogTitle>
            <DialogDescription>
              Review the part information and enter its updated description.
            </DialogDescription>
          </DialogHeader>

          <Alert class="border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200">
            <TriangleAlertIcon class="size-4" />
            <AlertDescription>
              Updating this description will apply the change to all existing records associated
              with this part number.
            </AlertDescription>
          </Alert>

          <div class="grid gap-4">
            <div class="grid gap-1.5">
              <Label for="description-category">Category</Label>
              <Select v-model="descriptionForm.category" disabled>
                <SelectTrigger id="description-category" class="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CT">CT</SelectItem>
                  <SelectItem value="EN">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="grid gap-1.5">
              <Label for="description-part-number">Part Number</Label>
              <Input
                id="description-part-number"
                v-model="descriptionForm.partNumber"
                readonly
                class="bg-muted uppercase"
              />
            </div>

            <div class="grid gap-1.5">
              <Label for="updated-description">Description</Label>
              <Textarea
                id="updated-description"
                v-model="descriptionForm.description"
                rows="4"
                required
                placeholder="Enter the updated part description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="isDescriptionDialogOpen = false">
              Cancel
            </Button>
            <Button type="submit" :disabled="!descriptionForm.description.trim()">
              Update description
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
