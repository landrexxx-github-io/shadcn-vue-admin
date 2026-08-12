<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { Edit, Edit2, Trash2 } from 'lucide-vue-next'
import { SplitterPanel } from 'reka-ui'

import Button from '@/components/ui/button/Button.vue'
import Table from '@/components/ui/table/Table.vue'
import TableCaption from '@/components/ui/table/TableCaption.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import router from '@/router'

const upperPanelRef = ref<InstanceType<typeof SplitterPanel>>()

onMounted(async () => {
  await nextTick()

  // Start with the upper panel hidden and lower panel at full height.
  upperPanelRef.value?.collapse()
})

function handleNewQuotation() {
  // Navigate to the new quotation route
  router.push({ name: 'quotation-new' })
}
</script>

<template>
  <!-- Adjust the 4rem value if your application header has a different height. -->
  <div class="h-[calc(100vh-4rem)] min-h-0 overflow-hidden">
    <Button @click="handleNewQuotation"> New Quotation </Button>
    <div class="min-h-80 overflow-auto rounded-lg border mt-2">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-10"></TableHead>
            <TableHead>Quote no.</TableHead>
            <TableHead>Customer name</TableHead>
            <TableHead>Payment type</TableHead>
            <TableHead class="text-right"> Total Amount </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="flex gap-1"
              ><Button size="sm"><Edit2 /> Edit</Button>
              <Button class="bg-red-700 hover:bg-red-800" size="sm"
                ><Trash2 /> Delete</Button
              ></TableCell
            >
            <TableCell> 10001 </TableCell>
            <TableCell>AL MAHA HEAVY EQUIPMENT PARTS</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell class="text-right"> $250.00 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="flex gap-1"
              ><Button size="sm"><Edit2 /> Edit</Button>
              <Button class="bg-red-700 hover:bg-red-800" size="sm"
                ><Trash2 /> Delete</Button
              ></TableCell
            >
            <TableCell> 10002 </TableCell>
            <TableCell>AL MAHA HEAVY EQUIPMENT PARTS</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell class="text-right"> $250.00 </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
