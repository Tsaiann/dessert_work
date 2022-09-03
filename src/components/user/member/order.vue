<template>
  <div class="order container">
    <DataTable
      :value="state.orderList"
      :paginator="true"
      :rows="10"
      stripedRows
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
      <Column field="ID" header="訂單編號"></Column>
      <Column field="CheckoutAt" header="訂單日期"></Column>
      <Column field="OrderStage" header="狀態"></Column>
      <Column field="shipData" header="寄送日期"></Column>
      <Column field="DeliveryMethod" header="寄送方式"></Column>
      <Column bodyStyle="text-align: center; overflow: visible">
        <template #body="{ data }">
          <Button type="button" class="p-button-outlined p-button-secondary p-button-sm" @click="openDialog(data.ID)">詳細資料</Button>
        </template>
      </Column>
    </DataTable>
    <Dialog header="訂單資料" v-model:visible="detailDialog" :style="{ width: '600px' }">
      <div data-inset="0.5rem">
        <div class="orderData">
          <div class="data_title">
            <div></div>
            <p>商品資訊</p>
          </div>
          <div class="goods_detail" v-for="(item, i) in state.orderDetailList.Items" :key="i">
            <img src="../../../assets/home/cake_item01.png" alt="cake" />
            <div data-width="100%" data-space-left="1rem">
              <h3>{{ item.Goods.Name }}</h3>
              <p>NT {{ item.TimestampPice }}</p>
            </div>
            <div data-width="20%">
              <i class="pi pi-times"></i>
              <span>{{ item.Specs[0].Num }}</span>
            </div>
          </div>
        </div>
        <div class="deliveryData">
          <div class="data_title" data-space-bottom="1rem">
            <div></div>
            <p>配送資訊</p>
          </div>
          <div data-space-left="1rem" class="deliveryData_method">
            <div class="row horizontal">
              <p>方式：</p>
              <span>{{ state.orderDetailList.DeliveryMethod }}</span>
            </div>
            <div class="row horizontal">
              <p>收件人：</p>
              <span>{{ state.orderDetailList.Recipient }}</span>
            </div>
            <div class="row horizontal">
              <p>地址：</p>
              <span>{{ state.orderDetailList.Addr }}</span>
            </div>
            <div class="row horizontal">
              <p>聯絡電話：</p>
              <span>{{ state.orderDetailList.Phone }}</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="row horizontal center">
          <button class="button_submit confirm" @click="detailDialog = false">確定</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { getOrderList, orderDetail } from '@/service/api'
import { callApi } from '@/utils/callApi'
import moment from 'moment'
export default {
  name: 'Order',
  setup() {
    const state = reactive({
      orderList: [],
      orderDetailList: []
    })
    const detailDialog = ref(false)
    //獲得所有訂單資料
    const getOrder = onMounted(() => {
      let data = {}
      callApi(getOrderList, data, (res) => {
        state.orderList = [...res.data.Data]
        console.log(state.orderList)
        timeChange()
        orderStage()
      })
    })
    // 轉換時間戳
    const timeChange = () => {
      for (let i in state.orderList) {
        const timeStamp = state.orderList[i].CheckoutAt * 1000
        let time = moment(timeStamp).format('YYYY-MM-DD')
        state.orderList[i].CheckoutAt = time
      }
    }
    //轉換出貨狀態
    const orderStage = () => {
      for (let i in state.orderList) {
        const stage = state.orderList[i].OrderStage
        if (stage === 0) {
          state.orderList[i].OrderStage = '未出貨'
        } else {
          state.orderList[i].OrderStage = '已出貨'
        }
      }
    }
    //獲得商品詳細資料
    const getOrderDetail = async (id) => {
      const data = { ID: id }
      callApi(orderDetail, data, (res) => {
        state.orderDetailList = res.data.Data
        console.log(state.orderDetailList)
        goodsChange()
        detailDialog.value = true
      })
    }
    const openDialog = (id) => {
      getOrderDetail(id)
    }
    const goodsChange = () => {
      const goodsData = JSON.parse(localStorage.getItem('goodsInfo'))
      for (let i in goodsData) {
        for (let e in state.orderDetailList.Items) {
          if (state.orderDetailList.Items[e].GoodsID === goodsData[i].ID) {
            state.orderDetailList.Items[e].Goods.Name = goodsData[i].Name
          }
        }
      }
    }
    return {
      getOrder,
      timeChange,
      orderStage,
      detailDialog,
      state,
      getOrderDetail,
      openDialog
    }
  }
}
</script>
