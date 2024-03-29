<template>
  <div class="cart container">
    <Toast position="center" group="cartCheckout">
      <template #message="slot">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-exclamation-circle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slot.message.summary }}</h4>
              <nav></nav>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="取消" @click="onRejectCheckout" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="確定" @click="onConfirmCheckout(slot.message.ID)"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <guideLine :data="guideData" />
    <div class="cart-page">
      <div class="card">
        <Steps :model="steps" />
      </div>
      <div class="fillInfo">
        <div class="fillInfo-left">
          <div class="purchaser" data-space-bottom="1rem">
            <h2>購買人資訊</h2>
            <div data-inset="1rem">
              <div class="field-checkbox">
                <Checkbox id="binary" v-model="purchaserChecked" :binary="true" @change="purChecked" />
                <label for="binary">購買人資料與會員資料相同</label>
              </div>
              <div data-space-bottom="0.5rem">
                <p>姓名</p>
                <InputText type="text" v-model="state.memberForm.Name" @change="onChange('purchase')" />
              </div>
              <div data-space-bottom="0.5rem">
                <p>電話號碼</p>
                <InputText type="text" v-model="state.memberForm.Phone" @change="onChange('purchase')" />
              </div>
              <div data-space-bottom="0.5rem">
                <p>電子信箱</p>
                <InputText type="text" v-model="state.memberForm.Email" @change="onChange('purchase')" />
              </div>
              <div>
                <p>收件地址</p>
                <InputText type="text" v-model="state.memberForm.Address" @change="onChange('purchase')" />
              </div>
            </div>
          </div>
          <div class="remark" data-space-bottom="1.5rem">
            <h2>備註</h2>
            <div class="row horizontal center" data-inset="1rem">
              <Textarea v-model="state.recipientForm.OrderRemark" rows="5" cols="30" placeholder="有任何額外需求請打在此處" data-width="100%" />
            </div>
          </div>
          <button class="button_cancel" data-width="40%" @click="handlePrePage">⇽ 返回購物車</button>
        </div>
        <div class="fillInfo-right">
          <h2>送貨資訊</h2>
          <div data-inset="1rem">
            <div class="field-checkbox">
              <Checkbox id="binary" v-model="recipientChecked" :binary="true" @change="recChecked" />
              <label for="binary">收件人資料與購買人相同</label>
            </div>
            <div data-space-bottom="0.5rem">
              <h3>收件人姓名</h3>
              <InputText type="text" v-model="state.recipientForm.Recipient" @change="onChange('recipient')" />
              <p>請填入收件人真實姓名，以確保順利收件</p>
            </div>
            <div data-space-bottom="0.5rem">
              <h3>聯絡電話</h3>
              <InputText type="text" v-model="state.recipientForm.Phone" @change="onChange('recipient')" />
              <p>取貨通知將以此電話聯繫</p>
            </div>
            <div data-space-bottom="0.5rem">
              <h3>電子信箱</h3>
              <InputText type="text" v-model="state.recipientForm.Email" @change="onChange('recipient')" />
            </div>
            <div>
              <h3>收件地址</h3>
              <InputText type="text" data-space-bottom="1rem" v-model="state.recipientForm.Addr" @change="onChange('recipient')" />
            </div>
            <hr style="border-color: #eae2d8" />
            <div data-space-bottom="0.5rem">
              <h3>寄出時間/自取時間</h3>
              <p>‧ 請謹慎選擇日期，若要更改需加收150元人工費</p>
              <p>‧ 出貨後2天內會到貨，時間會依照物流人員當天狀況而決定</p>
              <p>‧ 重大國定假日/年節/中秋或天災 (颱風/地震）有可能延遲到貨 (4天內到達)</p>
              <p>‧ 自取請在備註填寫自取時間</p>
            </div>
            <div data-space-bottom="0.5rem">
              <h3>選擇日期</h3>
              <Calendar id="icon" v-model="date" :showIcon="true" />
            </div>
          </div>
        </div>
      </div>
      <hr style="border-color: #eae2d8" />
      <div class="row horizontal center" data-space-top="2rem">
        <button class="button_confirm" data-width="60%" @click="submitOrder">提交訂單</button>
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from 'components/guideLine.vue'
import { reactive, ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { memberData, submitGoodsCart, createDiscount } from 'services/api'
import { callApi } from 'utils/callApi'
import { useToast } from 'primevue/usetoast'
import { useStore } from 'vuex'

export default {
  name: 'ShoppingData',
  components: {
    guideLine
  },
  setup() {
    const reload = inject('reload')
    const router = useRouter()
    const toast = useToast()
    const store = useStore()
    const purchaserChecked = ref(false)
    const recipientChecked = ref(false)
    const date = ref()
    const state = reactive({
      memberForm: {
        Name: '',
        Phone: '',
        Email: '',
        Address: ''
      },
      recipientForm: {
        Discounts: [],
        Recipient: '',
        Phone: '',
        Addr: '',
        OrderRemark: '',
        Email: '',
        PaymentMethod: store.getters['cartModules/getCartInfo'].payment,
        DeliveryMethod: store.getters['cartModules/getCartInfo'].delivery
      },
      discountForm: {
        MemberID: store.getters['memberModules/getID'],
        Amount: 50
      },
      orderTotal: store.getters['cartModules/getTotal']
    })
    const guideData = reactive([
      {
        label: '購物車',
        to: '/cart'
      }
    ])
    const steps = reactive([
      {
        label: '訂單資訊',
        to: '/cart'
      },
      {
        label: '填寫資料',
        to: '/fillInfo'
      },
      {
        label: '資料確認',
        to: '/finish'
      }
    ])
    //若有暫存資料先取回來
    const reloadForm = onMounted(() => {
      const recForm = JSON.parse(localStorage.getItem('recform'))
      const purForm = JSON.parse(localStorage.getItem('purform'))
      if (purForm !== null) {
        state.memberForm = purForm
        if (recForm !== null) {
          state.recipientForm = recForm
        }
      }
    })
    //回到上一頁
    const handlePrePage = () => {
      removeChange()
      router.push({ name: 'Cart' })
    }
    //確定送出訂單資料
    const submitOrder = () => {
      toast.add({ severity: 'success', summary: '確定要送出訂單？', group: 'cartCheckout' })
    }
    const onRejectCheckout = () => {
      toast.removeGroup('cartCheckout')
    }
    const onConfirmCheckout = async () => {
      state.recipientForm.Discounts.push(JSON.parse(localStorage.getItem('cartInfo')).discount)
      const data = state.recipientForm
      callApi(submitGoodsCart, data, () => {
        if (state.orderTotal >= 2000) {
          callApi(createDiscount, state.discountForm, () => {})
        }
        store.commit('cartModules/SET_CARTINFO', state.recipientForm)
        router.push({ name: 'Finish' })
        toast.removeGroup('cartCheckout')
        removeChange()
        reload()
      }).catch(() => {
        toast.removeGroup('cartCheckout')
        toast.add({ severity: 'error', summary: '請確實填寫資料！', group: 'errorBox' })
      })
    }
    //購買人資料與會員資料相同
    const purChecked = async () => {
      if (purchaserChecked.value === true) {
        const data = ''
        await callApi(memberData, data, (res) => {
          state.memberForm.Address = res.data.Data.Address
          state.memberForm.Name = res.data.Data.Name
          state.memberForm.Email = res.data.Data.Email
          state.memberForm.Phone = res.data.Data.Phone
          onChange('purchase')
        })
      }
    }
    //收件人資料與購買者相同
    const recChecked = () => {
      if (recipientChecked.value === true) {
        state.recipientForm.Addr = state.memberForm.Address
        state.recipientForm.Recipient = state.memberForm.Name
        state.recipientForm.Phone = state.memberForm.Phone
        state.recipientForm.Email = state.memberForm.Email
        onChange('recipient')
      }
    }
    //自動緩存資料
    const onChange = (method) => {
      const caseObj = {
        purchase: () => {
          setTimeout(() => {
            localStorage.setItem('purform', JSON.stringify(state.memberForm))
          }, 2000)
        },
        recipient: () => {
          setTimeout(() => {
            localStorage.setItem('recform', JSON.stringify(state.recipientForm))
          }, 2000)
        }
      }
      caseObj[method]()
    }
    //回到上一頁或是結帳完成清除暫存資料
    const removeChange = () => {
      localStorage.removeItem('purform')
      localStorage.removeItem('recform')
    }
    return {
      guideData,
      state,
      steps,
      purchaserChecked,
      recipientChecked,
      date,
      reloadForm,
      handlePrePage,
      submitOrder,
      onRejectCheckout,
      onConfirmCheckout,
      recChecked,
      purChecked,
      onChange
    }
  }
}
</script>
