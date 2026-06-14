<template>
  <div class="space-y-6 h-[100%] w-full sticky p-5 bg-green-50">

    <Title />
    <Filter_Order
    :active-filter="activeFilter"
      @change-filter="activeFilter = $event"
    />
    <Table_Order :orders="filteredOrders"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import Filter_Order from './Filter_Order.vue'
import Table_Order from './Table_Order.vue'
import Title from './Title.vue'

const activeFilter = ref('All Orders')

const orders = ref([
  {
    id: 1,
    table: 'Table 1',
    items: 'Pizza',
    status: 'Ready',
    amount: '14.50',
    time: '12:45 PM'
  },
  {
    id: 2,
    table: 'Table 3',
    items: 'Chicken',
    status: 'Cooking',
    amount: '8.00',
    time: '1:02 PM'
  },
  {
    id: 3,
    table: 'Table 8',
    items: 'Khmer Noodle',
    status: 'Pending',
    amount: '10.00',
    time: '12:15 PM'
  },
  {
    id: 4,
    table: 'Table 5',
    items: 'Burger',
    status: 'Ready',
    amount: '12.00',
    time: '1:30 PM'
  },
  {
    id: 4,
    table: 'Table 5',
    items: 'Burger',
    status: 'Ready',
    amount: '12.00',
    time: '1:30 PM'
  },
  {
    id: 4,
    table: 'Table 5',
    items: 'Burger',
    status: 'Ready',
    amount: '12.00',
    time: '1:30 PM'
  },
  {
    id: 4,
    table: 'Table 5',
    items: 'Burger',
    status: 'Ready',
    amount: '12.00',
    time: '1:30 PM'
  },
  {
    id: 4,
    table: 'Table 5',
    items: 'Burger',
    status: 'Ready',
    amount: '12.00',
    time: '1:30 PM'
  },
  

])

const filteredOrders = computed(() => {
  if (activeFilter.value === 'All Orders') {
    return orders.value
  }

  return orders.value.filter(
    order =>
      order.status.toLowerCase() === activeFilter.value.toLowerCase()
  )
})
</script>