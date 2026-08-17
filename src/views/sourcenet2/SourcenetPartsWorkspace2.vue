<script setup lang="ts">
import {
  BarChart3Icon,
  CircleDollarSignIcon,
  ClipboardListIcon,
  Layers3Icon,
  PackageSearchIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  TruckIcon,
  WarehouseIcon,
} from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import Badge from '@/components/ui/badge/Badge.vue'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import PartSearchItem from './components/PartSearchItem.vue'

interface StockLocation {
  location: string
  quantity: number
  binLocation: string
  allocated: number
  inTransit: number
  workInProgress: number
  warranty: number
}

interface OrderRecord {
  partNumber: string
  orderDate: string
  supplier: string
  orderNumber: string
  orderedQuantity: number
  expectedQuantity: number
  pendingQuantity: number
  price: number
  freight: string
  eta: string
  remark: string
}

interface SupplierInventoryRecord {
  supplierId: string
  code: string
  stock: number
  price: number
  currency: string
  updatedAt: string
  priority: boolean
}

interface EnquiryRecord {
  id: number
  category: string
  remarkCode: string
  partNumber: string
  description: string
  enquiryQuantity: number
  targetPrice: number
  targetRemarks: string
  warehouse: string
  dePrice: number
  remarks: string
  webReseller: boolean
  enquiryDate: string
  assignedTo: string
  status: 'Pending' | 'Completed' | 'Sent'
}

interface PartWorkspaceData {
  partDetails: { label: string; value: string }[]
  partPrices: { label: string; value: number; currency: string }[]
  stockLocations: StockLocation[]
  orders: OrderRecord[]
  movements: { year: number; sales: number; direct: number }[]
  branchWise: { branch: string; thisYear: number; lastYear: number }[]
  supplierInventory: SupplierInventoryRecord[]
  purchaseRecords: { supplier: string; code: string; price: number }[]
  alternateSources: {
    type: string
    movement: boolean
    salesMovement: boolean
    generic: boolean
    newPartNumber: string
    description: string
    quantity: number
    stock: number
  }[]
  reorderLevels: {
    maximumStock: number
    minimumStock: number
    reorderQuantity: number
  }
}

interface PartSearchFilters {
  searchTerm: string
  category: string
  partRemark: string
}

const props = withDefaults(
  defineProps<{
    partNumber?: string
    category?: string
    partRemark?: string
  }>(),
  {
    partNumber: '5722761',
    category: 'ct-parts',
    partRemark: 'de',
  },
)

const partCatalog = ref<Record<string, PartWorkspaceData>>({
  '5722761': {
    partDetails: [
      // { label: 'Category', value: 'CT Parts' },
      // { label: 'Part number', value: '5722761' },
      // { label: 'Part remark', value: 'DE' },
      { label: 'Description', value: 'GASKET KIT' },
      { label: 'Weight', value: '1.270 kg' },
      { label: 'DE number', value: '02X21Y' },
    ],
    partPrices: [
      { label: 'Sale price', value: 779, currency: 'AED' },
      { label: 'OEM Direct', value: 0, currency: 'AED' },
      { label: 'OEM', value: 470.11, currency: 'USD' },
      { label: 'DE Direct', value: 506.25, currency: 'AED' },
      { label: 'Web price', value: 598, currency: 'AED' },
    ],
    stockLocations: [
      {
        location: 'DE',
        quantity: 2,
        binLocation: 'A0108',
        allocated: 0,
        inTransit: 6,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'SHJ',
        quantity: 1,
        binLocation: 'H6B',
        allocated: 0,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'ADH',
        quantity: 1,
        binLocation: 'PC05P1',
        allocated: 0,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'ALN',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DIC',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'CCS',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DOH',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DH2',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'KUW',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'BAH',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'MCT',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'OMN',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'RYD',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DAM',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'JED',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'TAN',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'FAR',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'HYD',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'ODH',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DER',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DED',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DEJ',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 2,
        workInProgress: 0,
        warranty: 0,
      },
    ],
    orders: [
      {
        partNumber: '5722761',
        orderDate: '30/07/2026',
        supplier: 'L230',
        orderNumber: '75650',
        orderedQuantity: 6,
        expectedQuantity: 6,
        pendingQuantity: 6,
        price: 95,
        freight: 'SF',
        eta: '12/08/2026',
        remark: 'S',
      },
      {
        partNumber: '5722761',
        orderDate: '29/07/2026',
        supplier: '037',
        orderNumber: '75641',
        orderedQuantity: 2,
        expectedQuantity: 2,
        pendingQuantity: 2,
        price: 75,
        freight: '—',
        eta: '10/08/2026',
        remark: 'C',
      },
    ],
    movements: [
      { year: 2026, sales: 8, direct: 3 },
      { year: 2025, sales: 5, direct: 2 },
      { year: 2024, sales: 7, direct: 1 },
      { year: 2023, sales: 3, direct: 1 },
      { year: 2022, sales: 4, direct: 0 },
      { year: 2021, sales: 2, direct: 0 },
      { year: 2020, sales: 1, direct: 0 },
    ],
    branchWise: [
      { branch: 'DB', thisYear: 5, lastYear: 3 },
      { branch: 'SHJ', thisYear: 2, lastYear: 1 },
      { branch: 'ADH', thisYear: 1, lastYear: 1 },
    ],
    supplierInventory: [
      {
        supplierId: '002',
        code: 'A',
        stock: 1,
        price: 97.75,
        currency: 'USD',
        updatedAt: '29/07/2026',
        priority: true,
      },
      {
        supplierId: '037',
        code: 'BQ',
        stock: 11,
        price: 75,
        currency: 'EUR',
        updatedAt: '03/08/2026',
        priority: true,
      },
      {
        supplierId: 'L230',
        code: 'U',
        stock: 6,
        price: 101.66,
        currency: 'USD',
        updatedAt: '06/08/2026',
        priority: false,
      },
    ],
    purchaseRecords: [
      { supplier: '037', code: 'B', price: 75 },
      { supplier: 'L230', code: 'U', price: 101.66 },
      { supplier: '002', code: 'A', price: 97.75 },
    ],
    alternateSources: [
      {
        type: 'O',
        movement: true,
        salesMovement: false,
        generic: false,
        newPartNumber: '4732192',
        description: 'KIT GASK',
        quantity: 1,
        stock: 0,
      },
    ],
    reorderLevels: { maximumStock: 18, minimumStock: 4, reorderQuantity: 10 },
  },
  '7S3206': {
    partDetails: [
      { label: 'Category', value: 'CT Parts' },
      { label: 'Part number', value: '7S3206' },
      { label: 'Part remark', value: 'DE' },
      { label: 'Description', value: 'SEAL-O-RING' },
      { label: 'Weight', value: '0.035 kg' },
      { label: 'DE number', value: 'OR-73206' },
    ],
    partPrices: [
      { label: 'Sale price', value: 4.25, currency: 'AED' },
      { label: 'OEM Direct', value: 0.82, currency: 'USD' },
      { label: 'OEM', value: 1.05, currency: 'USD' },
      { label: 'DE Direct', value: 2.55, currency: 'AED' },
      { label: 'Web price', value: 3, currency: 'AED' },
    ],
    stockLocations: [
      {
        location: 'DE',
        quantity: 48,
        binLocation: 'B-14-02',
        allocated: 6,
        inTransit: 20,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'ADH',
        quantity: 16,
        binLocation: 'A2C',
        allocated: 2,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DIC',
        quantity: 9,
        binLocation: 'PC02P4',
        allocated: 0,
        inTransit: 0,
        workInProgress: 0,
        warranty: 1,
      },
      {
        location: 'SHJ',
        quantity: 22,
        binLocation: 'S-03-11',
        allocated: 4,
        inTransit: 10,
        workInProgress: 0,
        warranty: 0,
      },
    ],
    orders: [
      {
        partNumber: '7S3206',
        orderDate: '02/08/2026',
        supplier: 'CAT01',
        orderNumber: '75681',
        orderedQuantity: 100,
        expectedQuantity: 100,
        pendingQuantity: 20,
        price: 0.82,
        freight: 'AF',
        eta: '09/08/2026',
        remark: 'U',
      },
      {
        partNumber: '7S3206',
        orderDate: '28/07/2026',
        supplier: '037',
        orderNumber: '75632',
        orderedQuantity: 50,
        expectedQuantity: 50,
        pendingQuantity: 10,
        price: 0.71,
        freight: 'SF',
        eta: '11/08/2026',
        remark: 'S',
      },
    ],
    movements: [
      { year: 2026, sales: 145, direct: 38 },
      { year: 2025, sales: 121, direct: 30 },
      { year: 2024, sales: 96, direct: 22 },
      { year: 2023, sales: 82, direct: 16 },
      { year: 2022, sales: 71, direct: 12 },
      { year: 2021, sales: 58, direct: 10 },
      { year: 2020, sales: 44, direct: 8 },
    ],
    branchWise: [
      { branch: 'DB', thisYear: 72, lastYear: 61 },
      { branch: 'SHJ', thisYear: 41, lastYear: 35 },
      { branch: 'ADH', thisYear: 32, lastYear: 25 },
    ],
    supplierInventory: [
      {
        supplierId: 'CAT01',
        code: 'OEM',
        stock: 350,
        price: 0.82,
        currency: 'USD',
        updatedAt: '06/08/2026',
        priority: true,
      },
      {
        supplierId: '037',
        code: 'BQ',
        stock: 210,
        price: 0.71,
        currency: 'USD',
        updatedAt: '05/08/2026',
        priority: true,
      },
      {
        supplierId: 'A104',
        code: 'ALT',
        stock: 85,
        price: 0.66,
        currency: 'USD',
        updatedAt: '04/08/2026',
        priority: false,
      },
    ],
    purchaseRecords: [
      { supplier: 'CAT01', code: 'OEM', price: 0.82 },
      { supplier: '037', code: 'BQ', price: 0.71 },
      { supplier: 'A104', code: 'ALT', price: 0.66 },
    ],
    alternateSources: [
      {
        type: 'A',
        movement: true,
        salesMovement: true,
        generic: true,
        newPartNumber: 'OR-7S3206-A',
        description: 'O-RING ALTERNATE',
        quantity: 1,
        stock: 85,
      },
    ],
    reorderLevels: {
      maximumStock: 180,
      minimumStock: 45,
      reorderQuantity: 100,
    },
  },
  '1R-0750': {
    partDetails: [
      { label: 'Category', value: 'Engine Parts' },
      { label: 'Part number', value: '1R-0750' },
      { label: 'Part remark', value: 'OEM' },
      { label: 'Description', value: 'FILTER-AS LUBE' },
      { label: 'Weight', value: '1.095 kg' },
      { label: 'DE number', value: 'FL-10750' },
    ],
    partPrices: [
      { label: 'Sale price', value: 92, currency: 'AED' },
      { label: 'OEM Direct', value: 18.4, currency: 'USD' },
      { label: 'OEM', value: 21.75, currency: 'USD' },
      { label: 'DE Direct', value: 70, currency: 'AED' },
      { label: 'Web price', value: 86, currency: 'AED' },
    ],
    stockLocations: [
      {
        location: 'DE',
        quantity: 12,
        binLocation: 'F-01-03',
        allocated: 3,
        inTransit: 24,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'ADH',
        quantity: 7,
        binLocation: 'EF7',
        allocated: 1,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DIC',
        quantity: 5,
        binLocation: 'FC03P2',
        allocated: 0,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'SHJ',
        quantity: 8,
        binLocation: 'F-02-04',
        allocated: 2,
        inTransit: 12,
        workInProgress: 0,
        warranty: 0,
      },
    ],
    orders: [
      {
        partNumber: '1R-0750',
        orderDate: '01/08/2026',
        supplier: 'CAT01',
        orderNumber: '75672',
        orderedQuantity: 36,
        expectedQuantity: 36,
        pendingQuantity: 36,
        price: 18.4,
        freight: 'SF',
        eta: '15/08/2026',
        remark: 'S',
      },
    ],
    movements: [
      { year: 2026, sales: 66, direct: 12 },
      { year: 2025, sales: 59, direct: 10 },
      { year: 2024, sales: 51, direct: 8 },
      { year: 2023, sales: 47, direct: 7 },
      { year: 2022, sales: 39, direct: 5 },
      { year: 2021, sales: 32, direct: 4 },
      { year: 2020, sales: 27, direct: 3 },
    ],
    branchWise: [
      { branch: 'DB', thisYear: 34, lastYear: 29 },
      { branch: 'SHJ', thisYear: 18, lastYear: 16 },
      { branch: 'ADH', thisYear: 14, lastYear: 14 },
    ],
    supplierInventory: [
      {
        supplierId: 'CAT01',
        code: 'OEM',
        stock: 75,
        price: 18.4,
        currency: 'USD',
        updatedAt: '06/08/2026',
        priority: true,
      },
      {
        supplierId: 'F220',
        code: 'DON',
        stock: 42,
        price: 17.1,
        currency: 'USD',
        updatedAt: '05/08/2026',
        priority: true,
      },
      {
        supplierId: 'B118',
        code: 'BAL',
        stock: 18,
        price: 16.65,
        currency: 'USD',
        updatedAt: '02/08/2026',
        priority: false,
      },
    ],
    purchaseRecords: [
      { supplier: 'CAT01', code: 'OEM', price: 18.4 },
      { supplier: 'F220', code: 'DON', price: 17.1 },
      { supplier: 'B118', code: 'BAL', price: 16.65 },
    ],
    alternateSources: [
      {
        type: 'A',
        movement: true,
        salesMovement: true,
        generic: false,
        newPartNumber: 'P551807',
        description: 'LUBE FILTER',
        quantity: 1,
        stock: 42,
      },
    ],
    reorderLevels: { maximumStock: 60, minimumStock: 15, reorderQuantity: 36 },
  },
  '4P-0710': {
    partDetails: [
      { label: 'Category', value: 'Engine Parts' },
      { label: 'Part number', value: '4P-0710' },
      { label: 'Part remark', value: 'Replacement' },
      { label: 'Description', value: 'GASKET-CYLINDER HEAD' },
      { label: 'Weight', value: '0.640 kg' },
      { label: 'DE number', value: 'GK-40710' },
    ],
    partPrices: [
      { label: 'Sale price', value: 158, currency: 'AED' },
      { label: 'OEM Direct', value: 31.2, currency: 'USD' },
      { label: 'OEM', value: 36.8, currency: 'USD' },
      { label: 'DE Direct', value: 121, currency: 'AED' },
      { label: 'Web price', value: 149, currency: 'AED' },
    ],
    stockLocations: [
      {
        location: 'DE',
        quantity: 4,
        binLocation: 'G-08-01',
        allocated: 1,
        inTransit: 8,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'ADH',
        quantity: 2,
        binLocation: 'EG4',
        allocated: 0,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'DIC',
        quantity: 0,
        binLocation: '—',
        allocated: 0,
        inTransit: 4,
        workInProgress: 0,
        warranty: 0,
      },
      {
        location: 'SHJ',
        quantity: 3,
        binLocation: 'G-04-06',
        allocated: 1,
        inTransit: 0,
        workInProgress: 0,
        warranty: 0,
      },
    ],
    orders: [
      {
        partNumber: '4P-0710',
        orderDate: '31/07/2026',
        supplier: 'G055',
        orderNumber: '75663',
        orderedQuantity: 12,
        expectedQuantity: 12,
        pendingQuantity: 12,
        price: 29.75,
        freight: 'AF',
        eta: '13/08/2026',
        remark: 'U',
      },
    ],
    movements: [
      { year: 2026, sales: 21, direct: 5 },
      { year: 2025, sales: 18, direct: 4 },
      { year: 2024, sales: 16, direct: 3 },
      { year: 2023, sales: 13, direct: 3 },
      { year: 2022, sales: 11, direct: 2 },
      { year: 2021, sales: 8, direct: 1 },
      { year: 2020, sales: 6, direct: 1 },
    ],
    branchWise: [
      { branch: 'DB', thisYear: 11, lastYear: 9 },
      { branch: 'SHJ', thisYear: 6, lastYear: 5 },
      { branch: 'ADH', thisYear: 4, lastYear: 4 },
    ],
    supplierInventory: [
      {
        supplierId: 'G055',
        code: 'REP',
        stock: 28,
        price: 29.75,
        currency: 'USD',
        updatedAt: '06/08/2026',
        priority: true,
      },
      {
        supplierId: 'CAT01',
        code: 'OEM',
        stock: 16,
        price: 36.8,
        currency: 'USD',
        updatedAt: '05/08/2026',
        priority: true,
      },
      {
        supplierId: 'A104',
        code: 'ALT',
        stock: 7,
        price: 27.9,
        currency: 'USD',
        updatedAt: '01/08/2026',
        priority: false,
      },
    ],
    purchaseRecords: [
      { supplier: 'G055', code: 'REP', price: 29.75 },
      { supplier: 'CAT01', code: 'OEM', price: 36.8 },
      { supplier: 'A104', code: 'ALT', price: 27.9 },
    ],
    alternateSources: [
      {
        type: 'S',
        movement: true,
        salesMovement: true,
        generic: false,
        newPartNumber: '4P-0711',
        description: 'GASKET-CYL HEAD NEW',
        quantity: 1,
        stock: 7,
      },
    ],
    reorderLevels: { maximumStock: 24, minimumStock: 6, reorderQuantity: 12 },
  },
})

const enquiryRecords: EnquiryRecord[] = [
  {
    id: 1,
    category: 'CT',
    remarkCode: 'DE',
    partNumber: '5722761',
    description: 'GASKET KT',
    enquiryQuantity: 1,
    targetPrice: 0,
    targetRemarks: '—',
    warehouse: 'BQ',
    dePrice: 598,
    remarks: '4/5 DAYS',
    webReseller: false,
    enquiryDate: '03/08/2026 03:10',
    assignedTo: '—',
    status: 'Pending',
  },
  {
    id: 2,
    category: 'CT',
    remarkCode: 'DE',
    partNumber: '7S3206',
    description: 'SEAL-O-RING',
    enquiryQuantity: 2,
    targetPrice: 0,
    targetRemarks: '—',
    warehouse: 'UAE',
    dePrice: 3,
    remarks: 'EX-STOCK',
    webReseller: false,
    enquiryDate: '03/08/2026 03:12',
    assignedTo: '—',
    status: 'Pending',
  },
  {
    id: 3,
    category: 'EN',
    remarkCode: 'OEM',
    partNumber: '1R-0750',
    description: 'FILTER-AS LUBE',
    enquiryQuantity: 4,
    targetPrice: 82,
    targetRemarks: 'Need volume price',
    warehouse: 'DE',
    dePrice: 86,
    remarks: 'EX-STOCK',
    webReseller: true,
    enquiryDate: '03/08/2026 03:18',
    assignedTo: 'M. Khan',
    status: 'Sent',
  },
  {
    id: 4,
    category: 'EN',
    remarkCode: 'Replacement',
    partNumber: '4P-0710',
    description: 'GASKET-CYLINDER HEAD',
    enquiryQuantity: 2,
    targetPrice: 145,
    targetRemarks: 'Customer budget',
    warehouse: 'ADH',
    dePrice: 149,
    remarks: '2/3 DAYS',
    webReseller: false,
    enquiryDate: '03/08/2026 03:24',
    assignedTo: 'S. Ali',
    status: 'Completed',
  },
]

const selectedEnquiryId = ref<number | null>(1)
const activePartNumber = ref(props.partNumber)
const partSearchTerm = ref(props.partNumber)
const selectedPartCategory = ref(props.category)
const selectedPartRemark = ref(props.partRemark)
const showOnlyPrioritySuppliers = ref(false)

const activePart = computed(() => {
  return partCatalog.value[activePartNumber.value] ?? partCatalog.value['5722761']!
})

const partDetails = computed(() => activePart.value.partDetails)
const partPrices = computed(() => activePart.value.partPrices)
const stockLocations = computed(() => activePart.value.stockLocations)
const orders = computed(() => activePart.value.orders)
const movements = computed(() => activePart.value.movements)
const branchWise = computed(() => activePart.value.branchWise)
const supplierInventory = computed(() => activePart.value.supplierInventory)
const purchaseRecords = computed(() => activePart.value.purchaseRecords)
const alternateSources = computed(() => activePart.value.alternateSources)
const reorderLevels = computed(() => activePart.value.reorderLevels)

const workspaceActions = [
  { label: 'Alternate Can Sell', icon: PackageSearchIcon },
  { label: 'Classic & YMPart', icon: WarehouseIcon },
  { label: 'Enquiry List', icon: ShoppingCartIcon },
  { label: 'Image', icon: TruckIcon },
  { label: 'Invoice List', icon: Layers3Icon },
  { label: 'Kit List', icon: Layers3Icon },
  { label: 'Model List ', icon: Layers3Icon },
  { label: 'Invoice List', icon: Layers3Icon },
]

const visibleSupplierInventory = computed(() => {
  if (!showOnlyPrioritySuppliers.value) {
    return supplierInventory.value
  }

  return supplierInventory.value.filter((item) => item.priority)
})

// const totalStock = computed(() => {
//   return stockLocations.value.reduce((total, item) => total + item.quantity, 0)
// })

// const totalSupplierStock = computed(() => {
//   return visibleSupplierInventory.value.reduce((total, item) => total + item.stock, 0)
// })

// const pendingOrderQuantity = computed(() => {
//   return orders.value.reduce((total, item) => total + item.pendingQuantity, 0)
// })

const movementChart = computed(() => {
  const ordered = [...movements.value].reverse()
  const width = 560
  const height = 168
  const left = 24
  const right = 18
  const top = 18
  const bottom = 30
  const baseline = height - bottom
  const plotWidth = width - left - right
  const plotHeight = baseline - top
  const maximum = Math.max(1, ...ordered.flatMap((item) => [item.sales, item.direct]))

  const points = ordered.map((item, index) => {
    const x = left + (index * plotWidth) / Math.max(ordered.length - 1, 1)

    return {
      ...item,
      x,
      salesY: baseline - (item.sales / maximum) * plotHeight,
      directY: baseline - (item.direct / maximum) * plotHeight,
    }
  })

  const salesPolyline = points.map((point) => `${point.x},${point.salesY}`).join(' ')
  const directPolyline = points.map((point) => `${point.x},${point.directY}`).join(' ')
  const salesArea = points.length
    ? `M ${points[0]!.x} ${baseline} L ${points
        .map((point) => `${point.x} ${point.salesY}`)
        .join(' L ')} L ${points[points.length - 1]!.x} ${baseline} Z`
    : ''

  return {
    width,
    height,
    baseline,
    points,
    salesPolyline,
    directPolyline,
    salesArea,
  }
})

const branchChartMaximum = computed(() => {
  return Math.max(1, ...branchWise.value.flatMap((item) => [item.thisYear, item.lastYear]))
})

function branchBarWidth(value: number): string {
  if (value === 0) {
    return '0%'
  }

  return `${Math.max((value / branchChartMaximum.value) * 100, 8)}%`
}

function normalizePartNumber(value: string): string {
  return value.trim().toUpperCase()
}

function activatePart(partNumber: string): boolean {
  const normalizedPartNumber = normalizePartNumber(partNumber)

  if (!partCatalog.value[normalizedPartNumber]) {
    return false
  }

  activePartNumber.value = normalizedPartNumber
  showOnlyPrioritySuppliers.value = false

  return true
}

function handlePartSearch(filters: PartSearchFilters): void {
  partSearchTerm.value = filters.searchTerm
  selectedPartCategory.value = filters.category
  selectedPartRemark.value = filters.partRemark

  if (activatePart(filters.searchTerm)) {
    selectedEnquiryId.value =
      enquiryRecords.find(
        (record) => normalizePartNumber(record.partNumber) === activePartNumber.value,
      )?.id ?? null
  } else {
    selectedEnquiryId.value = null
  }
}

watch(
  () => [props.partNumber, props.category, props.partRemark] as const,
  ([partNumber, category, partRemark]) => {
    partSearchTerm.value = partNumber
    selectedPartCategory.value = category
    selectedPartRemark.value = partRemark
    activatePart(partNumber)
  },
  { immediate: true },
)

function formatMoney(value: number, currency = 'AED'): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}
</script>

<template>
  <div class="flex h-full w-full min-h-0 min-w-0 max-w-full flex-col overflow-hidden bg-muted/20">
    <div class="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">
      <div class="space-y-4 p-1">
        <!-- First row: part workspace / stock / orders and suppliers -->
        <div
          class="grid min-w-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,5fr)_95px]"
        >
          <!-- First column: part search and overview -->
          <section class="min-w-0 space-y-3">
            <div class="min-w-0 rounded-lg">
              <PartSearchItem
                v-model:search-term="partSearchTerm"
                v-model:category="selectedPartCategory"
                v-model:part-remark="selectedPartRemark"
                @search="handlePartSearch"
              />
            </div>

            <div class="w-full min-w-0 rounded-lg border bg-card shadow-sm">
              <Item variant="outline">
                <div class="grid min-w-0 gap-2">
                  <div
                    class="grid gap-x-5 gap-y-2 px-4 py-3 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
                  >
                    <div v-for="detail in partDetails" :key="detail.label" class="min-w-0">
                      <p
                        class="text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        {{ detail.label }}
                      </p>
                      <p class="mt-0.5 truncate text-sm font-medium" :title="detail.value">
                        {{ detail.value }}
                      </p>
                    </div>
                  </div>

                  <div class="grid border-t sm:grid-cols-2">
                    <div
                      v-for="price in partPrices"
                      :key="price.label"
                      class="flex items-center justify-between gap-3 border-b px-4 py-2 sm:border-b-0 sm:last:border-r-0"
                    >
                      <span class="text-xs text-muted-foreground">{{ price.label }}</span>
                      <span class="whitespace-nowrap text-sm font-semibold tabular-nums">
                        {{ formatMoney(price.value, price.currency) }}
                      </span>
                    </div>
                  </div>
                </div>
              </Item>
            </div>
          </section>

          <!-- Center column: stock by location -->
          <section class="min-w-0 lg:col-span-2 xl:col-span-1 xl:h-full">
            <div class="w-full min-w-0 rounded-lg border bg-card shadow-sm">
              <Item variant="outline">
                <div class="grid min-w-0 gap-2 px-4 py-3">
                  <Label class="text-sm">Stock by Location</Label>
                  <Table class="w-full">
                    <TableHeader class="sticky top-0 bg-gray-600 h-7 text-xs">
                      <TableRow class="">
                        <TableHead class="font-bold border border-l-0 px-2 py-0.5 text-white"
                          >LOC</TableHead
                        >
                        <TableHead class="text-center font-bold border text-white px-2 py-0.5"
                          >QTY</TableHead
                        >
                        <TableHead class="font-bold border text-white px-2 py-0.5">BIN</TableHead>
                        <TableHead class="text-center font-bold border text-white px-2 py-0.5"
                          >ALLOC</TableHead
                        >
                        <TableHead class="text-right font-bold border text-white px-2 py-0.5"
                          >TNST</TableHead
                        >
                        <TableHead class="text-right font-bold border text-white px-2 py-0.5"
                          >WIP</TableHead
                        >
                        <TableHead
                          class="text-right font-bold border border-r-0 text-white px-2 py-0.5"
                          >WAR</TableHead
                        >
                      </TableRow>
                    </TableHeader>
                    <TableBody class="divide-y">
                      <TableRow
                        v-for="stock in stockLocations"
                        :key="stock.location"
                        class="hover:bg-accent/80 h-6"
                      >
                        <TableCell class="border border-l-0 px-2 py-0.5">
                          {{ stock.location }}
                        </TableCell>
                        <TableCell class="border text-center px-2 py-0.5 tabular-nums">
                          {{ stock.quantity }}
                        </TableCell>
                        <TableCell class="border px-2 py-0.5">
                          {{ stock.binLocation }}
                        </TableCell>
                        <TableCell class="border text-center px-2 py-0.5 tabular-nums">
                          {{ stock.allocated }}
                        </TableCell>
                        <TableCell class="border text-center px-2 py-0.5">
                          {{ stock.inTransit }}
                        </TableCell>
                        <TableCell class="border text-center px-2 py-0.5 tabular-nums">
                          {{ stock.workInProgress }}
                        </TableCell>
                        <TableCell class="border border-r-0 text-center px-2 py-0.5 tabular-nums">
                          {{ stock.warranty }}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Item>
            </div>
          </section>

          <!-- Right column: orders and supplier inventory -->
          <section class="min-w-0 space-y-3">
            <div class="w-full min-w-0 rounded-lg border bg-card shadow-sm">
              <Item variant="outline">
                <div class="grid min-w-0 gap-2 px-4 py-3">
                  <Label class="text-sm">Orders</Label>
                  <Table class="w-full text-left text-xs">
                    <TableHeader class="sticky top-0 bg-muted text-muted-foreground">
                      <TableRow>
                        <TableHead class="px-3 py-2.5 font-medium">Part</TableHead>
                        <TableHead class="px-3 py-2.5 font-medium">Order date</TableHead>
                        <TableHead class="px-3 py-2.5 font-medium">Supplier</TableHead>
                        <TableHead class="px-3 py-2.5 font-medium">Order no.</TableHead>
                        <TableHead class="px-3 py-2.5 text-center font-medium">Ordered</TableHead>
                        <TableHead class="px-3 py-2.5 text-center font-medium">Expected</TableHead>
                        <TableHead class="px-3 py-2.5 text-center font-medium">Pending</TableHead>
                        <TableHead class="px-3 py-2.5 text-center font-medium">Price</TableHead>
                        <TableHead class="px-3 py-2.5 font-medium">Freight</TableHead>
                        <TableHead class="px-3 py-2.5 font-medium">ETA</TableHead>
                        <TableHead class="px-3 py-2.5 font-medium">Remark</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody class="divide-y">
                      <TableRow
                        v-for="order in orders"
                        :key="`${order.orderNumber}-${order.partNumber}`"
                        class="hover:bg-muted/30 h-7"
                      >
                        <TableCell class="font-medium">
                          {{ order.partNumber }}
                        </TableCell>
                        <TableCell class="whitespace-nowrap">
                          {{ order.orderDate }}
                        </TableCell>
                        <TableCell class="">{{ order.supplier }}</TableCell>
                        <TableCell class="">{{ order.orderNumber }}</TableCell>
                        <TableCell class="text-right tabular-nums">
                          {{ order.orderedQuantity }}
                        </TableCell>
                        <TableCell class="text-right tabular-nums">
                          {{ order.expectedQuantity }}
                        </TableCell>
                        <TableCell class="text-right tabular-nums">
                          {{ order.pendingQuantity }}
                        </TableCell>
                        <TableCell class="text-right font-medium tabular-nums">
                          {{ formatMoney(order.price) }}
                        </TableCell>
                        <TableCell class="">{{ order.freight }}</TableCell>
                        <TableCell class="">{{ order.eta }}</TableCell>
                        <TableCell class="">{{ order.remark }}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Item>
            </div>
            <!-- <Card
              class="min-w-0 overflow-hidden rounded-lg border border-amber-500/20 bg-card shadow-sm xl:h-[250px]"
            >
              <div class="hidden overflow-auto md:block xl:max-h-[196px]">
                <Table class="w-full min-w-[860px] text-left text-xs">
                  <TableHeader class="sticky top-0 z-[1] bg-muted text-muted-foreground">
                    <TableRow>
                      <TableHead class="px-3 py-2.5 font-medium">Part</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Order date</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Supplier</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Order no.</TableHead>
                      <TableHead class="px-3 py-2.5 text-center font-medium">Ordered</TableHead>
                      <TableHead class="px-3 py-2.5 text-center font-medium">Expected</TableHead>
                      <TableHead class="px-3 py-2.5 text-center font-medium">Pending</TableHead>
                      <TableHead class="px-3 py-2.5 text-center font-medium">Price</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Freight</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">ETA</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Remark</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody class="divide-y">
                    <TableRow
                      v-for="order in orders"
                      :key="`${order.orderNumber}-${order.partNumber}`"
                      class="hover:bg-muted/30"
                    >
                      <TableCell class="px-3 py-2.5 font-medium">
                        {{ order.partNumber }}
                      </TableCell>
                      <TableCell class="whitespace-nowrap px-3 py-2.5">
                        {{ order.orderDate }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5">{{ order.supplier }}</TableCell>
                      <TableCell class="px-3 py-2.5">{{ order.orderNumber }}</TableCell>
                      <TableCell class="px-3 py-2.5 text-right tabular-nums">
                        {{ order.orderedQuantity }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5 text-right tabular-nums">
                        {{ order.expectedQuantity }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5 text-right tabular-nums">
                        {{ order.pendingQuantity }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5 text-right font-medium tabular-nums">
                        {{ formatMoney(order.price) }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5">{{ order.freight }}</TableCell>
                      <TableCell class="px-3 py-2.5">{{ order.eta }}</TableCell>
                      <TableCell class="px-3 py-2.5">{{ order.remark }}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div class="divide-y md:hidden">
                <div
                  v-for="order in orders"
                  :key="`${order.orderNumber}-${order.partNumber}`"
                  class="p-3"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="truncate text-sm font-semibold">Order {{ order.orderNumber }}</p>
                      <p class="text-xs text-muted-foreground">
                        {{ order.partNumber }} · {{ order.supplier }} ·
                        {{ order.orderDate }}
                      </p>
                    </div>
                    <span class="whitespace-nowrap text-sm font-semibold tabular-nums">
                      {{ formatMoney(order.price) }}
                    </span>
                  </div>
                  <div class="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div class="rounded-md bg-muted/60 p-2">
                      <p class="text-[10px] text-muted-foreground">Ordered</p>
                      <p class="text-xs font-medium">
                        {{ order.orderedQuantity }}
                      </p>
                    </div>
                    <div class="rounded-md bg-muted/60 p-2">
                      <p class="text-[10px] text-muted-foreground">Expected</p>
                      <p class="text-xs font-medium">
                        {{ order.expectedQuantity }}
                      </p>
                    </div>
                    <div class="rounded-md bg-muted/60 p-2">
                      <p class="text-[10px] text-muted-foreground">Pending</p>
                      <p class="text-xs font-medium">
                        {{ order.pendingQuantity }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card> -->
            <Card
              class="min-w-0 overflow-hidden rounded-lg border border-primary/20 bg-card shadow-sm xl:h-[250px]"
            >
              <div class="hidden overflow-auto md:block xl:max-h-[196px]">
                <Table class="w-full min-w-[610px] text-left text-xs">
                  <TableHeader class="sticky top-0 z-[1] bg-muted text-muted-foreground">
                    <TableRow>
                      <TableHead class="px-3 py-2.5 font-medium">Supplier ID</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Code</TableHead>
                      <TableHead class="px-3 py-2.5 text-right font-medium">Stock</TableHead>
                      <TableHead class="px-3 py-2.5 text-right font-medium">Price</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Currency</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody class="divide-y">
                    <TableRow
                      v-for="supplier in visibleSupplierInventory"
                      :key="`${supplier.supplierId}-${supplier.code}`"
                      class="hover:bg-muted/30"
                    >
                      <TableCell class="px-3 py-2.5 font-medium">
                        {{ supplier.supplierId }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5">{{ supplier.code }}</TableCell>
                      <TableCell class="px-3 py-2.5 text-right tabular-nums">
                        {{ supplier.stock }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5 text-right font-semibold tabular-nums">
                        {{ supplier.price.toFixed(2) }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5">{{ supplier.currency }}</TableCell>
                      <TableCell class="whitespace-nowrap px-3 py-2.5">
                        {{ supplier.updatedAt }}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div class="divide-y md:hidden">
                <div
                  v-for="supplier in visibleSupplierInventory"
                  :key="`${supplier.supplierId}-${supplier.code}`"
                  class="p-3"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold">
                        {{ supplier.supplierId }} · {{ supplier.code }}
                      </p>
                      <p class="text-xs text-muted-foreground">Updated {{ supplier.updatedAt }}</p>
                    </div>
                    <p class="text-sm font-semibold tabular-nums">
                      {{ formatMoney(supplier.price, supplier.currency) }}
                    </p>
                  </div>
                  <div class="mt-3 flex items-center justify-between">
                    <Badge :variant="supplier.stock > 0 ? 'default' : 'secondary'">
                      {{ supplier.stock }} in stock
                    </Badge>
                    <span v-if="supplier.priority" class="text-xs font-medium text-primary"
                      >Priority supplier</span
                    >
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <!-- Fourth column: fixed-width minimized-sidebar style menu -->
          <aside
            class="sticky top-3 hidden h-[calc(100vh-5rem)] w-[95px] self-start overflow-hidden rounded-lg border bg-sidebar text-sidebar-foreground shadow-sm xl:block"
            aria-label="Workspace shortcuts"
          >
            <nav class="flex flex-col items-center gap-1 p-1.5">
              <button
                v-for="action in workspaceActions"
                :key="action.label"
                type="button"
                class="flex h-[68px] w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md px-1 text-center text-[10px] font-medium leading-tight transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              >
                <component :is="action.icon" class="size-5 shrink-0 text-primary" />
                <span class="line-clamp-2 w-full">{{ action.label }}</span>
              </button>
            </nav>
          </aside>
        </div>

        <!-- Alternate sources remain available below the four-column workspace -->
        <Card class="min-w-0 overflow-hidden rounded-lg border bg-card shadow-sm">
          <Table class="w-full text-left text-xs">
            <TableHeader class="bg-muted/60 text-muted-foreground">
              <TableRow>
                <TableHead class="px-3 py-2 font-medium">Type</TableHead>
                <TableHead class="px-3 py-2 text-center font-medium">M</TableHead>
                <TableHead class="px-3 py-2 text-center font-medium">SM</TableHead>
                <TableHead class="px-3 py-2 text-center font-medium">Gen</TableHead>
                <TableHead class="px-3 py-2 font-medium">New part no.</TableHead>
                <TableHead class="px-3 py-2 font-medium">Description</TableHead>
                <TableHead class="px-3 py-2 text-right font-medium">Qty</TableHead>
                <TableHead class="px-3 py-2 text-right font-medium">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="source in alternateSources" :key="source.newPartNumber">
                <TableCell class="px-3 py-2 font-medium">{{ source.type }}</TableCell>
                <TableCell class="px-3 py-2 text-center">
                  {{ source.movement ? 'Yes' : 'No' }}
                </TableCell>
                <TableCell class="px-3 py-2 text-center">
                  {{ source.salesMovement ? 'Yes' : 'No' }}
                </TableCell>
                <TableCell class="px-3 py-2 text-center">
                  {{ source.generic ? 'Yes' : 'No' }}
                </TableCell>
                <TableCell class="px-3 py-2 font-medium">{{ source.newPartNumber }}</TableCell>
                <TableCell class="px-3 py-2">{{ source.description }}</TableCell>
                <TableCell class="px-3 py-2 text-right">{{ source.quantity }}</TableCell>
                <TableCell class="px-3 py-2 text-right">{{ source.stock }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <!-- Second row: four independent operational cards -->
        <section
          class="mt-3 grid min-w-0 grid-cols-1 items-stretch gap-3 lg:grid-cols-2 2xl:grid-cols-4"
        >
          <Card
            class="min-w-0 overflow-hidden rounded-lg border border-blue-500/20 bg-card shadow-sm"
          >
            <div class="min-w-0 overflow-hidden">
              <CardHeader
                class="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
              >
                <div class="flex items-center gap-2">
                  <span class="flex size-7 items-center justify-center rounded-md bg-primary/10">
                    <TrendingUpIcon class="size-4 text-primary" />
                  </span>
                  <div>
                    <CardTitle class="text-sm font-semibold">Movements</CardTitle>
                    <p class="text-[10px] text-muted-foreground">
                      Annual sales and direct movement
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span class="flex items-center gap-1.5">
                    <i class="size-2 rounded-full bg-primary" />
                    Sales
                  </span>
                  <span class="flex items-center gap-1.5">
                    <i class="size-2 rounded-full bg-slate-400" />
                    Direct
                  </span>
                </div>
              </CardHeader>

              <div class="p-3">
                <svg
                  role="img"
                  aria-label="Annual sales and direct movements line chart"
                  class="h-40 w-full overflow-visible"
                  :viewBox="['0', '0', movementChart.width, movementChart.height].join(' ')"
                >
                  <defs>
                    <linearGradient id="movementAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="hsl(var(--primary))" stop-opacity="0.2" />
                      <stop offset="100%" stop-color="hsl(var(--primary))" stop-opacity="0" />
                    </linearGradient>
                  </defs>

                  <line
                    v-for="lineY in [18, 78, 138]"
                    :key="lineY"
                    x1="24"
                    :y1="lineY"
                    x2="542"
                    :y2="lineY"
                    stroke="hsl(var(--border))"
                    stroke-width="1"
                    stroke-dasharray="4 5"
                  />
                  <path :d="movementChart.salesArea" fill="url(#movementAreaGradient)" />
                  <polyline
                    :points="movementChart.directPolyline"
                    fill="none"
                    stroke="#94a3b8"
                    stroke-width="2"
                    stroke-dasharray="5 5"
                  />
                  <polyline
                    :points="movementChart.salesPolyline"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />

                  <g v-for="point in movementChart.points" :key="point.year">
                    <circle
                      :cx="point.x"
                      :cy="point.salesY"
                      r="3.5"
                      fill="hsl(var(--background))"
                      stroke="hsl(var(--primary))"
                      stroke-width="2.5"
                    />
                    <text
                      :x="point.x"
                      y="160"
                      text-anchor="middle"
                      class="fill-muted-foreground text-[10px]"
                    >
                      {{ String(point.year).slice(-2) }}
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </Card>

          <Card
            class="min-w-0 overflow-hidden rounded-lg border border-violet-500/20 bg-card shadow-sm"
          >
            <div class="min-w-0 overflow-hidden">
              <CardHeader
                class="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
              >
                <div class="flex items-center gap-2">
                  <span class="flex size-7 items-center justify-center rounded-md bg-primary/10">
                    <BarChart3Icon class="size-4 text-primary" />
                  </span>
                  <div>
                    <CardTitle class="text-sm font-semibold">Branch-wise sales</CardTitle>
                    <p class="text-[10px] text-muted-foreground">
                      This year compared with last year
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span class="flex items-center gap-1.5">
                    <i class="size-2 rounded-sm bg-primary" />
                    This year
                  </span>
                  <span class="flex items-center gap-1.5">
                    <i class="size-2 rounded-sm bg-slate-300" />
                    Last year
                  </span>
                </div>
              </CardHeader>

              <div class="space-y-4 p-4">
                <div
                  v-for="branch in branchWise"
                  :key="branch.branch"
                  class="grid grid-cols-[2.5rem_minmax(0,1fr)_2rem] items-center gap-3"
                >
                  <span class="text-xs font-semibold">
                    {{ branch.branch }}
                  </span>
                  <div class="min-w-0 space-y-1.5">
                    <div class="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        class="h-full rounded-full bg-primary transition-[width]"
                        :style="{
                          width: branchBarWidth(branch.thisYear),
                        }"
                      />
                    </div>
                    <div class="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        class="h-full rounded-full bg-slate-300 transition-[width] dark:bg-slate-600"
                        :style="{
                          width: branchBarWidth(branch.lastYear),
                        }"
                      />
                    </div>
                  </div>
                  <span class="text-right text-xs font-medium tabular-nums">
                    {{ branch.thisYear }}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            class="min-w-0 overflow-hidden rounded-lg border border-emerald-500/20 bg-card shadow-sm"
          >
            <div class="p-4">
              <div class="mb-4 flex items-center gap-2">
                <span class="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <ClipboardListIcon class="size-4 text-primary" />
                </span>
                <div>
                  <CardTitle class="text-sm font-semibold">Reorder levels</CardTitle>
                  <p class="text-[10px] text-muted-foreground">
                    Stock thresholds for replenishment planning
                  </p>
                </div>
              </div>
              <dl class="grid overflow-hidden rounded-lg border grid-cols-3 divide-x">
                <div class="p-3 text-center">
                  <dt class="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Maximum stock
                  </dt>
                  <dd class="mt-1 text-xl font-semibold tabular-nums">
                    {{ reorderLevels.maximumStock }}
                  </dd>
                </div>
                <div class="p-3 text-center">
                  <dt class="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Minimum stock
                  </dt>
                  <dd class="mt-1 text-xl font-semibold tabular-nums">
                    {{ reorderLevels.minimumStock }}
                  </dd>
                </div>
                <div class="p-3 text-center">
                  <dt class="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Reorder quantity
                  </dt>
                  <dd class="mt-1 text-xl font-semibold tabular-nums">
                    {{ reorderLevels.reorderQuantity }}
                  </dd>
                </div>
              </dl>
            </div>
          </Card>

          <Card
            class="min-w-0 overflow-hidden rounded-lg border border-amber-500/20 bg-card shadow-sm"
          >
            <div class="p-4">
              <div class="mb-4 flex items-center gap-2">
                <span class="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <CircleDollarSignIcon class="size-4 text-primary" />
                </span>
                <div>
                  <CardTitle class="text-sm font-semibold">Purchase history</CardTitle>
                  <p class="text-[10px] text-muted-foreground">Recent supplier purchase prices</p>
                </div>
              </div>
              <div class="overflow-hidden rounded-lg border">
                <Table class="w-full text-left text-xs">
                  <TableHeader class="bg-muted/60 text-muted-foreground">
                    <TableRow>
                      <TableHead class="px-3 py-2.5 font-medium">Supplier</TableHead>
                      <TableHead class="px-3 py-2.5 font-medium">Code</TableHead>
                      <TableHead class="px-3 py-2.5 text-right font-medium">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody class="divide-y">
                    <TableRow
                      v-for="(purchase, index) in purchaseRecords"
                      :key="index"
                      class="hover:bg-muted/30"
                    >
                      <TableCell class="px-3 py-2.5 font-medium">
                        {{ purchase.supplier }}
                      </TableCell>
                      <TableCell class="px-3 py-2.5">{{ purchase.code }}</TableCell>
                      <TableCell class="px-3 py-2.5 text-right font-semibold tabular-nums">
                        {{ formatMoney(purchase.price) }}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  </div>
</template>
