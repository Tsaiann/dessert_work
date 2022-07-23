<template>
  <div class="order container">
    <DataTable
      :value="customers"
      :paginator="true"
      :rows="10"
      stripedRows
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
      <Column field="number" header="訂單編號"></Column>
      <Column field="date" header="訂單日期"></Column>
      <Column field="status" header="狀態"></Column>
      <Column field="shipData" header="寄送日期"></Column>
      <Column field="shipMethod" header="寄送方式"></Column>
      <Column bodyStyle="text-align: center; overflow: visible">
        <template #body>
          <Button type="button" class="p-button-outlined p-button-secondary p-button-sm">詳細資料</Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Order',
  setup() {
    const customers = reactive([
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      },
      {
        number: '09083930000',
        date: '2021-02-23',
        status: '已出貨',
        shipData: '2021-02-23',
        shipMethod: '自取'
      }
    ])
    return {
      customers
    }
  }
}
</script>
