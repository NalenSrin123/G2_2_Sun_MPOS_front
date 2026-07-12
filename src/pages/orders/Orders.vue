<template>
  <div class="space-y-6 h-[100%] w-full sticky p-5 bg-green-50">

    <Title />
    <Filter_Order :active-filter="activeFilter" @change-filter="activeFilter = $event" />
    <Table_Order :orders="filteredOrders" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import Filter_Order from './Filter_Order.vue'
import Table_Order from './Table_Order.vue'
import Title from './Title.vue'

const activeFilter = ref('All Orders')
const orders = ref([])
const loading = ref(false)
const error = ref('')

const fetchOrders = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await axios.get(
      'https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1/orders'
    )

    orders.value = data
  } catch (err) {
    console.error(err)

    if (err.response) {
      error.value = err.response.data.message
    } else {
      error.value = 'Network Error'
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchOrders()
})

const filteredOrders = computed(() => {
  if (activeFilter.value === 'All Orders') {
    return orders.value
  }

  return orders.value.filter(order =>
    order.status?.toLowerCase().includes(activeFilter.value.toLowerCase())
  )
})
</script>
