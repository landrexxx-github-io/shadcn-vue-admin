<script setup lang="ts">
import { ref, type Ref } from 'vue'
import {
  ChevronRight,
  ArrowUp,
  ArrowDown,
  RotateCw,
  Filter,
  Search,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/vue-table'

import type { AccountData } from '@/types'
import { accountsMockData } from '@/constants/mockData'

const accounts = ref<AccountData[]>(accountsMockData)

const sorting = ref<SortingState>([])
const globalFilter = ref('')
const columnVisibility = ref<VisibilityState>({})
// Initialize with the first row selected (TanStack uses row indices by default for selection state)
const rowSelection = ref({ '0': true })

function valueUpdater<T>(updaterOrValue: T, ref: Ref<T>) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

// Removed the 'select' checkbox column
const columns: ColumnDef<AccountData>[] = [
  { accessorKey: 'id', header: 'Account', size: 180, enableHiding: true },
  { accessorKey: 'class', header: 'Account Class', size: 150, enableHiding: true },
  { accessorKey: 'type', header: 'Type', size: 100 },
  { accessorKey: 'module', header: 'Control Account Module', size: 200 },
  { accessorKey: 'description', header: 'Description', size: 300 },
  { accessorKey: 'currency', header: 'Currency', size: 100 },
  { id: 'actions', header: '', size: 60, enableSorting: false, enableHiding: false },
]

const table = useVueTable({
  get data() {
    return accounts.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: { pageSize: 8 },
  },
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  getFilteredRowModel: getFilteredRowModel(),
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilter),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),

  // Force single row selection
  enableMultiRowSelection: false,

  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
  columnResizeMode: 'onChange',
})
</script>

<template>
  <div class="flex flex-col h-full border rounded-md bg-white">
    <div class="flex flex-wrap items-center justify-between p-2 border-b gap-4">
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground">
          <RotateCw class="w-4 h-4" />
        </Button>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground">
          <Filter class="w-4 h-4" />
        </Button>
        <div class="relative w-48">
          <Search class="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            class="h-8 pl-8 rounded-sm text-xs placeholder:text-muted-foreground"
            placeholder="Search all columns..."
            v-model="globalFilter"
          />
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden">
      <Table class="table-fixed w-full">
        <TableHeader class="bg-slate-50/50 sticky top-0 shadow-sm z-20">
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :style="{ width: `${header.getSize()}px` }"
              class="relative px-2 group select-none border-r overflow-hidden"
            >
              <div
                class="flex items-center h-full w-full overflow-hidden"
                :class="{ 'justify-end pr-4': header.column.id === 'currency' }"
              >
                <div v-if="header.column.id === 'actions'"></div>

                <div
                  v-else
                  class="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors overflow-hidden w-full"
                  @click="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
                >
                  <span class="truncate min-w-0">
                    <FlexRender
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                  </span>

                  <ArrowDown
                    v-if="header.column.getIsSorted() === 'desc'"
                    class="h-3 w-3 shrink-0 ml-1"
                  />
                  <ArrowUp
                    v-else-if="header.column.getIsSorted() === 'asc'"
                    class="h-3 w-3 shrink-0 ml-1"
                  />
                  <ArrowUp
                    v-else
                    class="h-3 w-3 shrink-0 ml-1 opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </div>
              </div>

              <div
                @mousedown="header.getResizeHandler()?.($event)"
                @touchstart="header.getResizeHandler()?.($event)"
                class="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-blue-400 z-30 transition-colors"
                :class="{ 'bg-blue-400': header.column.getIsResizing() }"
              ></div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-if="table.getRowModel().rows?.length === 0">
            <TableCell :colspan="columns.length" class="h-24 text-center text-muted-foreground">
              No results found.
            </TableCell>
          </TableRow>

          <TableRow
            v-else
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            @click="row.toggleSelected()"
            :class="[
              'cursor-pointer transition-colors',
              row.getIsSelected() ? 'bg-blue-50/70 hover:bg-blue-50/90' : 'hover:bg-slate-50',
            ]"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :style="{ width: `${cell.column.getSize()}px` }"
              :class="[
                'py-2.5 overflow-hidden',
                cell.column.id === 'currency' ? 'text-right pr-4' : 'px-2',
              ]"
            >
              <div class="w-full overflow-hidden">
                <div v-if="cell.column.id === 'actions'" class="flex items-center justify-center">
                  <div></div>
                </div>

                <div
                  v-else-if="cell.column.id === 'id'"
                  class="font-medium flex items-center gap-2 overflow-hidden w-full"
                >
                  <ChevronRight
                    class="h-4 w-4 shrink-0 transition-opacity"
                    :class="
                      row.getIsSelected()
                        ? 'opacity-100 text-[#2D8C46]'
                        : 'opacity-0 text-muted-foreground'
                    "
                  />
                  <span class="truncate min-w-0">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </span>
                </div>

                <div v-else class="flex items-center gap-2 overflow-hidden w-full">
                  <span class="truncate block w-full">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </span>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-between px-4 py-2 border-t bg-slate-50/30 text-sm">
      <div class="text-muted-foreground">
        {{ Object.keys(rowSelection).length > 0 ? '1' : '0' }} row selected.
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1 text-muted-foreground">
          Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
        </div>

        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7 rounded-sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.setPageIndex(0)"
          >
            <ChevronsLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7 rounded-sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <ChevronLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7 rounded-sm"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            <ChevronRight class="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7 rounded-sm"
            :disabled="!table.getCanNextPage()"
            @click="table.setPageIndex(table.getPageCount() - 1)"
          >
            <ChevronsRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
