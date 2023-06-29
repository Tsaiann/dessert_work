<template>
  <div class="home">
    <Toast position="center" />
    <Toast position="center" group="bc" @close="onReject">
      <template #message="slotProps">
        <div class="row horizontal flex flex-column">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <p>{{ slotProps.message.detail }}</p>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="是" @click="onConfirm(slotProps.message.ID)" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="否" @click="onReject"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <headerTop />
    <router-view />
    <footerBottom />
  </div>
</template>

<script>
import headerTop from 'components/headerTop.vue'
import footerBottom from 'components/footerBottom.vue'
import { useToast } from 'primevue/usetoast'
import { getGoodsCart, deleteGoodsCart, updateCartInfo } from 'services/api'
import { callApi } from 'utils/callApi'

export default {
  name: 'Home',
  components: {
    headerTop,
    footerBottom
  },
  setup() {
    const toast = useToast()
    const onReject = () => {
      toast.removeGroup('bc')
    }
    const onConfirm = async (id) => {
      const data = { ID: id }
      await callApi(deleteGoodsCart, data, () => {
        toast.add({ severity: 'success', summary: '已刪除', detail: 'Message Content' })
        toast.removeGroup('bc')
        getCartData()
      })
      await reload()
    }
    return {
      onReject,
      onConfirm
    }
  }
}
</script>
